import { DynamoDB } from 'aws-sdk';
const db = new DynamoDB.DocumentClient();
const { FILE_TABLE_NAME } = process.env;

import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    db.update({
      TableName: `${FILE_TABLE_NAME}`,
      Key: {
        fileId: request.parameter('fileId'),
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
    return response.json(error);
  }
}