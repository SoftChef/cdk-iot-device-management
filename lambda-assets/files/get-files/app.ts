import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { Request, Response } from '@softchef/lambda-events';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const ddbDocClient = DynamoDBDocumentClient.from(
      new DynamoDBClient({}),
    );
    const { Items: existsFiles } = await ddbDocClient.send(
      new QueryCommand({
        TableName: process.env.FILE_TABLE_NAME,
        IndexName: 'get-file-by-checksum-and-version',
        KeyConditionExpression: '#checksum = :checksum and #version = :version',
        ExpressionAttributeNames: {
          '#checksum': 'checksum',
          '#version': 'version',
        },
        ExpressionAttributeValues: {
          ':checksum': request.parameter('checksum'),
          ':version': request.parameter('version'),
        },
      }),
    );
    if (!existsFiles || existsFiles.length === 0) {
      return response.error('File not found.', 404);
    };
    return response.json({
      file: existsFiles,
    });
  } catch (error) {
    return response.error(error);
  }
}
