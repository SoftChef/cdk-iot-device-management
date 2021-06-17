const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand } = require('@aws-sdk/lib-dynamodb');
const { FILE_TABLE_NAME } = process.env;
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const validated = request.validate(joi => {
      return {
        location: joi.string().uri().required(),
        checksum: joi.string().required(),
        checksumType: joi.string().allow('md5', 'crc32', 'sha1'),
        version: joi.string().required(),
        categoryId: joi.string().required()
      };
    });
    if (validated.error) {
      return response.error(validated.details, 422);
    }
    const ddbDocClient = DynamoDBDocumentClient.from(
      new DynamoDBClient()
    );
    await ddbDocClient.send(
      new PutCommand({
        TableName: `${FILE_TABLE_NAME}`,
        Item: {
          fileId: request.input('checksum'),
          version: request.input('version'),
          categoryId: request.input('categoryId'),
          location: request.input('location'),
          description: request.input('description'),
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      })
    )
    return response.json({
      created: true,
    });
  } catch (error) {
    return response.error(error);
  }
}
