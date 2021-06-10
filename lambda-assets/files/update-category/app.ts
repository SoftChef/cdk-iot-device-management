const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, UpdateCommand } = require("@aws-sdk/lib-dynamodb");
import { Request, Response } from '../../utils';
const { CATEGORY_TABLE_NAME } = process.env;

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const ddbDocClient = DynamoDBDocumentClient.from(
      new DynamoDBClient()
    );
    await ddbDocClient.send(
      new UpdateCommand({
        TableName: `${CATEGORY_TABLE_NAME}`,
        Key: {
          categoryId: request.parameter('categoryId'),
        },
        AttributeUpdates: {
          description: {
            Action: 'PUT',
            Value: request.input('description'),
          },
        },
      })
    )
    return response.json({
      updated: true,
    });
  } catch (error) {
    return response.error(error);
  }
}