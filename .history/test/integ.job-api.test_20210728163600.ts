import { SynthUtils } from '@aws-cdk/assert';
import '@aws-cdk/assert/jest';
import * as cdk from '@aws-cdk/core';
import { JobApi } from '../src/index';

const fnGetAttArn = (arn: string): { [key: string]: string[] } => {
  return {
    'Fn::GetAtt': [arn, 'Arn'],
  };
};

// const ref = (name: string): { [key: string]: string } => {
//   return {
//     Ref: name,
//   };
// };

const expectedRoles: {
  [name: string]: string;
} = {
  associateTargetsWithJobFunctionRole: 'JobApiAssociateTargetsWithJobFunctionServiceRoleE567B759',
};

// const expected = {
// };

test('minimal usage', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'demo-stack');
  new JobApi(stack, 'JobApi');
  expect(SynthUtils.synthesize(stack).template).toMatchSnapshot();
  expect(stack).toHaveResourceLike('AWS::Lambda::Function', {
    Role: fnGetAttArn(expectedRoles.dispatchTargetFunctionRole),
  });
});