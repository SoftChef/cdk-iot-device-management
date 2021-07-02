/**
 * @todo
 * - Empty test function
 * - Job full properties
 */
import {
  IoTClient,
  AssociateTargetsWithJobCommand,
  CancelJobCommand,
  CancelJobExecutionCommand,
  CreateJobCommand,
  CreateJobTemplateCommand,
  DeleteJobCommand,
  DeleteJobTemplateCommand,
  DeleteJobExecutionCommand,
  DescribeJobCommand,
  GetJobDocumentCommand,
  DescribeJobExecutionCommand,
  DescribeJobTemplateCommand,
  ListJobsCommand,
  ListJobTemplatesCommand,
  ListJobExecutionsForJobCommand,
  ListJobExecutionsForThingCommand,
  UpdateJobCommand,
} from '@aws-sdk/client-iot';
import {
  mockClient,
  AwsError,
} from 'aws-sdk-client-mock';
import * as associateTargetsWithJob from '../../lambda-assets/jobs/associate-targets-with-job/app';
import * as cancelJobExecution from '../../lambda-assets/jobs/cancel-job-execution/app';
import * as cancelJob from '../../lambda-assets/jobs/cancel-job/app';
import * as createJobTemplate from '../../lambda-assets/jobs/create-job-template/app';
import * as createJob from '../../lambda-assets/jobs/create-job/app';
import * as deleteJobExecution from '../../lambda-assets/jobs/delete-job-execution/app';
import * as deleteJobTemplate from '../../lambda-assets/jobs/delete-job-template/app';
import * as deleteJob from '../../lambda-assets/jobs/delete-job/app';
import * as getJobDocument from '../../lambda-assets/jobs/get-job-document/app';
import * as getJobExecution from '../../lambda-assets/jobs/get-job-execution/app';
import * as getJobTemplate from '../../lambda-assets/jobs/get-job-template/app';
import * as getJob from '../../lambda-assets/jobs/get-job/app';
import * as ListJobExecutionsForJob from '../../lambda-assets/jobs/list-job-execution-job/app';
import * as ListJobExecutionsForThing from '../../lambda-assets/jobs/list-job-execution-thing/app';
import * as listJobTemplates from '../../lambda-assets/jobs/list-job-templates/app';
import * as listJobs from '../../lambda-assets/jobs/list-jobs/app';
import * as updateJob from '../../lambda-assets/jobs/update-job/app';

const expectedJob = {
  jobArn: 'arn:aws:iot:ap-northeast-1:012345678901:job/85f6509f-023c-48fb-8252-981653ffd561',
  jobId: '85f6509f-023c-48fb-8252-981653ffd561',
  targets: [
    'arn:aws:iot:ap-northeast-1:012345678901:thing/WorkerA',
  ],
  targetSelection: 'SNAPSHOT',
  description: 'Test Job',
  status: 'IN_PROGRESS',
};

const expectedInvalidJob = {
  jobId: 'not-exists-job-id',
};

const expectedJobExecution = {
  jobId: '85f6509f-023c-48fb-8252-981653ffd561',
  thingName: 'TestThing',
  thingArn: 'arn:aws:iot:ap-northeast-1:012345678901:thing/TestThing',
  status: 'SUCCESS',
  statusDetails: {
    detailsMap: {
      action: 'test',
      progress: '100%',
    },
  },
  executionNumber: 1,
  versionNumber: 2,
};

const expectedInvalidJobExecution = {
  jobId: 'not-exists-job-id',
  thingName: 'TestThing',
};

const expectedInvalidThingForJobExecution = {
  jobId: '85f6509f-023c-48fb-8252-981653ffd561',
  thingName: 'not-exists-thing-name',
};

const expectedJobTemplate = {
  jobTemplateArn: 'arn:aws:iot:ap-northeast-1:012345678901:job/85f6509f-023c-48fb-8252-981653ffd562',
  jobTemplateId: '85f6509f-023c-48fb-8252-981653ffd562',
  document: JSON.stringify({
    operation: 'Work',
  }),
  description: 'Test Job Template',
  presignedUrlConfig: {},
  jobExecutionsRolloutConfig: {},
  timeoutConfig: {},
};

const expectedInvalidJobTemplate = {
  jobTemplateId: 'not-exists-job-template-id',
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
  document: 'Test',
  forceDeleteJob: {
    jobId: expectedJob.jobId,
    force: true,
  },
  cancelJob: {
    jobId: expectedJob.jobId,
    comment: 'comment',
    force: true,
    expectedVersion: 1,
  },
  job: expectedJob,
  listJobs: {
    jobs: [
      expectedJob,
    ],
    nextToken: '12345',
  },
  listJobExecutionForJob: {
    executionSummaries: [{
      thingArn: expectedJobExecution.thingArn,
      jobExecutionSummary: {
        status: 'SUCCESS',
        queuedAt: new Date(2021, 6, 17, 3, 24, 0).toISOString(),
        startedAt: new Date(2021, 6, 18, 3, 24, 0).toISOString(),
        lastUpdatedAt: new Date(2021, 6, 16, 3, 24, 0).toISOString(),
        executionNumber: 1,
      },
    }],
    nextToken: '12345',
  },
  listJobExecutionForThing: {
    executionSummaries: [{
      jobId: expectedJobExecution.jobId,
      jobExecutionSummary: {
        status: 'SUCCESS',
        queuedAt: new Date(2021, 6, 17, 3, 24, 0).toISOString(),
        startedAt: new Date(2021, 6, 18, 3, 24, 0).toISOString(),
        lastUpdatedAt: new Date(2021, 6, 16, 3, 24, 0).toISOString(),
        executionNumber: 1,
      },
    }],
    nextToken: '12345',
  },
  invalidJob: expectedInvalidJob,
  invalidTargets: [
    'not-exists-targets',
  ],
  invalidJobError: <AwsError>{
    Code: 'ResourceNotFoundException',
    message: `ResourceNotFoundException: Job ${expectedInvalidJob.jobId} cannot be found.`,
  },
  jobExecution: expectedJobExecution,
  invalidJobExecution: expectedInvalidJobExecution,
  invalidJobExecutionError: <AwsError>{
    Code: 'ResourceNotFoundException',
    message: `ResourceNotFoundException: Job execution cannot be found as the Job ${expectedInvalidJobExecution.jobId} does not exist`,
  },
  invalidThingForJobExecution: expectedInvalidThingForJobExecution,
  invalidThingForJobExecutionError: <AwsError>{
    Code: 'ResourceNotFoundException',
    message: `ResourceNotFoundException: Job execution for thing a cannot be found within job ${expectedInvalidThingForJobExecution.thingName}`,
  },
  newJobTemplate: {
    document: expectedJobTemplate.document,
    description: expectedJobTemplate.description,
  },
  jobTemplate: expectedJobTemplate,
  listJobTemplates: {
    jobTemplates: [
      {
        jobTemplateArn: expectedJobTemplate.jobTemplateArn,
        jobTemplateId: expectedJobTemplate.jobTemplateId,
        description: expectedJobTemplate.description,
      },
    ],
    nextToken: '12345',
  },
  invalidJobTemplate: expectedInvalidJobTemplate,
  invalidJobTemplateError: <AwsError>{
    Code: 'ResourceNotFoundException',
    message: `ResourceNotFoundException: Job template ${expectedInvalidJobTemplate.jobTemplateId} cannot be found.`,
  },
};

test('Associate targets with job success', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(AssociateTargetsWithJobCommand, {
    jobId: expected.job.jobId,
    targets: expected.job.targets,
  }).resolves({});
  const response = await associateTargetsWithJob.handler({
    pathParameters: {
      jobId: expected.job.jobId,
    },
    body: {
      targets: expected.job.targets,
    },
  });
  const body = JSON.parse(response.body);
  expect(body.associate).toEqual(true);
  expect(response.statusCode).toEqual(200);
  iotClientMock.restore();
});

test('Associate targets with job with invalid jobId expect failure', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(AssociateTargetsWithJobCommand, {
    jobId: expected.invalidJob.jobId,
    targets: expected.invalidTargets,
  }).rejects(expected.invalidJobError);
  const response = await associateTargetsWithJob.handler({
    pathParameters: {
      jobId: expected.invalidJob.jobId,
    },
    body: {
      targets: expected.invalidTargets,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(404);
  expect(body.error).toEqual(
    Object.assign(new Error(), expected.invalidJobError).toString(),
  );
  iotClientMock.restore();
});

test('Cancel job success', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(CancelJobCommand, {
    jobId: expected.job.jobId,
    comment: expected.cancelJob.comment,
    force: expected.cancelJob.force,
  }).resolves({});
  const response = await cancelJob.handler({
    pathParameters: {
      jobId: expected.job.jobId,
    },
    body: {
      comment: expected.cancelJob.comment,
      force: expected.cancelJob.force,
    },
  });
  const body = JSON.parse(response.body);
  expect(body.canceled).toEqual(true);
  expect(response.statusCode).toEqual(200);
  iotClientMock.restore();
});

test('Cancel job with invalid jobId expect failure', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(CancelJobCommand, {
    jobId: expected.invalidJob.jobId,
  }).rejects(expected.invalidJobError);
  const response = await cancelJob.handler({
    pathParameters: {
      jobId: expected.invalidJob.jobId,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(404);
  expect(body.error).toEqual(
    Object.assign(new Error(), expected.invalidJobError).toString(),
  );
  iotClientMock.restore();
});

test('Create job success', async () => {
  const iotClientMock = mockClient(IoTClient);
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
  iotClientMock.restore();
});

test('Create job with invalid inputs expect failure', async () => {
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

test('Get job success', async () => {
  const iotClientMock = mockClient(IoTClient);
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
  iotClientMock.restore();
});

test('Get job with invalid jobId expect failure', async () => {
  const iotClientMock = mockClient(IoTClient);
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
  iotClientMock.restore();
});

test('Get job document success', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(GetJobDocumentCommand, {
    jobId: expected.job.jobId,
  }).resolves({
    document: 'Test',
  });
  const response = await getJobDocument.handler({
    pathParameters: {
      jobId: expected.job.jobId,
    },
  });
  const body = JSON.parse(response.body);
  expect(body.document).toEqual(expected.document);
  expect(response.statusCode).toEqual(200);
  iotClientMock.restore();
});

test('Get job document with invalid jobId expect failure', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(GetJobDocumentCommand, {
    jobId: expected.invalidJob.jobId,
  }).rejects(expected.invalidJobError);
  const response = await getJobDocument.handler({
    pathParameters: {
      jobId: expected.invalidJob.jobId,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(404);
  expect(body.error).toEqual(
    Object.assign(new Error(), expected.invalidJobError).toString(),
  );
  iotClientMock.restore();
});

test('List jobs success', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(ListJobsCommand, {
  }).resolves({
    jobs: expected.listJobs.jobs,
  });
  const response = await listJobs.handler({});
  const body = JSON.parse(response.body);
  expect(Array.isArray(body.jobs)).toBe(true);
  expect(body.jobs).toEqual(expected.listJobs.jobs);
  expect(response.statusCode).toEqual(200);
  iotClientMock.restore();
});

test('List jobs with nextToken success', async () => {
  const iotClientMock = mockClient(IoTClient);
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
  expect(body.jobs).toEqual(expected.listJobs.jobs);
  expect(body.nextToken).toEqual(expected.listJobs.nextToken);
  expect(response.statusCode).toEqual(200);
  iotClientMock.restore();
});

test('Update job success', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(UpdateJobCommand, {
    jobId: expected.job.jobId,
    description: expected.job.description,
  }).resolves({});
  const response = await updateJob.handler({
    pathParameters: {
      jobId: expected.job.jobId,
    },
    body: {
      description: expected.job.description,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body.updated).toEqual(true);
  iotClientMock.restore();
});

test('Update job with invalid inputs expect failure', async () => {
  const response = await updateJob.handler({
    pathParameters: {
      jobId: expected.job.jobId,
    },
    body: {
      description: 1,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(422);
  expect(body.error).toEqual([
    {
      label: 'description',
      key: 'description',
      value: 1,
      message: expect.any(String),
    },
  ]);
});

test('Update job with invalid jobId expect failure', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(UpdateJobCommand, {
    jobId: expected.invalidJob.jobId,
  }).rejects(expected.invalidJobError);
  const response = await updateJob.handler({
    pathParameters: {
      jobId: expected.invalidJob.jobId,
    },
    body: {
      description: expected.job.description,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(404);
  expect(body.error).toEqual(
    Object.assign(new Error(), expected.invalidJobError).toString(),
  );
  iotClientMock.restore();
});

test('Update job targets success', async () => { });

test('Update job targets with invalid inputs expect failure', async () => { });

test('Update job targets with invalid jobId expect failure', async () => { });

test('Delete job success', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(DeleteJobCommand, {
    jobId: expected.forceDeleteJob.jobId,
    force: expected.forceDeleteJob.force,
  }).resolves({});
  const response = await deleteJob.handler({
    pathParameters: {
      jobId: expected.forceDeleteJob.jobId,
    },
    body: {
      force: expected.forceDeleteJob.force,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body.deleted).toEqual(true);
  iotClientMock.restore();
});

test('Delete job with invalid jobId expect failure', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(DeleteJobCommand, {
    jobId: expected.invalidJob.jobId,
  }).rejects(expected.invalidJobError);
  const response = await deleteJob.handler({
    pathParameters: {
      jobId: expected.invalidJob.jobId,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(404);
  expect(body.error).toEqual(
    Object.assign(new Error(), expected.invalidJobError).toString(),
  );
  iotClientMock.restore();
});

test('Create job template success', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(CreateJobTemplateCommand, {
    document: expected.newJobTemplate.document,
    description: expected.newJobTemplate.description,
  }).resolves({
    jobTemplateArn: expected.jobTemplate.jobTemplateArn,
    jobTemplateId: expected.jobTemplate.jobTemplateId,
  });
  const response = await createJobTemplate.handler({
    body: {
      document: expected.newJobTemplate.document,
      description: expected.newJobTemplate.description,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body.created).toEqual(true);
  iotClientMock.restore();
});

test('Create job template with invalid inputs expect failure', async () => {
  const response = await createJobTemplate.handler({});
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(422);
  expect(body.error).toEqual([
    {
      label: 'document',
      value: null,
      key: 'document',
      message: expect.any(String),
    },
    {
      label: 'description',
      value: null,
      key: 'description',
      message: expect.any(String),
    },
  ]);
});

test('Get job template success', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(DescribeJobTemplateCommand, {
    jobTemplateId: expected.jobTemplate.jobTemplateId,
  }).resolves(expected.jobTemplate);
  const response = await getJobTemplate.handler({
    pathParameters: {
      jobTemplateId: expected.jobTemplate.jobTemplateId,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body.jobTemplate).toEqual(expected.jobTemplate);
  iotClientMock.restore();
});

test('Get job template with invalid jobTemplateId expect failure', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(DescribeJobTemplateCommand, {
    jobTemplateId: expected.invalidJobTemplate.jobTemplateId,
  }).rejects(expected.invalidJobTemplateError);
  const response = await getJobTemplate.handler({
    pathParameters: {
      jobTemplateId: expected.invalidJobTemplate.jobTemplateId,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(404);
  expect(body.error).toEqual(
    Object.assign(new Error(), expected.invalidJobTemplateError).toString(),
  );
  iotClientMock.restore();
});

test('List job templates success', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(ListJobTemplatesCommand, {
  }).resolves({
    jobTemplates: expected.listJobTemplates.jobTemplates,
  });
  const response = await listJobTemplates.handler({});
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(Array.isArray(body.jobTemplates)).toBe(true);
  expect(body.jobTemplates).toEqual(expected.listJobTemplates.jobTemplates);
  iotClientMock.restore();
});

test('List job templates with nextToken success', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(ListJobTemplatesCommand, {
    nextToken: expected.listJobTemplates.nextToken,
  }).resolves({
    jobTemplates: expected.listJobTemplates.jobTemplates,
    nextToken: expected.listJobTemplates.nextToken,
  });
  const response = await listJobTemplates.handler({
    queryStringParameters: {
      nextToken: expected.listJobTemplates.nextToken,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(Array.isArray(body.jobTemplates)).toBe(true);
  expect(body.jobTemplates).toEqual(expected.listJobTemplates.jobTemplates);
  expect(body.nextToken).toEqual(expected.listJobTemplates.nextToken);
  iotClientMock.restore();
});

test('Delete job template success', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(DeleteJobTemplateCommand, {
    jobTemplateId: expected.jobTemplate.jobTemplateId,
  }).resolves({});
  const response = await deleteJobTemplate.handler({
    pathParameters: {
      jobTemplateId: expected.jobTemplate.jobTemplateId,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body.deleted).toEqual(true);
  iotClientMock.restore();
});

test('Delete job template with invalid jobTemplateId expect failure', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(DeleteJobTemplateCommand, {
    jobTemplateId: expected.invalidJobTemplate.jobTemplateId,
  }).rejects(expected.invalidJobTemplateError);
  const response = await deleteJobTemplate.handler({
    pathParameters: {
      jobTemplateId: expected.invalidJobTemplate.jobTemplateId,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(404);
  expect(body.error).toEqual(
    Object.assign(new Error(), expected.invalidJobTemplateError).toString(),
  );
  iotClientMock.restore();
});

test('Get job execution success', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(DescribeJobExecutionCommand, {
    jobId: expected.jobExecution.jobId,
    thingName: expected.jobExecution.thingName,
  }).resolves({
    execution: expected.jobExecution,
  });
  const response = await getJobExecution.handler({
    pathParameters: {
      jobId: expected.jobExecution.jobId,
      thingName: expected.jobExecution.thingName,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body.execution).toEqual(expected.jobExecution);
  iotClientMock.restore();
});

test('Get job execution with invalid jobId expect failure', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(DescribeJobExecutionCommand, {
    jobId: expected.invalidJobExecution.jobId,
    thingName: expected.invalidJobExecution.thingName,
  }).rejects(expected.invalidJobExecutionError);
  const response = await getJobExecution.handler({
    pathParameters: {
      jobId: expected.invalidJobExecution.jobId,
      thingName: expected.invalidJobExecution.thingName,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(404);
  expect(body.error).toEqual(
    Object.assign(new Error(), expected.invalidJobExecutionError).toString(),
  );
  iotClientMock.restore();
});

test('Get job execution with invalid thingName expect failure', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(DescribeJobExecutionCommand, {
    jobId: expected.invalidThingForJobExecution.jobId,
    thingName: expected.invalidThingForJobExecution.thingName,
  }).rejects(expected.invalidThingForJobExecutionError);
  const response = await getJobExecution.handler({
    pathParameters: {
      jobId: expected.invalidThingForJobExecution.jobId,
      thingName: expected.invalidThingForJobExecution.thingName,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(404);
  expect(body.error).toEqual(
    Object.assign(new Error(), expected.invalidThingForJobExecutionError).toString(),
  );
  iotClientMock.restore();
});

test('Cancel job execution success', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(CancelJobExecutionCommand, {
    jobId: expected.jobExecution.jobId,
    thingName: expected.jobExecution.thingName,
    expectedVersion: expected.jobExecution.executionNumber,
    statusDetails: expected.jobExecution.statusDetails.detailsMap,
    force: expected.cancelJob.force,
  }).resolves({});
  const response = await cancelJobExecution.handler({
    pathParameters: {
      jobId: expected.jobExecution.jobId,
      thingName: expected.jobExecution.thingName,
    },
    body: {
      expectedVersion: expected.cancelJob.expectedVersion,
      statusDetails: expected.jobExecution.statusDetails.detailsMap,
      force: expected.cancelJob.force,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body.canceled).toEqual(true);
  iotClientMock.restore();
});

test('Cancel job execution with invalid jobId expect failure', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(CancelJobExecutionCommand, {
    jobId: expected.invalidJobExecution.jobId,
    thingName: expected.invalidJobExecution.thingName,
  }).rejects(expected.invalidJobExecutionError);
  const response = await cancelJobExecution.handler({
    pathParameters: {
      jobId: expected.invalidJobExecution.jobId,
      thingName: expected.invalidJobExecution.thingName,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(404);
  expect(body.error).toEqual(
    Object.assign(new Error(), expected.invalidJobExecutionError).toString(),
  );
  iotClientMock.restore();
});

test('Cancel job execution with invalid thingName expect failure', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(CancelJobExecutionCommand, {
    jobId: expected.invalidThingForJobExecution.jobId,
    thingName: expected.invalidThingForJobExecution.thingName,
  }).rejects(expected.invalidJobExecutionError);
  const response = await cancelJobExecution.handler({
    pathParameters: {
      jobId: expected.invalidThingForJobExecution.jobId,
      thingName: expected.invalidThingForJobExecution.thingName,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(404);
  expect(body.error).toEqual(
    Object.assign(new Error(), expected.invalidJobExecutionError).toString(),
  );
  iotClientMock.restore();
});

test('Delete job execution success', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(DeleteJobExecutionCommand, {
    jobId: expected.jobExecution.jobId,
    thingName: expected.jobExecution.thingName,
    executionNumber: expected.jobExecution.executionNumber,
    force: expected.forceDeleteJob.force,
  }).resolves({});
  const response = await deleteJobExecution.handler({
    pathParameters: {
      jobId: expected.jobExecution.jobId,
      thingName: expected.jobExecution.thingName,
    },
    body: {
      executionNumber: expected.jobExecution.executionNumber,
      force: expected.forceDeleteJob.force,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body.deleted).toEqual(true);
  iotClientMock.restore();
});

test('Delete job execution with invalid jobId expect failure', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(DeleteJobExecutionCommand, {
    jobId: expected.invalidJobExecution.jobId,
    thingName: expected.invalidJobExecution.thingName,
    executionNumber: expected.jobExecution.executionNumber,
    force: expected.forceDeleteJob.force,
  }).rejects(expected.invalidJobExecutionError);
  const response = await deleteJobExecution.handler({
    pathParameters: {
      jobId: expected.invalidJobExecution.jobId,
      thingName: expected.invalidJobExecution.thingName,
    },
    body: {
      executionNumber: expected.jobExecution.executionNumber,
      force: expected.forceDeleteJob.force,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(404);
  expect(body.error).toEqual(
    Object.assign(new Error(), expected.invalidJobExecutionError).toString(),
  );
  iotClientMock.restore();
});

test('Delete job execution with invalid thingName expect failure', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(DeleteJobExecutionCommand, {
    jobId: expected.invalidThingForJobExecution.jobId,
    thingName: expected.invalidThingForJobExecution.thingName,
    executionNumber: expected.jobExecution.executionNumber,
    force: expected.forceDeleteJob.force,
  }).rejects(expected.invalidJobExecutionError);
  const response = await deleteJobExecution.handler({
    pathParameters: {
      jobId: expected.invalidThingForJobExecution.jobId,
      thingName: expected.invalidThingForJobExecution.thingName,
    },
    body: {
      executionNumber: expected.jobExecution.executionNumber,
      force: expected.forceDeleteJob.force,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(404);
  expect(body.error).toEqual(
    Object.assign(new Error(), expected.invalidJobExecutionError).toString(),
  );
  iotClientMock.restore();
});

test('List job executions for job success', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(ListJobExecutionsForJobCommand, {
    jobId: expected.jobExecution.jobId,
    status: expected.jobExecution.status,
  }).resolves({
    executionSummaries: [{
      thingArn: expectedJobExecution.thingArn,
      jobExecutionSummary: {
        status: expected.jobExecution.status,
        queuedAt: new Date(2021, 6, 17, 3, 24, 0),
        startedAt: new Date(2021, 6, 18, 3, 24, 0),
        lastUpdatedAt: new Date(2021, 6, 16, 3, 24, 0),
        executionNumber: 1,
      },
    }],
    nextToken: '12345',
  });
  const response = await ListJobExecutionsForJob.handler({
    queryStringParameters: {
      jobId: expected.jobExecution.jobId,
      status: expected.jobExecution.status,
    },
  });
  const body = JSON.parse(response.body);
  expect(Array.isArray(body.executionSummaries)).toBe(true);
  expect(body.executionSummaries).toEqual(expected.listJobExecutionForJob.executionSummaries);
  expect(response.statusCode).toEqual(200);
  iotClientMock.restore();
});

test('List job Executions For job with nextToken success', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(ListJobExecutionsForJobCommand, {
    jobId: expected.jobExecution.jobId,
    status: expected.jobExecution.status,
    nextToken: expected.listJobExecutionForJob.nextToken,
  }).resolves({
    executionSummaries: [{
      thingArn: expectedJobExecution.thingArn,
      jobExecutionSummary: {
        status: expected.jobExecution.status,
        queuedAt: new Date(2021, 6, 17, 3, 24, 0),
        startedAt: new Date(2021, 6, 18, 3, 24, 0),
        lastUpdatedAt: new Date(2021, 6, 16, 3, 24, 0),
        executionNumber: 1,
      },
    }],
    nextToken: '12345',
  });
  const response = await ListJobExecutionsForJob.handler({
    queryStringParameters: {
      jobId: expected.jobExecution.jobId,
      status: expected.jobExecution.status,
      nextToken: expected.listJobExecutionForJob.nextToken,
    },
  });
  const body = JSON.parse(response.body);
  expect(Array.isArray(body.executionSummaries)).toBe(true);
  expect(body.executionSummaries).toEqual(expected.listJobExecutionForJob.executionSummaries);
  expect(response.statusCode).toEqual(200);
  iotClientMock.restore();
});

test('List job executions for thing success', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(ListJobExecutionsForThingCommand, {
    thingName: expected.jobExecution.thingName,
    status: expected.jobExecution.status,
    nextToken: expected.listJobExecutionForThing.nextToken,
  }).resolves({
    executionSummaries: [{
      jobId: expectedJobExecution.jobId,
      jobExecutionSummary: {
        status: expected.jobExecution.status,
        queuedAt: new Date(2021, 6, 17, 3, 24, 0),
        startedAt: new Date(2021, 6, 18, 3, 24, 0),
        lastUpdatedAt: new Date(2021, 6, 16, 3, 24, 0),
        executionNumber: 1,
      },
    }],
    nextToken: '12345',
  });
  const response = await ListJobExecutionsForThing.handler({
    queryStringParameters: {
      thingName: expected.jobExecution.thingName,
      status: expected.jobExecution.status,
      nextToken: expected.listJobExecutionForThing.nextToken,
    },
  });
  const body = JSON.parse(response.body);
  expect(Array.isArray(body.executionSummaries)).toBe(true);
  expect(body.executionSummaries).toEqual(expected.listJobExecutionForThing.executionSummaries);
  expect(response.statusCode).toEqual(200);
  iotClientMock.restore();
});

test('List job executions for thing with nextToken success', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(ListJobExecutionsForThingCommand, {
    thingName: expected.jobExecution.thingName,
    nextToken: expected.listJobExecutionForThing.nextToken,
  }).resolves({
    executionSummaries: [{
      jobId: expected.jobExecution.jobId,
      jobExecutionSummary: {
        status: expected.jobExecution.status,
        queuedAt: new Date(2021, 6, 17, 3, 24, 0),
        startedAt: new Date(2021, 6, 18, 3, 24, 0),
        lastUpdatedAt: new Date(2021, 6, 16, 3, 24, 0),
        executionNumber: 1,
      },
    }],
    nextToken: '12345',
  });
  const response = await ListJobExecutionsForThing.handler({
    queryStringParameters: {
      thingName: expected.jobExecution.thingName,
      status: expected.jobExecution.status,
      nextToken: expected.listJobExecutionForThing.nextToken,
    },
  });
  const body = JSON.parse(response.body);
  expect(Array.isArray(body.executionSummaries)).toBe(true);
  expect(body.executionSummaries).toEqual(expected.listJobExecutionForThing.executionSummaries);
  expect(response.statusCode).toEqual(200);
  iotClientMock.restore();
});
