const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand, QueryCommand } = require('@aws-sdk/lib-dynamodb');
import { Request, Response } from '../../utils';
const { CATEGORY_TABLE_NAME } = process.env;

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const ddbDocClient = DynamoDBDocumentClient.from(
      new DynamoDBClient()
    );
    const parentId = request.get('parentId', undefined);
    const nextToken = request.get('nextToken', undefined);
    if (parentId) {
      let parameters: { [key: string]: any } = {
        TableName: `${CATEGORY_TABLE_NAME}`,
        IndexName: 'query-by-parent-id',
        KeyConditionExpression: '#parentId = :parentId',
        ExpressionAttributeNames: {
          '#parentId': 'parentId',
        },
        ExpressionAttributeValues: {
          ':parentId': parentId,
        },
      }
      if (nextToken) {
        parameters.ExclusiveStartKey = {
          Key: nextToken,
        }
      }
      const { Items: categories, LastEvaluatedKey } = await ddbDocClient.send(
        new QueryCommand(parameters)
      )
      return response.json({
        data: categories,
        nextToken: LastEvaluatedKey,
      });
    } else {
      let parameters: { [key: string]: any } = {
        TableName: `${CATEGORY_TABLE_NAME}`,
        ExpressionAttributeNames: {
          '#parentId': 'parentId',
        },
        FilterExpression: 'attribute_not_exists(#parentId)',
      }
      if (nextToken) {
        parameters.ExclusiveStartKey = {
          Key: nextToken,
        }
      }
      const { Items: categories, LastEvaluatedKey } = await ddbDocClient.send(
        new ScanCommand(parameters)
      )
      return response.json({
        data: categories,
        nextToken: LastEvaluatedKey,
      });
    }
  } catch (error) {
    return response.error(error);
  }
}