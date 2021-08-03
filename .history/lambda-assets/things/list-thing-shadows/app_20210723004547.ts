import { IoTDataPlaneClient, ListNamedShadowsForThingCommand } from '@aws-sdk/client-iot-data-plane';
import { Request, Response } from '@softchef/lambda-events';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    let parameters: {
      nextToken: string | undefined;
    } = {
      nextToken: undefined,
    };
    if (request.has('nextToken')) {
      parameters.nextToken = request.get('nextToken');
    };
    const ioTDataPlaneClient = new IoTDataPlaneClient({});
    const { results, nextToken, timestamp } = await ioTDataPlaneClient.send(
      new ListNamedShadowsForThingCommand({
        thingName: request.parameter('thingName'),
        ...parameters,
      }),
    );
    console.log({
      thingShadows: results,
      nextToken: nextToken,
      timestamp: timestamp,
    });
    return response.json({
      thingShadows: results,
      nextToken: nextToken,
      timestamp: timestamp,
    });
  } catch (error) {
    return response.error(error);
  }
}
