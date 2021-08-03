import {
  DescribeJobExecutionCommand,
  DescribeJobExecutionCommandInput,
  IoTClient,
} from '@aws-sdk/client-iot';
import {
  Request,
  Response,
} from '@softchef/lambda-events';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const parameters: DescribeJobExecutionCommandInput = {
      jobId: request.parameter('jobId'),
      thingName: request.parameter('thingName'),
    };
    const iotClient = new IoTClient({});
    const { execution } = await iotClient.send(
      new DescribeJobExecutionCommand(parameters),
    );
    return response.json({
      execution: execution,
    });
  } catch (error) {
    if (error.Code === 'ResourceNotFoundException') {
      return response.error(error, 404);
    } else {
      return response.error(error);
    }
  }
}
