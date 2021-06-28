import { IoTDataPlaneClient, GetThingShadowCommand } from "@aws-sdk/client-iot-data-plane";
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    console.log(request),
    console.log(request.parameter('thingName'));
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
    console.log(payloadString)

    return response.json(JSON.parse(payloadString));
  } catch (error) {
    return response.error(error);
  }
}