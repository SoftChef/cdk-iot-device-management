// import { CreateJobCommand, IoTClient } from '@aws-sdk/client-iot';
// import { v4 as uuidv4 } from 'uuid';

export async function handler(event: { [key: string]: any }) {
  try {
    console.log(event)
    console.log(process.env)
    // const validated = request.validate(joi => {
    //   return {
    //     targets: joi.array().items(joi.string()).required(),
    //     targetSelection: joi.string().allow('SNAPSHOT', 'CONTINUOUS'),
    //     document: joi.string().required(),
    //     description: joi.string().allow(null),
    //   };
    // });
    // if (validated.error) {
    //   return response.error(validated.details, 422);
    // }
    // const iotClient = new IoTClient({});
    // const job = await iotClient.send(
    //   new CreateJobCommand({
    //     jobId: uuidv4(),
    //     targets: request.input('targets', []),
    //     document: request.input('document'),
    //     targetSelection: request.input('targetSelection', 'SNAPSHOT') === 'SNAPSHOT' ? 'SNAPSHOT' : 'CONTINUOUS',
    //     description: request.input('description', ''),
    //   }),
    // );
    return {
      scheduleId: event.scheduleId,
      success: true,
      result: {
        ...event,
        ...process.env,
      },
      // created: true,
      // job,
    };
  } catch (error) {
    return {
      success: false,
      result: error,
    };
  }
}