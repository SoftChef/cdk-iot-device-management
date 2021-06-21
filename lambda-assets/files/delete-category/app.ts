import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { Request, Response } from '../../utils';

const { CATEGORY_TABLE_NAME } = process.env;

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const ddbDocClient = DynamoDBDocumentClient.from(
      new DynamoDBClient({})
    );
    await ddbDocClient.send(
      new DeleteCommand({
        TableName: `${CATEGORY_TABLE_NAME}`,
        Key: {
          categoryId: request.parameter('categoryId'),
        },
      })
    );
    return response.json({
      deleted: true,
    });
  } catch (error) {
    return response.error(error);
  }
}
