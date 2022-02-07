import * as path from 'path';
import * as apigateway from '@aws-cdk/aws-apigateway';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as iam from '@aws-cdk/aws-iam';
import * as lambda from '@aws-cdk/aws-lambda-nodejs';
import * as cdk from '@aws-cdk/core';
import { RestApi, HttpMethod } from '@softchef/cdk-restapi';

const LAMBDA_ASSETS_PATH = path.resolve(__dirname, '../lambda-assets/files');

/**
  * Specify file, category table read/write capacity.
 */
export interface Capacity {
  /**
   * The write capacity for the table.
   */
  readonly writeCapacity?: number;
  /**
   * The read capacity for the table.
   */
  readonly readCapacity?: number;
}

/**
 * Category table capacity config
 */
export interface CategoryTableConfig {
  /**
   * Category table capacity,
   * specify at `Capacity` interface.
   */
  readonly primaryIndex: Capacity;
  /**
   * Category table global secondary index `query-by-parent-id` capacity,
   * specify at `Capacity` interface.
   */
  readonly indexQueryByParentId: Capacity;
}

/**
 * File table capacity config
 */
export interface FileTableConfig {
  /**
   * File table capacity
   * specify at `Capacity` interface
   */
  readonly primaryIndex: Capacity;
  /**
   * File table global secondary index `query-by-category-id-and-locale` capacity
   * specify at `Capacity` interface.
   */
  readonly indexQueryByCategoryIdAndLocale: Capacity;
  /**
   * File table global secondary index `get-file-by-checksum-and-version` capacity
   * specify at `Capacity` interface.
   */
  readonly indexGetFileByChecksumAndVersion: Capacity;
}

/**
 * File API props
 */
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
  /**
   * Category Table Configuration
   * @default undefined
   */
  readonly categoryTableConfig?: CategoryTableConfig;
  /**
   * File Table Configuration
   * @default undefined
   */
  readonly fileTableConfig?: FileTableConfig;
}

/**
 * File API construct
 */
export class FileApi extends cdk.Construct {
  /**
   * The File API Gateway
   */
  private readonly _restApi: RestApi;
  /**
   * The category table
   */
  public readonly categoryTable: dynamodb.Table;
  /**
   * The file table
   */
  public readonly fileTable: dynamodb.Table;

  constructor(scope: cdk.Construct, id: string, props?: FileApiProps) {
    super(scope, id);
    this.categoryTable = new dynamodb.Table(this, 'CategoryTable', {
      partitionKey: {
        name: 'categoryId',
        type: dynamodb.AttributeType.STRING,
      },
      readCapacity: props?.categoryTableConfig?.primaryIndex.readCapacity ?? 1,
      writeCapacity: props?.categoryTableConfig?.primaryIndex.writeCapacity ?? 1,
    });
    this.categoryTable.addGlobalSecondaryIndex({
      indexName: 'query-by-parent-id',
      partitionKey: {
        name: 'parentId',
        type: dynamodb.AttributeType.STRING,
      },
      projectionType: dynamodb.ProjectionType.ALL,
      readCapacity: props?.categoryTableConfig?.indexQueryByParentId.readCapacity ?? 1,
      writeCapacity: props?.categoryTableConfig?.indexQueryByParentId.writeCapacity ?? 1,
    });
    this.fileTable = new dynamodb.Table(this, 'FileTable', {
      partitionKey: {
        name: 'fileId',
        type: dynamodb.AttributeType.STRING,
      },
      readCapacity: props?.fileTableConfig?.primaryIndex.readCapacity ?? 1,
      writeCapacity: props?.fileTableConfig?.primaryIndex.writeCapacity ?? 1,
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
      readCapacity: props?.fileTableConfig?.indexQueryByCategoryIdAndLocale.readCapacity ?? 1,
      writeCapacity: props?.fileTableConfig?.indexQueryByCategoryIdAndLocale.writeCapacity ?? 1,
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
      readCapacity: props?.fileTableConfig?.indexGetFileByChecksumAndVersion.readCapacity ?? 1,
      writeCapacity: props?.fileTableConfig?.indexGetFileByChecksumAndVersion.writeCapacity ?? 1,
    });

    this._restApi = new RestApi(this, 'FileRestApi', {
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
          path: '/files',
          httpMethod: HttpMethod.DELETE,
          lambdaFunction: this.createDeleteFilesFunction(),
        },
        {
          path: '/files/{checksum}/versions/{version}',
          httpMethod: HttpMethod.GET,
          lambdaFunction: this.createGetFilesFunction(),
        },
      ],
    });
  }

  /**
   * File API API ID
   */
  get restApiId(): string {
    return this._restApi.restApiId;
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

  private createCreateFilesFunction(): lambda.NodejsFunction {
    const createFilesFunction = new lambda.NodejsFunction(this, 'CreateFilesFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/create-files/app.ts`,
      environment: {
        FILE_TABLE_NAME: this.fileTable.tableName,
        CATEGORY_TABLE_NAME: this.categoryTable.tableName,
      },
    });
    createFilesFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'create-file-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'dynamodb:GetItem',
              'dynamodb:Query',
              'dynamodb:BatchWriteItem',
            ],
            resources: [
              this.fileTable.tableArn,
              `${this.fileTable.tableArn}/index/get-file-by-checksum-and-version`,
              this.categoryTable.tableArn,
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
              `${this.fileTable.tableArn}/index/query-by-category-id-and-locale`,
            ],
          }),
        ],
      }),
    );
    return listFilesByCategoryFunction;
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
              'dynamodb:BatchWriteItem',
              'dynamodb:BatchGetItem',
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

  private createDeleteFilesFunction(): lambda.NodejsFunction {
    const deleteFilesFunction = new lambda.NodejsFunction(this, 'DeleteFilesFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/delete-files/app.ts`,
      environment: {
        FILE_TABLE_NAME: this.fileTable.tableName,
      },
    });
    deleteFilesFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'delete-file-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'dynamodb:BatchWriteItem',
            ],
            resources: [
              this.fileTable.tableArn,
            ],
          }),
        ],
      }),
    );
    return deleteFilesFunction;
  }
}