import * as path from 'path';
import {
  RestApi,
  HttpMethod,
} from '@softchef/cdk-restapi';
import {
  AuthorizationType,
  IAuthorizer,
} from 'aws-cdk-lib/aws-apigateway';
import {
  Policy,
  PolicyStatement,
} from 'aws-cdk-lib/aws-iam';
import {
  NodejsFunction,
} from 'aws-cdk-lib/aws-lambda-nodejs';
import {
  Construct,
} from 'constructs';

const LAMBDA_ASSETS_PATH = path.resolve(__dirname, '../lambda-assets/things');

/**
 * Thing API props
 */
export interface ThingApiProps {
  /**
   * Specify API Gateway all resources's authorization type, COGNTIO/IAM/CUSTOM/NONE
   * @default AuthorizationType.NONE
   */
  readonly authorizationType?: AuthorizationType;
  /**
   * Specify API Gateway's authorizer, CognitoUserPool/Lambda
   * @default undefined
   */
  readonly authorizer?: IAuthorizer | undefined;
}

/**
 * Thing API construct
 */
export class ThingApi extends Construct {
  /**
   * The Thing API Gateway
   */
  private readonly _restApi: RestApi;

  constructor(scope: Construct, id: string, props?: ThingApiProps) {
    super(scope, id);
    this._restApi = new RestApi(this, 'ThingRestApi', {
      enableCors: true,
      authorizationType: props?.authorizationType ?? AuthorizationType.NONE,
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

  private createCreateThingFunction(): NodejsFunction {
    const createThingFunction = new NodejsFunction(this, 'CreateThingFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/create-thing/app.ts`,
    });
    createThingFunction.role?.attachInlinePolicy(
      new Policy(this, 'iot-create-thing-policy', {
        statements: [
          new PolicyStatement({
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

  private createListThingsFunction(): NodejsFunction {
    const listThingsFunction = new NodejsFunction(this, 'ListThingsFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/list-things/app.ts`,
    });
    listThingsFunction.role?.attachInlinePolicy(
      new Policy(this, 'iot-list-things-policy', {
        statements: [
          new PolicyStatement({
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

  private createGetThingFunction(): NodejsFunction {
    const getThingFunction = new NodejsFunction(this, 'GetThingFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/get-thing/app.ts`,
    });
    getThingFunction.role?.attachInlinePolicy(
      new Policy(this, 'iot-describe-thing-policy', {
        statements: [
          new PolicyStatement({
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

  private createUpdateThingFunction(): NodejsFunction {
    const updateThingFunction = new NodejsFunction(this, 'UpdateThingFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/update-thing/app.ts`,
    });
    updateThingFunction.role?.attachInlinePolicy(
      new Policy(this, 'iot-update-thing-policy', {
        statements: [
          new PolicyStatement({
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

  private createDeleteThingFunction(): NodejsFunction {
    const deleteThingFunction = new NodejsFunction(this, 'DeleteThingFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/delete-thing/app.ts`,
    });
    deleteThingFunction.role?.attachInlinePolicy(
      new Policy(this, 'iot-delete-thing-policy', {
        statements: [
          new PolicyStatement({
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

  private createListThingShadowsFunction(): NodejsFunction {
    const listThingShadowsFunction = new NodejsFunction(this, 'ListThingShadowsFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/list-thing-shadows/app.ts`,
    });
    listThingShadowsFunction.role?.attachInlinePolicy(
      new Policy(this, 'iot-list-thing-shadows-policy', {
        statements: [
          new PolicyStatement({
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

  private createGetThingShadowFunction(): NodejsFunction {
    const getThingShadowFunction = new NodejsFunction(this, 'GetThingShadowFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/get-thing-shadow/app.ts`,
    });
    getThingShadowFunction.role?.attachInlinePolicy(
      new Policy(this, 'iot-get-thing-shadow-policy', {
        statements: [
          new PolicyStatement({
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

  private createUpdateThingShadowFunction(): NodejsFunction {
    const updateThingShadowFunction = new NodejsFunction(this, 'UpdateThingShadowFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/update-thing-shadow/app.ts`,
    });
    updateThingShadowFunction.role?.attachInlinePolicy(
      new Policy(this, 'iot-update-thing-shadow-policy', {
        statements: [
          new PolicyStatement({
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

  private createDeleteThingShadowFunction(): NodejsFunction {
    const deleteThingShadowFunction = new NodejsFunction(this, 'DeleteThingShadowFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/delete-thing-shadow/app.ts`,
    });
    deleteThingShadowFunction.role?.attachInlinePolicy(
      new Policy(this, 'iot-delete-thing-shadow-policy', {
        statements: [
          new PolicyStatement({
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

  private createSearchThingsFunction(): NodejsFunction {
    const searchThingsFunction = new NodejsFunction(this, 'SearchThingsFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/search-things/app.ts`,
    });
    searchThingsFunction.role?.attachInlinePolicy(
      new Policy(this, 'iot-search-things-policy', {
        statements: [
          new PolicyStatement({
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