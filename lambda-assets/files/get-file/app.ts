import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand} from '@aws-sdk/lib-dynamodb'; 
const lodash = require('lodash');

const { FILE_TABLE_NAME } = process.env;

import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();

  try {
    const client = new DynamoDBClient({});
    const ddbDocClient = DynamoDBDocumentClient.from(client);
    const { Item: file } = await ddbDocClient.send(
      new GetCommand({
        TableName: `${FILE_TABLE_NAME}`,
        Key: {
          fileId: request.parameter('fileId'),
        },
      }),
    );
    if (lodash.isEmpty(file)) {
      return response.error("ResourceNotFoundException", 404);
    }
    return response.json({ file })
  } catch (error) {
    if (error.Code === 'ResourceNotFoundException') {
      return response.error(error, 404);
    } else {
      return response.error(error);
    }
  }
}