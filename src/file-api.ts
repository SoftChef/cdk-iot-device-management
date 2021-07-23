import * as path from 'path';
import * as apigateway from '@aws-cdk/aws-apigateway';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as iam from '@aws-cdk/aws-iam';
import * as lambda from '@aws-cdk/aws-lambda-nodejs';
import * as cdk from '@aws-cdk/core';
import { RestApi, HttpMethod } from '@softchef/cdk-restapi';

const LAMBDA_ASSETS_PATH = path.resolve(__dirname, '../lambda-assets/files');

export interface FileApiProps {
  /**
   * Specify API Gateway all resources's authorization type, COGNTIO/IAM/CUSTOM/NONE
   * @default apigateway.AuthorizationType.NONE
   */
  readonly authorizationType?: apigateway.AuthorizationType;
  /**
   * Specify API Gateway's authorizer, CognitoUserPool/Lambda
   * @default undefined
   */
  readonly authorizer?: apigateway.IAuthorizer | undefined;
  readonly categoryTableRCU?: number | 1;
  readonly categoryTableWCU?: number | 1;
  readonly categoryTableQueryByParentIdRCU?: number | 1;
  readonly categoryTableQueryByParentIdWCU?: number | 1;
  readonly fileTableRCU?: number | 1;
  readonly fileTableWCU?: number | 1;
  readonly fileTableQueryByCategoryIdAndLocaleRCU?: number | 1;
  readonly fileTableQueryByCategoryIdAndLocaleWCU?: number | 1;
  readonly fileTableGetFileByChecksumAndVersionRCU?: number | 1;
  readonly fileTableGetFileByChecksumAndVersionWCU?: number | 1;
}

export class FileApi extends cdk.Construct {
  /**
   * The File API Gateway's ID
   */
  public readonly restApiId: string;
  /**
   * The category table
   */
  private readonly categoryTable: dynamodb.Table;
  /**
   * The file table
   */
  private readonly fileTable: dynamodb.Table;

  constructor(scope: cdk.Construct, id: string, props?: FileApiProps) {
    super(scope, id);
    this.categoryTable = new dynamodb.Table(this, 'CategoryTable', {
      partitionKey: {
        name: 'categoryId',
        type: dynamodb.AttributeType.STRING,
      },
      readCapacity: props?.categoryTableRCU,
      writeCapacity: props?.categoryTableWCU,
    });
    this.categoryTable.addGlobalSecondaryIndex({
      indexName: 'query-by-parent-id',
      partitionKey: {
        name: 'parentId',
        type: dynamodb.AttributeType.STRING,
      },
      projectionType: dynamodb.ProjectionType.ALL,
      readCapacity: props?.categoryTableQueryByParentIdRCU,
      writeCapacity: props?.categoryTableQueryByParentIdWCU,
    });
    this.fileTable = new dynamodb.Table(this, 'FileTable', {
      partitionKey: {
        name: 'fileId',
        type: dynamodb.AttributeType.STRING,
      },
      readCapacity: props?.fileTableRCU,
      writeCapacity: props?.fileTableWCU,
    });
    this.fileTable.addGlobalSecondaryIndex({
      indexName: 'query-by-category-id-and-locale',
      partitionKey: {
        name: 'categoryId',
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: 'locale',
        type: dynamodb.AttributeType.STRING,
      },
      projectionType: dynamodb.ProjectionType.ALL,
      readCapacity: props?.fileTableQueryByCategoryIdAndLocaleRCU,
      writeCapacity: props?.fileTableQueryByCategoryIdAndLocaleWCU,
    });
    this.fileTable.addGlobalSecondaryIndex({
      indexName: 'get-file-by-checksum-and-version',
      partitionKey: {
        name: 'checksum',
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: 'version',
        type: dynamodb.AttributeType.STRING,
      },
      projectionType: dynamodb.ProjectionType.ALL,
      readCapacity: props?.fileTableGetFileByChecksumAndVersionRCU,
      writeCapacity: props?.fileTableGetFileByChecksumAndVersionWCU,
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
          path: '/categories/{categoryId}/files',
          httpMethod: HttpMethod.GET,
          lambdaFunction: this.createListFilesByCategoryFunction(),
        },
        {
          path: '/files',
          httpMethod: HttpMethod.GET,
          lambdaFunction: this.createListFilesFunction(),
        },
        {
          path: '/files',
          httpMethod: HttpMethod.POST,
          lambdaFunction: this.createCreateFilesFunction(),
        },
        {
          path: '/files',
          httpMethod: HttpMethod.PUT,
          lambdaFunction: this.createUpdateFilesFunction(),
        },
        {
          path: '/files/file',
          httpMethod: HttpMethod.POST,
          lambdaFunction: this.createCreateFileFunction(),
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
        {
          path: '/files/{checksum}/versions/{version}',
          httpMethod: HttpMethod.GET,
          lambdaFunction: this.createGetFilesFunction(),
        },
        {
          path: '/files/{checksum}/versions/{version}',
          httpMethod: HttpMethod.DELETE,
          lambdaFunction: this.createDeleteFilesFunction(),
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
              'dynamodb:GetItem',
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
      environment: {
        CATEGORY_TABLE_NAME: this.categoryTable.tableName,
      },
    });
    listCategoriesFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'list-categories-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'dynamodb:Query',
              'dynamodb:Scan',
              'dynamodb:GetItem',
            ],
            resources: [
              this.categoryTable.tableArn,
              `${this.categoryTable.tableArn}/index/query-by-parent-id`,
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
              'dynamodb:GetItem',
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
      environment: {
        CATEGORY_TABLE_NAME: this.categoryTable.tableName,
      },
    });
    updateCategoryFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'update-category-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'dynamodb:GetItem',
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
      environment: {
        CATEGORY_TABLE_NAME: this.categoryTable.tableName,
      },
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
              'dynamodb:GetItem',
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

  private createCreateFilesFunction(): lambda.NodejsFunction {
    const createFilesFunction = new lambda.NodejsFunction(this, 'CreateFilesFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/create-files/app.ts`,
      environment: {
        FILE_TABLE_NAME: this.fileTable.tableName,
      },
    });
    createFilesFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'create-file-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'dynamodb:GetItem',
              'dynamodb:PutItem',
            ],
            resources: [
              this.fileTable.tableArn,
            ],
          }),
        ],
      }),
    );
    return createFilesFunction;
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
              'dynamodb:Scan',
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
              'dynamodb:Query',
            ],
            resources: [
              this.fileTable.tableArn,
              `${this.fileTable.tableArn}/index/query-by-category-id`,
            ],
          }),
        ],
      }),
    );
    return listFilesByCategoryFunction;
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
              'dynamodb:GetItem',
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

  private createGetFilesFunction(): lambda.NodejsFunction {
    const getFilesFunction = new lambda.NodejsFunction(this, 'GetFilesFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/get-files/app.ts`,
      environment: {
        FILE_TABLE_NAME: this.fileTable.tableName,
      },
    });
    getFilesFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'get-files-policy', {
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
    return getFilesFunction;
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
              'dynamodb:GetItem',
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

  private createUpdateFilesFunction(): lambda.NodejsFunction {
    const updateFilesFunction = new lambda.NodejsFunction(this, 'UpdateFilesFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/update-files/app.ts`,
      environment: {
        FILE_TABLE_NAME: this.fileTable.tableName,
      },
    });
    updateFilesFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'update-file-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'dynamodb:Query',
              'dynamodb:BatchWriteItem',
            ],
            resources: [
              this.fileTable.tableArn,
            ],
          }),
        ],
      }),
    );
    return updateFilesFunction;
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

  private createDeleteFilesFunction(): lambda.NodejsFunction {
    const deletesFileFunction = new lambda.NodejsFunction(this, 'DeletesFileFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/delete-files/app.ts`,
      environment: {
        FILE_TABLE_NAME: this.fileTable.tableName,
      },
    });
    deletesFileFunction.role?.attachInlinePolicy(
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
    return deletesFileFunction;
  }
}