import { SynthUtils } from '@aws-cdk/assert';
import '@aws-cdk/assert/jest';
import * as lambda from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';
import { ThingGroupApi } from '../src/index';
import { ref } from './utils';

const expectedRoles: {
  [name: string]: string;
} = {
  addThingToThingGroupFunctionRole: 'ThingGroupApiAddThingToThingGroupFunctionServiceRoleEBD59FAC',
  createDynamicThingGroupFunctionRole: 'ThingGroupApiCreateDynamicThingGroupFunctionServiceRoleB8CB9456',
  createThingGroupFunctionRole: 'ThingGroupApiCreateThingGroupFunctionServiceRoleFF9C912C',
  deleteDynamicThingGroupFunctionRole: 'ThingGroupApiDeleteDynamicThingGroupFunctionServiceRole287BF546',
  deleteThingGroupFunctionRole: 'ThingGroupApiDeleteThingGroupFunctionServiceRole8D37D199',
  getThingGroupFunctionRole: 'ThingGroupApiGetThingGroupFunctionServiceRole80688DA1',
  listThingGroupsFunctionRole: 'ThingGroupApiListThingGroupsFunctionServiceRole8A98D7BD',
  removeThingFromThingGroupFunctionRole: 'ThingGroupApiRemoveThingFromThingGroupFunctionServiceRoleD8AB0AC9',
};

const expectedResources: {
  [name: string]: string;
} = {
  dynamicThingGroupsResourceId: 'ThingGroupApiThingGroupRestApidynamicthinggroupsC4ED8E6C',
  dynamicThingGroupsThingGroupNameResourceId: 'ThingGroupApiThingGroupRestApidynamicthinggroupsthingGroupName8C421BEF',
  thingGroupsResourceId: 'ThingGroupApiThingGroupRestApithinggroups24E29853',
  thingGroupsThingGroupNameResourceId: 'ThingGroupApiThingGroupRestApithinggroupsthingGroupNameF0A6E81A',
  thingGroupsThingGroupNameThingsResourceId: 'ThingGroupApiThingGroupRestApithinggroupsthingGroupNamethings0C0DA311',
  thingGroupsThingGroupNameThingsThingNameResourceId: 'ThingGroupApiThingGroupRestApithinggroupsthingGroupNamethingsthingName3C02E972',
};

const expected = {
  restApiId: 'ThingGroupApiThingGroupRestApiCB757BF2',
  lambdaFunctionRuntime: lambda.Runtime.NODEJS_14_X.toString(),
};

test('minimal usage', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'demo-stack');
  new ThingGroupApi(stack, 'ThingGroupApi');
  expect(SynthUtils.synthesize(stack).template).toMatchSnapshot();
  expect(stack).toCountResources('AWS::ApiGateway::RestApi', 1);
  expect(stack).toCountResources('AWS::ApiGateway::Resource', 6);
  expect(stack).toCountResources('AWS::ApiGateway::Method', 17);
  expect(stack).toCountResources('AWS::Lambda::Function', 10);
  expect(stack).toCountResources('AWS::IAM::Role', 11);
  expect(stack).toCountResources('AWS::IAM::Policy', 10);
  expect(stack).toHaveResourceLike('AWS::ApiGateway::RestApi', {
    Name: 'ThingGroupRestApi',
  });
  // RestAPI: /thing-groups
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    PathPart: 'thing-groups',
  });
  // CreateThingGroup API
  // expect(stack).toHaveResourceLike('AWS::Lambda::Function', {
  //   Runtime: expected.lambdaFunctionRuntime,
  //   Role: fnGetAttArn(expectedRoles.creaateThingGroupFunctionRole),
  // });
  // expect(stack).toHaveResourceLike('AWS::IAM::Policy', {
  //   Roles: [
  //     ref(expectedRoles.creaateThingGroupFunctionRole),
  //   ],
  //   PolicyDocument: {
  //     Statement: [
  //       {
  //         Action: 'iot:CreateThingGroup',
  //         Effect: 'Allow',
  //         Resource: '*',
  //       },
  //     ],
  //   },
  // });
  // expect(stack).toHaveResourceLike('AWS::ApiGateway::Method', {
  //   RestApiId: ref(expected.restApiId),
  //   ResourceId: ref(expectedResources.ThingGroupsResourceId),
  //   HttpMethod: 'POST',
  // });
});