import { DeleteJobExecutionCommand, IoTClient } from '@aws-sdk/client-iot';
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
        executionNumber: joi.number().required(),
        force: joi.boolean().allow(null),
      };
    });
    if (validated.error) {
      return response.error(validated.details, 422);
    }
    const iotClient = new IoTClient({});
    await iotClient.send(
      new DeleteJobExecutionCommand({
        jobId: request.parameter('jobId'),
        thingName: request.parameter('thingName'),
        executionNumber: request.input('executionNumber', 1),
        force: request.input('force', false),
      }),
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
