import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { Request, Response } from '../../utils';

const { CATEGORY_TABLE_NAME } = process.env;

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const validated = request.validate(joi => {
      return {
        description: joi.string(),
      };
    });
    if (validated.error) {
      return response.error(validated.details, 422);
    };
    const ddbDocClient = DynamoDBDocumentClient.from(
      new DynamoDBClient({})
    );
    await ddbDocClient.send(
      new UpdateCommand({
        TableName: `${CATEGORY_TABLE_NAME}`,
        Key: {
          categoryId: request.parameter('categoryId'),
        },
        UpdateExpression: "set #description = :description",
        ExpressionAttributeNames: {
          '#description': 'description'
        },
        ExpressionAttributeValues: {
          ":description": request.input('description', ''),
        },
      })
    );
    return response.json({
      updated: true,
    });
  } catch (error) {
    return response.error(error);
  }
}
