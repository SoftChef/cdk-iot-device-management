import {
  DescribeThingCommand,
  DescribeThingCommandInput,
  IoTClient,
} from '@aws-sdk/client-iot';
import { Request, Response } from '@softchef/lambda-events';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const parameters: DescribeThingCommandInput = {
      thingName: request.parameter('thingName'),
    };
    const iotClient = new IoTClient({});
    const thing = await iotClient.send(
      new DescribeThingCommand(parameters),
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
