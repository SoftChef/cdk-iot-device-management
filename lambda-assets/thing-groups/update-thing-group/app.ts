import { IoTClient, UpdateThingGroupCommand } from '@aws-sdk/client-iot';
import { Request, Response } from '../../utils';

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
    const iotClient = new IoTClient({});
    const thingGroup = await iotClient.send(
      new UpdateThingGroupCommand({
        thingGroupName: request.parameter('thingGroupName'),
        thingGroupProperties: {
          thingGroupDescription: request.input('description', undefined),
        },
      }),
    );
    return response.json(thingGroup);
  } catch (error) {
    if (error.Code === 'ResourceNotFoundException') {
      return response.error(error, 404);
    } else {
      return response.error(error);
    }
  }
}
