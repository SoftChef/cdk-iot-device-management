import { Iot } from 'aws-sdk';
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const iotClient = new Iot();
    await iotClient.deleteJobExecution({
      jobId: request.parameter('jobId'),
      thingName: request.parameter('thingName'),
      executionNumber: 1,
    }).promise();
    return response.json({
      deleted: true,
    });
  } catch (error) {
    return response.json(error);
  }
}