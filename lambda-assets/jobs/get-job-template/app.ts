import { IoTClient, DescribeJobTemplateCommand } from '@aws-sdk/client-iot';
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const iotClient = new IoTClient({});
    const jobTempate = await iotClient.send(
      new DescribeJobTemplateCommand({
        jobTemplateId: request.parameter('jobTemplateId'),
      }),
    );
    return response.json(jobTempate);
  } catch (error) {
    if (error.Code === 'ResourceNotFoundException') {
      return response.error(error, 404);
    } else {
      return response.error(error);
    }
  }
}