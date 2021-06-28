import { IoTClient, UpdateThingCommand } from '@aws-sdk/client-iot';
import { Request, Response } from '../../utils';

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
    const iotClient = new IoTClient({});
    const thing = await iotClient.send(
      new UpdateThingCommand({
        thingName: request.parameter('thingName'),
        thingTypeName: request.input('thingTypeName'),
        attributePayload: request.input('attributePayload'),
        expectedVersion: request.input('expectedVersion'),
        removeThingType: request.input('removeThingType'),
      }),
    );
    return response.json({
      updated: true,
      thing,
    });
  } catch (error) {
    if (error.Code === 'ResourceNotFoundException') {
      return response.error(error, 404);
    } else {
      return response.error(error);
    }
  }
}