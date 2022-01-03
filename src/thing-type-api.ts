import * as path from 'path';
import * as apigateway from '@aws-cdk/aws-apigateway';
import * as iam from '@aws-cdk/aws-iam';
import * as lambda from '@aws-cdk/aws-lambda-nodejs';
import * as cdk from '@aws-cdk/core';
import { RestApi, HttpMethod } from '@softchef/cdk-restapi';

const LAMBDA_ASSETS_PATH = path.resolve(__dirname, '../lambda-assets/thing-types');

/**
 * Thing Type API props
 */
export interface ThingTypeApiProps {
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
}

/**
 * Thing Type API construct
 */
export class ThingTypeApi extends cdk.Construct {
  /**
   * The Thing Type API Gateway
   */
  private readonly _restApi: RestApi;

  constructor(scope: cdk.Construct, id: string, props?: ThingTypeApiProps) {
    super(scope, id);
    this._restApi = new RestApi(this, 'ThingTypeRestApi', {
      enableCors: true,
      authorizationType: props?.authorizationType ?? apigateway.AuthorizationType.NONE,
      authorizer: props?.authorizer ?? undefined,
      resources: [
        {
          path: '/thing-types',
          httpMethod: HttpMethod.POST,
          lambdaFunction: this.createCreateThingTypeFunction(),
        },
        {
          path: '/thing-types',
          httpMethod: HttpMethod.GET,
          lambdaFunction: this.createListThingTypesFunction(),
        },
        {
          path: '/thing-types/{thingTypeName}',
          httpMethod: HttpMethod.GET,
          lambdaFunction: this.createGetThingTypeFunction(),
        },
        {
          path: '/thing-types/{thingTypeName}/deprecate',
          httpMethod: HttpMethod.PUT,
          lambdaFunction: this.createDeprecateThingTypeFunction(),
        },
        {
          path: '/thing-types/{thingTypeName}/undeprecate',
          httpMethod: HttpMethod.PUT,
          lambdaFunction: this.createUndeprecateThingTypeFunction(),
        },
        {
          path: '/thing-types/{thingTypeName}',
          httpMethod: HttpMethod.DELETE,
          lambdaFunction: this.createDeleteThingTypeFunction(),
        },
      ],
    });
  }

  /**
   * Thing Type API API ID
   */
  get restApiId(): string {
    return this._restApi.restApiId;
  }

  private createCreateThingTypeFunction(): lambda.NodejsFunction {
    const createThingTypeFunction = new lambda.NodejsFunction(this, 'CreateThingTypeFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/get-thing-type/app.ts`,
    });
    createThingTypeFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'iot-create-thing-type-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'iot:CreateThingType',
            ],
            resources: ['*'],
          }),
        ],
      }),
    );
    return createThingTypeFunction;
  }

  private createListThingTypesFunction(): lambda.NodejsFunction {
    const listThingTypesFunction = new lambda.NodejsFunction(this, 'ListThingTypesFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/list-thing-types/app.ts`,
    });
    listThingTypesFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'iot-list-thing-types-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'iot:ListThingTypes',
            ],
            resources: ['*'],
          }),
        ],
      }),
    );
    return listThingTypesFunction;
  }

  private createGetThingTypeFunction(): lambda.NodejsFunction {
    const getThingTypeFunction = new lambda.NodejsFunction(this, 'GetThingTypeFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/get-thing-type/app.ts`,
    });
    getThingTypeFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'iot-describe-thing-type-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'iot:DescribeThingType',
            ],
            resources: ['*'],
          }),
        ],
      }),
    );
    return getThingTypeFunction;
  }

  private createDeprecateThingTypeFunction(): lambda.NodejsFunction {
    const deprecateThingTypeFunction = new lambda.NodejsFunction(this, 'DeprecateThingTypeFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/deprecate-thing-type/app.ts`,
    });
    deprecateThingTypeFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'iot-deprecate-thing-type-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'iot:DeprecateThingType',
            ],
            resources: ['*'],
          }),
        ],
      }),
    );
    return deprecateThingTypeFunction;
  }

  private createUndeprecateThingTypeFunction(): lambda.NodejsFunction {
    const undeprecateThingTypeFunction = new lambda.NodejsFunction(this, 'UndeprecateThingTypeFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/undeprecate-thing-type/app.ts`,
    });
    undeprecateThingTypeFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'iot-undeprecated-thing-type-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'iot:DeprecateThingType',
            ],
            resources: ['*'],
          }),
        ],
      }),
    );
    return undeprecateThingTypeFunction;
  }

  private createDeleteThingTypeFunction(): lambda.NodejsFunction {
    const deleteThingTypeFunction = new lambda.NodejsFunction(this, 'DeleteThingTypeFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/delete-thing-type/app.ts`,
    });
    deleteThingTypeFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'iot-delete-thing-type-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'iot:DeleteThingType',
            ],
            resources: ['*'],
          }),
        ],
      }),
    );
    return deleteThingTypeFunction;
  }

}