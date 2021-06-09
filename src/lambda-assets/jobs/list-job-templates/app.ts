import { Iot } from 'aws-sdk';
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const iotClient = new Iot();
    const jobTempates = await iotClient.listJobTemplates({
      nextToken: request.get('nextToken', undefined),
    }).promise();
    return response.json({
      jobTempates,
    });
  } catch (error) {
    return response.error(error);
  }
}