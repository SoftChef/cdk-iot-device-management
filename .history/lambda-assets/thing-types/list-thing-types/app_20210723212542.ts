import { IoTClient, ListThingTypesCommand, ListThingTypesCommandInput } from '@aws-sdk/client-iot';
import { Request, Response } from '@softchef/lambda-events';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const parameters: ListThingTypesCommandInput = {
      nextToken: request.get('nextToken', undefined),
    };
    const iotClient = new IoTClient({});
    const { thingTypes, nextToken } = await iotClient.send(
      new ListThingTypesCommand(parameters),
    );
    return response.json({
      thingTypes: thingTypes,
      nextToken: nextToken,
    });
  } catch (error) {
    return response.error(error);
  }
}