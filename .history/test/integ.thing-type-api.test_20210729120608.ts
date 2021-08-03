import { SynthUtils } from '@aws-cdk/assert';
import '@aws-cdk/assert/jest';
import * as lambda from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';
import { ScheduleFunction } from '@softchef/cdk-schedule-function';
import { ThingTypeApi } from '../src/index';

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
  listJobExecutionsForJobFunctionRole: 'JobApilistJobExecutionsForJobServiceRoleB08B7395',
  listJobExecutionsForThingFunctionRole: 'JobApilistJobExecutionsForThingServiceRole86A34B55',
  listJobTemplatesFunctionRole: 'JobApiListJobTemplatesFunctionServiceRoleDA3F7F42',
  listJobsFunctionRole: 'JobApiListJobsFunctionServiceRole1193B104',
  updateJobFunctionRole: 'JobApiUpdateJobFunctionServiceRole94DF3768',
};

const expectedResources: {
  [name: string]: string;
} = {

};

const expected = {
  restApiId: '',
  lambdaFunctionRuntime: lambda.Runtime.NODEJS_14_X.toString(),
};

test('minimal usage', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'demo-stack');
  new ThingTypeApi(stack, 'ThingTypeApi');
  expect(SynthUtils.synthesize(stack).template).toMatchSnapshot();
  expect(stack).toCountResources('AWS::ApiGateway::RestApi', 1);
  expect(stack).toCountResources('AWS::ApiGateway::Resource', 16);
  expect(stack).toCountResources('AWS::ApiGateway::Method', 39);
  expect(stack).toCountResources('AWS::Lambda::Function', 24);
  expect(stack).toCountResources('AWS::IAM::Role', 25);
  expect(stack).toCountResources('AWS::IAM::Policy', 24);
  expect(stack).toHaveResourceLike('AWS::ApiGateway::RestApi', {
    Name: 'ThingTypeRestApi',
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
  // RestAPI: /job-templates/{jobTemplateId}
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    ParentId: ref(expectedResources.jobTemplatesResourceId),
    PathPart: '{jobTemplateId}',
  });
  // RestAPI: /things
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    PathPart: 'things',
  });
  // RestAPI: /things/{thingName}
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    ParentId: ref(expectedResources.thingsResourceId),
    PathPart: '{thingName}',
  });
  // RestAPI: /things/{thingName}/jobs
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    ParentId: ref(expectedResources.thingsThingNameResourceId),
    PathPart: 'jobs',
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
  expect(stack).toHaveResourceLike('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.getJobDocumentFunctionRole),
  });
  expect(stack).toHaveResourceLike('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.getJobDocumentFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: 'iot:GetJobDocument',
          Effect: 'Allow',
          Resource: '*',
        },
      ],
    },
  });
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.jobsJobIdDocumentResourceId),
    HttpMethod: 'GET',
  });
  // GetJobExecution API
  expect(stack).toHaveResourceLike('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.getJobExecutionFunctionRole),
  });
  expect(stack).toHaveResourceLike('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.getJobExecutionFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: 'iot:DescribeJobExecution',
          Effect: 'Allow',
          Resource: '*',
        },
      ],
    },
  });
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.jobsJobIdThingsThingNameResourceId),
    HttpMethod: 'GET',
  });
  // GetJobTemplate API
  expect(stack).toHaveResourceLike('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.getJobTemplateFunctionRole),
  });
  expect(stack).toHaveResourceLike('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.getJobTemplateFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: 'iot:DescribeJobTemplate',
          Effect: 'Allow',
          Resource: '*',
        },
      ],
    },
  });
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.jobTemplatesJobTemplateIdResourceId),
    HttpMethod: 'GET',
  });
  // ListJobExecutionsForJob API
  expect(stack).toHaveResourceLike('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.listJobExecutionsForJobFunctionRole),
  });
  expect(stack).toHaveResourceLike('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.listJobExecutionsForJobFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: 'iot:ListJobExecutionsForJob',
          Effect: 'Allow',
          Resource: '*',
        },
      ],
    },
  });
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.jobsJobIdStatusResourceId),
    HttpMethod: 'GET',
  });
  // ListJobExecutionsForThing API
  expect(stack).toHaveResourceLike('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.listJobExecutionsForThingFunctionRole),
  });
  expect(stack).toHaveResourceLike('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.listJobExecutionsForThingFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: 'iot:ListJobExecutionsForThing',
          Effect: 'Allow',
          Resource: '*',
        },
      ],
    },
  });
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.thingsThingNameJobsResourceId),
    HttpMethod: 'GET',
  });
  // ListJobTemplates API
  expect(stack).toHaveResourceLike('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.listJobTemplatesFunctionRole),
  });
  expect(stack).toHaveResourceLike('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.listJobTemplatesFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: 'iot:ListJobTemplates',
          Effect: 'Allow',
          Resource: '*',
        },
      ],
    },
  });
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.jobTemplatesResourceId),
    HttpMethod: 'GET',
  });
  // ListJobs API
  expect(stack).toHaveResourceLike('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.listJobsFunctionRole),
  });
  expect(stack).toHaveResourceLike('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.listJobsFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: 'iot:ListJobs',
          Effect: 'Allow',
          Resource: '*',
        },
      ],
    },
  });
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.jobsResourceId),
    HttpMethod: 'GET',
  });
  // UpdateJob API
  expect(stack).toHaveResourceLike('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.updateJobFunctionRole),
  });
  expect(stack).toHaveResourceLike('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.updateJobFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: 'iot:UpdateJob',
          Effect: 'Allow',
          Resource: '*',
        },
      ],
    },
  });
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.jobsJobIdResourceId),
    HttpMethod: 'PUT',
  });
});