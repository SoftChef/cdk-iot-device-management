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
        attributes: joi.object().pattern(joi.string(), [joi.string()]).allow(null),
      };
    });
    if (validated.error) {
      return response.error(validated.details, 422);
    }
    const parameters: CreateDynamicThingGroupCommandInput = {
      thingGroupName: request.input('thingGroupName'),
      queryString: request.input('queryString'),
      thingGroupProperties: {},
    };
    if (request.has('attributes')) {
      parameters.thingGroupProperties!.attributePayload = {};
      parameters.thingGroupProperties!.attributePayload.attributes = request.input('attributes');
    }
    const iotClient = new IoTClient({});
    await iotClient.send(
      new CreateDynamicThingGroupCommand(parameters),
    );
    return response.json({
      created: true,
    });
  } catch (error) {
    console.log(error);
    return response.error(error);
  }
}
