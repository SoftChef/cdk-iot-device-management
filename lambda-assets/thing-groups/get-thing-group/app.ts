import { IoTClient, DescribeThingGroupCommand } from '@aws-sdk/client-iot';
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const iotClient = new IoTClient({});
    const thingGroup = await iotClient.send(
      new DescribeThingGroupCommand({
        thingGroupName: request.parameter('thingGroupName'),
      }),
    );
    return response.json(thingGroup);
  } catch (error) {
    if (error.Code === 'ResourceNotFoundException') {
      return response.error(error, 404);
    } else {
      return response.error(error);
    }
  }
}
