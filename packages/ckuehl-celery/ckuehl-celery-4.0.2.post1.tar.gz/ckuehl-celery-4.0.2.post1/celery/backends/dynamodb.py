# -*- coding: utf-8 -*-
"""AWS DynamoDB result store backend."""
from __future__ import absolute_import, unicode_literals
from collections import namedtuple
from time import time, sleep

from kombu.utils.url import _parse_url as parse_url
from celery.exceptions import ImproperlyConfigured
from celery.utils.log import get_logger
from celery.five import string
from .base import KeyValueStoreBackend
try:
    import boto3
    from botocore.exceptions import ClientError
except ImportError:  # pragma: no cover
    boto3 = ClientError = None  # noqa

__all__ = ['DynamoDBBackend']


# Helper class that describes a DynamoDB attribute
DynamoDBAttribute = namedtuple('DynamoDBAttribute', ('name', 'data_type'))

logger = get_logger(__name__)


class DynamoDBBackend(KeyValueStoreBackend):
    """AWS DynamoDB result backend.

    Raises:
        celery.exceptions.ImproperlyConfigured:
            if module :pypi:`boto3` is not available.
    """

    #: default DynamoDB table name (`default`)
    table_name = 'celery'

    #: Read Provisioned Throughput (`default`)
    read_capacity_units = 1

    #: Write Provisioned Throughput (`default`)
    write_capacity_units = 1

    #: AWS region (`default`)
    aws_region = None

    #: The endpoint URL that is passed to boto3 (local DynamoDB) (`default`)
    endpoint_url = None

    _key_field = DynamoDBAttribute(name='id', data_type='S')
    _value_field = DynamoDBAttribute(name='result', data_type='B')
    _timestamp_field = DynamoDBAttribute(name='timestamp', data_type='N')
    _available_fields = None

    def __init__(self, url=None, table_name=None, *args, **kwargs):
        super(DynamoDBBackend, self).__init__(*args, **kwargs)

        self.url = url
        self.table_name = table_name or self.table_name

        if not boto3:
            raise ImproperlyConfigured(
                'You need to install the boto3 library to use the '
                'DynamoDB backend.')

        aws_credentials_given = False
        aws_access_key_id = None
        aws_secret_access_key = None

        if url is not None:
            scheme, region, port, username, password, table, query = \
                parse_url(url)

            aws_access_key_id = username
            aws_secret_access_key = password

            access_key_given = aws_access_key_id is not None
            secret_key_given = aws_secret_access_key is not None

            if access_key_given != secret_key_given:
                raise ImproperlyConfigured(
                    'You need to specify both the Access Key ID '
                    'and Secret.')

            aws_credentials_given = access_key_given

            if region == 'localhost':
                # We are using the downloadable, local version of DynamoDB
                self.endpoint_url = 'http://localhost:{}'.format(port)
                self.aws_region = 'us-east-1'
                logger.warning(
                    'Using local-only DynamoDB endpoint URL: {}'.format(
                        self.endpoint_url
                    )
                )
            else:
                self.aws_region = region

            self.read_capacity_units = int(
                query.get(
                    'read',
                    self.read_capacity_units
                )
            )
            self.write_capacity_units = int(
                query.get(
                    'write',
                    self.write_capacity_units
                )
            )
            self.table_name = table or self.table_name

        self._available_fields = (
            self._key_field,
            self._value_field,
            self._timestamp_field
        )

        self._client = None
        if aws_credentials_given:
            self._get_client(
                access_key_id=aws_access_key_id,
                secret_access_key=aws_secret_access_key
            )

    def _get_client(self, access_key_id=None, secret_access_key=None):
        """Get client connection."""
        if self._client is None:
            client_parameters = dict(
                region_name=self.aws_region
            )
            if access_key_id is not None:
                client_parameters.update(dict(
                    aws_access_key_id=access_key_id,
                    aws_secret_access_key=secret_access_key
                ))

            if self.endpoint_url is not None:
                client_parameters['endpoint_url'] = self.endpoint_url

            self._client = boto3.client(
                'dynamodb',
                **client_parameters
            )
            self._get_or_create_table()
        return self._client

    def _get_table_schema(self):
        """Get the boto3 structure describing the DynamoDB table schema."""
        return dict(
            AttributeDefinitions=[
                {
                    'AttributeName': self._key_field.name,
                    'AttributeType': self._key_field.data_type
                }
            ],
            TableName=self.table_name,
            KeySchema=[
                {
                    'AttributeName': self._key_field.name,
                    'KeyType': 'HASH'
                }
            ],
            ProvisionedThroughput={
                'ReadCapacityUnits': self.read_capacity_units,
                'WriteCapacityUnits': self.write_capacity_units
            }
        )

    def _get_or_create_table(self):
        """Create table if not exists, otherwise return the description."""
        table_schema = self._get_table_schema()
        try:
            table_description = self._client.create_table(**table_schema)
            logger.info(
                'DynamoDB Table {} did not exist, creating.'.format(
                    self.table_name
                )
            )
            # In case we created the table, wait until it becomes available.
            self._wait_for_table_status('ACTIVE')
            logger.info(
                'DynamoDB Table {} is now available.'.format(
                    self.table_name
                )
            )
            return table_description
        except ClientError as e:
            error_code = e.response['Error'].get('Code', 'Unknown')

            # If table exists, do not fail, just return the description.
            if error_code == 'ResourceInUseException':
                return self._client.describe_table(
                    TableName=self.table_name
                )
            else:
                raise e

    def _wait_for_table_status(self, expected='ACTIVE'):
        """Poll for the expected table status."""
        achieved_state = False
        while not achieved_state:
            table_description = self.client.describe_table(
                TableName=self.table_name
            )
            logger.debug(
                'Waiting for DynamoDB table {} to become {}.'.format(
                    self.table_name,
                    expected
                )
            )
            current_status = table_description['Table']['TableStatus']
            achieved_state = current_status == expected
            sleep(1)

    def _prepare_get_request(self, key):
        """Construct the item retrieval request parameters."""
        return dict(
            TableName=self.table_name,
            Key={
                self._key_field.name: {
                    self._key_field.data_type: key
                }
            }
        )

    def _prepare_put_request(self, key, value):
        """Construct the item creation request parameters."""
        return dict(
            TableName=self.table_name,
            Item={
                self._key_field.name: {
                    self._key_field.data_type: key
                },
                self._value_field.name: {
                    self._value_field.data_type: value
                },
                self._timestamp_field.name: {
                    self._timestamp_field.data_type: str(time())
                }
            }
        )

    def _item_to_dict(self, raw_response):
        """Convert get_item() response to field-value pairs."""
        if 'Item' not in raw_response:
            return {}
        return {
            field.name: raw_response['Item'][field.name][field.data_type]
            for field in self._available_fields
        }

    @property
    def client(self):
        return self._get_client()

    def get(self, key):
        key = string(key)
        request_parameters = self._prepare_get_request(key)
        item_response = self.client.get_item(**request_parameters)
        item = self._item_to_dict(item_response)
        return item.get(self._value_field.name)

    def set(self, key, value):
        key = string(key)
        request_parameters = self._prepare_put_request(key, value)
        self.client.put_item(**request_parameters)

    def mget(self, keys):
        return [self.get(key) for key in keys]

    def delete(self, key):
        key = string(key)
        request_parameters = self._prepare_get_request(key)
        self.client.delete_item(**request_parameters)
