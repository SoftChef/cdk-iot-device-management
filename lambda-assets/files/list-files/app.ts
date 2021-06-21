import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { Request, Response } from '../../utils';

const { FILE_TABLE_NAME } = process.env;

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const ddbDocClient = DynamoDBDocumentClient.from(
      new DynamoDBClient({})
    );
    let parameters: { [key: string]: any } = {};
    if (request.has('nextToken')) {
      parameters.ExclusiveStartKey = {
        Key: request.get('nextToken'),
      }
    };
    const { Items: files, LastEvaluatedKey: nextToken } = await ddbDocClient.send(
      new ScanCommand({
        TableName: `${FILE_TABLE_NAME}`,
        ...parameters,
      })
    );
    return response.json({
      files,
      nextToken,
    });
  } catch (error) {
    return response.error(error);
  }
}
