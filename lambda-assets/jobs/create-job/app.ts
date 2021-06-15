/**
 * @todo
 * 1. verify targets "ARN" format
 * 2. verify document "JSON" format
 */
import { CreateJobCommand, IoTClient } from '@aws-sdk/client-iot';
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
      return response.error(validated.details, 422);
    }
    const iotClient = new IoTClient({});
    const job = await iotClient.send(
      new CreateJobCommand({
        jobId: uuidv4(),
        targets: request.input('targets', []),
        document: request.input('document'),
        targetSelection: request.input('targetSelection', 'SNAPSHOT') === 'SNAPSHOT' ? 'SNAPSHOT' : 'CONTINUOUS',
        description: request.input('description', ''),
      }),
    );
    return response.json({
      created: true,
      job,
    });
  } catch (error) {
    return response.error(error);
  }
}