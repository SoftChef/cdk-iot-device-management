import { IoTClient, DescribeThingCommand } from '@aws-sdk/client-iot';
import { Request, Response } from '@softchef/lambda-events';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const iotClient = new IoTClient({});
    const thing = await iotClient.send(
      new DescribeThingCommand({
        thingName: request.parameter('thingName'),
      }),
    );
    return response.json({
      thing: thing,
    });
  } catch (error) {
    if (error.Code === 'ResourceNotFoundException') {
      return response.error(error, 404);
    } else {
      return response.error(error);
    }
  }
}
