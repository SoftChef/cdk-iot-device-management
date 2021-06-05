import { Iot } from 'aws-sdk';
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const iotClient = new Iot();
    const thingType = await iotClient.describeThingType({
      thingTypeName: request.parameter('thingTypeName'),
    }).promise();
    return response.json({
      thingType,
    });
  } catch (error) {
    return response.json(error, 500);
  }
}