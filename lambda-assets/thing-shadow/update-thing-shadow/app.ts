import { IoTDataPlaneClient, UpdateThingShadowCommand } from "@aws-sdk/client-iot-data-plane";
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const validated = request.validate(joi => {
      return {
        payload: joi.array().required(),
      }
    });
    if (validated.error) {
      return response.error(validated.details, 422);
    }
    const client = new IoTDataPlaneClient({});
    await client.send(
      new UpdateThingShadowCommand({
        thingName: request.parameter('thingName'),
        payload: request.input('thingShadow'),
      }),
    );
    return response.json({
      updated: true,
    });
  } catch (error) {
    return response.error(error);
  }
}