import { SynthUtils } from '@aws-cdk/assert';
import '@aws-cdk/assert/jest';
// import * as lambda from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';
import { ThingTypeApi } from '../src/index';

// const fnGetAttArn = (arn: string): { [key: string]: string[] } => {
//   return {
//     'Fn::GetAtt': [arn, 'Arn'],
//   };
// };

// const ref = (name: string): { [key: string]: string } => {
//   return {
//     Ref: name,
//   };
// };

// const expectedRoles: {
//   [name: string]: string;
// } = {

// };

// const expectedResources: {
//   [name: string]: string;
// } = {

// };

// const expected = {
//   restApiId: '',
//   lambdaFunctionRuntime: lambda.Runtime.NODEJS_14_X.toString(),
// };

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
  // RestAPI: /jobs
  // AssociateTargetsWithJob API
  // expect(stack).toHaveResourceLike('AWS::Lambda::Function', {
  //   Runtime: expected.lambdaFunctionRuntime,
  //   Role: fnGetAttArn(expectedRoles.associateTargetsWithJobFunctionRole),
  // });
  // expect(stack).toHaveResourceLike('AWS::IAM::Policy', {
  //   Roles: [
  //     ref(expectedRoles.associateTargetsWithJobFunctionRole),
  //   ],
  //   PolicyDocument: {
  //     Statement: [
  //       {
  //         Action: 'iot:AssociateTargetsWithJob',
  //         Effect: 'Allow',
  //         Resource: '*',
  //       },
  //     ],
  //   },
  // });
  // expect(stack).toHaveResourceLike('AWS::ApiGateway::Method', {
  //   RestApiId: ref(expected.restApiId),
  //   ResourceId: ref(expectedResources.jobsJobIdAssociateResourceId),
  //   HttpMethod: 'PUT',
  // });
});