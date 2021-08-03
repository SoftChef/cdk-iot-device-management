import {
  CreateDynamicThingGroupCommand,
  CreateDynamicThingGroupCommandInput,
  IoTClient,
} from '@aws-sdk/client-iot';
import {
  Request,
  Response,
} from '@softchef/lambda-events';

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
    }
    const parameters: CreateDynamicThingGroupCommandInput = {
      thingGroupName: request.input('thingGroupName'),
      queryString: request.input('queryString'),
    };
    const iotClient = new IoTClient({});
    await iotClient.send(
      new CreateDynamicThingGroupCommand(parameters),
    );
    return response.json({
      created: true,
    });
  } catch (error) {
    return response.error(error);
  }
}
