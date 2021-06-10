import { IoTClient, RemoveThingFromThingGroupCommand } from '@aws-sdk/client-iot'
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const iotClient = new IoTClient({});
    await iotClient.send(
      new RemoveThingFromThingGroupCommand({
        thingGroupName: request.parameter('thingGroupName'),
        thingName: request.parameter('thingName'),
      }),
    );
    return response.json({
      added: true,
    });
  } catch (error) {
    return response.error(error);
  }
}