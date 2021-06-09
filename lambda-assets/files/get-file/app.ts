// import { DynamoDB } from 'aws-sdk';
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    return response.json({
      file: request.parameter('fileId'),
    });
  } catch (error) {
    return response.json(error);
  }
}