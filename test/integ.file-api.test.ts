import {
  Template,
} from 'aws-cdk-lib/assertions';
import {
  Runtime,
} from 'aws-cdk-lib/aws-lambda';
import {
  App,
  Stack,
} from 'aws-cdk-lib/core';
import {
  FileApi,
} from '../src/index';
import {
  fnGetAttArn,
  fnJoin,
  ref,
} from './utils';

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
  lambdaFunctionRuntime: Runtime.NODEJS_14_X.toString(),
  categoryTableName: 'FileApiCategoryTable812C14A4',
  fileTableName: 'FileApiFileTable7C90566A',
};

test('minimal usage', () => {
  const app = new App();
  const stack = new Stack(app, 'test-stack');
  new FileApi(stack, 'FileApi');
  const template = Template.fromStack(stack);
  expect(template.toJSON()).toMatchSnapshot();
  template.resourceCountIs('AWS::ApiGateway::RestApi', 1);
  template.resourceCountIs('AWS::ApiGateway::Resource', 7);
  template.resourceCountIs('AWS::ApiGateway::Method', 19);
  template.resourceCountIs('AWS::Lambda::Function', 11);
  template.resourceCountIs('AWS::IAM::Role', 12);
  template.resourceCountIs('AWS::IAM::Policy', 11);
  template.hasResourceProperties('AWS::ApiGateway::RestApi', {
    Name: 'FileRestApi',
  });
  // RestAPI: /categories
  template.hasResourceProperties('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    PathPart: 'categories',
  });
  // RestAPI: /categories/{categoryId}
  template.hasResourceProperties('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    ParentId: ref(expectedResources.categoriesResourceId),
    PathPart: '{categoryId}',
  });
  // RestAPI: /categories/{categoryId}/files
  template.hasResourceProperties('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    ParentId: ref(expectedResources.categoriesCategoryIdResourceId),
    PathPart: 'files',
  });
  // RestAPI: /files
  template.hasResourceProperties('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    PathPart: 'files',
  });
  // RestAPI: /files/{checksum}
  template.hasResourceProperties('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    ParentId: ref(expectedResources.filesResourceId),
    PathPart: '{checksum}',
  });
  // RestAPI: /files/{checksum}/versions
  template.hasResourceProperties('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    ParentId: ref(expectedResources.filesChecksumResourceId),
    PathPart: 'versions',
  });
  // RestAPI: /files/{checksum}/versions/{version}
  template.hasResourceProperties('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    ParentId: ref(expectedResources.filesChecksumVersionsResourceId),
    PathPart: '{version}',
  });
  // CreateCategory API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.createCategoryFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
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
          Resource: fnGetAttArn(expected.categoryTableName),
        },
      ],
    },
  });
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.categoriesResourceId),
    HttpMethod: 'POST',
  });
  // CreateFiles API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.createFilesFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.createFilesFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: [
            'dynamodb:GetItem',
            'dynamodb:Query',
            'dynamodb:BatchWriteItem',
          ],
          Effect: 'Allow',
          Resource: [
            fnGetAttArn(expected.fileTableName),
            fnJoin('', [
              fnGetAttArn(expected.fileTableName),
              '/index/get-file-by-checksum-and-version',
            ]),
            fnGetAttArn(expected.categoryTableName),
          ],
        },
      ],
    },
  });
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.filesResourceId),
    HttpMethod: 'POST',
  });
  // DeleteCategory API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.deleteCategoryFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.deleteCategoryFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: 'dynamodb:DeleteItem',
          Effect: 'Allow',
          Resource: fnGetAttArn(expected.categoryTableName),
        },
      ],
    },
  });
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.categoriesCategoryIdResourceId),
    HttpMethod: 'DELETE',
  });
  // DeleteFiles API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.deleteFilesFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.deleteFilesFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: 'dynamodb:BatchWriteItem',
          Effect: 'Allow',
          Resource: fnGetAttArn(expected.fileTableName),
        },
      ],
    },
  });
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.filesResourceId),
    HttpMethod: 'DELETE',
  });
  // GetCategory API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.getCategoryFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.getCategoryFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: 'dynamodb:GetItem',
          Effect: 'Allow',
          Resource: fnGetAttArn(expected.categoryTableName),
        },
      ],
    },
  });
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.categoriesCategoryIdResourceId),
    HttpMethod: 'GET',
  });
  // GetFiles API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.getFilesFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.getFilesFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: 'dynamodb:Query',
          Effect: 'Allow',
          Resource: fnGetAttArn(expected.fileTableName),
        },
      ],
    },
  });
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.filesChecksumVersionsVersionResourceId),
    HttpMethod: 'GET',
  });
  // ListCategories API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.listCategoriesFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.listCategoriesFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: [
            'dynamodb:Query',
            'dynamodb:Scan',
            'dynamodb:GetItem',
          ],
          Effect: 'Allow',
          Resource: [
            fnGetAttArn(expected.categoryTableName),
            fnJoin('', [
              fnGetAttArn(expected.categoryTableName),
              '/index/query-by-parent-id',
            ]),
          ],
        },
      ],
    },
  });
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.categoriesResourceId),
    HttpMethod: 'GET',
  });
  // ListFilesByCategory API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.listFilesByCategoryFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.listFilesByCategoryFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: 'dynamodb:Query',
          Effect: 'Allow',
          Resource: [
            fnGetAttArn(expected.fileTableName),
            fnJoin('', [
              fnGetAttArn(expected.fileTableName),
              '/index/query-by-category-id-and-locale',
            ]),
          ],
        },
      ],
    },
  });
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.categoriesCategoryIdResourceId),
    HttpMethod: 'GET',
  });
  // UpdateCategory API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.updateCategoryFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.updateCategoryFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: [
            'dynamodb:GetItem',
            'dynamodb:UpdateItem',
          ],
          Effect: 'Allow',
          Resource: fnGetAttArn(expected.categoryTableName),
        },
      ],
    },
  });
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.categoriesCategoryIdResourceId),
    HttpMethod: 'PUT',
  });
  // UpdateFiles API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.updateFilesFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.updateFilesFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: [
            'dynamodb:BatchWriteItem',
            'dynamodb:BatchGetItem',
          ],
          Effect: 'Allow',
          Resource: fnGetAttArn(expected.fileTableName),
        },
      ],
    },
  });
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.filesResourceId),
    HttpMethod: 'PUT',
  });
  // Category Table
  template.hasResourceProperties('AWS::DynamoDB::Table', {
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
  template.hasResourceProperties('AWS::DynamoDB::Table', {
    AttributeDefinitions: [
      {
        AttributeName: 'fileId',
        AttributeType: 'S',
      },
      {
        AttributeName: 'categoryId',
        AttributeType: 'S',
      },
      {
        AttributeName: 'locale',
        AttributeType: 'S',
      },
      {
        AttributeName: 'checksum',
        AttributeType: 'S',
      },
      {
        AttributeName: 'version',
        AttributeType: 'S',
      },
    ],
    KeySchema: [
      {
        AttributeName: 'fileId',
        KeyType: 'HASH',
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
    GlobalSecondaryIndexes: [
      {
        IndexName: 'query-by-category-id-and-locale',
        KeySchema: [
          {
            AttributeName: 'categoryId',
            KeyType: 'HASH',
          },
          {
            AttributeName: 'locale',
            KeyType: 'RANGE',
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
      {
        IndexName: 'get-file-by-checksum-and-version',
        KeySchema: [
          {
            AttributeName: 'checksum',
            KeyType: 'HASH',
          },
          {
            AttributeName: 'version',
            KeyType: 'RANGE',
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
});