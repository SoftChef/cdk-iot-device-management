const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, UpdateCommand } = require('@aws-sdk/lib-dynamodb');
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
      new UpdateCommand({
        TableName: `${FILE_TABLE_NAME}`,
        Key: {
          fileId: request.parameter('fileId'),
          version: request.parameter('version'),
        },
        UpdateExpression: 'set #description = :description',
        ExpressionAttributeNames: {
          '#description': 'description'
        },
        ExpressionAttributeValues: {
          ':description': request.input('description', ''),
        },
      }),
    )
    return response.json({
      updated: true,
    });
  } catch (error) {
    return response.error(error);
  }
}