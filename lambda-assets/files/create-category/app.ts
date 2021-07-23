import * as crypto from 'crypto';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import { Request, Response } from '@softchef/lambda-events';

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
    }
    const currentTime = Date.now();
    const name = request.input('name');
    const ddbDocClient = DynamoDBDocumentClient.from(
      new DynamoDBClient({}),
    );
    const md5 = crypto.createHash('md5');
    let itemParameters: { [key: string]: any } = {};
    if (request.has('parentId')) {
      const parentId = request.input('parentId');
      itemParameters.categoryId = md5.update(`${parentId}-${name}`).digest('hex');
      itemParameters.parentId = parentId;
    } else {
      itemParameters.categoryId = md5.update(name).digest('hex');
    }
    if (request.has('description')) {
      itemParameters.description = request.input('description');
    }
    const { Item: category } = await ddbDocClient.send(
      new GetCommand({
        TableName: process.env.CATEGORY_TABLE_NAME,
        Key: {
          categoryId: itemParameters.categoryId,
        },
      }),
    );
    if (category) {
      return response.error('Category already exists.', 422);
    }
    await ddbDocClient.send(
      new PutCommand({
        TableName: process.env.CATEGORY_TABLE_NAME,
        Item: {
          ...itemParameters,
          name,
          createdAt: currentTime,
          updatedAt: currentTime,
        },
      }),
    );
    return response.json({
      created: true,
    });
  } catch (error) {
    return response.error(error);
  }
}
