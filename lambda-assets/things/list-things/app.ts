import { IoTClient, ListThingsCommand } from '@aws-sdk/client-iot';
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const iotClient = new IoTClient({});
    const things = await iotClient.send(
      new ListThingsCommand({
        nextToken: request.get('nextToken', undefined),
      }),
    );
    console.log(response)
    return response.json(things);
  } catch (error) {
    return response.error(error);
  }
}