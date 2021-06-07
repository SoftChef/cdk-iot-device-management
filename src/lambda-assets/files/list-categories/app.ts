import { DynamoDB } from 'aws-sdk';
import { Request, Response } from '../../utils';
const { CATEGORY_TABLE_NAME } = process.env;

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const documentClient = new DynamoDB.DocumentClient();
    const categories = await documentClient.scan({
      TableName: `${CATEGORY_TABLE_NAME}`,
      ExclusiveStartKey: {
        Key: request.get('nextToken', undefined),
      },
    }).promise();
    return response.json({
      data: categories.Items,
      nextToken: categories.LastEvaluatedKey,
    });
  } catch (error) {
    return response.json(error);
  }
}