import {
  IoTClient,
  UpdateThingCommand,
  UpdateThingCommandInput,
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
        thingTypeName: joi.string().allow(null),
        attributePayload: joi.object().allow(null),
        expectedVersion: joi.number().allow(null),
        removeThingType: joi.boolean().allow(null),
      };
    });
    if (validated.error) {
      return response.error(validated.details, 422);
    }
    const parameters: UpdateThingCommandInput = {
      thingName: request.parameter('thingName'),
    };
    if (request.has('thingTypename')) {
      parameters.thingTypeName = request.input('thingTypename');
    }
    if (request.has('attributePayload')) {
      parameters.attributePayload = request.input('attributePayload');
    }
    if (request.has('expectedVersion')) {
      parameters.expectedVersion = request.input('expectedVersion');
    }
    if (request.has('removeThingType')) {
      parameters.removeThingType = request.input('removeThingType');
    }
    const iotClient = new IoTClient({});
    await iotClient.send(
      new UpdateThingCommand(parameters),
    );
    return response.json({
      updated: true,
    });
  } catch (error) {
    if (error.Code === 'ResourceNotFoundException') {
      return response.error(error, 404);
    } else {
      return response.error(error);
    }
  }
}
