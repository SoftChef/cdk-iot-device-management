import {
  IoTClient,
  ListJobsCommand,
  ListJobsCommandInput,
} from '@aws-sdk/client-iot';
import { Request, Response } from '@softchef/lambda-events';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const parameters: ListJobsCommandInput = {};
    if (request.has('nextToken')) {
      parameters.nextToken = request.get('nextToken');
    }
    const iotClient = new IoTClient({});
    const { jobs, nextToken } = await iotClient.send(
      new ListJobsCommand(parameters),
    );
    return response.json({
      jobs: jobs,
      nextToken: nextToken,
    });
  } catch (error) {
    return response.error(error);
  }
}
