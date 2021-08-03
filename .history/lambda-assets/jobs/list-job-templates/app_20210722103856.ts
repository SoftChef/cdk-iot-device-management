import { IoTClient, ListJobTemplatesCommand } from '@aws-sdk/client-iot';
import { Request, Response } from '@softchef/lambda-events';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    let parameters: { [key: string]: any } = {};
    if (request.has('nextToken')) {
      parameters.nextToken = request.get('nextToken');
    }
    const iotClient = new IoTClient({});
    const jobTemplates = await iotClient.send(
      new ListJobTemplatesCommand(parameters),
    );
    return response.json(jobTemplates);
  } catch (error) {
    return response.error(error);
  }
}
