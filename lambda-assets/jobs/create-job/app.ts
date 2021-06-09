/**
 * @todo
 * 1. verify targets "ARN" format
 * 2. verify document "JSON" format
 */
import { Iot } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const validated = request.validate(joi => {
      return {
        targets: joi.array().items(joi.string()).required(),
        targetSelection: joi.string().allow('SNAPSHOT', 'CONTINUOUS'),
        document: joi.string().required(),
      };
    });
    if (validated.error) {
      return response.error(validated, 422);
    }
    const iotClient = new Iot();
    const job = await iotClient.createJob({
      jobId: uuidv4(),
      targets: request.input('targets', []),
      document: request.input('document'),
      targetSelection: request.input('targetSelection', 'SNAPSHOT') === 'SNAPSHOT' ? 'SNAPSHOT' : 'CONTINUOUS',
      description: request.input('description', ''),
    }).promise();
    return response.json({
      created: true,
      job,
    });
  } catch (error) {
    return response.error(error);
  }
}