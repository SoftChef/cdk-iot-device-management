import {
  DynamoDBClient,
} from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  BatchGetCommand,
  BatchGetCommandInput,
  BatchWriteCommand,
  BatchWriteCommandInput,
} from '@aws-sdk/lib-dynamodb';
import {
  Request,
  Response,
} from '@softchef/lambda-events';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const validated = request.validate(joi => {
      return {
        files: joi.array().min(1).max(24).items(
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
    const fileList = requestFiles.map((requestFile: any) => {
      return {
        fileId: requestFile.fileId,
        summary: requestFile.summary,
        description: requestFile.description,
      };
    });
    const batchGetParameters: BatchGetCommandInput = {
      RequestItems: {
        [`${process.env.FILE_TABLE_NAME}`]: {
          Keys: fileList.map((file: any) => {
            return {
              fileId: file.fileId,
            };
          }),
        },
      },
    };
    const existsFiles: { [key: string]: any } = await ddbDocClient.send(
      new BatchGetCommand(batchGetParameters),
    );
    const updateFileList = existsFiles.Responses[`${process.env.FILE_TABLE_NAME}`].map((existsFile: any) => {
      return Object.assign({}, existsFile, existsFiles[existsFile.fileId], {
        updatedAt: timestamp,
      });
    });
    const batchWriteParameters: BatchWriteCommandInput = {
      RequestItems: {
        [`${process.env.FILE_TABLE_NAME}`]: updateFileList.map((updateFile: any) => {
          return {
            PutRequest: {
              Item: updateFile,
            },
          };
        }),
      },
    };
    await ddbDocClient.send(
      new BatchWriteCommand(batchWriteParameters),
    );
    return response.json({
      updated: true,
    });
  } catch (error) {
    return response.error(error);
  }
}
