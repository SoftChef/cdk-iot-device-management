import { SynthUtils } from '@aws-cdk/assert';
import '@aws-cdk/assert/jest';
import * as lambda from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';
import { FileApi } from '../src/index';
import { fnGetAttArn, ref } from './utils';

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
  lambdaFunctionRuntime: lambda.Runtime.NODEJS_14_X.toString(),
};

test('minimal usage', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'demo-stack');
  new FileApi(stack, 'FileApi');
  expect(SynthUtils.synthesize(stack).template).toMatchSnapshot();
  expect(stack).toCountResources('AWS::ApiGateway::RestApi', 1);
  expect(stack).toCountResources('AWS::ApiGateway::Resource', 4);
  expect(stack).toCountResources('AWS::ApiGateway::Method', 14);
  expect(stack).toCountResources('AWS::Lambda::Function', 9);
  expect(stack).toCountResources('AWS::IAM::Role', 10);
  expect(stack).toCountResources('AWS::IAM::Policy', 9);
  expect(stack).toHaveResourceLike('AWS::ApiGateway::RestApi', {
    Name: 'ThingRestApi',
  });
  // RestAPI: /things
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    PathPart: 'things',
  });
  //  RestAPI: /things/{thingName}
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    ParentId: ref(expectedResources.thingsResourceId),
    PathPart: '{thingName}',
  });
  //  RestAPI: /things/{thingName}/shadows
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    ParentId: ref(expectedResources.thingsThingNameResourceId),
    PathPart: 'shadows',
  });
  //  RestAPI: /things/{thingName}/shadows/{shadowName}
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    ParentId: ref(expectedResources.thingsThingNameShadowsResourceId),
    PathPart: '{shadowName}',
  });
  // CreateThing API
  expect(stack).toHaveResourceLike('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.createThingFunctionRole),
  });
  expect(stack).toHaveResourceLike('AWS::IAM::Policy', {
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
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.thingsResourceId),
    HttpMethod: 'POST',
  });
  // DeleteThing API
  expect(stack).toHaveResourceLike('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.deleteThingFunctionRole),
  });
  expect(stack).toHaveResourceLike('AWS::IAM::Policy', {
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
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.thingsThingNameResourceId),
    HttpMethod: 'DELETE',
  });
  // DeleteThingShadow API
  expect(stack).toHaveResourceLike('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.deleteThingShadowFunctionRole),
  });
  expect(stack).toHaveResourceLike('AWS::IAM::Policy', {
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
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.thingsThingNameShadowsShadowNameResourceId),
    HttpMethod: 'DELETE',
  });
  // GetThing API
  expect(stack).toHaveResourceLike('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.getThingFunctionRole),
  });
  expect(stack).toHaveResourceLike('AWS::IAM::Policy', {
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
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.thingsThingNameResourceId),
    HttpMethod: 'GET',
  });
  // GetThingShadow API
  expect(stack).toHaveResourceLike('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.getThingShadowFunctionRole),
  });
  expect(stack).toHaveResourceLike('AWS::IAM::Policy', {
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
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.thingsThingNameShadowsShadowNameResourceId),
    HttpMethod: 'GET',
  });
  // ListThingShadows API
  expect(stack).toHaveResourceLike('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.listThingShadowsFunctionRole),
  });
  expect(stack).toHaveResourceLike('AWS::IAM::Policy', {
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
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.thingsThingNameShadowsResourceId),
    HttpMethod: 'GET',
  });
  // ListThings API
  expect(stack).toHaveResourceLike('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.listThingsFunctionRole),
  });
  expect(stack).toHaveResourceLike('AWS::IAM::Policy', {
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
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.thingsResourceId),
    HttpMethod: 'GET',
  });
  // UpdateThing API
  expect(stack).toHaveResourceLike('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.updateThingFunctionRole),
  });
  expect(stack).toHaveResourceLike('AWS::IAM::Policy', {
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
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.thingsThingNameResourceId),
    HttpMethod: 'PUT',
  });
  // UpdateThingShadow API
  expect(stack).toHaveResourceLike('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.updateThingShadowFunctionRole),
  });
  expect(stack).toHaveResourceLike('AWS::IAM::Policy', {
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
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.thingsThingNameShadowsShadowNameResourceId),
    HttpMethod: 'PUT',
  });
});