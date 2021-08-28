import {
  IoTClient,
  RemoveThingFromThingGroupCommand,
  RemoveThingFromThingGroupCommandInput,
} from '@aws-sdk/client-iot';
import {
  Request,
  Response,
} from '@softchef/lambda-events';
import { AwsError } from '../../constracts';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const parameters: RemoveThingFromThingGroupCommandInput = {
      thingGroupName: request.parameter('thingGroupName'),
      thingName: request.parameter('thingName'),
    };
    const iotClient = new IoTClient({});
    await iotClient.send(
      new RemoveThingFromThingGroupCommand(parameters),
    );
    return response.json({
      removed: true,
    });
  } catch (error) {
    if ((error as AwsError).Code === 'ResourceNotFoundException') {
      return response.error(error, 404);
    } else {
      return response.error(error);
    }
  }
}
