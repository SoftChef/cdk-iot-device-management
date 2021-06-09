import { Iot } from 'aws-sdk';
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const iotClient = new Iot();
    const thingGroups = await iotClient.listThingGroups({
      nextToken: request.get('nextToken', undefined),
    }).promise();
    return response.json({
      thingGroups,
    });
  } catch (error) {
    return response.error(error);
  }
}