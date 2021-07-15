import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, QueryCommand, BatchWriteCommand } from '@aws-sdk/lib-dynamodb';
import { Request, Response } from '@softchef/lambda-events';
import * as uuid from 'uuid';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const validated = request.validate(joi => {
      return {
        files: joi.array().items(
          joi.object().keys({
            location: joi.string().uri().required(),
            checksumType: joi.string().allow('md5', 'crc32', 'sha1'),
            checksum: joi.string().when('checksumType', { is: 'md5', then: joi.string().length(32).required() })
              .concat(joi.string().when('checksumType', { is: 'crc32', then: joi.string().length(8).required() }))
              .concat(joi.string().when('checksumType', { is: 'sha1', then: joi.string().length(40).required() })),
            version: joi.string().required(),
            locale: joi.string().required(),
            categoryId: joi.string().required(),
            description: joi.string().allow(null, ''),
            summary: joi.string().allow(null, ''),
          }),
        ),
      };
    });
    if (validated.error) {
      return response.error(validated.details, 422);
    }
    const files = request.input('files');
    const firstFile: { [key: string]: any } = files[0];
    const ddbDocClient = DynamoDBDocumentClient.from(
      new DynamoDBClient({}),
    );
    const { Item: category } = await ddbDocClient.send(
      new GetCommand({
        TableName: process.env.CATEGORY_TABLE_NAME,
        Key: {
          categoryId: firstFile.categoryId,
        },
      }),
    );
    if (!category) {
      return response.error('Category does not exist.', 422);
    };
    const { Items: existsFiles } = await ddbDocClient.send(
      new QueryCommand({
        TableName: process.env.FILE_TABLE_NAME,
        //IndexName: 'get-file-by-checksum-and-version',
        KeyConditionExpression: '#checksum = :checksum',
        FilterExpression: '#version = :version',
        ExpressionAttributeNames: {
          '#checksum': 'checksum',
          '#version': 'version',
        },
        ExpressionAttributeValues: {
          ':checksum': firstFile.checksum,
          ':version': firstFile.version,
        },
      }),
    );
    if (!existsFiles || existsFiles.length !== 0) {
      return response.error('File already exists.', 422);
    };
    const currentTime = Date.now();
    await ddbDocClient.send(
      new BatchWriteCommand({
        RequestItems: {
          [`${process.env.FILE_TABLE_NAME}`]: files.map((file: any) => {
            return {
              PutRequest: {
                Item: {
                  fileId: uuid.v4(),
                  version: file.version,
                  categoryId: file.categoryId,
                  checksum: file.checksum,
                  summary: file.summary,
                  checksumType: file.checksumType,
                  location: file.location,
                  locale: file.locale,
                  description: file.description,
                  createdAt: currentTime,
                  updatedAt: currentTime,
                },
              },
            };
          }),
        },
      }),
    );
    return response.json({
      created: true,
    });
  } catch (error) {
    return response.error(error);
  };
}
