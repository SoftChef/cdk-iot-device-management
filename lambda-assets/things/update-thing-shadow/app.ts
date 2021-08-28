import {
  IoTDataPlaneClient,
  UpdateThingShadowCommand,
  UpdateThingShadowCommandInput,
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
    const validated = request.validate(joi => {
      return {
        payload: joi.object().keys({
          state: joi.object().keys({
            desired: joi.object().allow(null),
            reported: joi.object().allow(null),
          }),
        }),
      };
    });
    if (validated.error) {
      return response.error(validated.details, 422);
    }
    const parameters: UpdateThingShadowCommandInput = {
      thingName: request.parameter('thingName'),
      shadowName: request.parameter('shadowName'),
      payload: new Uint8Array(
        Buffer.from(
          JSON.stringify(request.input('payload')),
        ),
      ),
    };
    const ioTDataPlaneClient = new IoTDataPlaneClient({});
    await ioTDataPlaneClient.send(
      new UpdateThingShadowCommand(parameters),
    );
    return response.json({
      updated: true,
    });
  } catch (error) {
    if ((error as AwsError).Code === 'ResourceNotFoundException') {
      return response.error(error, 404);
    } else {
      return response.error(error);
    }
  }
}
