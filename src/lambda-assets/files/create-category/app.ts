import { DynamoDB } from 'aws-sdk';
import { Request, Response } from '../../utils';
const { CATEGORY_TABLE_NAME } = process.env;

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const validated = request.validate(joi => {
      return {
        parentId: joi.string().required(),
      };
    });
    if (validated.error) {
      return response.error(validated, 422);
    }
    const timestamp = Date.now();
    const name = request.input('name', null);
    const parentId = request.input('parentId');
    const documentClient = new DynamoDB.DocumentClient();
    const parameters = {
      TableName: `${CATEGORY_TABLE_NAME}`,
      Item: {
        categoryId: name ? `${parentId}-${name}` : parentId,
        parentId,
        name,
        description: request.input('description'),
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    };
    await documentClient.put(parameters).promise();
    return response.json({
      created: true,
    });
  } catch (error) {
    return response.error(error);
  }
}