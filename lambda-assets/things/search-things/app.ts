import {
  IoTClient,
  SearchIndexCommand,
  SearchIndexCommandInput,
} from '@aws-sdk/client-iot';
import {
  Request,
  Response,
} from '@softchef/lambda-events';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const parameters: SearchIndexCommandInput = {
      queryString: request.get('queryString', ''),
    };
    if (request.has('nextToken')) {
      parameters.nextToken = request.get('nextToken');
    }
    const iotClient = new IoTClient({});
    const { things, nextToken } = await iotClient.send(
      new SearchIndexCommand(parameters),
    );
    return response.json({
      things: things,
      nextToken: nextToken,
    });
  } catch (error) {
    return response.error(error);
  }
}
