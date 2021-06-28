import { IoTClient, DescribeThingCommand } from '@aws-sdk/client-iot';
import { Request, Response } from '@softchef/lambda-events';
import { IoTDataPlaneClient, GetThingShadowCommand } from "@aws-sdk/client-iot-data-plane";

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
    const client = new IoTDataPlaneClient({});
    const thingShadow = await client.send(
      new GetThingShadowCommand({
        thingName: request.parameter('thingName'),
      }),
    );
    const { payload = [] } = thingShadow;
    let payloadString: string = '';
    payload.forEach(num => {
      payloadString += String.fromCharCode(num);
    });
    return response.json({
      thing,
      payloadString,
    });
  } catch (error) {
    if (error.Code === 'ResourceNotFoundException') {
      return response.error(error, 404);
    } else {
      return response.error(error);
    }
  }
}
