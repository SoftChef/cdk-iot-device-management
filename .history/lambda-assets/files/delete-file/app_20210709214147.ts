import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { Request, Response } from '@softchef/lambda-events';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const ddbDocClient = DynamoDBDocumentClient.from(
      new DynamoDBClient({}),
    );
    await ddbDocClient.send(
      new DeleteCommand({
        TableName: process.env.FILE_TABLE_NAME,
        Key: {
          fileId: request.parameter('fileId'),
          version: request.parameter('version'),
        },
      }),
    );
    return response.json({
      deleted: true,
    });
  } catch (error) {
    return response.error(error);
  }
}
