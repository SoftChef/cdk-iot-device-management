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
      removed: true,
    });
  } catch (error) {
    if (error.Code === 'ResourceNotFoundException') {
      return response.error(error, 404);
    } else {
      return response.error(error);
    }
  }
}
