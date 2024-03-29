import {
  IoTClient,
  UpdateThingGroupCommand,
  UpdateThingGroupCommandInput,
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
    const validated = request.validate(joi => {
      return {
        description: joi.string().allow(null),
      };
    });
    if (validated.error) {
      return response.error(validated.details, 422);
    }
    const parameters: UpdateThingGroupCommandInput = {
      thingGroupName: request.parameter('thingGroupName'),
      thingGroupProperties: {
        thingGroupDescription: request.input('description', undefined),
      },
    };
    const iotClient = new IoTClient({});
    await iotClient.send(
      new UpdateThingGroupCommand(parameters),
    );
    return response.json({
      updated: true,
    });
  } catch (error) {
    if ((error as AwsError).Code === 'ResourceNotFoundException') {
      return response.error(error, 404);
    } else {
      return response.error(error);
    }
  }
}
