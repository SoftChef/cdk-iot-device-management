import { DynamoDB } from 'aws-sdk';
import { Request, Response } from '../../utils';
const { CATEGORY_TABLE_NAME } = process.env;

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const documentClient = new DynamoDB.DocumentClient();
    await documentClient.update({
      TableName: `${CATEGORY_TABLE_NAME}`,
      Key: {
        categoryId: request.parameter('categoryId'),
      },
      AttributeUpdates: {
        description: {
          Action: 'PUT',
          Value: request.input('description'),
        },
      },
    }).promise();
    return response.json({
      updated: true,
    });
  } catch (error) {
    return response.error(error);
  }
}