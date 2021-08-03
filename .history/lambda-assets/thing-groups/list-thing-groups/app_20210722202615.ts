import { IoTClient, ListThingGroupsCommand } from '@aws-sdk/client-iot';
import { Request, Response } from '@softchef/lambda-events';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    let parameters: {
      nextToken: string | null;
    } = {
      nextToken: null,
    };
    if (request.has('nextToken')) {
      parameters.nextToken = request.get('nextToken');
    };
    const iotClient = new IoTClient({});
    const { thingGroups, nextToken } = await iotClient.send(
      new ListThingGroupsCommand({
        nextToken: request.get('nextToken', undefined),
      }),
    );
    return response.json({
      thingGroups: thingGroups,
      nextToken: nextToken,
    });
  } catch (error) {
    console.log(error);
    return response.error(error);
  }
}
