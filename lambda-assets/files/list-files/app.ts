import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand } from '@aws-sdk/lib-dynamodb';

const { FILE_TABLE_NAME } = process.env;

import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();

  try {
    const client = new DynamoDBClient({});
    const ddbDocClient = DynamoDBDocumentClient.from(client);
    const data = await ddbDocClient.send(
      new QueryCommand({
        TableName: `${FILE_TABLE_NAME}`,
        IndexName: 'query-by-categoryId',
        KeyConditionExpression: '#categoryId = :categoryId',
        ExpressionAttributeNames: {
          '#categoryId': 'categoryId'
        },
        ExpressionAttributeValues: {
          ':categoryId': request.parameter("categoryId")
        }
      })
    )
    return response.json({
      Item: data,
      nextToken: request.get('nextToken', undefined),
    });
  } catch (error) {
    return response.json(error);
  }
}