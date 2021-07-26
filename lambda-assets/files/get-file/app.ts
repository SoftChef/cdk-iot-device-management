import {
  DynamoDBClient,
} from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandInput,
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
    const getParameters: GetCommandInput = {
      TableName: process.env.FILE_TABLE_NAME,
      Key: {
        fileId: request.parameter('fileId'),
        version: request.parameter('version'),
      },
    };
    const file = await ddbDocClient.send(
      new GetCommand(getParameters),
    );
    if (!file || !file.Item) {
      return response.error('Not found.', 404);
    };
    return response.json({
      file: file,
    });
  } catch (error) {
    return response.error(error);
  }
}
