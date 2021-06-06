import { Iot } from 'aws-sdk';
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const iotClient = new Iot();
    const thingTypes = await iotClient.listThingTypes({
      nextToken: request.get('nextToken', undefined),
    }).promise();
    return response.json(thingTypes);
  } catch (error) {
    return response.json(error);
  }
}