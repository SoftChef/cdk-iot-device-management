import { IoTClient, ListJobExecutionsForJobCommand } from '@aws-sdk/client-iot';
import { Request, Response } from '@softchef/lambda-events';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  const validated = request.validate(joi => {
    return {
      jobId: joi.string().required(),
      status: joi.string().allow('CANCELED', 'FAILED', 'IN_PROGRESS', 'QUEUED', 'REJECTED', 'REMOVED', 'SUCCEEDED', 'TIMED_OUT'),
    };
  });
  if (validated.error) {
    return response.error(validated.details, 422);
  }
  try {
    let parameters: { [key: string]: any } = {};
    if (request.has('nextToken')) {
      parameters.nextToken = request.get('nextToken');
    };
    const iotClient = new IoTClient({});
    const jobsExecutionJob = await iotClient.send(
      new ListJobExecutionsForJobCommand({
        jobId: request.get('jobId'),
        status: request.get('status'),
        ...parameters,
      }),
    );
    return response.json(jobsExecutionJob);
  } catch (error) {
    if (error.Code === 'ResourceNotFoundException') {
      return response.error(error, 404);
    } else {
      return response.error(error);
    };
  }
}
