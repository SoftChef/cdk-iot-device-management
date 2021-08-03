import { SynthUtils } from '@aws-cdk/assert';
import '@aws-cdk/assert/jest';
import * as lambda from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';
import { ThingApi } from '../src/index';
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