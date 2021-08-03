import { IoTClient, DeprecateThingTypeCommand, DeprecateThingTypeCommandInput } from '@aws-sdk/client-iot';
import { Request, Response } from '@softchef/lambda-events';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const parameters: DeprecateThingTypeCommandInput = {
      thingTypeName: request.parameter('thingTypeName'),
      undoDeprecate: true,
    };
    const iotClient = new IoTClient({});
    await iotClient.send(
      new DeprecateThingTypeCommand(parameters),
    );
    return response.json({
      undeprecated: true,
    });
  } catch (error) {
    if (error.Code === 'ResourceNotFoundException') {
      return response.error(error, 404);
    } else {
      return response.error(error);
    }
  }
}