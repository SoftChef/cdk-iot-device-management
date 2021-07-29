import {
  DynamoDBClient,
} from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  ScanCommand,
  ScanCommandInput,
  QueryCommand,
  QueryCommandInput,
} from '@aws-sdk/lib-dynamodb';
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
    if (request.has('parentId')) {
      const parameters: QueryCommandInput = {
        TableName: process.env.CATEGORY_TABLE_NAME,
        IndexName: 'query-by-parent-id',
        KeyConditionExpression: '#parentId = :parentId',
        ExpressionAttributeNames: {
          '#parentId': 'parentId',
        },
        ExpressionAttributeValues: {
          ':parentId': request.get('parentId'),
        },
      };
      if (request.has('nextToken')) {
        parameters.ExclusiveStartKey = {
          Key: JSON.parse(
            Buffer.from(request.get('nextToken'), 'base64').toString('utf8'),
          ),
        };
      }
      const { Items: categories, LastEvaluatedKey: lastEvaluatedKey } = await ddbDocClient.send(
        new QueryCommand(parameters),
      );
      let nextToken = null;
      if (lastEvaluatedKey) {
        nextToken = Buffer.from(
          JSON.stringify(lastEvaluatedKey),
        ).toString('base64');
      }
      return response.json({
        categories: categories,
        nextToken: nextToken,
      });
    } else {
      const parameters: ScanCommandInput = {
        TableName: process.env.CATEGORY_TABLE_NAME,
        ExpressionAttributeNames: {
          '#parentId': 'parentId',
        },
        FilterExpression: 'attribute_not_exists(#parentId)',
      };
      if (request.has('nextToken')) {
        parameters.ExclusiveStartKey = {
          Key: JSON.parse(
            Buffer.from(request.get('nextToken'), 'base64').toString('utf8'),
          ),
        };
      }
      const { Items: categories, LastEvaluatedKey: lastEvaluatedKey } = await ddbDocClient.send(
        new ScanCommand(parameters),
      );
      let nextToken = null;
      if (lastEvaluatedKey) {
        nextToken = Buffer.from(
          JSON.stringify(lastEvaluatedKey),
        ).toString('base64');
      }
      return response.json({
        categories: categories,
        nextToken: nextToken,
      });
    }
  } catch (error) {
    return response.error(error);
  }
}
