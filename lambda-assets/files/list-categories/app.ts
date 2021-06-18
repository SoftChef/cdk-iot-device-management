import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { Request, Response } from '../../utils';

const { CATEGORY_TABLE_NAME } = process.env;

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const ddbDocClient = DynamoDBDocumentClient.from(
      new DynamoDBClient({})
    );
    const parentId = request.get('parentId', undefined);
    const nextToken = request.get('nextToken', undefined);
    let parameters: { [key: string]: any } = {};
    if (nextToken) {
      parameters.ExclusiveStartKey = {
        Key: nextToken,
      }
    };
    if (request.has('parentId')) {
      parameters.IndexName = 'query-by-parent-id';
      parameters.KeyConditionExpression = '#parentId = :parentId';
      parameters.ExpressionAttributeNames = {
        '#parentId': 'parentId',
      };
      parameters.ExpressionAttributeValues = {
        ':parentId': parentId,
      };
      const { Items: categories, LastEvaluatedKey } = await ddbDocClient.send(
        new QueryCommand({
          TableName: `${CATEGORY_TABLE_NAME}`,
          ...parameters,
        })
      );
      return response.json({
        data: categories,
        nextToken: LastEvaluatedKey,
      });
    } else {
      parameters.ExpressionAttributeNames = {
        '#parentId': 'parentId',
      };
      parameters.FilterExpression = 'attribute_not_exists(#parentId)';
      const { Items: categories, LastEvaluatedKey } = await ddbDocClient.send(
          new ScanCommand({
          TableName: `${CATEGORY_TABLE_NAME}`,
          ...parameters,
        })
      );
      return response.json({
        data: categories,
        nextToken: LastEvaluatedKey,
      });
    };
  } catch (error) {
    return response.error(error);
  }
}
