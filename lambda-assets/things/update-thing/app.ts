import { IoTClient, UpdateThingCommand } from '@aws-sdk/client-iot';
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const iotClient = new IoTClient({});
    const thing = await iotClient.send(
      new UpdateThingCommand({
        thingName: request.parameter('thingName'),
      }),
    );
    return response.json({
      thing,
    });
  } catch (error) {
    return response.error(error);
  }
}