import {
  CreateJobCommand,
  CreateJobCommandInput,
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
        targets: joi.array().items(joi.string()).required(),
        targetSelection: joi.string().allow('SNAPSHOT', 'CONTINUOUS'),
        document: joi.string().required(),
        description: joi.string().allow(null),
      };
    });
    if (validated.error) {
      return response.error(validated.details, 422);
    }
    const parameters: CreateJobCommandInput = {
      jobId: uuidv4(),
      targets: request.input('targets', []),
      document: request.input('document'),
      targetSelection: request.input('targetSelection', 'SNAPSHOT') === 'SNAPSHOT' ? 'SNAPSHOT' : 'CONTINUOUS',
      description: request.input('description', ''),
    };
    const iotClient = new IoTClient({});
    await iotClient.send(
      new CreateJobCommand(parameters),
    );
    return response.json({
      created: true,
    });
  } catch (error) {
    return response.error(error);
  }
}
