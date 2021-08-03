import {
  DescribeJobCommand,
  DescribeJobCommandInput,
  IoTClient,
} from '@aws-sdk/client-iot';
import { Request, Response } from '@softchef/lambda-events';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const parameters: DescribeJobCommandInput = {
      jobId: request.parameter('jobId'),
    };
    const iotClient = new IoTClient({});
    const { job } = await iotClient.send(
      new DescribeJobCommand(parameters),
    );
    return response.json({
      job: job,
    });
  } catch (error) {
    if (error.Code === 'ResourceNotFoundException') {
      return response.error(error, 404);
    } else {
      return response.error(error);
    }
  }
}
