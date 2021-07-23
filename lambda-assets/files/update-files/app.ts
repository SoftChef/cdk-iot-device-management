import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { Request, Response } from '@softchef/lambda-events';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const validated = request.validate(joi => {
      return {
        files: joi.array().min(1).items(
          joi.object().keys({
            fileId: joi.string().required(),
            description: joi.string().allow('').required(),
            summary: joi.string().allow('').required(),
          }),
        ),
      };
    });
    if (validated.error) {
      return response.error(validated.details, 422);
    }
    const ddbDocClient = DynamoDBDocumentClient.from(
      new DynamoDBClient({}),
    );
    const timestamp = Date.now();
    const requestFiles = request.input('files');
    const updateFileList = requestFiles.map((file: any) => {
      return {
        fileId: file.fileId,
        summary: file.summary,
        description: file.description,
      };
    });
    for (let index = 0; index < updateFileList.length; index += 1) {
      const existsFile = await ddbDocClient.send(
        new GetCommand({
          TableName: process.env.FILE_TABLE_NAME,
          Key: {
            fileId: updateFileList[index].fileId,
          },
        }),
      );
      if (existsFile.Item) {
        await ddbDocClient.send(
          new UpdateCommand({
            TableName: process.env.FILE_TABLE_NAME,
            Key: {
              fileId: existsFile.Item.fileId,
            },
            UpdateExpression: 'set #summary = :summary and #description = :description and #updatedAt = :updatedAt',
            ExpressionAttributeNames: {
              '#summary': 'summary',
              '#updatedAt': 'updatedAt',
              '#description': 'description',
            },
            ExpressionAttributeValues: {
              ':summary': updateFileList[index].summary,
              ':description': updateFileList[index].description,
              ':updatedAt': timestamp,
            },
          }),
        );
      } else {
        return response.error('File not found.', 404);
      }
    }
    return response.json({
      updated: true,
    });
  } catch (error) {
    if (error.Code === 'ResourceNotFoundException') {
      return response.error(error, 404);
    } else {
      return response.error(error);
    }
  }
}
