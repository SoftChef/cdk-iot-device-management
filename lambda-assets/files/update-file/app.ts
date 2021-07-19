import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { Request, Response } from '@softchef/lambda-events';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const validated = request.validate(joi => {
      return {
        files: joi.array().items(
          joi.object().keys({
            fileId: joi.string().required(),
            locale: joi.string().required(),
            summary: joi.string().allow(null, ''),
            description: joi.string().allow(null, ''),
          }),
        ),
      };
    });
    if (validated.error) {
      return response.error(validated.details, 422);
    };
    const ddbDocClient = DynamoDBDocumentClient.from(
      new DynamoDBClient({}),
    );
    const { Items: existsFiles } = await ddbDocClient.send(
      new QueryCommand({
        TableName: process.env.FILE_TABLE_NAME,
        IndexName: 'get-file-by-checksum-and-version',
        KeyConditionExpression: '#checksum = :checksum and #version = :version',
        ExpressionAttributeNames: {
          '#checksum': 'checksum',
          '#version': 'version',
        },
        ExpressionAttributeValues: {
          ':checksum': request.parameter('checksum'),
          ':version': request.parameter('version'),
        },
      }),
    );
    if (!existsFiles || existsFiles.length === 0) {
      return response.error('File not found.', 404);
    };
    await ddbDocClient.send(
      new UpdateCommand({
        TableName: process.env.FILE_TABLE_NAME,
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
    };
  };
}
