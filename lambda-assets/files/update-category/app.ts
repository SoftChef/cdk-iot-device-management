import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { Request, Response } from '@softchef/lambda-events';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const validated = request.validate(joi => {
      return {
        description: joi.string().allow(''),
      };
    });
    if (validated.error) {
      return response.error(validated.details, 422);
    }
    const ddbDocClient = DynamoDBDocumentClient.from(
      new DynamoDBClient({}),
    );
    const categoryId = request.parameter('categoryId');
    const category = await ddbDocClient.send(
      new GetCommand({
        TableName: process.env.CATEGORY_TABLE_NAME,
        Key: {
          categoryId,
        },
      }),
    );
    if (!category.Item) {
      return response.error('Category does not exist.', 404);
    };
    await ddbDocClient.send(
      new UpdateCommand({
        TableName: process.env.CATEGORY_TABLE_NAME,
        Key: {
          categoryId,
        },
        UpdateExpression: 'set #description = :description',
        ExpressionAttributeNames: {
          '#description': 'description',
        },
        ExpressionAttributeValues: {
          ':description': request.input('description'),
        },
      }),
    );
    return response.json({
      updated: true,
    });
  } catch (error) {
    return response.error(error);
  }
}
