import {
  DynamoDBClient,
} from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  DeleteCommand,
  DeleteCommandInput,
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
    const deleteParameters: DeleteCommandInput = {
      TableName: process.env.CATEGORY_TABLE_NAME,
      Key: {
        categoryId: request.parameter('categoryId'),
      },
    };
    await ddbDocClient.send(
      new DeleteCommand(deleteParameters),
    );
    return response.json({
      deleted: true,
    });
  } catch (error) {
    return response.error(error);
  }
}
