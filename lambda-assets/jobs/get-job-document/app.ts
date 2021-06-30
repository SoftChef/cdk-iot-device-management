import { IoTClient, GetJobDocumentCommand } from '@aws-sdk/client-iot';
import { Request, Response } from '@softchef/lambda-events';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const iotClient = new IoTClient({});
    const document = await iotClient.send(
      new GetJobDocumentCommand({
        jobId: request.parameter('jobId'),
      }),
    );
    return response.json(document);
  } catch (error) {
    if (error.Code === 'ResourceNotFoundException') {
      return response.error(error, 404);
    } else {
      return response.error(error);
    }
  }
}