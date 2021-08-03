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
  restApiId: 'FileApiFileRestApiCF4E0F2A',
  lambdaFunctionRuntime: lambda.Runtime.NODEJS_14_X.toString(),
};

test('minimal usage', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'demo-stack');
  new FileApi(stack, 'FileApi');
  expect(SynthUtils.synthesize(stack).template).toMatchSnapshot();
  expect(stack).toCountResources('AWS::ApiGateway::RestApi', 1);
  expect(stack).toCountResources('AWS::ApiGateway::Resource', 7);
  expect(stack).toCountResources('AWS::ApiGateway::Method', 19);
  expect(stack).toCountResources('AWS::Lambda::Function', 11);
  expect(stack).toCountResources('AWS::IAM::Role', 12);
  expect(stack).toCountResources('AWS::IAM::Policy', 11);
  expect(stack).toHaveResourceLike('AWS::ApiGateway::RestApi', {
    Name: 'FileRestApi',
  });
  // RestAPI: /things
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    PathPart: 'things',
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
});