const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, DeleteCommand } = require('@aws-sdk/lib-dynamodb');
const { FILE_TABLE_NAME } = process.env;
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const ddbDocClient = DynamoDBDocumentClient.from(
      new DynamoDBClient()
    );
    await ddbDocClient.send(
      new DeleteCommand({
        TableName: `${FILE_TABLE_NAME}`,
        Key: {
          fileId: request.parameter('fileId'),
          version: request.parameter('version'),
        }
      })
    )
    return response.json({
      deleted: true,
    });
  } catch (error) {
    return response.error(error);
  }
}
