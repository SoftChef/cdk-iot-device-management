import { SynthUtils } from '@aws-cdk/assert';
import '@aws-cdk/assert/jest';
import * as lambda from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';
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
  createThingTypeFunctionRole: 'ThingTypeApiCreateThingTypeFunctionServiceRole6D30039C',
  deleteThingTypeFunctionRole: 'ThingTypeApiDeleteThingTypeFunctionServiceRoleCAA81649',
  listThingTypesFunctionRole: 'ThingTypeApiListThingTypesFunctionServiceRole8B05059F',
  getThingTypeFunctionRole: 'ThingTypeApiGetThingTypeFunctionServiceRoleD09A628E',
  deprecateThingTypeFunctionRole: 'ThingTypeApiDeprecateThingTypeFunctionServiceRoleB13E050D',
  undeprecateThingTypeFunctionRole: 'ThingTypeApiUndeprecateThingTypeFunctionServiceRole2394DB11',
};

const expectedResources: {
  [name: string]: string;
} = {
  thingTypesResourceId: 'ThingTypeApiThingTypeRestApithingtypes74E515F8',
  thingTypesThingTypeNameResourceId: 'ThingTypeApiThingTypeRestApithingtypesthingTypeName95051A7A',
  thingTypesThingTypeNameDeprecateResourceId: 'ThingTypeApiThingTypeRestApithingtypesthingTypeNamedeprecate69BFF3C1',
  thingTypesThingTypeNameUndeprecateResourceId: 'ThingTypeApiThingTypeRestApithingtypesthingTypeNameundeprecate03EADF25',
};

const expected = {
  restApiId: 'ThingTypeApiThingTypeRestApi6EFAA28D',
  lambdaFunctionRuntime: lambda.Runtime.NODEJS_14_X.toString(),
};

test('minimal usage', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'demo-stack');
  new ThingTypeApi(stack, 'ThingTypeApi');
  expect(SynthUtils.synthesize(stack).template).toMatchSnapshot();
  expect(stack).toCountResources('AWS::ApiGateway::RestApi', 1);
  expect(stack).toCountResources('AWS::ApiGateway::Resource', 4);
  expect(stack).toCountResources('AWS::ApiGateway::Method', 11);
  expect(stack).toCountResources('AWS::Lambda::Function', 6);
  expect(stack).toCountResources('AWS::IAM::Role', 7);
  expect(stack).toCountResources('AWS::IAM::Policy', 6);
  expect(stack).toHaveResourceLike('AWS::ApiGateway::RestApi', {
    Name: 'ThingTypeRestApi',
  });
  // RestAPI: /thing-types
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    PathPart: 'thing-types',
  });
  // RestAPI: /thing-types/{thingTypeName}
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    ParentId: ref(expectedResources.thingTypesResourceId),
    PathPart: '{thingTypeName}',
  });
  // RestAPI: /thing-types/{thingTypeName}/deprecate
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    ParentId: ref(expectedResources.thingTypesThingTypeNameResourceId),
    PathPart: 'deprecate',
  });
  // RestAPI: /thing-types/{thingTypeName}/undeprecate
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    ParentId: ref(expectedResources.thingTypesThingTypeNameResourceId),
    PathPart: 'undeprecate',
  });
  // CreateThingType API
  // DeleteThingType API
  // ListThingTypes API
  // GetThingType API
  // DeprecateThingType API
  expect(stack).toHaveResourceLike('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.deprecateThingTypeFunctionRole),
  });
  expect(stack).toHaveResourceLike('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.deprecateThingTypeFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: 'iot:DeprecateThingType',
          Effect: 'Allow',
          Resource: '*',
        },
      ],
    },
  });
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.thingTypesThingTypeNameDeprecateResourceId),
    HttpMethod: 'PUT',
  });
  // UndeprecateThingType API
  expect(stack).toHaveResourceLike('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.undeprecateThingTypeFunctionRole),
  });
  expect(stack).toHaveResourceLike('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.undeprecateThingTypeFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: 'iot:DeprecateThingType',
          Effect: 'Allow',
          Resource: '*',
        },
      ],
    },
  });
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.thingTypesThingTypeNameUndeprecateResourceId),
    HttpMethod: 'PUT',
  });
});