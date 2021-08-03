import {
  IoTClient,
  UpdateJobCommand,
  UpdateJobCommandInput,
} from '@aws-sdk/client-iot';
import { Request, Response } from '@softchef/lambda-events';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const validated = request.validate(joi => {
      return {
        description: joi.string().allow(null),
      };
    });
    if (validated.error) {
      return response.error(validated.details, 422);
    }
    const parameters: UpdateJobCommandInput = {
      jobId: request.parameter('jobId'),
      description: request.input('description', ''),
    };
    const iotClient = new IoTClient({});
    await iotClient.send(
      new UpdateJobCommand(parameters),
    );
    return response.json({
      updated: true,
    });
  } catch (error) {
    if (error.Code === 'ResourceNotFoundException') {
      return response.error(error, 404);
    } else {
      return response.error(error);
    }
  }
}
