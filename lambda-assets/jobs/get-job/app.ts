import { Iot } from 'aws-sdk';
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const iotClient = new Iot();
    const { job } = await iotClient.describeJob({
      jobId: request.parameter('jobId'),
    }).promise();
    return response.json({
      job,
    });
  } catch (error) {
    return response.error(error);
  }
}