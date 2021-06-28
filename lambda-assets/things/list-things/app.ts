import { IoTClient, ListThingsCommand } from '@aws-sdk/client-iot';
import { Request, Response } from '@softchef/lambda-events';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const iotClient = new IoTClient({});
    const {things: things, nextToken: nextToken} = await iotClient.send(
      new ListThingsCommand({
        nextToken: request.get('nextToken'),
      })
    );
    return response.json({
      things, 
      nextToken,
    });
  } catch (error) {
    return response.error(error);
  }
}