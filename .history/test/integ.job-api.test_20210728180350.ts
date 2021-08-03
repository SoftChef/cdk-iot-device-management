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
  jobsJobIdDocumentResourceId: 'JobApiJobRestApijobsjobIddocument3D33300E',
  jobsJobIdStatusResourceId: 'JobApiJobRestApijobsjobIdstatus40410DA4',
  jobsJobIdAssociateResourceId: 'JobApiJobRestApijobsjobIdassociateFB50B129',
  jobsJobIdCancelResourceId: 'JobApiJobRestApijobsjobIdcancelDB125EBA',
  jobsJobIdThingsResourceId: 'JobApiJobRestApijobsjobIdthings018EB633',
  jobsJobIdThingsThingNameResourceId: 'JobApiJobRestApijobsjobIdthingsthingName780C0D86',
  jobsJobIdThingsThingNameCancelResourceId: 'JobApiJobRestApijobsjobIdthingsthingNamecancel536F4680',
  jobTemplatesResourceId: 'JobApiJobRestApijobtemplatesB232551A',
  jobTemplatesJobTemplateIdResourceId: 'JobApiJobRestApijobtemplatesjobTemplateId93654B20',
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
  expect(stack).toCountResources('AWS::ApiGateway::RestApi', 1);
  expect(stack).toCountResources('AWS::ApiGateway::Resource', 14);
  expect(stack).toCountResources('AWS::ApiGateway::Method', 32);
  expect(stack).toCountResources('AWS::Lambda::Function', 17);
  expect(stack).toCountResources('AWS::IAM::Role', 18);
  expect(stack).toCountResources('AWS::IAM::Policy', 17);
  expect(stack).toHaveResourceLike('AWS::ApiGateway::RestApi', {
    Name: 'JobRestApi',
  });
  // RestAPI: /jobs
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
  // RestAPI: /jobs/{jobId}/document
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    ParentId: ref(expectedResources.jobsJobIdResourceId),
    PathPart: 'document',
  });
  // RestAPI: /jobs/{jobId}/status
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    ParentId: ref(expectedResources.jobsJobIdResourceId),
    PathPart: 'status',
  });
  // RestAPI: /jobs/{jobId}/associate
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    ParentId: ref(expectedResources.jobsJobIdResourceId),
    PathPart: 'associate',
  });
  // RestAPI: /jobs/{jobId}/cancel
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    ParentId: ref(expectedResources.jobsJobIdThingsThingNameResourceId),
    PathPart: 'cancel',
  });
  // RestAPI: /jobs/{jobId}/things
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    ParentId: ref(expectedResources.jobsJobIdResourceId),
    PathPart: 'things',
  });
  // RestAPI: /jobs/{jobId}/things/{thingName}
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    ParentId: ref(expectedResources.jobsJobIdThingsResourceId),
    PathPart: '{thingName}',
  });
  // RestAPI: /job-templates
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    PathPart: 'job-templates',
  });
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    ParentId: ref(expectedResources.jobTemplatesResourceId),
    PathPart: '{jobTemplateId}',
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
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.jobsJobIdCancelResourceId),
    HttpMethod: 'PUT',
  });
  // CancelJobExecution API
  expect(stack).toHaveResourceLike('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.cancelJobExecutionFunctionRole),
  });
  expect(stack).toHaveResourceLike('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.cancelJobExecutionFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: 'iot:CancelJobExecution',
          Effect: 'Allow',
          Resource: '*',
        },
      ],
    },
  });
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.jobsJobIdThingsThingNameCancelResourceId),
    HttpMethod: 'PUT',
  });
  // CreateJob API
  expect(stack).toHaveResourceLike('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.createJobFunctionRole),
  });
  expect(stack).toHaveResourceLike('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.createJobFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: 'iot:CreateJob',
          Effect: 'Allow',
          Resource: '*',
        },
      ],
    },
  });
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.jobsResourceId),
    HttpMethod: 'POST',
  });
  // CreateJobTemplate API
  expect(stack).toHaveResourceLike('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.createJobTemplateFunctionRole),
  });
  expect(stack).toHaveResourceLike('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.createJobTemplateFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: 'iot:CreateJobTemplate',
          Effect: 'Allow',
          Resource: '*',
        },
      ],
    },
  });
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.jobTemplatesResourceId),
    HttpMethod: 'POST',
  });
  // CreateScheduleJob API
  // @TODO hook schedule function
  // DeleteJob API
  expect(stack).toHaveResourceLike('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.deleteJobFunctionRole),
  });
  expect(stack).toHaveResourceLike('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.deleteJobFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: 'iot:DeleteJob',
          Effect: 'Allow',
          Resource: '*',
        },
      ],
    },
  });
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.jobsJobIdResourceId),
    HttpMethod: 'DELETE',
  });
  // DeleteJobExecution API
  expect(stack).toHaveResourceLike('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.deleteJobExecutionFunctionRole),
  });
  expect(stack).toHaveResourceLike('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.deleteJobExecutionFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: 'iot:DeleteJobExecution',
          Effect: 'Allow',
          Resource: '*',
        },
      ],
    },
  });
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.jobsJobIdThingsThingNameResourceId),
    HttpMethod: 'DELETE',
  });
  // DeleteJobTemplate API
  expect(stack).toHaveResourceLike('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.deleteJobTemplateFunctionRole),
  });
  expect(stack).toHaveResourceLike('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.deleteJobTemplateFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: 'iot:DeleteJobTemplate',
          Effect: 'Allow',
          Resource: '*',
        },
      ],
    },
  });
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.jobTemplatesJobTemplateIdResourceId),
    HttpMethod: 'DELETE',
  });
  // GetJob API
  expect(stack).toHaveResourceLike('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.getJobFunctionRole),
  });
  expect(stack).toHaveResourceLike('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.getJobFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: 'iot:DescribeJob',
          Effect: 'Allow',
          Resource: '*',
        },
      ],
    },
  });
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.jobsJobIdResourceId),
    HttpMethod: 'GET',
  });
  // GetJobDocument API

  // GetJobExecution API
  // GetJobTemplate API
  // ListJobExecutionsForJob API
  // ListJobExecutionsForThing API
  // ListJobTemplates API
  // ListJobs API
  // UpdateJob API
});