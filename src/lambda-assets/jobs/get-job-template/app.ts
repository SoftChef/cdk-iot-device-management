import { Iot } from 'aws-sdk';
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const iotClient = new Iot();
    const jobTempate = await iotClient.describeJobTemplate({
      jobTemplateId: request.parameter('jobTemplateId'),
    }).promise();
    return response.json({
      jobTempate,
    });
  } catch (error) {
    return response.error(error);
  }
}