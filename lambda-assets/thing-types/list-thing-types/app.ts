import { IoTClient, ListThingTypesCommand } from '@aws-sdk/client-iot';
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const iotClient = new IoTClient({});
    const thingTypes = await iotClient.send(
      new ListThingTypesCommand({
        nextToken: request.get('nextToken', undefined),
      }),
    );
    return response.json(thingTypes);
  } catch (error) {
    return response.error(error);
  }
}