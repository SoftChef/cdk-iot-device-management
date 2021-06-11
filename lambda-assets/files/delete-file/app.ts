import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, DeleteCommand } from '@aws-sdk/lib-dynamodb'; 

const { FILE_TABLE_NAME } = process.env;

import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();

  try {
    const client = new DynamoDBClient({});
    const ddbDocClient = DynamoDBDocumentClient.from(client);
    await ddbDocClient.send(
      new DeleteCommand({
        TableName: `${FILE_TABLE_NAME}`,
        Key: {
          fileID: request.parameter("fileID")
        }
      })
    )
    return response.json({
      deleted: true,
    });
  } catch (error) {
    return response.json(error);
  }
}