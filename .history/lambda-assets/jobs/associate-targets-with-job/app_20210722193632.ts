import { IoTClient, AssociateTargetsWithJobCommand } from '@aws-sdk/client-iot';
import { Request, Response } from '@softchef/lambda-events';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const validated = request.validate(joi => {
      return {
        targets: joi.array().items(
          joi.string(),
        ).required(),
      };
    });
    if (validated.error) {
      return response.error(validated.details, 422);
    }
    const iotClient = new IoTClient({});
    await iotClient.send(
      new AssociateTargetsWithJobCommand({
        jobId: request.parameter('jobId'),
        targets: request.input('targets'),
      }),
    );
    return response.json({
      associate: true,
    });
  } catch (error) {
    if (error.Code === 'ResourceNotFoundException') {
      return response.error(error, 404);
    } else {
      return response.error(error);
    }
  }
}
