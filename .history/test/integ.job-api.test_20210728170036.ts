import { SynthUtils } from '@aws-cdk/assert';
import '@aws-cdk/assert/jest';
import * as lambda from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';
import { JobApi } from '../src/index';

const fnGetAttArn = (arn: string): { [key: string]: string[] } => {
  return {
    'Fn::GetAtt': [arn, 'Arn'],
  };
};

const ref = (name: string): { [key: string]: string } => {
  return {
    Ref: name,
  };
};

const expectedRoles: {
  [name: string]: string;
} = {
  associateTargetsWithJobFunctionRole: 'JobApiAssociateTargetsWithJobFunctionServiceRoleE567B759',
  cancelJobExecutionFunctionRole: 'JobApiCancelJobExecutionFunctionServiceRole7AB6614C',
};

const expected = {
  restApiId: 'JobApiJobRestApi36DDDF7E',
  restApiJobsResourceId: 'JobApiJobRestApijobsC55502B7',
  restApiJobsJobIdResourceId: 'JobApiJobRestApijobsjobId3032C718',
  restApiJobsJobIdAssociateResourceId: 'JobApiJobRestApijobsjobIdassociateFB50B129',
  lambdaFunctionRuntime: lambda.Runtime.NODEJS_14_X.toString(),
};

test('minimal usage', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'demo-stack');
  new JobApi(stack, 'JobApi');
  expect(SynthUtils.synthesize(stack).template).toMatchSnapshot();
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    PathPart: 'jobs',
  });
  // RestAPI: /jobs/{jobId}
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    ParentId: ref(expected.restApiJobsResourceId),
    PathPart: '{jobId}',
  });
  // AssociateTargetsWithJob
  expect(stack).toHaveResourceLike('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.associateTargetsWithJobFunctionRole),
  });
  expect(stack).toHaveResourceLike('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.associateTargetsWithJobFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: 'iot:AssociateTargetsWithJob',
          Effect: 'Allow',
          Resource: '*',
        },
      ],
    },
  });
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    ParentId: ref(expected.restApiJobsJobIdResourceId),
    PathPart: 'associate',
  });
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expected.restApiJobsJobIdAssociateResourceId),
    HttpMethod: 'PUT',
  });
  // CancelJob
  // CancelJobExecution
  // CreateJob
  // CreateJobTemplate
  // CreateScheduleJob
  // DeleteJob
  // DeleteJobExecution
  // DeleteJobTemplate
  // GetJob
  // GetJobDocument
  // GetJobExecution
  // GetJobTemplate
  // ListJobExecutionsForJob
  // ListJobExecutionsForThing
  // ListJobTemplates
  // ListJobs
  // UpdateJob
});