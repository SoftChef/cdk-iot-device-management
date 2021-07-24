import {
  DynamoDBClient,
} from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  QueryCommand,
  BatchWriteCommand,
} from '@aws-sdk/lib-dynamodb';
import {
  Request,
  Response,
} from '@softchef/lambda-events';
import * as uuid from 'uuid';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const validated = request.validate(joi => {
      return {
        files: joi.array().items(
          joi.object().keys({
            version: joi.string().required(),
            categoryId: joi.string().required(),
            checksumType: joi.string().allow('md5', 'crc32', 'sha1'),
            checksum: joi.string().when('checksumType', { is: 'md5', then: joi.string().length(32).required() })
              .concat(joi.string().when('checksumType', { is: 'crc32', then: joi.string().length(8).required() }))
              .concat(joi.string().when('checksumType', { is: 'sha1', then: joi.string().length(40).required() })),
            location: joi.string().uri().required(),
            locale: joi.string().required(),
            summary: joi.string().allow(null).required(),
            description: joi.string().allow(null).required(),
          }),
        ),
      };
    });
    if (validated.error) {
      return response.error(validated.details, 422);
    }
    const requestFiles = request.input('files');
    const files: object[] = [];
    const currentTime = Date.now();
    const validateFile = requestFiles.map((file: any) => {
      files.push(
        {
          PutRequest: {
            Item: {
              fileId: uuid.v4(),
              ...file,
              createdAt: currentTime,
              updatedAt: currentTime,
            },
          },
        },
      );
      return {
        version: file.version,
        checksum: file.checksum,
        categoryId: file.categoryId,
      };
    });
    const ddbDocClient = DynamoDBDocumentClient.from(
      new DynamoDBClient({}),
    );
    for (let file = 0; file < validateFile.length; file += 1) {
      const { Item: category } = await ddbDocClient.send(
        new GetCommand({
          TableName: process.env.CATEGORY_TABLE_NAME,
          Key: {
            categoryId: validateFile[file].categoryId,
          },
        }),
      );
      if (!category) {
        return response.error('Category does not exist.', 404);
      }
    };
    for (let file = 0; file < validateFile.length; file += 1) {
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
      if (existsFiles.Items && existsFiles.Items.length) {
        return response.error('File already exists.', 404);
      }
    };
    await ddbDocClient.send(
      new BatchWriteCommand({
        RequestItems: {
          [`${process.env.FILE_TABLE_NAME}`]: files,
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
