import { IoTClient, DeleteThingTypeCommand } from '@aws-sdk/client-iot';
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const iotClient = new IoTClient({});
    const thingType = await iotClient.send(
      new DeleteThingTypeCommand({
        thingTypeName: request.parameter('thingTypeName'),
      }),
    );
    return response.json({
      deleted: true,
      thingType,
    });
  } catch (error) {
    return response.error(error);
  }
}