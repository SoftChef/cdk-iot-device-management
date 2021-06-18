import { IoTClient, UpdateThingCommand } from '@aws-sdk/client-iot';
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const validated = request.validate(joi => {
      return {
        thingName: joi.string().required(),
      };
    });
    if (validated.error) {
      return response.error(validated.details, 422);
    }
    const iotClient = new IoTClient({});
    const thing = await iotClient.send(
      new UpdateThingCommand({
        thingName: request.parameter('thingName'),
      }),
    );
    return response.json({
      updated: true,
      thing,
    });
  } catch (error) {
    return response.error(error);
  }
}