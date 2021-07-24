import {
  DynamoDBClient,
} from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  BatchWriteCommand,
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
    const files = request.input('files');
    await ddbDocClient.send(
      new BatchWriteCommand({
        RequestItems: {
          [`${process.env.FILE_TABLE_NAME}`]: files.map((file: any) => {
            return {
              DeleteRequest: {
                Key: {
                  fileId: file.fileId,
                },
              },
            };
          }),
        },
      }),
    );
    return response.json({
      deleted: true,
    });
  } catch (error) {
    return response.error(error);
  }
}
