import { Iot } from 'aws-sdk';
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    const iotClient = new Iot();
    await iotClient.deleteJobTemplate({
      jobTemplateId: request.parameter('jobTemplateId'),
    }).promise();
    return response.json({
      deleted: true,
    });
  } catch (error) {
    return response.json(error);
  }
}