import {
  DescribeJobTemplateCommand,
  DescribeJobTemplateCommandInput,
  IoTClient,
} from '@aws-sdk/client-iot';
import {
  Request,
  Response,
} from '@softchef/lambda-events';
import { AwsError } from '../../constracts';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const parameters: DescribeJobTemplateCommandInput = {
      jobTemplateId: request.parameter('jobTemplateId'),
    };
    const iotClient = new IoTClient({});
    const jobTemplate = await iotClient.send(
      new DescribeJobTemplateCommand(parameters),
    );
    return response.json({
      jobTemplate: jobTemplate,
    });
  } catch (error) {
    if ((error as AwsError).Code === 'ResourceNotFoundException') {
      return response.error(error, 404);
    } else {
      return response.error(error);
    }
  }
}
