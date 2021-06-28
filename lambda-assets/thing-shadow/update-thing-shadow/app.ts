import { IoTDataPlaneClient, UpdateThingShadowCommand } from "@aws-sdk/client-iot-data-plane";
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const client = new IoTDataPlaneClient({});
    await client.send(
      new UpdateThingShadowCommand({
        thingName: request.parameter('thingName'),
        payload: request.input('thingName')
      }),
    );
    return response.json({
      updated: true,
    });
  } catch (error) {
    return response.error(error);
  }
}