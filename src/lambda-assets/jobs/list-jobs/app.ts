import { Iot } from 'aws-sdk';
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const iotClient = new Iot();
    const jobs = await iotClient.listJobs({
      nextToken: request.get('nextToken', undefined),
    }).promise();
    return response.json({
      jobs,
    });
  } catch (error) {
    return response.json(error);
  }
}