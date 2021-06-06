// import { DynamoDB } from 'aws-sdk';
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
    return response.json({
      created: true,
    });
  } catch (error) {
    return response.json(error);
  }
}