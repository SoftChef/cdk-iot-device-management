import * as AWS from 'aws-sdk';
import * as AWSMock from 'aws-sdk-mock';
// import * as createJobTemplate from '../../lambda-assets/jobs/create-job-template/app';
import * as createJob from '../../lambda-assets/jobs/create-job/app';
// import * as deleteJobExecution from '../../lambda-assets/jobs/delete-job-execution/app';
// import * as deleteJobTemplate from '../../lambda-assets/jobs/delete-job-template/app';
import * as deleteJob from '../../lambda-assets/jobs/delete-job/app';
// import * as getJobExecution from '../../lambda-assets/jobs/get-job-execution/app';
// import * as getJobTemplate from '../../lambda-assets/jobs/get-job-template/app';
// import * as getJob from '../../lambda-assets/jobs/get-job/app';
// import * as listJobTemplates from '../../lambda-assets/jobs/list-job-templates/app';
// import * as listJobs from '../../lambda-assets/jobs/list-jobs/app';
// import * as updateJob from '../../lambda-assets/jobs/update-job/app';

AWS.config.region = 'local';
AWSMock.setSDKInstance(AWS);

test('Create job API', async() => {
  AWSMock.mock('Iot', 'createJob', (parameters: { [key: string]: any }, callback: (error: any, response: any) => void) => {
    expect(parameters).toStrictEqual({ jobId: 'Test' });
    callback(null, {
      jobId: 'Test',
    });
  });
  const response = await createJob.handler({
    body: {
      jobId: 'Test',
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body.created).toEqual(true);
});

test('Get job API', async() => {
  // const response = await getJob.handler({});
});

test('List jobs API', async() => {
  // const response = await listJobs.handler({});
});

test('Update job API', async() => {
  // const response = await updateJob.handler({});
});

test('Delete job API', async() => {
  AWSMock.mock('Iot', 'deleteJob', (parameters: { [key: string]: any }, callback: (error: any, response: any) => void) => {
    expect(parameters).toStrictEqual({ jobId: 'Test' });
    callback(null, {
      jobId: 'Test',
    });
  });
  const response = await deleteJob.handler({
    pathParameters: {
      jobId: 'Test',
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body.deleted).toEqual(true);
});

test('Create job template API', async() => {
  // const response = await createJobTemplate.handler({});
});

test('Get job template API', async() => {
  // const response = await getJobTemplate.handler({});
});

test('List job templates API', async() => {
  // const response = await listJobTemplates.handler({});
});

test('Delete job template API', async() => {
  // const response = await deleteJobTemplate.handler({});
});

test('Get job execution API', async() => {
  // const response = await getJobExecution.handler({});
});

test('Delete job execution API', async() => {
  // const response = await deleteJobExecution.handler({});
});