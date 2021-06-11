/**
 * @todo
 * - Empty test function
 * - Job full properties
 */
import { IoTClient, DescribeJobCommand, CreateJobCommand, ListJobsCommand, DeleteJobCommand } from '@aws-sdk/client-iot';
import { mockClient, AwsError } from 'aws-sdk-client-mock';
// import * as createJobTemplate from '../../lambda-assets/jobs/create-job-template/app';
import * as createJob from '../../lambda-assets/jobs/create-job/app';
// import * as deleteJobExecution from '../../lambda-assets/jobs/delete-job-execution/app';
// import * as deleteJobTemplate from '../../lambda-assets/jobs/delete-job-template/app';
import * as deleteJob from '../../lambda-assets/jobs/delete-job/app';
// import * as getJobExecution from '../../lambda-assets/jobs/get-job-execution/app';
// import * as getJobTemplate from '../../lambda-assets/jobs/get-job-template/app';
import * as getJob from '../../lambda-assets/jobs/get-job/app';
// import * as listJobTemplates from '../../lambda-assets/jobs/list-job-templates/app';
import * as listJobs from '../../lambda-assets/jobs/list-jobs/app';
// import * as updateJob from '../../lambda-assets/jobs/update-job/app';

const iotClientMock = mockClient(IoTClient);

const expectedJob = {
  jobArn: 'arn:aws:iot:ap-northeast-1:012345678901:job/85f6509f-023c-48fb-8252-981653ffd561',
  jobId: '85f6509f-023c-48fb-8252-981653ffd561',
  targets: [
    'arn:aws:iot:ap-northeast-1:079794712254:thing/WorkerA',
  ],
  targetSelection: 'SNAPSHOT',
  description: 'Test Job',
  status: 'IN_PROGRESS',
};

const expectedInvalidJob = {
  jobId: 'not-exists-job-id',
};

const expected = {
  newJob: {
    targets: expectedJob.targets,
    targetSelection: expectedJob.targetSelection,
    document: JSON.stringify({
      operation: 'Work',
    }),
    description: expectedJob.description,
  },
  forceDeleteJob: {
    jobId: expectedJob.jobId,
    force: true,
  },
  job: expectedJob,
  listJobs: {
    jobs: [
      expectedJob,
    ],
    nextToken: '12345',
  },
  invalidJob: expectedInvalidJob,
  invalidJobError: <AwsError> {
    Code: 'ResourceNotFoundException',
    message: `ResourceNotFoundException: Job ${expectedInvalidJob.jobId} cannot be found.`,
  },
};

test('Create job success', async() => {
  iotClientMock.on(CreateJobCommand, {
    targets: expected.newJob.targets,
    document: expected.newJob.document,
    targetSelection: expected.newJob.targetSelection,
  }).resolves({
    jobArn: expected.job.jobArn,
    jobId: expected.job.jobId,
    description: expected.job.description,
  });
  const response = await createJob.handler({
    body: {
      targets: expected.newJob.targets,
      targetSelection: expected.newJob.targetSelection,
      document: expected.newJob.document,
      description: expected.newJob.description,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body.created).toEqual(true);
  expect(body.job).toEqual({
    jobArn: expected.job.jobArn,
    jobId: expected.job.jobId,
    description: expected.job.description,
  });
});

test('Create job with invalid inputs expect failure', async() => {
  const response = await createJob.handler({});
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(422);
  expect(body.error).toEqual([
    {
      label: 'targets',
      key: 'targets',
      value: null,
      message: expect.any(String),
    },
    {
      label: 'targetSelection',
      key: 'targetSelection',
      value: null,
      message: expect.any(String),
    },
    {
      label: 'document',
      key: 'document',
      value: null,
      message: expect.any(String),
    },
  ]);
});

test('Get job suucess', async() => {
  iotClientMock.on(DescribeJobCommand, {
    jobId: expected.job.jobId,
  }).resolves({
    job: expected.job,
  });
  const response = await getJob.handler({
    pathParameters: {
      jobId: expected.job.jobId,
    },
  });
  const body = JSON.parse(response.body);
  expect(body.job).toEqual(expected.job);
  expect(response.statusCode).toEqual(200);
});

test('Get job with invalid id expect failure', async() => {
  iotClientMock.on(DescribeJobCommand, {
    jobId: expected.invalidJob.jobId,
  }).rejects(expected.invalidJobError);
  const response = await getJob.handler({
    pathParameters: {
      jobId: expected.invalidJob.jobId,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(404);
  expect(body.error).toEqual(
    Object.assign(new Error(), expected.invalidJobError).toString(),
  );
});

test('List jobs success', async() => {
  iotClientMock.on(ListJobsCommand, {
  }).resolves({
    jobs: expected.listJobs.jobs,
  });
  const response = await listJobs.handler({});
  const body = JSON.parse(response.body);
  expect(Array.isArray(body.jobs)).toBe(true);
  expect(body.jobs.length).toEqual(1);
  expect(body.jobs).toEqual(expected.listJobs.jobs);
  expect(response.statusCode).toEqual(200);
});

test('List jobs with nextToken success', async() => {
  iotClientMock.on(ListJobsCommand, {
    nextToken: expected.listJobs.nextToken,
  }).resolves({
    jobs: expected.listJobs.jobs,
    nextToken: expected.listJobs.nextToken,
  });
  const response = await listJobs.handler({
    queryStringParameters: {
      nextToken: expected.listJobs.nextToken,
    },
  });
  const body = JSON.parse(response.body);
  expect(Array.isArray(body.jobs)).toBe(true);
  expect(body.jobs.length).toEqual(1);
  expect(body.jobs).toEqual(expected.listJobs.jobs);
  expect(body.nextToken).toEqual(expected.listJobs.nextToken);
  expect(response.statusCode).toEqual(200);
});

test('Update job success', async() => {
  // const response = await updateJob.handler({});
  // const body = JSON.parse(response.body);
});

test('Update job success', async() => {
  // const response = await updateJob.handler({});
  // const body = JSON.parse(response.body);
});

test('Delete job success', async() => {
  iotClientMock.on(DeleteJobCommand, {
    jobId: expected.forceDeleteJob.jobId,
    force: expected.forceDeleteJob.force,
  }).resolves({});
  const response = await deleteJob.handler({
    pathParameters: {
      jobId: expected.forceDeleteJob.jobId,
    },
    queryStringParameters: {
      force: expected.forceDeleteJob.force,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body.deleted).toEqual(true);
});

test('Delete job with invalid id expect failure', async() => {
  iotClientMock.on(DeleteJobCommand, {
    jobId: expected.invalidJob.jobId,
  }).rejects(expected.invalidJobError);
  const response = await deleteJob.handler({
    pathParameters: {
      jobId: expected.invalidJob.jobId,
    },
  });
  expect(response.statusCode).toEqual(404);
});

test('Create job template success', async() => {
  // const response = await createJobTemplate.handler({});
  // const body = JSON.parse(response.body);
});

test('Get job template success', async() => {
  // const response = await getJobTemplate.handler({});
  // const body = JSON.parse(response.body);
});

test('List job templates success', async() => {
  // const response = await listJobTemplates.handler({});
  // const body = JSON.parse(response.body);
});

test('Delete job template success', async() => {
  // const response = await deleteJobTemplate.handler({});
  // const body = JSON.parse(response.body);
});

test('Get job execution success', async() => {
  // const response = await getJobExecution.handler({});
  // const body = JSON.parse(response.body);
});

test('Delete job execution success', async() => {
  // const response = await deleteJobExecution.handler({});
  // const body = JSON.parse(response.body);
});

// Mock
// const jobs: {
//   jobs: [
//     {
//       jobArn: 'arn:aws:iot:ap-northeast-1:079794712254:job/85f6509f-023c-48fb-8252-981653ffd561',
//       jobId: '85f6509f-023c-48fb-8252-981653ffd561',
//       thingGroupId: null,
//       targetSelection: 'SNAPSHOT',
//       status: 'IN_PROGRESS',
//       createdAt: '2021-06-07T10:03:13.025Z',
//       lastUpdatedAt: '2021-06-07T10:03:15.185Z',
//       completedAt: null,
//     },
//   ],
// };
// const job = {
//   "job": {
//     "forceCanceled": null,
//     "reasonCode": null,
//     "comment": null,
//     "presignedUrlConfig": {
//       "roleArn": null,
//       "expiresInSec": null
//     },
//     "jobExecutionsRolloutConfig": {
//       "maximumPerMinute": null
//     },
//     "jobProcessDetails": {
//       "numberOfCanceledThings": 0,
//       "numberOfSucceededThings": 0,
//       "numberOfFailedThings": 0,
//       "numberOfRejectedThings": 0,
//       "numberOfQueuedThings": 1,
//       "numberOfInProgressThings": 0,
//       "numberOfRemovedThings": 0,
//       "numberOfTimedOutThings": 0
//     },
//     "timeoutConfig": {
//       "inProgressTimeoutInMinutes": null
//     },
//     "namespaceId": null,
//       "jobTemplateArn": null
//     }
//   }
// };