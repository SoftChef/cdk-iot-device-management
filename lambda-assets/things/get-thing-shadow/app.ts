import {
  GetThingShadowCommand,
  GetThingShadowCommandInput,
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
    const parameters: GetThingShadowCommandInput = {
      thingName: request.parameter('thingName'),
      shadowName: request.parameter('shadowName'),
    };
    const client = new IoTDataPlaneClient({});
    const { payload = [] } = await client.send(
      new GetThingShadowCommand(parameters),
    );
    return response.json({
      payload: String.fromCharCode(...payload),
    });
  } catch (error) {
    if ((error as AwsError).Code === 'ResourceNotFoundException') {
      return response.error(error, 404);
    } else {
      return response.error(error);
    }
  }
}
