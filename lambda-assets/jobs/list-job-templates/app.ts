import { IoTClient, ListJobTemplatesCommand } from '@aws-sdk/client-iot';
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    let parameters: { [key: string]: any } = {};
    if (request.has('nextToken')) {
      parameters.nextToken = request.get('nextToken');
    }
    const iotClient = new IoTClient({});
    const jobTempates = await iotClient.send(
      new ListJobTemplatesCommand(parameters),
    );
    return response.json(jobTempates);
  } catch (error) {
    return response.error(error);
  }
}