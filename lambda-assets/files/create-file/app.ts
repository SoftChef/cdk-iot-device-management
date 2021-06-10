const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");
const { FILE_TABLE_NAME } = process.env;
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const validated = request.validate(joi => {
      return {
        categoryId: joi.string().required(),
        location: joi.string().uri().required(),
        version: joi.string().required(), // validate semanticVersion
        checksumType: joi.string().allow(['md5', 'crc32', 'sha1']),
        checksum: joi.string().required(),
      };
    });
    if (validated.error) {
      return response.error(validated, 422);
    }
    const ddbDocClient = DynamoDBDocumentClient.from(
      new DynamoDBClient()
    );
    await ddbDocClient.send(
      new PutCommand({
        TableName: `${FILE_TABLE_NAME}`,
        Item: {
          fileId: request.input("checksum"),
          version: request.input("version"),
          categoryId: request.input("categoryId"),
          location: request.input("location"),
          description: request.input("description"),
          createAt: Date.now(),
          updateAt: Date.now()
        },
      })
    )
    return response.json({
      created: true
    });
  } catch (error) {
    return response.json(error);
  }
}