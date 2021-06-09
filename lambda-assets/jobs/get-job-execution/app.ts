import { Iot } from 'aws-sdk';
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const iotClient = new Iot();
    const jobExecution = await iotClient.describeJobExecution({
      jobId: request.parameter('jobId'),
      thingName: request.parameter('thingName'),
    }).promise();
    return response.json({
      jobExecution,
    });
  } catch (error) {
    return response.error(error);
  }
}