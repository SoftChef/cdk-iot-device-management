import {
  Template,
} from 'aws-cdk-lib/assertions';
import {
  Runtime,
} from 'aws-cdk-lib/aws-lambda';
import {
  App,
  Stack,
} from 'aws-cdk-lib/core';
import {
  ThingApi,
} from '../src/index';
import {
  fnGetAttArn,
  ref,
} from './utils';

const expectedRoles: {
  [name: string]: string;
} = {
  createThingFunctionRole: 'ThingApiCreateThingFunctionServiceRoleF76C80DC',
  deleteThingFunctionRole: 'ThingApiDeleteThingFunctionServiceRoleECF4C781',
  deleteThingShadowFunctionRole: 'ThingApiDeleteThingShadowFunctionServiceRole013D19BA',
  getThingFunctionRole: 'ThingApiGetThingFunctionServiceRoleA6E745D2',
  getThingShadowFunctionRole: 'ThingApiGetThingShadowFunctionServiceRole0EDFAE2B',
  listThingShadowsFunctionRole: 'ThingApiListThingShadowsFunctionServiceRoleAC9C364C',
  listThingsFunctionRole: 'ThingApiListThingsFunctionServiceRoleF1D8A60D',
  updateThingFunctionRole: 'ThingApiUpdateThingFunctionServiceRole428DBB63',
  updateThingShadowFunctionRole: 'ThingApiUpdateThingShadowFunctionServiceRoleC4BCE4CB',
  searchThingsFunctionRole: 'ThingApiSearchThingsFunctionServiceRole04F91AAB',
};

const expectedResources: {
  [name: string]: string;
} = {
  thingsResourceId: 'ThingApiThingRestApithingsA1F2876B',
  thingsThingNameResourceId: 'ThingApiThingRestApithingsthingNameEAB448EB',
  thingsThingNameShadowsResourceId: 'ThingApiThingRestApithingsthingNameshadows60732688',
  thingsThingNameShadowsShadowNameResourceId: 'ThingApiThingRestApithingsthingNameshadowsshadowName85DF413B',
};

const expected = {
  restApiId: 'ThingApiThingRestApi8AD2DCAF',
  lambdaFunctionRuntime: Runtime.NODEJS_14_X.toString(),
};

test('minimal usage', () => {
  const app = new App();
  const stack = new Stack(app, 'test-stack');
  new ThingApi(stack, 'ThingApi');
  const template = Template.fromStack(stack);
  expect(template.toJSON()).toMatchSnapshot();
  template.resourceCountIs('AWS::ApiGateway::RestApi', 1);
  template.resourceCountIs('AWS::ApiGateway::Resource', 5);
  template.resourceCountIs('AWS::ApiGateway::Method', 16);
  template.resourceCountIs('AWS::Lambda::Function', 10);
  template.resourceCountIs('AWS::IAM::Role', 11);
  template.resourceCountIs('AWS::IAM::Policy', 10);
  template.hasResourceProperties('AWS::ApiGateway::RestApi', {
    Name: 'ThingRestApi',
  });
  // RestAPI: /things
  template.hasResourceProperties('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    PathPart: 'things',
  });
  //  RestAPI: /things/{thingName}
  template.hasResourceProperties('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    ParentId: ref(expectedResources.thingsResourceId),
    PathPart: '{thingName}',
  });
  //  RestAPI: /things/{thingName}/shadows
  template.hasResourceProperties('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    ParentId: ref(expectedResources.thingsThingNameResourceId),
    PathPart: 'shadows',
  });
  //  RestAPI: /things/{thingName}/shadows/{shadowName}
  template.hasResourceProperties('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    ParentId: ref(expectedResources.thingsThingNameShadowsResourceId),
    PathPart: '{shadowName}',
  });
  // CreateThing API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.createThingFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.createThingFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: 'iot:CreateThing',
          Effect: 'Allow',
          Resource: '*',
        },
      ],
    },
  });
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.thingsResourceId),
    HttpMethod: 'POST',
  });
  // DeleteThing API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.deleteThingFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.deleteThingFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: 'iot:DeleteThing',
          Effect: 'Allow',
          Resource: '*',
        },
      ],
    },
  });
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.thingsThingNameResourceId),
    HttpMethod: 'DELETE',
  });
  // DeleteThingShadow API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.deleteThingShadowFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.deleteThingShadowFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: 'iot:DeleteThingShadow',
          Effect: 'Allow',
          Resource: '*',
        },
      ],
    },
  });
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.thingsThingNameShadowsShadowNameResourceId),
    HttpMethod: 'DELETE',
  });
  // GetThing API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.getThingFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.getThingFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: 'iot:DescribeThing',
          Effect: 'Allow',
          Resource: '*',
        },
      ],
    },
  });
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.thingsThingNameResourceId),
    HttpMethod: 'GET',
  });
  // GetThingShadow API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.getThingShadowFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.getThingShadowFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: 'iot:GetThingShadow',
          Effect: 'Allow',
          Resource: '*',
        },
      ],
    },
  });
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.thingsThingNameShadowsShadowNameResourceId),
    HttpMethod: 'GET',
  });
  // ListThingShadows API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.listThingShadowsFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.listThingShadowsFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: 'iot:ListNamedShadowsForThing',
          Effect: 'Allow',
          Resource: '*',
        },
      ],
    },
  });
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.thingsThingNameShadowsResourceId),
    HttpMethod: 'GET',
  });
  // ListThings API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.listThingsFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.listThingsFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: 'iot:ListThings',
          Effect: 'Allow',
          Resource: '*',
        },
      ],
    },
  });
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.thingsResourceId),
    HttpMethod: 'GET',
  });
  // UpdateThing API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.updateThingFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.updateThingFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: 'iot:UpdateThing',
          Effect: 'Allow',
          Resource: '*',
        },
      ],
    },
  });
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.thingsThingNameResourceId),
    HttpMethod: 'PUT',
  });
  // UpdateThingShadow API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.updateThingShadowFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.updateThingShadowFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: 'iot:UpdateThingShadow',
          Effect: 'Allow',
          Resource: '*',
        },
      ],
    },
  });
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.thingsThingNameShadowsShadowNameResourceId),
    HttpMethod: 'PUT',
  });
  // QueryThing API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.searchThingsFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.searchThingsFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: 'iot:SearchIndex',
          Effect: 'Allow',
          Resource: '*',
        },
      ],
    },
  });
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.thingsResourceId),
    HttpMethod: 'GET',
  });
});