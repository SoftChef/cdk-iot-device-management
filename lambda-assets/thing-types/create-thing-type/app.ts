import { IoTClient, CreateThingTypeCommand } from '@aws-sdk/client-iot';
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  const validated = request.validate(joi => {
    return {
      thingTypeName: joi.string().required(),
    };
  });
  if (validated.error) {
    return response.error(validated, 422);
  }
  try {
    const iotClient = new IoTClient({});
    const thingType = await iotClient.send(
      new CreateThingTypeCommand({
        thingTypeName: request.input('thingTypeName'),
      }),
    );
    return response.json({
      created: true,
      thingType,
    });
  } catch (error) {
    return response.error(error);
  }
}