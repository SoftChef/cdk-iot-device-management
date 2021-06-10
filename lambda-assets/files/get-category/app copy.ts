const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand } = require("@aws-sdk/lib-dynamodb");
import { Request, Response } from '../../utils';
const { CATEGORY_TABLE_NAME } = process.env;

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const client = new DynamoDBClient();
    // const documentClient = new DynamoDB.DocumentClient();
    const ddbDocClient = new DynamoDBDocumentClient.from(client);
    // const command = new GetCommand()
    const results = await ddbDocClient.send(new GetCommand({
      TableName: `${CATEGORY_TABLE_NAME}`,
      Key: {
        categoryId: request.parameter('categoryId'),
      },
    }));
    // const { Item: data } = await documentClient.get({
    //   TableName: `${CATEGORY_TABLE_NAME}`,
    //   Key: {
    //     categoryId: request.parameter('categoryId'),
    //   },
    // }).promise();
    return response.json({
      data: results,
    });
  } catch (error) {
    return response.error(error);
  }
}