import {
  DescribeThingGroupCommand,
  DescribeThingGroupCommandInput,
  IoTClient,
} from '@aws-sdk/client-iot';
import {
  Request,
  Response,
} from '@softchef/lambda-events';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const parameters: DescribeThingGroupCommandInput = {
      thingGroupName: request.parameter('thingGroupName'),
    };
    const iotClient = new IoTClient({});
    const thingGroup = await iotClient.send(
      new DescribeThingGroupCommand(parameters),
    );
    return response.json({
      thingGroup: thingGroup,
    });
  } catch (error) {
    if (error.Code === 'ResourceNotFoundException') {
      return response.error(error, 404);
    } else {
      return response.error(error);
    }
  }
}
