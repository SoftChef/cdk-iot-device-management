import { IoTClient, ListThingsInThingGroupCommand } from '@aws-sdk/client-iot';
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    let parameters: { [key: string]: any } = {};
    if (request.has('nextToken')) {
      parameters.nextToken = request.get('nextToken');
    };
    const iotClient = new IoTClient({});
    const things = await iotClient.send(
      new ListThingsInThingGroupCommand({
        thingGroupName: request.parameter('thingGroupName'),
        ...parameters,
      }),
    );
    return response.json(things);
  } catch (error) {
    return response.error(error);
  }
}
