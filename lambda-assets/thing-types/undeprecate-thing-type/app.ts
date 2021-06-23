import { IoTClient, DeprecateThingTypeCommand } from '@aws-sdk/client-iot';
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const iotClient = new IoTClient({});
    const thingType = await iotClient.send(
      new DeprecateThingTypeCommand({
        thingTypeName: request.parameter('thingTypeName'),
        undoDeprecate: true,
      }),
    );
    return response.json({
      undeprecated: true,
      thingType,
    });
  } catch (error) {
    if (error.Code === 'ResourceNotFoundException') {
      return response.error(error, 404);
    } else {
      return response.error(error);
    }
  }
}