import { IoTClient, ListThingsCommand } from '@aws-sdk/client-iot';
import { Request, Response } from '@softchef/lambda-events';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    let parameters: { [key: string]: any } = {};
    if (request.has('nextToken')) {
        parameters.ExclusiveStartKey = {
          Key: JSON.parse(
            Buffer.from(request.get('nextToken'), 'base64').toString('utf8')
          ),
      }
    };
    const iotClient = new IoTClient({});
    const { things: things, nextToken: nextToken }  = await iotClient.send(
      new ListThingsCommand({
        nextToken: request.get('nextToken', undefined),
      }),
    );
    return response.json({
      things,
      nextToken,
    });
  } catch (error) {
    return response.error(error);
  }
}