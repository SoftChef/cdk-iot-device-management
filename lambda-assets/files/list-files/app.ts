import { DynamoDB } from 'aws-sdk';
const db = new DynamoDB.DocumentClient();
const { FILE_TABLE_NAME } = process.env;

import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();

  try {
    const data = await db.scan({
      TableName: `${FILE_TABLE_NAME}`
    }).promise()

    return response.json({
      Item: data,
      nextToken: request.get('nextToken', undefined),
    });
  } catch (error) {
    return response.json(error);
  }
}