import { IoTDataPlaneClient, ListNamedShadowsForThingCommand } from "@aws-sdk/client-iot-data-plane";
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const client = new IoTDataPlaneClient({ region: "REGION" });
    const things = await client.send(
      new ListNamedShadowsForThingCommand({
        thingName: request.parameter('shadowName'),
      }),
    );
    return response.json({
      things,
    });
  } catch (error) {
    return response.error(error);
  }
}