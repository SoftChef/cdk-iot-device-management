import {
  CreateThingTypeCommand,
  CreateThingTypeCommandInput,
  IoTClient,
} from '@aws-sdk/client-iot';
import {
  Request,
  Response,
} from '@softchef/lambda-events';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  const validated = request.validate(joi => {
    return {
      thingTypeName: joi.string().required(),
      searchableAttributes: joi.array().max(3).required(),
    };
  });
  if (validated.error) {
    return response.error(validated.details, 422);
  }
  try {
    const parameters: CreateThingTypeCommandInput = {
      thingTypeName: request.input('thingTypeName'),
    };
    if (request.has('searchableAttributes')) {
      parameters.thingTypeProperties= {};
      parameters.thingTypeProperties.searchableAttributes = request.input('searchableAttributes');
    }
    const iotClient = new IoTClient({});
    await iotClient.send(
      new CreateThingTypeCommand(parameters),
    );
    return response.json({
      created: true,
    });
  } catch (error) {
    return response.error(error);
  }
}