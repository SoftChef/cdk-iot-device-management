import {
  GetJobDocumentCommand,
  GetJobDocumentCommandInput,
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
    const parameters: GetJobDocumentCommandInput = {
      jobId: request.parameter('jobId'),
    };
    const iotClient = new IoTClient({});
    const { document } = await iotClient.send(
      new GetJobDocumentCommand(parameters),
    );
    return response.json({
      document: document,
    });
  } catch (error) {
    if ((error as AwsError).Code === 'ResourceNotFoundException') {
      return response.error(error, 404);
    } else {
      return response.error(error);
    }
  }
}
