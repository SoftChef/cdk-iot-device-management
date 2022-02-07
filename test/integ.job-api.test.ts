import {
  ScheduleFunction,
} from '@softchef/cdk-schedule-function';
import {
  Template,
} from 'aws-cdk-lib/assertions';
import {
  Runtime,
} from 'aws-cdk-lib/aws-lambda';
import {
  App,
  Duration,
  Stack,
} from 'aws-cdk-lib/core';
import {
  JobApi,
} from '../src/index';
import {
  fnGetAttArn,
  ref,
} from './utils';

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
  thingsResourceId: 'JobApiJobRestApithings71291A7E',
  thingsThingNameResourceId: 'JobApiJobRestApithingsthingName82EF96C4',
  thingsThingNameJobsResourceId: 'JobApiJobRestApithingsthingNamejobsC4B89833',
};

const expected = {
  restApiId: 'JobApiJobRestApi36DDDF7E',
  lambdaFunctionRuntime: Runtime.NODEJS_14_X.toString(),
};

test('minimal usage', () => {
  const app = new App();
  const stack = new Stack(app, 'test-stack');
  const scheduleFunction = new ScheduleFunction(stack, 'ScheduleFunction', {
    recentMinutes: Duration.minutes(3),
  });
  new JobApi(stack, 'JobApi', {
    scheduleFunction: scheduleFunction,
  });
  const template = Template.fromStack(stack);
  expect(template.toJSON()).toMatchSnapshot();
  template.resourceCountIs('AWS::ApiGateway::RestApi', 1);
  template.resourceCountIs('AWS::ApiGateway::Resource', 16);
  template.resourceCountIs('AWS::ApiGateway::Method', 39);
  template.resourceCountIs('AWS::Lambda::Function', 24);
  template.resourceCountIs('AWS::IAM::Role', 25);
  template.resourceCountIs('AWS::IAM::Policy', 24);
  template.hasResourceProperties('AWS::ApiGateway::RestApi', {
    Name: 'JobRestApi',
  });
  // RestAPI: /jobs
  template.hasResourceProperties('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    PathPart: 'jobs',
  });
  // RestAPI: /jobs/{jobId}
  template.hasResourceProperties('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    ParentId: ref(expectedResources.jobsResourceId),
    PathPart: '{jobId}',
  });
  // RestAPI: /jobs/{jobId}/document
  template.hasResourceProperties('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    ParentId: ref(expectedResources.jobsJobIdResourceId),
    PathPart: 'document',
  });
  // RestAPI: /jobs/{jobId}/status
  template.hasResourceProperties('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    ParentId: ref(expectedResources.jobsJobIdResourceId),
    PathPart: 'status',
  });
  // RestAPI: /jobs/{jobId}/associate
  template.hasResourceProperties('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    ParentId: ref(expectedResources.jobsJobIdResourceId),
    PathPart: 'associate',
  });
  // RestAPI: /jobs/{jobId}/cancel
  template.hasResourceProperties('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    ParentId: ref(expectedResources.jobsJobIdThingsThingNameResourceId),
    PathPart: 'cancel',
  });
  // RestAPI: /jobs/{jobId}/things
  template.hasResourceProperties('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    ParentId: ref(expectedResources.jobsJobIdResourceId),
    PathPart: 'things',
  });
  // RestAPI: /jobs/{jobId}/things/{thingName}
  template.hasResourceProperties('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    ParentId: ref(expectedResources.jobsJobIdThingsResourceId),
    PathPart: '{thingName}',
  });
  // RestAPI: /job-templates
  template.hasResourceProperties('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    PathPart: 'job-templates',
  });
  // RestAPI: /job-templates/{jobTemplateId}
  template.hasResourceProperties('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    ParentId: ref(expectedResources.jobTemplatesResourceId),
    PathPart: '{jobTemplateId}',
  });
  // RestAPI: /things
  template.hasResourceProperties('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    PathPart: 'things',
  });
  // RestAPI: /things/{thingName}
  template.hasResourceProperties('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    ParentId: ref(expectedResources.thingsResourceId),
    PathPart: '{thingName}',
  });
  // RestAPI: /things/{thingName}/jobs
  template.hasResourceProperties('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    ParentId: ref(expectedResources.thingsThingNameResourceId),
    PathPart: 'jobs',
  });
  // AssociateTargetsWithJob API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.associateTargetsWithJobFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
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
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.jobsJobIdAssociateResourceId),
    HttpMethod: 'PUT',
  });
  // CancelJob API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.cancelJobFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
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
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.jobsJobIdCancelResourceId),
    HttpMethod: 'PUT',
  });
  // CancelJobExecution API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.cancelJobExecutionFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
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
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.jobsJobIdThingsThingNameCancelResourceId),
    HttpMethod: 'PUT',
  });
  // CreateJob API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.createJobFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
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
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.jobsResourceId),
    HttpMethod: 'POST',
  });
  // CreateJobTemplate API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.createJobTemplateFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
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
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.jobTemplatesResourceId),
    HttpMethod: 'POST',
  });
  // CreateScheduleJob API
  // @TODO hook schedule function
  // DeleteJob API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.deleteJobFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
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
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.jobsJobIdResourceId),
    HttpMethod: 'DELETE',
  });
  // DeleteJobExecution API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.deleteJobExecutionFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
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
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.jobsJobIdThingsThingNameResourceId),
    HttpMethod: 'DELETE',
  });
  // DeleteJobTemplate API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.deleteJobTemplateFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
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
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.jobTemplatesJobTemplateIdResourceId),
    HttpMethod: 'DELETE',
  });
  // GetJob API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.getJobFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
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
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.jobsJobIdResourceId),
    HttpMethod: 'GET',
  });
  // GetJobDocument API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.getJobDocumentFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
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
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.jobsJobIdDocumentResourceId),
    HttpMethod: 'GET',
  });
  // GetJobExecution API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.getJobExecutionFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
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
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.jobsJobIdThingsThingNameResourceId),
    HttpMethod: 'GET',
  });
  // GetJobTemplate API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.getJobTemplateFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
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
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.jobTemplatesJobTemplateIdResourceId),
    HttpMethod: 'GET',
  });
  // ListJobExecutionsForJob API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.listJobExecutionsForJobFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
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
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.jobsJobIdStatusResourceId),
    HttpMethod: 'GET',
  });
  // ListJobExecutionsForThing API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.listJobExecutionsForThingFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
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
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.thingsThingNameJobsResourceId),
    HttpMethod: 'GET',
  });
  // ListJobTemplates API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.listJobTemplatesFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
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
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.jobTemplatesResourceId),
    HttpMethod: 'GET',
  });
  // ListJobs API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.listJobsFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
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
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.jobsResourceId),
    HttpMethod: 'GET',
  });
  // UpdateJob API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.updateJobFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
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
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.jobsJobIdResourceId),
    HttpMethod: 'PUT',
  });
});