import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, QueryCommand, BatchWriteCommand } from '@aws-sdk/lib-dynamodb';
import { Request, Response } from '@softchef/lambda-events';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const validated = request.validate(joi => {
      return {
        files: joi.array().items(joi.object().keys({
          fileId: joi.string().required(),
          location: joi.string().uri().required(),
          checksumType: joi.string().allow('md5', 'crc32', 'sha1'),
          checksum: joi.string().when('checksumType', { is: 'md5', then: joi.string().length(32).required() })
            .concat(joi.string().when('checksumType', { is: 'crc32', then: joi.string().length(8).required() }))
            .concat(joi.string().when('checksumType', { is: 'sha1', then: joi.string().length(40).required() })),
          version: joi.string().required(),
          locale: joi.string().required(),
          categoryId: joi.string().required(),
          describe: joi.string(),
        })),
      };
    });
    if (validated.error) {
      return response.error(validated.details, 422);
    }
    const files = request.input('files');
    const categoryId = files[0].categoryId;
    const ddbDocClient = DynamoDBDocumentClient.from(
      new DynamoDBClient({}),
    );
    const { Item: category } = await ddbDocClient.send(
      new GetCommand({
        TableName: process.env.CATEGORY_TABLE_NAME,
        Key: {
          categoryId,
        },
      }),
    );
    if (!category) {
      return response.error('Category does not exist.', 422);
    };
    const checksum = files[0].checksum;
    const version = files[0].version;
    const filesCheck = await ddbDocClient.send(
      new QueryCommand({
        TableName: process.env.FILE_TABLE_NAME,
        KeyConditionExpression: 'checksum = :checksum and version = :version',
        ExpressionAttributeValues: {
          ':checksum': checksum,
          ':version': version,
        },
      }),
    );
    if (filesCheck) {
      return response.error('File already exists.', 422);
    }
    console.log(filesCheck);
    const currentTime = Date.now();
    const file = files.map((data: Object): object => {
      return {
        PutRequest: {
          Items: {
            ...data,
            createAt: currentTime,
            updateAt: currentTime,
          },
        },
      };
    });
    await ddbDocClient.send(
      new BatchWriteCommand({
        RequestItems: {
          fileTable: file,
        },
      }),
    );
    return response.json({
      created: true,
    });
  } catch (error) {
    return response.error(error);
  }
}
