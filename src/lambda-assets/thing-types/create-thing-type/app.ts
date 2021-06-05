import { Iot } from 'aws-sdk';
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  const validated = request.validate(joi => {
    return {
      name: joi.string().required(),
    };
  });
  if (validated.error) {
    return response.error(validated, 422);
  }
  const iotClient = new Iot();
  const thingType = await iotClient.createThingType({
    thingTypeName: request.input('name'),
  }).promise();
  return response.json({
    created: true,
    thingType,
  });
}