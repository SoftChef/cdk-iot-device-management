import { DynamoDB } from 'aws-sdk';
const db = new DynamoDB.DocumentClient();
const { FILE_TABLE_NAME } = process.env;

import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();

  try {
    await db.delete ({
      TableName: `${FILE_TABLE_NAME}`,
      Key: {
        fileId: request.parameter("fileId")
      },
    }).promise()
    
    return response.json({
      deleted: true,
    });
  } catch (error) {
    return response.json(error);
  }
}