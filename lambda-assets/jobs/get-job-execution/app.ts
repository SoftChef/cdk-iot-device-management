import { IoTClient, DescribeJobExecutionCommand } from '@aws-sdk/client-iot';
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const iotClient = new IoTClient({});
    const jobExecution = await iotClient.send(
      new DescribeJobExecutionCommand({
        jobId: request.parameter('jobId'),
        thingName: request.parameter('thingName'),
      }),
    );
    return response.json(jobExecution);
  } catch (error) {
    if (error.Code === 'ResourceNotFoundException') {
      return response.error(error, 404);
    } else {
      return response.error(error);
    }
  }
}