import {
  DeleteThingGroupCommand,
  DeleteThingGroupCommandInput,
  IoTClient,
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
    const parameters: DeleteThingGroupCommandInput = {
      thingGroupName: request.parameter('thingGroupName'),
    };
    const iotClient = new IoTClient({});
    await iotClient.send(
      new DeleteThingGroupCommand(parameters),
    );
    return response.json({
      deleted: true,
    });
  } catch (error) {
    if ((error as AwsError).Code === 'ResourceNotFoundException') {
      return response.error(error, 404);
    } else {
      return response.error(error);
    }
  }
}
