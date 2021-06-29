import { IoTDataPlaneClient, ListNamedShadowsForThingCommand } from "@aws-sdk/client-iot-data-plane";
import { Request, Response } from '@softchef/lambda-events';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    let parameters: { [key: string]: any } = {};
    if (request.has('nextToken')) {
      parameters.nextToken = request.get('nextToken');
    };
    const ioTDataPlaneClient = new IoTDataPlaneClient({});
    const thingShadows = await ioTDataPlaneClient.send(
      new ListNamedShadowsForThingCommand({
        thingName: request.parameter('thingName'),
        ...parameters,
      })
    )
    return response.json({
      thingShadows
    });
  } catch (error) {
    return response.error(error);
  }
}
