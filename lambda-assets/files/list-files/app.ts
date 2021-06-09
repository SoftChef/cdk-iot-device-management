// import { DynamoDB } from 'aws-sdk';
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    return response.json({
      categoryId: request.parameter('categoryId'),
      files: [],
      nextToken: request.get('nextToken', undefined),
    });
  } catch (error) {
    return response.json(error);
  }
}