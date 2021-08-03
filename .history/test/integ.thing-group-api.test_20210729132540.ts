import { SynthUtils } from '@aws-cdk/assert';
import '@aws-cdk/assert/jest';
import * as lambda from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';
import { ThingGroupApi } from '../src/index';
import { ref } from './utils';

// const expectedRoles: {
//   [name: string]: string;
// } = {

// };

// const expectedResources: {
//   [name: string]: string;
// } = {

// };

const expected = {
  restApiId: 'ThingGroupApiThingGroupRestApi6EFAA28D',
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
  // RestAPI: /thing-types
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