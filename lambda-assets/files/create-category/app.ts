import * as crypto from 'crypto';
import {
  DynamoDBClient,
} from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandInput,
  PutCommand,
  PutCommandInput,
} from '@aws-sdk/lib-dynamodb';
import {
  Request,
  Response,
} from '@softchef/lambda-events';

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
    const putParameters: PutCommandInput = {
      TableName: process.env.CATEGORY_TABLE_NAME,
      Item: {
        name,
        createdAt: currentTime,
        updatedAt: currentTime,
      },
    };
    if (!putParameters.Item) {
      return response.error('Parameters error.', 422);
    }
    if (request.has('parentId')) {
      const parentId = request.input('parentId');
      putParameters.Item.categoryId = md5.update(`${parentId}-${name}`).digest('hex');
      putParameters.Item.parentId = parentId;
    } else {
      putParameters.Item.categoryId = md5.update(name).digest('hex');
    }
    if (request.has('description')) {
      putParameters.Item.description = request.input('description');
    }
    const getParameters: GetCommandInput = {
      TableName: process.env.CATEGORY_TABLE_NAME,
      Key: {
        categoryId: putParameters.Item.categoryId,
      },
    };
    const { Item: category } = await ddbDocClient.send(
      new GetCommand(getParameters),
    );
    if (category) {
      return response.error('Category already exists.', 422);
    }
    await ddbDocClient.send(
      new PutCommand(putParameters),
    );
    return response.json({
      created: true,
    });
  } catch (error) {
    return response.error(error);
  }
}
