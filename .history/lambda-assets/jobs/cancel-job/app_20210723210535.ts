import { CancelJobCommand, CancelJobCommandInput, IoTClient } from '@aws-sdk/client-iot';
import { Request, Response } from '@softchef/lambda-events';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const validated = request.validate(joi => {
      return {
        comment: joi.string().allow(null),
        force: joi.boolean().allow(null),
      };
    });
    if (validated.error) {
      return response.error(validated.details, 422);
    }
    const parameters: CancelJobCommandInput = {
      jobId: request.parameter('jobId'),
    };
    if (request.has('comment')) {
      parameters.comment = request.input('comment');
    }
    if (request.has('force')) {
      parameters.force = request.input('force');
    }
    const iotClient = new IoTClient({});
    await iotClient.send(
      new CancelJobCommand(parameters),
    );
    return response.json({
      canceled: true,
    });
  } catch (error) {
    if (error.Code === 'ResourceNotFoundException') {
      return response.error(error, 404);
    } else {
      return response.error(error);
    }
  }
}
