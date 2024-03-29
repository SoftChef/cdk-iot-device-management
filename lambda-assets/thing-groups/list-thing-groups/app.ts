import {
  IoTClient,
  ListThingGroupsCommand,
  ListThingGroupsCommandInput,
} from '@aws-sdk/client-iot';
import {
  Request,
  Response,
} from '@softchef/lambda-events';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const parameters: ListThingGroupsCommandInput = {};
    if (request.has('nextToken')) {
      parameters.nextToken = request.get('nextToken');
    };
    if (request.has('namePrefixFilter')) {
      parameters.namePrefixFilter = request.get('namePrefixFilter');
    };
    const iotClient = new IoTClient({});
    const listThingGroups = await iotClient.send(
      new ListThingGroupsCommand(parameters),
    );
    return response.json({
      thingGroups: listThingGroups.thingGroups ?? [],
      nextToken: listThingGroups.nextToken,
    });
  } catch (error) {
    return response.error(error);
  }
}
