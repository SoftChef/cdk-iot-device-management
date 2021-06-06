import { Iot } from 'aws-sdk';
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const iotClient = new Iot();
    const thingGroup = await iotClient.describeThingGroup({
      thingGroupName: request.parameter('thingGroupName'),
    }).promise();
    return response.json({
      thingGroup,
    });
  } catch (error) {
    return response.json(error);
  }
}