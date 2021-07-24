import {
  CreateJobTemplateCommand,
  CreateJobTemplateCommandInput,
  IoTClient,
} from '@aws-sdk/client-iot';
import {
  Request,
  Response,
} from '@softchef/lambda-events';
import { v4 as uuidv4 } from 'uuid';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const validated = request.validate(joi => {
      return {
        document: joi.string().required(),
        description: joi.string().required(),
      };
    });
    if (validated.error) {
      return response.error(validated.details, 422);
    }
    const parameters: CreateJobTemplateCommandInput = {
      jobTemplateId: uuidv4(),
      document: request.input('document'),
      description: request.input('description'),
    };
    const iotClient = new IoTClient({});
    await iotClient.send(
      new CreateJobTemplateCommand(parameters),
    );
    return response.json({
      created: true,
    });
  } catch (error) {
    return response.error(error);
  }
}
