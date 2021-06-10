const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, ScanCommand, QueryCommand } = require("@aws-sdk/lib-dynamodb");
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
    if (parentId) {
      const hasNextTokenParameters = {
        TableName: `${CATEGORY_TABLE_NAME}`,
        IndexName: 'query-by-parent-id',
        KeyConditionExpression: '#parentId = :parentId',
        ExpressionAttributeNames: {
          '#name': 'name',
          '#parentId': 'parentId',
        },
        ExpressionAttributeValues: {
          ':parentId': parentId,
        },
        FilterExpression: 'attribute_exists(#name)',
        ExclusiveStartKey: {
          Key: request.get('nextToken', undefined),
        },
      };
      const parameters = {
        TableName: `${CATEGORY_TABLE_NAME}`,
        IndexName: 'query-by-parent-id',
        KeyConditionExpression: '#parentId = :parentId',
        ExpressionAttributeNames: {
          '#name': 'name',
          '#parentId': 'parentId',
        },
        ExpressionAttributeValues: {
          ':parentId': parentId,
        },
        FilterExpression: 'attribute_exists(#name)',
      };
      const nextToken = request.get('nextToken', undefined);
      const { Items: categories, LastEvaluatedKey } = await ddbDocClient.send(
        new QueryCommand(nextToken ? hasNextTokenParameters : parameters)
      )
      return response.json({
        data: categories,
        nextToken: LastEvaluatedKey,
      });
    } else {
      const hasNextTokenParameters = {
        TableName: `${CATEGORY_TABLE_NAME}`,
        ExpressionAttributeNames: {
          '#name': 'name',
        },
        FilterExpression: 'attribute_not_exists(#name)',
        ExclusiveStartKey: {
          Key: request.get('nextToken', undefined),
        },
      };
      const parameters = {
        TableName: `${CATEGORY_TABLE_NAME}`,
        ExpressionAttributeNames: {
          '#name': 'name',
        },
        FilterExpression: 'attribute_not_exists(#name)',
      };
      const nextToken = request.get('nextToken', undefined);
      const { Items: categories, LastEvaluatedKey } = await ddbDocClient.send(
        new ScanCommand(nextToken ? hasNextTokenParameters : parameters)
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