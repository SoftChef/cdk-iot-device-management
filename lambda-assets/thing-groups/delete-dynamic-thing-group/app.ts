import { IoTClient, DeleteDynamicThingGroupCommand } from '@aws-sdk/client-iot';
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const iotClient = new IoTClient({});
    const thingGroup = await iotClient.send(
      new DeleteDynamicThingGroupCommand({
        thingGroupName: request.parameter('thingGroupName'),
      }),
    );
    return response.json({
      deleted: true,
      thingGroup,
    });
  } catch (error) {
    return response.error(error);
  }
}