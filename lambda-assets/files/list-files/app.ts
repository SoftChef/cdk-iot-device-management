const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, ScanCommand } = require("@aws-sdk/lib-dynamodb");
const { FILE_TABLE_NAME } = process.env;
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const ddbDocClient = DynamoDBDocumentClient.from(
      new DynamoDBClient()
    );
    const { Items: data, LastEvaluatedKey } = await ddbDocClient.send(
      new ScanCommand({
        TableName: `${FILE_TABLE_NAME}`,
        ExclusiveStartKey: request.get('nextToken', undefined),
      })
    )
    return response.json({
      data,
      nextToken: LastEvaluatedKey,
    });
  } catch (error) {
    return response.json(error);
  }
}
