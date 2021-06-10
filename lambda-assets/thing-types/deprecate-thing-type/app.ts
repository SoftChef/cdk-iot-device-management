import { IoTClient } from '@aws-sdk/client-iot';
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const iotClient = new IoTClient({});
    const thingType = await iotClient.deprecateThingType({
      thingTypeName: request.parameter('thingTypeName'),
    }).promise();
    return response.json({
      deprecated: true,
      thingType,
    });
  } catch (error) {
    return response.error(error);
  }
}