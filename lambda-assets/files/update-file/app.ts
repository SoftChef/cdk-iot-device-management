import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand, UpdateCommand, BatchWriteCommand } from '@aws-sdk/lib-dynamodb';
import { Request, Response } from '@softchef/lambda-events';
import * as lodash from 'lodash';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const validated = request.validate(joi => {
      return {
        files: joi.array().min(1).items(
          joi.object().keys({
            fileId: joi.string().required(),
            locale: joi.string().required(),
            checksumType: joi.string().allow('md5', 'crc32', 'sha1'),
            checksum: joi.string().when('checksumType', { is: 'md5', then: joi.string().length(32).required() })
              .concat(joi.string().when('checksumType', { is: 'crc32', then: joi.string().length(8).required() }))
              .concat(joi.string().when('checksumType', { is: 'sha1', then: joi.string().length(40).required() })),
            summary: joi.string().allow(null, ''),
            description: joi.string().allow(null, ''),
          }),
        ),
      };
    });
    if (validated.error) {
      return response.error(validated.details, 422);
    };
    const ddbDocClient = DynamoDBDocumentClient.from(
      new DynamoDBClient({}),
    );
    const files = request.input('files');
    const firstFile = lodash.first(files);
    files.map(currentFile => {
      if (currentFile.checksum !== firstFile.checksum) {
        return response.error('File\'s checksum is not same.', 400);
      };
    });
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
          ':checksum': firstFile.checksum,
          ':version': request.parameter('version'),
        },
      }),
    );
    if (!existsFiles || existsFiles.length === 0) {
      return response.error('File not found.', 404);
    };
    await ddbDocClient.send(
      new BatchWriteCommand({
        RequestItems: {
          [`${process.env.FILE_TABLE_NAME}`]: existsFiles.map(existsFile => {
            const currentLocaleFile = files.find(v => v.locale === existsFile.locale);
            return {
              PutRequest: {
                Item: Object.assign({}, existsFile, currentLocaleFile),
              },
            };
          });
        },
      }),
    );
    return response.json({
      updated: true,
    });
  } catch (error) {
    if (error.Code === 'ResourceNotFoundException') {
      return response.error(error, 404);
    } else {
      return response.error(error);
    };
  };
}
