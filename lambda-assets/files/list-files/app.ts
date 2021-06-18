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
    const { Items: files, LastEvaluatedKey } = await ddbDocClient.send(
      new ScanCommand({
        TableName: `${FILE_TABLE_NAME}`,
        ExclusiveStartKey: request.get('nextToken', undefined),
      })
    );
    return response.json({
      files,
      nextToken: LastEvaluatedKey,
    });
  } catch (error) {
    return response.error(error);
  }
}
