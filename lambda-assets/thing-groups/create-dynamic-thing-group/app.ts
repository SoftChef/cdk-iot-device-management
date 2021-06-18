import { IoTClient, CreateDynamicThingGroupCommand } from '@aws-sdk/client-iot';
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const validated = request.validate(joi => {
      return {
        thingGroupName: joi.string().required(),
        queryString: joi.string().required(),
      };
    });
    if (validated.error) {
      return response.error(validated.details, 422);
    };
    const iotClient = new IoTClient({});
    await iotClient.send(
      new CreateDynamicThingGroupCommand({
        thingGroupName: request.input('thingGroupName'),
        queryString: request.input('queryString'),
      }),
    );
    return response.json({
      created: true,
    });
  } catch (error) {
    return response.error(error);
  }
}
