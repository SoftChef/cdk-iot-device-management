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

const LAMBDA_ASSETS_PATH = path.resolve(__dirname, '../lambda-assets/thing-types');

export interface ThingTypeApiProps {
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

export class ThingTypeApi extends Construct {
  /**
   * The ThingType API Gateway
   */
  private readonly _restApi: RestApi;

  constructor(scope: Construct, id: string, props?: ThingTypeApiProps) {
    super(scope, id);
    this._restApi = new RestApi(this, 'ThingTypeRestApi', {
      enableCors: true,
      authorizationType: props?.authorizationType ?? AuthorizationType.NONE,
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

  get restApiId(): string {
    return this._restApi.restApiId;
  }

  private createCreateThingTypeFunction(): NodejsFunction {
    const createThingTypeFunction = new NodejsFunction(this, 'CreateThingTypeFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/get-thing-type/app.ts`,
    });
    createThingTypeFunction.role?.attachInlinePolicy(
      new Policy(this, 'iot-create-thing-type-policy', {
        statements: [
          new PolicyStatement({
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

  private createListThingTypesFunction(): NodejsFunction {
    const listThingTypesFunction = new NodejsFunction(this, 'ListThingTypesFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/list-thing-types/app.ts`,
    });
    listThingTypesFunction.role?.attachInlinePolicy(
      new Policy(this, 'iot-list-thing-types-policy', {
        statements: [
          new PolicyStatement({
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

  private createGetThingTypeFunction(): NodejsFunction {
    const getThingTypeFunction = new NodejsFunction(this, 'GetThingTypeFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/get-thing-type/app.ts`,
    });
    getThingTypeFunction.role?.attachInlinePolicy(
      new Policy(this, 'iot-describe-thing-type-policy', {
        statements: [
          new PolicyStatement({
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

  private createDeprecateThingTypeFunction(): NodejsFunction {
    const deprecateThingTypeFunction = new NodejsFunction(this, 'DeprecateThingTypeFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/deprecate-thing-type/app.ts`,
    });
    deprecateThingTypeFunction.role?.attachInlinePolicy(
      new Policy(this, 'iot-deprecate-thing-type-policy', {
        statements: [
          new PolicyStatement({
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

  private createUndeprecateThingTypeFunction(): NodejsFunction {
    const undeprecateThingTypeFunction = new NodejsFunction(this, 'UndeprecateThingTypeFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/undeprecate-thing-type/app.ts`,
    });
    undeprecateThingTypeFunction.role?.attachInlinePolicy(
      new Policy(this, 'iot-undeprecated-thing-type-policy', {
        statements: [
          new PolicyStatement({
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

  private createDeleteThingTypeFunction(): NodejsFunction {
    const deleteThingTypeFunction = new NodejsFunction(this, 'DeleteThingTypeFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/delete-thing-type/app.ts`,
    });
    deleteThingTypeFunction.role?.attachInlinePolicy(
      new Policy(this, 'iot-delete-thing-type-policy', {
        statements: [
          new PolicyStatement({
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