import { Iot } from 'aws-sdk';
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const iotClient = new Iot();
    const thing = await iotClient.deleteThing({
      thingName: request.parameter('thingName'),
    }).promise();
    return response.json({
      deleted: true,
      thing,
    });
  } catch (error) {
    return response.json(error, 500);
  }
}