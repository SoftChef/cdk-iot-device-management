import { IoTClient, ListJobExecutionsForThingCommand } from '@aws-sdk/client-iot';
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    let parameters: { [key: string]: any } = {};
    if (request.has('nextToken')) {
      parameters.nextToken = request.get('nextToken');
    };
    const iotClient = new IoTClient({});
    const jobsExecutionThing = await iotClient.send(
      new ListJobExecutionsForThingCommand({
        thingName: request.get('thingName'),
        ...parameters,
      }),
    );
    return response.json(jobsExecutionThing);
  } catch (error) {
    if (error.Code === 'ResourceNotFoundException') {
      return response.error(error, 404);
    } else {
      return response.error(error);
    }
  }
}