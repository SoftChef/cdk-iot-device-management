import { Iot } from 'aws-sdk';
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const iotClient = new Iot();
    const thingGroup = await iotClient.updateDynamicThingGroup({
      thingGroupName: request.parameter('thingGroupName'),
      thingGroupProperties: {
        thingGroupDescription: request.input('description', undefined),
      },
    }).promise();
    return response.json({
      thingGroup,
    });
  } catch (error) {
    return response.json(error);
  }
}