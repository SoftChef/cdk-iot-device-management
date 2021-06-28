import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { Request, Response } from '@softchef/lambda-events';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const ddbDocClient = DynamoDBDocumentClient.from(
      new DynamoDBClient({})
    );
    const { Items: files, LastEvaluatedKey } = await ddbDocClient.send(
      new QueryCommand({
        TableName: process.env.FILE_TABLE_NAME,
        IndexName: 'query-by-category-id',
        KeyConditionExpression: '#categoryId = :categoryId',
        ExpressionAttributeNames: {
          '#categoryId': 'categoryId',
        },
        ExpressionAttributeValues: {
          ':categoryId': request.parameter('categoryId'),
        },
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
