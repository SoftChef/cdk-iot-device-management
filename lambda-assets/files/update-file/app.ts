import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { Request, Response } from '../../utils';

const { FILE_TABLE_NAME } = process.env;

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const validated = request.validate(joi => {
      return {
        checksumType: joi.string().allow('md5', 'crc32', 'sha1'), 
        fileId: joi.string().when('checksumType', { is: 'md5', then: joi.string().length(32).required()})
        .concat(joi.string().when('checksumType', { is: 'crc32', then: joi.string().length(8).required()}))
        .concat(joi.string().when('checksumType', { is: 'sha1', then: joi.string().length(40).required()})),
        version: joi.string(), 
      };
    });
    if (validated.error) {
      return response.error(validated.details, 422);
    }
    const ddbDocClient = DynamoDBDocumentClient.from(
      new DynamoDBClient({})
    );
    await ddbDocClient.send(
      new UpdateCommand({
        TableName: `${FILE_TABLE_NAME}`,
        Key: {
          fileId: request.parameter('fileId'),
          version: request.parameter('version'),
        },
        UpdateExpression: 'set #description = :description',
        ExpressionAttributeNames: {
          '#description': 'description',
        },
        ExpressionAttributeValues: {
          ':description': request.input('description', ''),
        },
      }),
    );
    return response.json({
      updated: true,
    });
  } catch (error) {
    if (error.Code === 'ResourceNotFoundException') {
      return response.error(error, 404);
    } else {
      return response.error(error);
    }
  }
}
