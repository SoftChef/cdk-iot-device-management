import {
  IoTClient,
  ListJobTemplatesCommand,
  ListJobTemplatesCommandInput,
} from '@aws-sdk/client-iot';
import {
  Request,
  Response,
} from '@softchef/lambda-events';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const parameters: ListJobTemplatesCommandInput = {};
    if (request.has('nextToken')) {
      parameters.nextToken = request.get('nextToken');
    }
    const iotClient = new IoTClient({});
    const { jobTemplates, nextToken } = await iotClient.send(
      new ListJobTemplatesCommand(parameters),
    );
    return response.json({
      jobTemplates: jobTemplates,
      nextToken: nextToken,
    });
  } catch (error) {
    return response.error(error);
  }
}
