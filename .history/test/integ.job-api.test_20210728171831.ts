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
  cancelJobFunctionRole: 'JobApiCancelJobFunctionServiceRoleBAEBD3AB',
  cancelJobExecutionFunctionRole: 'JobApiCancelJobExecutionFunctionServiceRole7AB6614C',
  createJobFunctionRole: 'JobApiCreateJobFunctionServiceRole69949C38',
  createJobTemplateFunctionRole: 'JobApiCreateJobTemplateFunctionServiceRoleCD317193',
  createScheduleJobFunctionRole: '',
  deleteJobFunctionRole: 'JobApiDeleteJobFunctionServiceRoleCD00CED2',
  deleteJobExecutionFunctionRole: 'JobApiDeleteJobExecutionFunctionServiceRole4474EF15',
  deleteJobTemplateFunctionRole: 'JobApiDeleteJobTemplateFunctionServiceRole9A082F37',
  getJobFunctionRole: 'JobApiGetJobFunctionServiceRole2FBAA912',
  getJobDocumentFunctionRole: 'JobApiGetJobDocumentFunctionServiceRole3384572D',
  getJobExecutionFunctionRole: 'JobApiGetJobExecutionFunctionServiceRole89F7629D',
  getJobTemplateFunctionRole: 'JobApiGetJobTemplateFunctionServiceRole363295D6',
  listJobExecutionsForJobFunctionRole: 'JobApilistJobExecutionForJobServiceRole6CD6BEAA',
  listJobExecutionsForThingFunctionRole: 'JobApilistJobExecutionForThingServiceRole204ADD9E',
  listJobTemplatesFunctionRole: 'JobApiListJobTemplatesFunctionServiceRoleDA3F7F42',
  listJobsFunctionRole: 'JobApiListJobsFunctionServiceRole1193B104',
  updateJobFunctionRole: 'JobApiUpdateJobFunctionServiceRole94DF3768',
};

const expectedResources: {
  [name: string]: string;
} = {
  jobsResourceId: 'JobApiJobRestApijobsC55502B7',
  jobsJobIdResourceId: 'JobApiJobRestApijobsjobId3032C718',
  jobsJobIdAssociateResourceId: 'JobApiJobRestApijobsjobIdassociateFB50B129',
  jobsJobIdCancelResourceId: 'JobApiJobRestApijobsjobIdcancelDB125EBA',
};

const expected = {
  restApiId: 'JobApiJobRestApi36DDDF7E',
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
    ParentId: ref(expectedResources.jobsResourceId),
    PathPart: '{jobId}',
  });
  // AssociateTargetsWithJob API
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
    ParentId: ref(expectedResources.jobsJobIdResourceId),
    PathPart: 'associate',
  });
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.jobsJobIdAssociateResourceId),
    HttpMethod: 'PUT',
  });
  // CancelJob API
  expect(stack).toHaveResourceLike('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.cancelJobFunctionRole),
  });
  expect(stack).toHaveResourceLike('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.cancelJobFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: 'iot:CancelJob',
          Effect: 'Allow',
          Resource: '*',
        },
      ],
    },
  });
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    ParentId: ref(expectedResources.jobsJobIdResourceId),
    PathPart: 'cancel',
  });
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.jobsJobIdCancelResourceId),
    HttpMethod: 'PUT',
  });
  // CancelJobExecution API
  // CreateJob API
  // CreateJobTemplate API
  // CreateScheduleJob API
  // DeleteJob API
  // DeleteJobExecution API
  // DeleteJobTemplate API
  // GetJob API
  // GetJobDocument API
  // GetJobExecution API
  // GetJobTemplate API
  // ListJobExecutionsForJob API
  // ListJobExecutionsForThing API
  // ListJobTemplates API
  // ListJobs API
  // UpdateJob API
});