import {
  DeleteJobTemplateCommand,
  DeleteJobTemplateCommandInput,
  IoTClient,
} from '@aws-sdk/client-iot';
import { Request, Response } from '@softchef/lambda-events';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const parameters: DeleteJobTemplateCommandInput = {
      jobTemplateId: request.parameter('jobTemplateId'),
    };
    const iotClient = new IoTClient({});
    await iotClient.send(
      new DeleteJobTemplateCommand(parameters),
    );
    return response.json({
      deleted: true,
    });
  } catch (error) {
    if (error.Code === 'ResourceNotFoundException') {
      return response.error(error, 404);
    } else {
      return response.error(error);
    }
  }
}
