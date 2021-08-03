import { IoTClient, ListThingGroupsCommand } from '@aws-sdk/client-iot';
import { Request, Response } from '@softchef/lambda-events';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const iotClient = new IoTClient({});
    const thingGroups = await iotClient.send(
      new ListThingGroupsCommand({
        nextToken: request.get('nextToken', undefined),
      }),
    );
    return response.json(thingGroups);
  } catch (error) {
    return response.error(error);
  }
}
