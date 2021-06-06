import { Iot } from 'aws-sdk';
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const iotClient = new Iot();
    const things = await iotClient.listThings({
      nextToken: request.get('nextToken', undefined),
    }).promise();
    return response.json({
      things,
    });
  } catch (error) {
    return response.json(error);
  }
}