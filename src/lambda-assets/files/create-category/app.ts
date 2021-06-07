import { DynamoDB } from 'aws-sdk';
import { Request, Response } from '../../utils';
const { CATEGORY_TABLE_NAME } = process.env;

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const validated = request.validate(joi => {
      return {
        name: joi.string().required(),
      };
    });
    if (validated.error) {
      return response.error(validated, 422);
    }
    const timestamp = Date.now();
    const name = request.input('name');
    const parentId = request.input('parentId');
    const documentClient = new DynamoDB.DocumentClient();
    await documentClient.put({
      TableName: `${CATEGORY_TABLE_NAME}`,
      Item: {
        categoryId: `${name}${parentId}`,
        parentId,
        name,
        description: request.input('description'),
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    }).promise();
    return response.json({
      created: true,
    });
  } catch (error) {
    return response.json(error);
  }
}