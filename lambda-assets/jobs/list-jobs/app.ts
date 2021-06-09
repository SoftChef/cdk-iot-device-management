import { Iot } from 'aws-sdk';
import { Request, Response } from '../../utils';

export async function handler(event: { [key: string]: any }) {
  const request = new Request(event);
  const response = new Response();
  try {
    let parameters: { [key: string]: any } = {};
    if (request.has('nextToken')) {
      parameters.nextToken = request.get('nextToken');
    }
    const iotClient = new Iot();
    const jobs = await iotClient.listJobs(parameters).promise();
    return response.json(jobs);
  } catch (error) {
    console.log('error', error);
    return response.error(error);
  }
}