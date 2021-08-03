import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand } from '@aws-sdk/lib-dynamodb';
import {
  Request,
  Response,
} from '@softchef/lambda-events';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const ddbDocClient = DynamoDBDocumentClient.from(
      new DynamoDBClient({}),
    );
    let parameters: { [key: string]: any } = {};
    if (request.has('nextToken')) {
      parameters.ExclusiveStartKey = {
        Key: JSON.parse(
          Buffer.from(request.get('nextToken'), 'base64').toString('utf8'),
        ),
      };
    }
    const { Items: files, LastEvaluatedKey: lastEvaluatedKey } = await ddbDocClient.send(
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
        ...parameters,
      }),
    );
    let nextToken = null;
    if (lastEvaluatedKey) {
      nextToken = Buffer.from(
        JSON.stringify(lastEvaluatedKey),
      ).toString('base64');
    }
    return response.json({
      files: files,
      nextToken: nextToken,
    });
  } catch (error) {
    return response.error(error);
  }
}
