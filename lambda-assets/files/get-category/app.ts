const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, GetCommand } = require('@aws-sdk/lib-dynamodb');
import { Request, Response } from '../../utils';
const { isEmpty } = require('lodash');
const { CATEGORY_TABLE_NAME } = process.env;

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const ddbDocClient = DynamoDBDocumentClient.from(
      new DynamoDBClient()
    );
    const { Item: category } = await ddbDocClient.send(new GetCommand({
      TableName: `${CATEGORY_TABLE_NAME}`,
      Key: {
        categoryId: request.parameter('categoryId'),
      },
    }));
    if (isEmpty(category)) {
      return response.error('Not found.', 404);
    }
    return response.json(category);
  } catch (error) {
    console.log(error)
    return response.error(error);
  }
}