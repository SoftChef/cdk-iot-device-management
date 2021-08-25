import {
  CreateThingCommand,
  CreateThingCommandInput,
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
        thingName: joi.string().required(),
        thingTypeName: joi.string().allow(null),
        attributes: joi.object().allow(null),
      };
    });
    if (validated.error) {
      return response.error(validated.details, 422);
    }
    const parameters: CreateThingCommandInput = {
      thingName: request.input('thingName'),
    };
    if (request.has('thingTypeName')) {
      parameters.thingTypeName = request.input('thingTypeName');
    }
    if (request.has('attributes')) {
      parameters.attributePayload = {};
      parameters.attributePayload.attributes = request.input('attributes');
    }
    const iotClient = new IoTClient({});
    await iotClient.send(
      new CreateThingCommand(parameters),
    );
    return response.json({
      created: true,
    });
  } catch (error) {
    return response.error(error);
  }
}
