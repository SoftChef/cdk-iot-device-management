import * as path from 'path';
import * as apigateway from '@aws-cdk/aws-apigateway';
import * as iam from '@aws-cdk/aws-iam';
import * as lambda from '@aws-cdk/aws-lambda-nodejs';
import * as cdk from '@aws-cdk/core';
import { RestApi, HttpMethod } from '@softchef/cdk-restapi';

const LAMBDA_ASSETS_PATH = path.resolve(__dirname, '../lambda-assets/things');

/**
 * Thing API props
 */
export interface ThingApiProps {
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
 * Thing API construct
 */
export class ThingApi extends cdk.Construct {
  /**
   * The Thing API Gateway
   */
  private readonly _restApi: RestApi;

  constructor(scope: cdk.Construct, id: string, props?: ThingApiProps) {
    super(scope, id);
    this._restApi = new RestApi(this, 'ThingRestApi', {
      enableCors: true,
      authorizationType: props?.authorizationType ?? apigateway.AuthorizationType.NONE,
      authorizer: props?.authorizer ?? undefined,
      resources: [
        {
          path: '/things',
          httpMethod: HttpMethod.POST,
          lambdaFunction: this.createCreateThingFunction(),
        },
        {
          path: '/things',
          httpMethod: HttpMethod.GET,
          lambdaFunction: this.createListThingsFunction(),
        },
        {
          path: '/things/{thingName}',
          httpMethod: HttpMethod.GET,
          lambdaFunction: this.createGetThingFunction(),
        },
        {
          path: '/things/{thingName}',
          httpMethod: HttpMethod.PUT,
          lambdaFunction: this.createUpdateThingFunction(),
        },
        {
          path: '/things/{thingName}',
          httpMethod: HttpMethod.DELETE,
          lambdaFunction: this.createDeleteThingFunction(),
        },
        {
          path: '/things/{thingName}/shadows',
          httpMethod: HttpMethod.GET,
          lambdaFunction: this.createListThingShadowsFunction(),
        },
        {
          path: '/things/{thingName}/shadows/{shadowName}',
          httpMethod: HttpMethod.GET,
          lambdaFunction: this.createGetThingShadowFunction(),
        },
        {
          path: '/things/{thingName}/shadows/{shadowName}',
          httpMethod: HttpMethod.PUT,
          lambdaFunction: this.createUpdateThingShadowFunction(),
        },
        {
          path: '/things/{thingName}/shadows/{shadowName}',
          httpMethod: HttpMethod.DELETE,
          lambdaFunction: this.createDeleteThingShadowFunction(),
        },
        {
          path: '/things/search',
          httpMethod: HttpMethod.GET,
          lambdaFunction: this.createSearchThingsFunction(),
        },
      ],
    });
  }

  /**
   * Thing API API ID
   */
  get restApiId(): string {
    return this._restApi.restApiId;
  }

  private createCreateThingFunction(): lambda.NodejsFunction {
    const createThingFunction = new lambda.NodejsFunction(this, 'CreateThingFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/create-thing/app.ts`,
    });
    createThingFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'iot-create-thing-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'iot:CreateThing',
            ],
            resources: ['*'],
          }),
        ],
      }),
    );
    return createThingFunction;
  }

  private createListThingsFunction(): lambda.NodejsFunction {
    const listThingsFunction = new lambda.NodejsFunction(this, 'ListThingsFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/list-things/app.ts`,
    });
    listThingsFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'iot-list-things-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'iot:ListThings',
            ],
            resources: ['*'],
          }),
        ],
      }),
    );
    return listThingsFunction;
  }

  private createGetThingFunction(): lambda.NodejsFunction {
    const getThingFunction = new lambda.NodejsFunction(this, 'GetThingFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/get-thing/app.ts`,
    });
    getThingFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'iot-describe-thing-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'iot:DescribeThing',
            ],
            resources: ['*'],
          }),
        ],
      }),
    );
    return getThingFunction;
  }

  private createUpdateThingFunction(): lambda.NodejsFunction {
    const updateThingFunction = new lambda.NodejsFunction(this, 'UpdateThingFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/update-thing/app.ts`,
    });
    updateThingFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'iot-update-thing-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'iot:UpdateThing',
            ],
            resources: ['*'],
          }),
        ],
      }),
    );
    return updateThingFunction;
  }

  private createDeleteThingFunction(): lambda.NodejsFunction {
    const deleteThingFunction = new lambda.NodejsFunction(this, 'DeleteThingFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/delete-thing/app.ts`,
    });
    deleteThingFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'iot-delete-thing-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'iot:DeleteThing',
            ],
            resources: ['*'],
          }),
        ],
      }),
    );
    return deleteThingFunction;
  }

  private createListThingShadowsFunction(): lambda.NodejsFunction {
    const listThingShadowsFunction = new lambda.NodejsFunction(this, 'ListThingShadowsFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/list-thing-shadows/app.ts`,
    });
    listThingShadowsFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'iot-list-thing-shadows-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'iot:ListNamedShadowsForThing',
            ],
            resources: ['*'],
          }),
        ],
      }),
    );
    return listThingShadowsFunction;
  }

  private createGetThingShadowFunction(): lambda.NodejsFunction {
    const getThingShadowFunction = new lambda.NodejsFunction(this, 'GetThingShadowFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/get-thing-shadow/app.ts`,
    });
    getThingShadowFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'iot-get-thing-shadow-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'iot:GetThingShadow',
            ],
            resources: ['*'],
          }),
        ],
      }),
    );
    return getThingShadowFunction;
  }

  private createUpdateThingShadowFunction(): lambda.NodejsFunction {
    const updateThingShadowFunction = new lambda.NodejsFunction(this, 'UpdateThingShadowFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/update-thing-shadow/app.ts`,
    });
    updateThingShadowFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'iot-update-thing-shadow-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'iot:UpdateThingShadow',
            ],
            resources: ['*'],
          }),
        ],
      }),
    );
    return updateThingShadowFunction;
  }

  private createDeleteThingShadowFunction(): lambda.NodejsFunction {
    const deleteThingShadowFunction = new lambda.NodejsFunction(this, 'DeleteThingShadowFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/delete-thing-shadow/app.ts`,
    });
    deleteThingShadowFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'iot-delete-thing-shadow-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'iot:DeleteThingShadow',
            ],
            resources: ['*'],
          }),
        ],
      }),
    );
    return deleteThingShadowFunction;
  }

  private createSearchThingsFunction(): lambda.NodejsFunction {
    const searchThingsFunction = new lambda.NodejsFunction(this, 'SearchThingsFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/search-things/app.ts`,
    });
    searchThingsFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'iot-search-things-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'iot:SearchIndex',
            ],
            resources: ['*'],
          }),
        ],
      }),
    );
    return searchThingsFunction;
  }
}