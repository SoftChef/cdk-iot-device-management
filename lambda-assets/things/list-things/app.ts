import { IoTClient, ListThingsCommand } from '@aws-sdk/client-iot';
import { Request, Response } from '@softchef/lambda-events';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    let parameters: { [key: string]: any } = {};
    if (request.has('nextToken')) {
      parameters.nextToken = request.get('nextToken');
    };
    if (request.has('attributeName')) {
      parameters.attributeName = request.get('attributeName');
      parameters.attributeValue = request.get('attributeValue');
    };
    const iotClient = new IoTClient({});
    const things = await iotClient.send(
      new ListThingsCommand(parameters),
    );
    return response.json(things);
  } catch (error) {
    return response.error(error);
  }
}
