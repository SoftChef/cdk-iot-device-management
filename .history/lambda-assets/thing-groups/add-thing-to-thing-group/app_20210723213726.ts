import {
  AddThingToThingGroupCommand,
  AddThingToThingGroupCommandInput,
  IoTClient,
} from '@aws-sdk/client-iot';
import {
  Request,
  Response,
} from '@softchef/lambda-events';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const parameters: AddThingToThingGroupCommandInput = {
      thingGroupName: request.parameter('thingGroupName'),
      thingName: request.parameter('thingName'),
    };
    const iotClient = new IoTClient({});
    await iotClient.send(
      new AddThingToThingGroupCommand(parameters),
    );
    return response.json({
      added: true,
    });
  } catch (error) {
    if (error.Code === 'ResourceNotFoundException') {
      return response.error(error, 404);
    } else {
      return response.error(error);
    }
  }
}
