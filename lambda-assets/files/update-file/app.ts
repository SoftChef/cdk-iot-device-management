import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { Request, Response } from '@softchef/lambda-events';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const validated = request.validate(joi => {
      return {
        summary: joi.string().required(),
        description: joi.string().required(),
      };
    });
    if (validated.error) {
      return response.error(validated.details, 422);
    };
    const ddbDocClient = DynamoDBDocumentClient.from(
      new DynamoDBClient({}),
    );
    const fileId = request.parameter('fileId');
    const file = await ddbDocClient.send(
      new GetCommand({
        TableName: process.env.FILE_TABLE_NAME,
        Key: {
          fileId,
        },
      }),
    );
    if (!file.Item) {
      return response.error('File does not exists.', 404);
    };
    await ddbDocClient.send(
      new UpdateCommand({
        TableName: process.env.FILE_TABLE_NAME,
        Key: {
          fileId,
        },
        UpdateExpression: 'set #summary = :summary and #description = :description',
        ExpressionAttributeNames: {
          '#summary': 'summary',
          '#description': 'description',
        },
        ExpressionAttributeValues: {
          ':summary': request.input('summary', ''),
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
  }
}
