import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { Request, Response } from '@softchef/lambda-events';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const ddbDocClient = DynamoDBDocumentClient.from(
      new DynamoDBClient({}),
    );
    const parentId = request.get('parentId', undefined);
    let parameters: { [key: string]: any } = {};
    if (request.has('nextToken')) {
      parameters.ExclusiveStartKey = {
        Key: JSON.parse(
          Buffer.from(request.get('nextToken'), 'base64').toString('utf8'),
        ),
      };
    }
    if (request.has('parentId')) {
      parameters.IndexName = 'query-by-parent-id';
      parameters.KeyConditionExpression = '#parentId = :parentId';
      parameters.ExpressionAttributeNames = {
        '#parentId': 'parentId',
      };
      parameters.ExpressionAttributeValues = {
        ':parentId': parentId,
      };
      const { Items: categories, LastEvaluatedKey: lastEvaluatedKey } = await ddbDocClient.send(
        new QueryCommand({
          TableName: process.env.CATEGORY_TABLE_NAME,
          ...parameters,
        }),
      );
      let nextToken = null;
      if (lastEvaluatedKey) {
        nextToken = Buffer.from(
          JSON.stringify(lastEvaluatedKey),
        ).toString('base64');
      };
      return response.json({
        categories,
        nextToken,
      });
    } else {
      parameters.ExpressionAttributeNames = {
        '#parentId': 'parentId',
      };
      parameters.FilterExpression = 'attribute_not_exists(#parentId)';
      const { Items: categories, LastEvaluatedKey: lastEvaluatedKey } = await ddbDocClient.send(
        new ScanCommand({
          TableName: process.env.CATEGORY_TABLE_NAME,
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
        categories,
        nextToken,
      });
    }
  } catch (error) {
    return response.error(error);
  }
}
