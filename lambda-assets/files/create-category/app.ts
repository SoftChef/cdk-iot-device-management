const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");
import { Request, Response } from '../../utils';
const { CATEGORY_TABLE_NAME } = process.env;

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const validated = request.validate(joi => {
      return {
        parentId: joi.string().required(),
      };
    });
    if (validated.error) {
      return response.error(validated, 422);
    }
    const timestamp = Date.now();
    const name = request.input('name', null);
    const parentId = request.input('parentId');
    const ddbDocClient = DynamoDBDocumentClient.from(
      new DynamoDBClient()
    );
    let parameters
    if (name) {
      parameters = {
        TableName: `${CATEGORY_TABLE_NAME}`,
        Item: {
          categoryId: `${parentId}-${name}`,
          parentId,
          name,
          description: request.input('description'),
          createdAt: timestamp,
          updatedAt: timestamp,
        },
      };
    } else {
      parameters = {
        TableName: `${CATEGORY_TABLE_NAME}`,
        Item: {
          categoryId: parentId,
          parentId,
          description: request.input('description'),
          createdAt: timestamp,
          updatedAt: timestamp,
        },
      };
    }
    await ddbDocClient.send(new PutCommand(parameters));
    return response.json({
      created: true,
    });
  } catch (error) {
    return response.error(error);
  }
}