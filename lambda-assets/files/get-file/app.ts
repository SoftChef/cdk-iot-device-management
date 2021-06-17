const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand } = require("@aws-sdk/lib-dynamodb");
import { Request, Response } from '../../utils';
const { isEmpty } = require('lodash');
const { FILE_TABLE_NAME } = process.env;

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const ddbDocClient = DynamoDBDocumentClient.from(
      new DynamoDBClient()
    );
    const { Item: file } = await ddbDocClient.send(
      new GetCommand({
        TableName: `${FILE_TABLE_NAME}`,
        Key: {
          fileId: request.parameter('fileId'),
          version: request.parameter('version'),
        },
      }),
    );
    if (isEmpty(file)) {
      return response.error('Not found.', 404);
    }
    return response.json(file);
  } catch (error) {
    return response.error(error);
  }
}
