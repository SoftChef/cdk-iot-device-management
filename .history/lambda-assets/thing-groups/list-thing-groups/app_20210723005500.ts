import { IoTClient, ListThingGroupsCommand } from '@aws-sdk/client-iot';
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
    const iotClient = new IoTClient({});
    const listThingGroups = await iotClient.send(
      new ListThingGroupsCommand(parameters),
    );
    console.log('listThingGroups', listThingGroups);
    return response.json({
      thingGroups: listThingGroups.thingGroups ?? [],
      nextToken: listThingGroups.nextToken,
    });
  } catch (error) {
    return response.error(error);
  }
}
