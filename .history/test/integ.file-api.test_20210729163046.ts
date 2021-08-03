import { SynthUtils } from '@aws-cdk/assert';
import '@aws-cdk/assert/jest';
import * as lambda from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';
import { FileApi } from '../src/index';
import { fnGetAttArn, ref } from './utils';

const expectedRoles: {
  [name: string]: string;
} = {
  createCategoryFunctionRole: 'FileApiCreateCategoryFunctionServiceRole89766587',
  createFilesFunctionRole: 'FileApiCreateFilesFunctionServiceRole06894C31',
  deleteCategoryFunctionRole: 'FileApiDeleteCategoryFunctionServiceRole8A63A4E4',
  deleteFilesFunctionRole: 'FileApiDeleteFilesFunctionServiceRoleF38F01D1',
  getCategoryFunctionRole: 'FileApiGetCategoryFunctionServiceRoleDBE32B06',
  getFilesFunctionRole: 'FileApiGetFilesFunctionServiceRoleBDE766EC',
  listCategoriesFunctionRole: 'FileApiListCategoriesFunctionServiceRole81F62031',
  listFilesByCategoryFunctionRole: 'FileApiListFilesByCategoryFunctionServiceRoleB1A15BE9',
  updateCategoryFunctionRole: 'FileApiUpdateCategoryFunctionServiceRole226B9A11',
  updateFilesFunctionRole: 'FileApiUpdateFilesFunctionServiceRole9074BA78',
};

const expectedResources: {
  [name: string]: string;
} = {
  categoriesResourceId: 'FileApiFileRestApicategories90A88046',
  categoriesCategoryIdResourceId: 'FileApiFileRestApicategoriescategoryIdF64CB71B',
  categoriesCategoryIdFilesResourceId: 'FileApiFileRestApicategoriescategoryIdfiles6300BB07',
  filesResourceId: 'FileApiFileRestApifiles0A6D7201',
  filesChecksumResourceId: 'FileApiFileRestApifileschecksum56380AB4',
  filesChecksumVersionsResourceId: 'FileApiFileRestApifileschecksumversions956F42E1',
  filesChecksumVersionsVersionResourceId: 'FileApiFileRestApifileschecksumversionsversionA875684C',
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
  // RestAPI: /categories
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    PathPart: 'categories',
  });
  // RestAPI: /categories/{categoryId}
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    ParentId: ref(expectedResources.categoriesResourceId),
    PathPart: '{categoryId}',
  });
  // RestAPI: /categories/{categoryId}/files
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    ParentId: ref(expectedResources.categoriesCategoryIdResourceId),
    PathPart: 'files',
  });
  // RestAPI: /files
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    PathPart: 'files',
  });
  // RestAPI: /files/{checksum}
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    ParentId: ref(expectedResources.filesResourceId),
    PathPart: '{checksum}',
  });
  // RestAPI: /files/{checksum}/versions
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    ParentId: ref(expectedResources.filesChecksumResourceId),
    PathPart: 'versions',
  });
  // RestAPI: /files/{checksum}/versions/{version}
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    ParentId: ref(expectedResources.filesChecksumVersionsResourceId),
    PathPart: '{version}',
  });
  // CreateCategoryAPI
  // CreateFilesAPI
  // DeleteCategoryAPI
  // DeleteFilesAPI
  // GetCategoryAPI
  // GetFilesAPI
  // ListCategoriesAPI
  // ListFilesByCategoryAPI
  // UpdateCategoryAPI
  // UpdateFilesAPI

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