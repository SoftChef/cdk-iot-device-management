import { IoTClient, UpdateThingGroupCommand } from '@aws-sdk/client-iot';
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const iotClient = new IoTClient({});
    const thingGroup = await iotClient.send(
      new UpdateThingGroupCommand({
        thingGroupName: request.parameter('thingGroupName'),
        thingGroupProperties: {
          thingGroupDescription: request.input('description', undefined),
        },
      }),
    );
    return response.json(thingGroup);
  } catch (error) {
    return response.error(error);
  }
}
