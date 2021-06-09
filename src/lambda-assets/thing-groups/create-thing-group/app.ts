import { Iot } from 'aws-sdk';
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const validated = request.validate(joi => {
      return {
        thingGroupName: joi.string().required(),
      };
    });
    if (validated.error) {
      return response.error(validated, 422);
    }
    const iotClient = new Iot();
    const thingGroup = await iotClient.createThingGroup({
      thingGroupName: request.input('thingGroupName'),
    }).promise();
    return response.json({
      created: true,
      thingGroup,
    });
  } catch (error) {
    return response.error(error);
  }
}