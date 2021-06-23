import { IoTDataPlaneClient, GetThingShadowCommand } from "@aws-sdk/client-iot-data-plane";
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const client = new IoTDataPlaneClient({ region: "REGION" });
    const shadow = await client.send(
      new GetThingShadowCommand({
        thingName: request.parameter('shadowName'),
      }),
    );
    return response.json({
      shadow,
    });
  } catch (error) {
    return response.error(error);
  }
}