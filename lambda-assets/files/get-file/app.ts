import { DynamoDB } from 'aws-sdk';
const db = new DynamoDB.DocumentClient();
const { FILE_TABLE_NAME } = process.env;

import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();

  try {
    const data = await db.get({
      TableName: `${FILE_TABLE_NAME}`,
      Key: {
        fileId: request.parameter('fileId')
      },
    }).promise()
  
    return response.json({
      Item: data,
    });
  } catch (error) {
    return response.json(error);
  }
}