import {
  DeleteThingShadowCommand,
  DeleteThingShadowCommandInput,
  IoTDataPlaneClient,
} from '@aws-sdk/client-iot-data-plane';
import {
  Request,
  Response,
} from '@softchef/lambda-events';
import { AwsError } from '../../constracts';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const parameters: DeleteThingShadowCommandInput = {
      thingName: request.parameter('thingName'),
      shadowName: request.parameter('shadowName'),
    };
    const ioTDataPlaneClient = new IoTDataPlaneClient({});
    await ioTDataPlaneClient.send(
      new DeleteThingShadowCommand(parameters),
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
