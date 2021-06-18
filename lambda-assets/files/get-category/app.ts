import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import { Request, Response } from '../../utils';
import { isEmpty } from 'lodash';

const { CATEGORY_TABLE_NAME } = process.env;

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const ddbDocClient = DynamoDBDocumentClient.from(
      new DynamoDBClient({})
    );
    const category = await ddbDocClient.send(
      new GetCommand({
        TableName: `${CATEGORY_TABLE_NAME}`,
        Key: {
          categoryId: request.parameter('categoryId'),
        },
      })
    );
    if (isEmpty(category.Item)) {
      return response.error('Not found.', 404);
    };
    return response.json({
      category: category.Item,
    });
  } catch (error) {
    return response.error(error);
  }
}