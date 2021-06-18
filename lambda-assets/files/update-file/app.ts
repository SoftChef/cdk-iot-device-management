import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { Request, Response } from '../../utils';

const { FILE_TABLE_NAME } = process.env;

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
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
    return response.error(error);
  }
}
