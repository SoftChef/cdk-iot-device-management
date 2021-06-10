import { DynamoDB } from 'aws-sdk';
import { Request, Response } from '../../utils';
const { CATEGORY_TABLE_NAME } = process.env;

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const documentClient = new DynamoDB.DocumentClient();
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
      const categories = await documentClient.query(nextToken ? hasNextTokenParameters : parameters).promise();
      return response.json({
        data: categories.Items,
        nextToken: categories.LastEvaluatedKey,
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
      const { Items: categories, LastEvaluatedKey } = await documentClient.scan(nextToken ? hasNextTokenParameters : parameters).promise();
      return response.json({
        data: categories,
        nextToken: LastEvaluatedKey,
      });
    }
  } catch (error) {
    return response.error(error);
  }
}