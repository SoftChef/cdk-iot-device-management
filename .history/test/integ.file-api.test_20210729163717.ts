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
  categoryTableName: 'FileApiCategoryTable812C14A4',
  fileTableName: 'FileApiFileTable7C90566A',
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
  // CreateCategory API
  expect(stack).toHaveResourceLike('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.createCategoryFunctionRole),
  });
  expect(stack).toHaveResourceLike('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.createCategoryFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: [
            'dynamodb:GetItem',
            'dynamodb:PutItem',
          ],
          Effect: 'Allow',
          Resource: '*',
        },
      ],
    },
  });
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.categoriesResourceId),
    HttpMethod: 'POST',
  });
  // CreateFiles API
  // DeleteCategory API
  // DeleteFiles API
  // GetCategory API
  // GetFiles API
  // ListCategories API
  // ListFilesByCategory API
  // UpdateCategory API
  // UpdateFiles API
  // Category Table
  expect(stack).toHaveResourceLike('AWS::DynamoDB::Table', {
    AttributeDefinitions: [
      {
        AttributeName: 'categoryId',
        AttributeType: 'S',
      },
      {
        AttributeName: 'parentId',
        AttributeType: 'S',
      },
    ],
    KeySchema: [
      {
        AttributeName: 'categoryId',
        KeyType: 'HASH',
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
    GlobalSecondaryIndexes: [
      {
        IndexName: 'query-by-parent-id',
        KeySchema: [
          {
            AttributeName: 'parentId',
            KeyType: 'HASH',
          },
        ],
        Projection: {
          ProjectionType: 'ALL',
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1,
        },
      },
    ],
  });
  // File Table
  expect(stack).toHaveResourceLike('AWS::DynamoDB::Table', {
    AttributeDefinitions: [
      {
        AttributeName: 'categoryId',
        AttributeType: 'S',
      },
      {
        AttributeName: 'parentId',
        AttributeType: 'S',
      },
    ],
    KeySchema: [
      {
        AttributeName: 'categoryId',
        KeyType: 'HASH',
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
    GlobalSecondaryIndexes: [
      {
        IndexName: 'query-by-parent-id',
        KeySchema: [
          {
            AttributeName: 'parentId',
            KeyType: 'HASH',
          },
        ],
        Projection: {
          ProjectionType: 'ALL',
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1,
        },
      },
    ],
  });

  // "Properties": Object {
  //   "AttributeDefinitions": Array [
  //     Object {
  //       "AttributeName": "fileId",
  //       "AttributeType": "S",
  //     },
  //     Object {
  //       "AttributeName": "categoryId",
  //       "AttributeType": "S",
  //     },
  //     Object {
  //       "AttributeName": "locale",
  //       "AttributeType": "S",
  //     },
  //     Object {
  //       "AttributeName": "checksum",
  //       "AttributeType": "S",
  //     },
  //     Object {
  //       "AttributeName": "version",
  //       "AttributeType": "S",
  //     },
  //   ],
  //   "GlobalSecondaryIndexes": Array [
  //     Object {
  //       "IndexName": "query-by-category-id-and-locale",
  //       "KeySchema": Array [
  //         Object {
  //           "AttributeName": "categoryId",
  //           "KeyType": "HASH",
  //         },
  //         Object {
  //           "AttributeName": "locale",
  //           "KeyType": "RANGE",
  //         },
  //       ],
  //       "Projection": Object {
  //         "ProjectionType": "ALL",
  //       },
  //       "ProvisionedThroughput": Object {
  //         "ReadCapacityUnits": 1,
  //         "WriteCapacityUnits": 1,
  //       },
  //     },
  //     Object {
  //       "IndexName": "get-file-by-checksum-and-version",
  //       "KeySchema": Array [
  //         Object {
  //           "AttributeName": "checksum",
  //           "KeyType": "HASH",
  //         },
  //         Object {
  //           "AttributeName": "version",
  //           "KeyType": "RANGE",
  //         },
  //       ],
  //       "Projection": Object {
  //         "ProjectionType": "ALL",
  //       },
  //       "ProvisionedThroughput": Object {
  //         "ReadCapacityUnits": 1,
  //         "WriteCapacityUnits": 1,
  //       },
  //     },
  //   ],
  //   "KeySchema": Array [
  //     Object {
  //       "AttributeName": "fileId",
  //       "KeyType": "HASH",
  //     },
  //   ],
  //   "ProvisionedThroughput": Object {
  //     "ReadCapacityUnits": 1,
  //     "WriteCapacityUnits": 1,
  //   },
});