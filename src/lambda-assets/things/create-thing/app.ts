import { Iot } from 'aws-sdk';
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const validated = request.validate(joi => {
      return {
        thingName: joi.string().required(),
      };
    });
    if (validated.error) {
      return response.error(validated, 422);
    }
    const iotClient = new Iot();
    const thing = await iotClient.createThing({
      thingName: request.input('thingName'),
    }).promise();
    return response.json({
      created: true,
      thing,
    });
  } catch (error) {
    return response.json(error);
  }
}