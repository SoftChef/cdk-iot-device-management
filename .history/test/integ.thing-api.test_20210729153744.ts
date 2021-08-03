import { SynthUtils } from '@aws-cdk/assert';
import '@aws-cdk/assert/jest';
import * as lambda from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';
import { ThingApi } from '../src/index';
import { ref } from './utils';

const expectedRoles: {
  [name: string]: string;
} = {
  createThing: 'ThingApiCreateThingFunctionServiceRoleF76C80DC',
  deleteThing: 'ThingApiDeleteThingFunctionServiceRoleECF4C781',
  deleteThingShadow: 'ThingApiDeleteThingShadowFunctionServiceRole013D19BA',
  getThing: 'ThingApiGetThingFunctionServiceRoleA6E745D2',
  getThingShadow: 'ThingApiGetThingShadowFunctionServiceRole0EDFAE2B',
  listThingShadows: 'ThingApiListThingShadowsFunctionServiceRoleAC9C364C',
  listThings: 'ThingApiListThingsFunctionServiceRoleF1D8A60D',
  updateThing: 'ThingApiUpdateThingFunctionServiceRole428DBB63',
  updateThingShadow: 'ThingApiUpdateThingShadowFunctionServiceRoleC4BCE4CB',
};

const expectedResources: {
  [name: string]: string;
} = {
  things: 'ThingApiThingRestApithingsA1F2876B',
  thingsThingName: 'ThingApiThingRestApithingsthingNameEAB448EB',
  thingsThingNameShadows: 'ThingApiThingRestApithingsthingNameshadows60732688',
  thingsThingNameShadowsShadowName: 'ThingApiThingRestApithingsthingNameshadowsshadowName85DF413B',
};

const expected = {
  restApiId: '',
  lambdaFunctionRuntime: lambda.Runtime.NODEJS_14_X.toString(),
};

test('minimal usage', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'demo-stack');
  new ThingApi(stack, 'ThingApi');
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
  // AddThingToThingGroup API
  // expect(stack).toHaveResourceLike('AWS::Lambda::Function', {
  //   Runtime: expected.lambdaFunctionRuntime,
  //   Role: fnGetAttArn(expectedRoles.addThingToThingGroupFunctionRole),
  // });
  // expect(stack).toHaveResourceLike('AWS::IAM::Policy', {
  //   Roles: [
  //     ref(expectedRoles.addThingToThingGroupFunctionRole),
  //   ],
  //   PolicyDocument: {
  //     Statement: [
  //       {
  //         Action: 'iot:AddThingToThingGroup',
  //         Effect: 'Allow',
  //         Resource: '*',
  //       },
  //     ],
  //   },
  // });
  // expect(stack).toHaveResourceLike('AWS::ApiGateway::Method', {
  //   RestApiId: ref(expected.restApiId),
  //   ResourceId: ref(expectedResources.thingGroupsThingGroupNameThingsThingNameResourceId),
  //   HttpMethod: 'PUT',
  // });
});