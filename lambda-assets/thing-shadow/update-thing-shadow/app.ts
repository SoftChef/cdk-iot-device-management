import { IoTDataPlaneClient, UpdateThingShadowCommand } from "@aws-sdk/client-iot-data-plane";
import { updateLocale } from "yargs";
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const client = new IoTDataPlaneClient({});
    const shadow = await client.send(
      new UpdateThingShadowCommand({
        thingName: request.parameter('shadowName'),
        payload:,
      }),
    );
    return response.json({
      shadow,
    });
  } catch (error) {
    return response.error(error);
  }
}