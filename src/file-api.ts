import * as path from 'path';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as iam from '@aws-cdk/aws-iam';
import * as lambda from '@aws-cdk/aws-lambda-nodejs';
import * as cdk from '@aws-cdk/core';
import { RestApi, HttpMethod } from '@softchef/cdk-restapi';

const LAMBDA_ASSETS_PATH = path.resolve(__dirname, '../lambda-assets/files');

// interface FileApiProps {

// }

export class FileApi extends cdk.Construct {

  public readonly restApiId: string;

  private readonly categoryTable: dynamodb.Table;

  private readonly fileTable: dynamodb.Table;

  constructor(scope: cdk.Construct, id: string) {
    super(scope, id);
    this.categoryTable = new dynamodb.Table(this, 'CategoryTable', {
      partitionKey: {
        name: 'categoryId',
        type: dynamodb.AttributeType.STRING,
      },
      readCapacity: 1,
      writeCapacity: 1,
    });
    this.categoryTable.addGlobalSecondaryIndex({
      indexName: 'query-by-parent-id',
      partitionKey: { name: 'parentId', type: dynamodb.AttributeType.STRING },
      projectionType: dynamodb.ProjectionType.ALL,
      readCapacity: 1,
      writeCapacity: 1,
    });
    this.fileTable = new dynamodb.Table(this, 'FileTable', {
      partitionKey: {
        name: 'fileId',
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: 'version',
        type: dynamodb.AttributeType.STRING,
      },
      readCapacity: 1,
      writeCapacity: 1,
    });
    this.fileTable.addGlobalSecondaryIndex({
      indexName: 'query-by-category-id',
      partitionKey: { name: 'categoryId', type: dynamodb.AttributeType.STRING },
      projectionType: dynamodb.ProjectionType.ALL,
      readCapacity: 1,
      writeCapacity: 1,
    });
    const restApi = new RestApi(this, 'FileRestApi', {
      enableCors: true,
      resources: [
        {
          path: '/categories',
          httpMethod: HttpMethod.POST,
          lambdaFunction: this.createCreateCategoryFunction(),
        },
        {
          path: '/categories',
          httpMethod: HttpMethod.GET,
          lambdaFunction: this.createListCategoriesFunction(),
        },
        {
          path: '/categories/{categoryId}',
          httpMethod: HttpMethod.GET,
          lambdaFunction: this.createGetCategoryFunction(),
        },
        {
          path: '/categories/{categoryId}/files',
          httpMethod: HttpMethod.GET,
          lambdaFunction: this.createListFilesByCategoryFunction(),
        },
        {
          path: '/categories/{categoryId}',
          httpMethod: HttpMethod.PUT,
          lambdaFunction: this.createUpdateCategoryFunction(),
        },
        {
          path: '/categories/{categoryId}',
          httpMethod: HttpMethod.DELETE,
          lambdaFunction: this.createDeleteCategoryFunction(),
        },
        {
          path: '/files',
          httpMethod: HttpMethod.POST,
          lambdaFunction: this.createCreateFileFunction(),
        },
        {
          path: '/files',
          httpMethod: HttpMethod.GET,
          lambdaFunction: this.createListFilesFunction(),
        },
        {
          path: '/files/{fileId}',
          httpMethod: HttpMethod.GET,
          lambdaFunction: this.createGetFileFunction(),
        },
        {
          path: '/files/{fileId}',
          httpMethod: HttpMethod.PUT,
          lambdaFunction: this.createUpdateFileFunction(),
        },
        {
          path: '/files/{fileId}',
          httpMethod: HttpMethod.DELETE,
          lambdaFunction: this.createDeleteFileFunction(),
        },
      ],
    });
    this.restApiId = restApi.restApiId;
  }

  private createCreateCategoryFunction(): lambda.NodejsFunction {
    const createCategoryFunction = new lambda.NodejsFunction(this, 'CreateCategoryFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/create-category/app.ts`,
      environment: {
        CATEGORY_TABLE_NAME: this.categoryTable.tableName,
      },
    });
    createCategoryFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'create-category-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'dynamodb:*',
            ],
            resources: [
              this.categoryTable.tableArn,
            ],
          }),
        ],
      }),
    );
    return createCategoryFunction;
  }

  private createListCategoriesFunction(): lambda.NodejsFunction {
    const listCategoriesFunction = new lambda.NodejsFunction(this, 'ListCategoriesFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/list-categories/app.ts`,
      environment: {
        CATEGORY_TABLE_NAME: this.categoryTable.tableName,
      },
    });
    listCategoriesFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'list-categories-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'dynamodb:*',
            ],
            resources: [
              this.categoryTable.tableArn,
              `${this.categoryTable.tableArn}/index/*`,
            ],
          }),
        ],
      }),
    );
    return listCategoriesFunction;
  }

  private createGetCategoryFunction(): lambda.NodejsFunction {
    const getCategoryFunction = new lambda.NodejsFunction(this, 'GetCategoryFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/get-category/app.ts`,
      environment: {
        CATEGORY_TABLE_NAME: this.categoryTable.tableName,
      },
    });
    getCategoryFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'get-category-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'dynamodb:*',
            ],
            resources: [
              this.categoryTable.tableArn,
            ],
          }),
        ],
      }),
    );
    return getCategoryFunction;
  }

  private createListFilesByCategoryFunction(): lambda.NodejsFunction {
    const listFilesByCategoryFunction = new lambda.NodejsFunction(this, 'ListFilesByCategoryFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/list-files-by-category/app.ts`,
      environment: {
        FILE_TABLE_NAME: this.fileTable.tableName,
      },
    });
    listFilesByCategoryFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'list-files-by-category-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'dynamodb:*',
            ],
            resources: [
              this.categoryTable.tableArn,
              `${this.categoryTable.tableArn}/index/*`,
            ],
          }),
        ],
      }),
    );
    return listFilesByCategoryFunction;
  }

  private createUpdateCategoryFunction(): lambda.NodejsFunction {
    const updateCategoryFunction = new lambda.NodejsFunction(this, 'UpdateCategoryFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/update-category/app.ts`,
      environment: {
        CATEGORY_TABLE_NAME: this.categoryTable.tableName,
      },
    });
    updateCategoryFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'update-category-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'dynamodb:*',
            ],
            resources: [
              this.categoryTable.tableArn,
            ],
          }),
        ],
      }),
    );
    return updateCategoryFunction;
  }

  private createDeleteCategoryFunction(): lambda.NodejsFunction {
    const deleteCategoryFunction = new lambda.NodejsFunction(this, 'DeleteCategoryFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/delete-category/app.ts`,
      environment: {
        CATEGORY_TABLE_NAME: this.categoryTable.tableName,
      },
    });
    deleteCategoryFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'delete-category-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'dynamodb:*',
            ],
            resources: [
              this.categoryTable.tableArn,
            ],
          }),
        ],
      }),
    );
    return deleteCategoryFunction;
  }

  private createCreateFileFunction(): lambda.NodejsFunction {
    const createFileFunction = new lambda.NodejsFunction(this, 'CreateFileFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/create-file/app.ts`,
      environment: {
        FILE_TABLE_NAME: this.fileTable.tableName,
      },
    });
    createFileFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'create-file-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'dynamodb:*',
            ],
            resources: [
              this.fileTable.tableArn,
            ],
          }),
        ],
      }),
    );
    return createFileFunction;
  }

  private createListFilesFunction(): lambda.NodejsFunction {
    const listFilesFunction = new lambda.NodejsFunction(this, 'ListFilesFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/list-files/app.ts`,
      environment: {
        FILE_TABLE_NAME: this.fileTable.tableName,
      },
    });
    listFilesFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'list-files-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'dynamodb:*',
            ],
            resources: [
              this.fileTable.tableArn,
            ],
          }),
        ],
      }),
    );
    return listFilesFunction;
  }

  private createGetFileFunction(): lambda.NodejsFunction {
    const getFileFunction = new lambda.NodejsFunction(this, 'GetFileFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/get-file/app.ts`,
      environment: {
        FILE_TABLE_NAME: this.fileTable.tableName,
      },
    });
    getFileFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'get-file-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'dynamodb:*',
            ],
            resources: [
              this.fileTable.tableArn,
            ],
          }),
        ],
      }),
    );
    return getFileFunction;
  }

  private createUpdateFileFunction(): lambda.NodejsFunction {
    const updateFileFunction = new lambda.NodejsFunction(this, 'UpdateFileFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/update-file/app.ts`,
      environment: {
        FILE_TABLE_NAME: this.fileTable.tableName,
      },
    });
    updateFileFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'update-file-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'dynamodb:*',
            ],
            resources: [
              this.fileTable.tableArn,
            ],
          }),
        ],
      }),
    );
    return updateFileFunction;
  }

  private createDeleteFileFunction(): lambda.NodejsFunction {
    const deleteFileFunction = new lambda.NodejsFunction(this, 'DeleteFileFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/delete-file/app.ts`,
      environment: {
        FILE_TABLE_NAME: this.fileTable.tableName,
      },
    });
    deleteFileFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'delete-file-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'dynamodb:*',
            ],
            resources: [
              this.fileTable.tableArn,
            ],
          }),
        ],
      }),
    );
    return deleteFileFunction;
  }
}