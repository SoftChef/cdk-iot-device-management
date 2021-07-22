import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand, BatchWriteCommand } from '@aws-sdk/lib-dynamodb';
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
            categoryId: joi.string().required(),
            checksumType: joi.string().allow('md5', 'crc32', 'sha1'),
            checksum: joi.string().when('checksumType', { is: 'md5', then: joi.string().length(32).required() })
              .concat(joi.string().when('checksumType', { is: 'crc32', then: joi.string().length(8).required() }))
              .concat(joi.string().when('checksumType', { is: 'sha1', then: joi.string().length(40).required() })),
            version: joi.string().required(),
            location: joi.string().required(),
            locales: joi.array().items(
              joi.object().keys({
                locale: joi.string().required(),
                description: joi.string().allow('').required(),
                summary: joi.string().allow('').required(),
              }),
            ),
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
    const requestFiles = request.input('files');
    const files: object[] = [];
    const validateFile = requestFiles.map((file: any) => {
      file.locales.map((locale: any) => {
        files.push(
          {
            PutRequest: {
              Item: {
                fileId: file.fileId,
                categoryId: file.categoryId,
                checksumType: file.checksumType,
                checksum: file.checksum,
                version: file.version,
                location: file.location,
                locale: locale.locale,
                summary: locale.summary,
                description: locale.description,
              },
            },
          },
        );
      });
      return {
        checksum: file.checksum,
        version: file.version,
      };
    });
    for (let file = 0; file < validateFile.length ; file += 1) {
      const existsFiles = await ddbDocClient.send(
        new QueryCommand({
          TableName: process.env.FILE_TABLE_NAME,
          IndexName: 'get-file-by-checksum-and-version',
          KeyConditionExpression: '#checksum = :checksum and #version = :version',
          ExpressionAttributeNames: {
            '#checksum': 'checksum',
            '#version': 'version',
          },
          ExpressionAttributeValues: {
            ':checksum': validateFile[file].checksum,
            ':version': validateFile[file].version,
          },
        }),
      );
      if (!existsFiles.Items || existsFiles.Items.length === 0) {
        return response.error('File not found.', 422);
      };
    }
    await ddbDocClient.send(
      new BatchWriteCommand({
        RequestItems: {
          [`${process.env.FILE_TABLE_NAME}`]: files,
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
  }
}
