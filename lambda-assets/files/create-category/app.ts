import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { Request, Response } from '../../utils';
import *  as crypto from 'crypto';

const { CATEGORY_TABLE_NAME } = process.env;

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const validated = request.validate(joi => {
      return {
        name: joi.string().required(),
        parentId: joi.string().allow(null),
        description: joi.string().allow(null),
      };
    });
    if (validated.error) {
      return response.error(validated.details, 422);
    };
    const currentTime = Date.now();
    const name = request.input('name', null);
    const parentId = request.input('parentId');
    const ddbDocClient = DynamoDBDocumentClient.from(
      new DynamoDBClient({})
    );
    const md5 = crypto.createHash('md5');
    let parameters: { [key: string]: any } = {};
    if (request.has('parentId')) {
      parameters.Item.categoryId = md5.update(`${parentId}-${name}`).digest('hex');
      parameters.Item.parentId = parentId;
    };
    await ddbDocClient.send(
        new PutCommand({
          TableName: `${CATEGORY_TABLE_NAME}`,
          Item: {
            categoryId: md5.update(name).digest('hex'),
            name,
            description: request.input('description'),
            createdAt: currentTime,
            updatedAt: currentTime,
          },
          ...parameters
      })
    );
    return response.json({
      created: true,
    });
  } catch (error) {
    return response.error(error);
  }
}
