import * as path from 'path';
import * as apigateway from '@aws-cdk/aws-apigateway';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as iam from '@aws-cdk/aws-iam';
import * as lambda from '@aws-cdk/aws-lambda-nodejs';
import * as cdk from '@aws-cdk/core';
import { RestApi, HttpMethod } from '@softchef/cdk-restapi';

const LAMBDA_ASSETS_PATH = path.resolve(__dirname, '../lambda-assets/files');

export interface FileApiProps {
  readonly authorizationType?: apigateway.AuthorizationType;
  readonly authorizer?: apigateway.IAuthorizer | undefined;
}

export class FileApi extends cdk.Construct {

  public readonly restApiId: string;

  private readonly categoryTable: dynamodb.Table;

  private readonly fileTable: dynamodb.Table;

  constructor(scope: cdk.Construct, id: string, props?: FileApiProps) {
    super(scope, id);
    this.categoryTable = new dynamodb.Table(this, 'CategoryTable', {
      partitionKey: {
        name: 'categoryId',
        type: dynamodb.AttributeType.STRING,
      },
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
    const restApi = new RestApi(this, 'FileRestApi', {
      enableCors: true,
      authorizationType: props?.authorizationType ?? apigateway.AuthorizationType.NONE,
      authorizer: props?.authorizer ?? undefined,
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
      entry: `${LAMBDA_ASSETS_PATH}/get-category/app.ts`,
    });
    createCategoryFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'create-category-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'dynamodb:PutItem',
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
    });
    listCategoriesFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'list-categories-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'dynamodb:Query',
            ],
            resources: [
              this.categoryTable.tableArn,
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
    });
    getCategoryFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'get-category-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'dynamodb:Get',
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

  private createUpdateCategoryFunction(): lambda.NodejsFunction {
    const updateCategoryFunction = new lambda.NodejsFunction(this, 'UpdateCategoryFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/update-category/app.ts`,
    });
    updateCategoryFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'update-category-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'dynamodb:UpdateItem',
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
    });
    deleteCategoryFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'delete-category-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'dynamodb:DeleteItem',
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
      entry: `${LAMBDA_ASSETS_PATH}/get-file/app.ts`,
    });
    createFileFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'create-file-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'dynamodb:PutItem',
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
    });
    listFilesFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'list-files-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'dynamodb:Query',
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
    });
    getFileFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'get-file-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'dynamodb:Get',
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
    });
    updateFileFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'update-file-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'dynamodb:UpdateItem',
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
    });
    deleteFileFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'delete-file-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'dynamodb:DeleteItem',
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