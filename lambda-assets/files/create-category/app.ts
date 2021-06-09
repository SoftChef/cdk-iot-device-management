// import { DynamoDB } from 'aws-sdk';
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const validated = request.validate(joi => {
      return {
        name: joi.string().required(),
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