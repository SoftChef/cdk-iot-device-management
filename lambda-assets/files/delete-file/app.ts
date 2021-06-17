import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, DeleteCommand } from '@aws-sdk/lib-dynamodb';

const { FILE_TABLE_NAME } = process.env;

import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    console.log(request);
    if (request.parameter("fileId") === null ) {
      return response.error("ResourceNotFoundException", 404);
    }
    const client = new DynamoDBClient({});
    const ddbDocClient = DynamoDBDocumentClient.from(client);
    await ddbDocClient.send(
      new DeleteCommand({
        TableName: `${FILE_TABLE_NAME}`,
        Key: {
          fileID: request.parameter("fileId")
        }
      })
    )
    return response.json({ deleted: true });
  } catch (error) {
    if (error.Code === 'ResourceNotFoundException') {
      return response.error(error, 404);
    } else {
      return response.error(error);
    }
  }
}