// import { DynamoDB } from 'aws-sdk';
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    return response.json({
      updated: true,
      category: request.parameter('categoryId'),
    });
  } catch (error) {
    return response.error(error);
  }
}