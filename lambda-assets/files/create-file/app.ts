import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand, BatchWriteCommand } from '@aws-sdk/lib-dynamodb';
import { Request, Response } from '@softchef/lambda-events';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {

    const validated = request.validate(joi => {
      return {
        body: joi.array().items(joi.object().keys({
          location: joi.string().uri().required(),
          checksumType: joi.string().allow('md5', 'crc32', 'sha1'),
          checksum: joi.string().when('checksumType', { is: 'md5', then: joi.string().length(32).required() })
            .concat(joi.string().when('checksumType', { is: 'crc32', then: joi.string().length(8).required() }))
            .concat(joi.string().when('checksumType', { is: 'sha1', then: joi.string().length(40).required() })),
          version: joi.string().required(),
          categoryId: joi.string().required(),
        })).required(),
      };
    });
    if (validated.error) {
      return response.error(validated.details, 422);
    }
    const categoryId = request.input('categoryId');
    const ddbDocClient = DynamoDBDocumentClient.from(
      new DynamoDBClient({}),
    );
    const { Items: category } = await ddbDocClient.send(
      new QueryCommand({
        TableName: process.env.CATEGORY_TABLE_NAME,
        KeyConditionExpression: 'categoryId = :categoryId',
        ExpressionAttributeValues: {
          ':categoryId': categoryId,
        },
      }),
    );
    if (!category) {
      return response.error('Category does not exist.', 422);
    };
    const targetChecksum = request.input('checksum');
    const targetVersion = request.input('version');
    const { Items: files } = await ddbDocClient.send(
      new QueryCommand({
        TableName: process.env.CATEGORY_TABLE_NAME,
        KeyConditionExpression: 'checksum = :targetChecksum and version = :targetVersion',
        ExpressionAttributeValues: {
          ':targetChecksum': targetChecksum,
          ':targetVersion': targetVersion,
        },
      }),
    );
    if (files) {
      return response.error('File already exists.', 422);
    }
    const inputData = request.input('files');
    const currentTime = Date.now();
    const file = inputData.map(data => {
      return {
        PutRequest: {
          item: {
            ...data,
            createAt: currentTime,
            updateAt: currentTime,
          },
        },
      };
    });
    await ddbDocClient.send(
      new BatchWriteCommand({
        RequestItems: {
          fileTable: file,
        },
      }),
    );
    return response.json({
      created: true,
    });
  } catch (error) {
    return response.error(error);
  }
}
