import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import { Request, Response } from '@softchef/lambda-events';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const ddbDocClient = DynamoDBDocumentClient.from(
      new DynamoDBClient({}),
    );
    const { Item: category } = await ddbDocClient.send(
      new GetCommand({
        TableName: process.env.CATEGORY_TABLE_NAME,
        Key: {
          categoryId: request.parameter('categoryId'),
        },
      }),
    );
    if (!category) {
      return response.error('Category does not exist.', 404);
    };
    return response.json({
      category,
    });
  } catch (error) {
    return response.error(error);
  };
}