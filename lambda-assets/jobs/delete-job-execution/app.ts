import { IoTClient } from '@aws-sdk/client-iot';
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const iotClient = new IoTClient({});
    await iotClient.deleteJobExecution({
      jobId: request.parameter('jobId'),
      thingName: request.parameter('thingName'),
      executionNumber: 1,
    }).promise();
    return response.json({
      deleted: true,
    });
  } catch (error) {
    return response.error(error);
  }
}