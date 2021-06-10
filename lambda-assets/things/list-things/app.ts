import { IoTClient, ListThingsCommand } from '@aws-sdk/client-iot';
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
<<<<<<< HEAD
    const iotClient = new Iot();
    const { things, nextToken } = await iotClient.listThings({
      nextToken: request.get('nextToken', undefined),
    }).promise();
=======
    const iotClient = new IoTClient({});
    const things = await iotClient.send(
      new ListThingsCommand({
        nextToken: request.get('nextToken', undefined),
      }),
    );
>>>>>>> b85f4b38ee09aca6157e415a3bbdf9cb69bf4d48
    return response.json({
      things,
      nextToken
    });
  } catch (error) {
    return response.error(error);
  }
}