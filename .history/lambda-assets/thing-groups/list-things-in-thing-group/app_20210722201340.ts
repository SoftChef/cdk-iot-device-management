import { IoTClient, ListThingsInThingGroupCommand } from '@aws-sdk/client-iot';
import { Request, Response } from '@softchef/lambda-events';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    let parameters: { [key: string]: any } = {};
    if (request.has('nextToken')) {
      parameters.nextToken = request.get('nextToken');
    };
    const iotClient = new IoTClient({});
    const { things, nextToken } = await iotClient.send(
      new ListThingsInThingGroupCommand({
        thingGroupName: request.parameter('thingGroupName'),
        ...parameters,
      }),
    );
    return response.json({
      things: things,
      nextToken: nextToken,
    });
  } catch (error) {
    if (error.Code === 'ResourceNotFoundException') {
      return response.error(error, 404);
    } else {
      return response.error(error);
    }
  }
}
