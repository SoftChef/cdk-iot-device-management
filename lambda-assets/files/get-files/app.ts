import {
  DynamoDBClient,
} from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
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
    const parameters: QueryCommandInput = {
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
    };
    if (request.has('nextToken')) {
      parameters.ExclusiveStartKey = {
        Key: JSON.parse(
          Buffer.from(request.get('nextToken'), 'base64').toString('utf8'),
        ),
      };
    }
    const { Items: existsFiles, LastEvaluatedKey: lastEvaluatedKey } = await ddbDocClient.send(
      new QueryCommand(parameters),
    );
    let nextToken = null;
    if (lastEvaluatedKey) {
      nextToken = Buffer.from(
        JSON.stringify(lastEvaluatedKey),
      ).toString('base64');
    }
    if (!existsFiles || existsFiles.length === 0) {
      return response.error('File not found.', 404);
    }
    return response.json({
      file: existsFiles,
      nextToken,
    });
  } catch (error) {
    return response.error(error);
  }
}
