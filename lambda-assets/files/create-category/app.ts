const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");
import { Request, Response } from '../../utils';
const md5 = require('md5')
const { CATEGORY_TABLE_NAME } = process.env;

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const validated = request.validate(joi => {
      return {
        name: joi.string().required(),
        parentId: joi.string().allow(null),
        description: joi.string(),
      };
    });
    if (validated.error) {
      return response.error(validated.details, 422);
    }
    const timestamp = Date.now();
    const name = request.input('name', null);
    const parentId = request.input('parentId');
    const ddbDocClient = DynamoDBDocumentClient.from(
      new DynamoDBClient()
    );
    let parameters: { [key: string]: any } = {
      TableName: `${CATEGORY_TABLE_NAME}`,
      Item: {
        categoryId: md5(name),
        name,
        description: request.input('description'),
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    };
    if (parentId) {
      parameters.Item.categoryId = md5(`${parentId}-${name}`);
      parameters.Item.parentId = parentId;
    }
    await ddbDocClient.send(new PutCommand(parameters));
    return response.json({
      created: true,
    });
  } catch (error) {
    return response.error(error);
  }
}