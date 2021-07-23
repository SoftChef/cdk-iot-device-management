import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import { Request, Response } from '@softchef/lambda-events';
import * as uuid from 'uuid';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const validated = request.validate(joi => {
      return {
        version: joi.string().required(),
        categoryId: joi.string().required(),
        checksumType: joi.string().allow('md5', 'crc32', 'sha1'),
        checksum: joi.string().when('checksumType', { is: 'md5', then: joi.string().length(32).required() })
          .concat(joi.string().when('checksumType', { is: 'crc32', then: joi.string().length(8).required() }))
          .concat(joi.string().when('checksumType', { is: 'sha1', then: joi.string().length(40).required() })),
        location: joi.string().uri().required(),
        locale: joi.string().required(),
        summary: joi.string().required(),
        description: joi.string().required(),
      };
    });
    if (validated.error) {
      return response.error(validated.details, 422);
    }
    const categoryId = request.input('categoryId');
    const ddbDocClient = DynamoDBDocumentClient.from(
      new DynamoDBClient({}),
    );
    const { Item: category } = await ddbDocClient.send(
      new GetCommand({
        TableName: process.env.CATEGORY_TABLE_NAME,
        Key: {
          categoryId,
        },
      }),
    );
    if (!category) {
      return response.error('Category does not exist.', 404);
    }
    const currentTime = Date.now();
    await ddbDocClient.send(
      new PutCommand({
        TableName: process.env.FILE_TABLE_NAME,
        Item: {
          fileId: uuid.v4(),
          version: request.input('version'),
          categoryId,
          checksumType: request.input('checksumType'),
          checksum: request.input('checksum'),
          location: request.input('location'),
          locale: request.input('locale'),
          summary: request.input('summary'),
          description: request.input('description'),
          createdAt: currentTime,
          updatedAt: currentTime,
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
