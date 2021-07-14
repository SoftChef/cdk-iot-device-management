import { CancelJobExecutionCommand, IoTClient } from '@aws-sdk/client-iot';
import { Request, Response } from '@softchef/lambda-events';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const validated = request.validate(joi => {
      return {
        expectedVersion: joi.number().allow(null),
        statusDetails: joi.object().allow(null),
        force: joi.boolean().allow(null),
      };
    });
    if (validated.error) {
      return response.error(validated.details, 422);
    }
    const iotClient = new IoTClient({});
    await iotClient.send(
      new CancelJobExecutionCommand({
        jobId: request.parameter('jobId'),
        thingName: request.parameter('thingName'),
        expectedVersion: request.input('expectedVersion', 1),
        statusDetails: request.input('statusDetail', {}),
        force: request.input('force', false),
      }),
    );
    return response.json({
      canceled: true,
    });
  } catch (error) {
    if (error.Code === 'ResourceNotFoundException') {
      return response.error(error, 404);
    } else {
      return response.error(error);
    };
  }
}
