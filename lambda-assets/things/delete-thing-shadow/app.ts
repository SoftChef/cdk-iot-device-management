import { IoTDataPlaneClient, DeleteThingShadowCommand } from '@aws-sdk/client-iot-data-plane';
import { Request, Response } from '@softchef/lambda-events';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const ioTDataPlaneClient = new IoTDataPlaneClient({});
    await ioTDataPlaneClient.send(
      new DeleteThingShadowCommand({
        thingName: request.parameter('thingName'),
        shadowName: request.parameter('shadowName'),
      }),
    );
    return response.json({
      deleted: true,
    });
  } catch (error) {
    if (error.Code === 'ResourceNotFoundException') {
      return response.error(error, 404);
    } else {
      return response.error(error);
    }
  }
}
