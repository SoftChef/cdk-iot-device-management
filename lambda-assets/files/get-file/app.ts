import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import { Request, Response } from '../../utils';
import { isEmpty } from 'lodash';

const { FILE_TABLE_NAME } = process.env;

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const ddbDocClient = DynamoDBDocumentClient.from(
      new DynamoDBClient({})
    );
    const file = await ddbDocClient.send(
      new GetCommand({
        TableName: `${FILE_TABLE_NAME}`,
        Key: {
          fileId: request.parameter('fileId'),
          version: request.parameter('version'),
        },
      }),
    );
    if (isEmpty(file.Item)) {
      return response.error('Not found.', 404);
    };
    return response.json({
      file: file.Item
    });
  } catch (error) {
    return response.error(error);
  }
}
