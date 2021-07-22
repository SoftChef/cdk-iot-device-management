import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import { Request, Response } from '@softchef/lambda-events';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const ddbDocClient = DynamoDBDocumentClient.from(
      new DynamoDBClient({}),
    );
    const existsFile = await ddbDocClient.send(
      new GetCommand({
        TableName: process.env.FILE_TABLE_NAME,
        Key: {
          fileId: request.parameter('fileId'),
        },
      }),
    );
    if (existsFile.Item) {
      return response.json({
        file: existsFile,
      });
    } else {
      return response.error('File not found.', 404);
    };
  } catch (error) {
    return response.error(error);
  }
}
