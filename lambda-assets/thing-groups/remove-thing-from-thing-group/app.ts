import { Iot } from 'aws-sdk';
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const iotClient = new Iot();
    await iotClient.removeThingFromThingGroup({
      thingGroupName: request.parameter('thingGroupName'),
      thingName: request.parameter('thingName'),
    }).promise();
    return response.json({
      added: true,
    });
  } catch (error) {
    return response.error(error);
  }
}