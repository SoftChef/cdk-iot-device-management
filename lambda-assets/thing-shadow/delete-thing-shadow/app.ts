import { IoTDataPlaneClient, DeleteThingShadowCommand } from "@aws-sdk/client-iot-data-plane";
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const client = new IoTDataPlaneClient({ region: "REGION" });
    const shadow = await client.send(
      new DeleteThingShadowCommand({
        thingName: request.parameter('shadow'),
      }),
    );
    return response.json({
      deleted: true,
      shadow,
    });
  } catch (error) {
    return response.error(error);
  }
}