import { IoTClient, ListJobExecutionsForJobCommand } from '@aws-sdk/client-iot';
import { Request, Response } from '@softchef/lambda-events';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    let parameters: { [key: string]: any } = {};
    if (request.has('nextToken')) {
      parameters.nextToken = request.get('nextToken');
    };
    const iotClient = new IoTClient({});
    const jobsExecutionJob = await iotClient.send(
      new ListJobExecutionsForJobCommand({
        jobId: request.get('jobId'),
        ...parameters,
      }),
    );
    return response.json(jobsExecutionJob);
  } catch (error) {
    if (error.Code === 'ResourceNotFoundException') {
      return response.error(error, 404);
    } else {
      return response.error(error);
    }
  }
}