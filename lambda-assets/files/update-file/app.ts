import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb';

const { FILE_TABLE_NAME } = process.env;

import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const client = new DynamoDBClient({});
    const ddbDocClient = DynamoDBDocumentClient.from(client);
    await ddbDocClient.send(
      new UpdateCommand({
        TableName: `${FILE_TABLE_NAME}`,
        Key: {
          fileId: request.parameter('fileId'),
        },
        AttributeUpdates: {
          description: {
            Action: 'PUT',
            Value: request.input('description'),
          },
        },
      }),
    )
    return response.json({
      updated: true,
    });
  } catch (error) {
    return response.json(error);
  }
}