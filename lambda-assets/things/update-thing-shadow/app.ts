import { IoTDataPlaneClient, UpdateThingShadowCommand } from '@aws-sdk/client-iot-data-plane';
import { Request, Response } from '@softchef/lambda-events';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const validated = request.validate(joi => {
      return {
        payload: joi.object().keys({
          state: joi.object().keys({
            desired: joi.object().required(),
            reported: joi.object().required(),
          }),
        }),
      };
    });
    if (validated.error) {
      return response.error(validated.details, 422);
    }
    const ioTDataPlaneClient = new IoTDataPlaneClient({});
    await ioTDataPlaneClient.send(
      new UpdateThingShadowCommand({
        thingName: request.parameter('thingName'),
        shadowName: request.parameter('shadowName'),
        payload: new Uint8Array(
          Buffer.from(
            JSON.stringify(request.input('payload')),
          ),
        ),
      }),
    );
    return response.json({
      updated: true,
    });
  } catch (error) {
    if (error.Code === 'ResourceNotFoundException') {
      return response.error(error, 404);
    } else {
      return response.error(error);
    };
  }
}
