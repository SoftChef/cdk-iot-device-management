import { IoTClient, CreateDynamicThingGroupCommand } from '@aws-sdk/client-iot';
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const iotClient = new IoTClient({});
    const thingGroup = await iotClient.send(
      new CreateDynamicThingGroupCommand({
        thingGroupName: request.input('thingGroupName'),
        queryString: 'A=1',
      }),
    );
    return response.json({
      created: true,
      thingGroup,
    });
  } catch (error) {
    return response.error(error);
  }
}