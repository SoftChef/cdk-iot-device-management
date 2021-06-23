import { IoTClient, DescribeThingTypeCommand } from '@aws-sdk/client-iot';
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const iotClient = new IoTClient({});
    const thingType = await iotClient.send(
      new DescribeThingTypeCommand({
        thingTypeName: request.parameter('thingTypeName'),
      }),
    );
    return response.json({
      thingType,
      event,
    });
  } catch (error) {
    if (error.Code === 'ResourceNotFoundException') {
      return response.error(error, 404);
    } else {
      return response.error(error);
    }
  }
}