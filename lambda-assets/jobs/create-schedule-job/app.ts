import {
  CreateJobCommand,
  IoTClient,
} from '@aws-sdk/client-iot';
import { ScheduleFunction } from '@softchef/lambda-events';
import * as Joi from 'joi';
import { v4 as uuidv4 } from 'uuid';

export async function handler(event: { [key: string]: any }) {
  const request = new ScheduleFunction.Request(event);
  const response = new ScheduleFunction.Response(event);
  try {
    const schema = Joi.object().keys({
      targets: Joi.array().items(
        Joi.string(),
      ).required(),
      targetSelection: Joi.string().allow('SNAPSHOT', 'CONTINUOUS').required(),
      document: Joi.string().required(),
      description: Joi.string().allow(null),
    });
    const validated = schema.validate(
      request.context(),
      {
        abortEarly: false,
      },
    );
    if (validated.error) {
      return response.failed(validated.error.details.map((detail) => {
        return {
          ...detail.context,
          message: detail.message,
        };
      }));
    }
    const iotClient = new IoTClient({});
    const job = await iotClient.send(
      new CreateJobCommand({
        jobId: uuidv4(),
        targets: request.context('targets'),
        document: request.context('document'),
        targetSelection: request.context('targetSelection'),
        description: request.context('description') ?? '',
      }),
    );
    return response.success({
      job,
    });
  } catch (error) {
    return response.failed(error);
  }
}