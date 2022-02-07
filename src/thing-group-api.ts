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

const LAMBDA_ASSETS_PATH = path.resolve(__dirname, '../lambda-assets/thing-groups');

/**
 * Thing Group API props
 */
export interface ThingGroupApiProps {
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
 * Thing Group API construct
 */
export class ThingGroupApi extends Construct {
  /**
   * The Thing Group API Gateway
   */
  private readonly _restApi: RestApi;

  constructor(scope: Construct, id: string, props?: ThingGroupApiProps) {
    super(scope, id);
    this._restApi = new RestApi(this, 'ThingGroupRestApi', {
      enableCors: true,
      authorizationType: props?.authorizationType ?? AuthorizationType.NONE,
      authorizer: props?.authorizer ?? undefined,
      resources: [
        {
          path: '/thing-groups',
          httpMethod: HttpMethod.POST,
          lambdaFunction: this.createCreateThingGroupFunction(),
        },
        {
          path: '/thing-groups',
          httpMethod: HttpMethod.GET,
          lambdaFunction: this.createListThingGroupsFunction(),
        },
        {
          path: '/thing-groups/{thingGroupName}',
          httpMethod: HttpMethod.GET,
          lambdaFunction: this.createGetThingGroupFunction(),
        },
        {
          path: '/thing-groups/{thingGroupName}',
          httpMethod: HttpMethod.PUT,
          lambdaFunction: this.createUpdateThingGroupFunction(),
        },
        {
          path: '/thing-groups/{thingGroupName}',
          httpMethod: HttpMethod.DELETE,
          lambdaFunction: this.createDeleteThingGroupFunction(),
        },
        {
          path: '/thing-groups/{thingGroupName}/things/{thingName}',
          httpMethod: HttpMethod.PUT,
          lambdaFunction: this.createAddThingToThingGroupFunction(),
        },
        {
          path: '/thing-groups/{thingGroupName}/things/{thingName}',
          httpMethod: HttpMethod.DELETE,
          lambdaFunction: this.createRemoveThingFromThingGroupFunction(),
        },
        {
          path: '/dynamic-thing-groups',
          httpMethod: HttpMethod.POST,
          lambdaFunction: this.createCreateDynamicThingGroupFunction(),
        },
        {
          path: '/dynamic-thing-groups/{thingGroupName}',
          httpMethod: HttpMethod.PUT,
          lambdaFunction: this.createUpdateDynamicThingGroupFunction(),
        },
        {
          path: '/dynamic-thing-groups/{thingGroupName}',
          httpMethod: HttpMethod.DELETE,
          lambdaFunction: this.createDeleteDynamicThingGroupFunction(),
        },
      ],
    });
  }

  /**
   * Thing Group API API ID
   */
  get restApiId(): string {
    return this._restApi.restApiId;
  }

  private createCreateThingGroupFunction(): NodejsFunction {
    const createThingGroupFunction = new NodejsFunction(this, 'CreateThingGroupFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/create-thing-group/app.ts`,
    });
    createThingGroupFunction.role?.attachInlinePolicy(
      new Policy(this, 'iot-create-thing-group-policy', {
        statements: [
          new PolicyStatement({
            actions: [
              'iot:CreateThingGroup',
            ],
            resources: ['*'],
          }),
        ],
      }),
    );
    return createThingGroupFunction;
  }

  private createListThingGroupsFunction(): NodejsFunction {
    const listThingGroupsFunction = new NodejsFunction(this, 'ListThingGroupsFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/list-thing-groups/app.ts`,
    });
    listThingGroupsFunction.role?.attachInlinePolicy(
      new Policy(this, 'iot-list-things-policy', {
        statements: [
          new PolicyStatement({
            actions: [
              'iot:ListThingGroups',
            ],
            resources: ['*'],
          }),
        ],
      }),
    );
    return listThingGroupsFunction;
  }

  private createGetThingGroupFunction(): NodejsFunction {
    const getThingGroupFunction = new NodejsFunction(this, 'GetThingGroupFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/get-thing-group/app.ts`,
    });
    getThingGroupFunction.role?.attachInlinePolicy(
      new Policy(this, 'iot-describe-thing-group-policy', {
        statements: [
          new PolicyStatement({
            actions: [
              'iot:DescribeThingGroup',
            ],
            resources: ['*'],
          }),
        ],
      }),
    );
    return getThingGroupFunction;
  }

  private createUpdateThingGroupFunction(): NodejsFunction {
    const updateThingGroupFunction = new NodejsFunction(this, 'UpdateThingGroupFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/update-thing-group/app.ts`,
    });
    updateThingGroupFunction.role?.attachInlinePolicy(
      new Policy(this, 'iot-update-thing-group-policy', {
        statements: [
          new PolicyStatement({
            actions: [
              'iot:UpdateThingGroup',
            ],
            resources: ['*'],
          }),
        ],
      }),
    );
    return updateThingGroupFunction;
  }

  private createDeleteThingGroupFunction(): NodejsFunction {
    const deleteThingGroupFunction = new NodejsFunction(this, 'DeleteThingGroupFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/delete-thing-group/app.ts`,
    });
    deleteThingGroupFunction.role?.attachInlinePolicy(
      new Policy(this, 'iot-delete-thing-group-policy', {
        statements: [
          new PolicyStatement({
            actions: [
              'iot:DeleteThingGroup',
            ],
            resources: ['*'],
          }),
        ],
      }),
    );
    return deleteThingGroupFunction;
  }

  private createAddThingToThingGroupFunction(): NodejsFunction {
    const addThingToThingGroup = new NodejsFunction(this, 'AddThingToThingGroupFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/add-thing-to-thing-group/app.ts`,
    });
    addThingToThingGroup.role?.attachInlinePolicy(
      new Policy(this, 'iot-add-thing-to-thing-group-policy', {
        statements: [
          new PolicyStatement({
            actions: [
              'iot:AddThingToThingGroup',
            ],
            resources: ['*'],
          }),
        ],
      }),
    );
    return addThingToThingGroup;
  }

  private createRemoveThingFromThingGroupFunction(): NodejsFunction {
    const removeThingFromThingGroupFunction = new NodejsFunction(this, 'RemoveThingFromThingGroupFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/remove-thing-from-thing-group/app.ts`,
    });
    removeThingFromThingGroupFunction.role?.attachInlinePolicy(
      new Policy(this, 'iot-remove-thing-from-thing-group-policy', {
        statements: [
          new PolicyStatement({
            actions: [
              'iot:RemoveThingFromThingGroup',
            ],
            resources: ['*'],
          }),
        ],
      }),
    );
    return removeThingFromThingGroupFunction;
  }

  private createCreateDynamicThingGroupFunction(): NodejsFunction {
    const createDynamicThingGroupFunction = new NodejsFunction(this, 'CreateDynamicThingGroupFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/create-dynamic-thing-group/app.ts`,
    });
    createDynamicThingGroupFunction.role?.attachInlinePolicy(
      new Policy(this, 'iot-create-dynamic-thing-group-policy', {
        statements: [
          new PolicyStatement({
            actions: [
              'iot:CreateDynamicThingGroup',
            ],
            resources: ['*'],
          }),
        ],
      }),
    );
    return createDynamicThingGroupFunction;
  }

  private createUpdateDynamicThingGroupFunction(): NodejsFunction {
    const updateDynamicThingGroupFunction = new NodejsFunction(this, 'UpdateDynamicThingGroupFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/update-dynamic-thing-group/app.ts`,
    });
    updateDynamicThingGroupFunction.role?.attachInlinePolicy(
      new Policy(this, 'iot-update-dynamic-thing-group-policy', {
        statements: [
          new PolicyStatement({
            actions: [
              'iot:UpdateDynamicThingGroup',
            ],
            resources: ['*'],
          }),
        ],
      }),
    );
    return updateDynamicThingGroupFunction;
  }

  private createDeleteDynamicThingGroupFunction(): NodejsFunction {
    const deleteDynamicThingGroupFunction = new NodejsFunction(this, 'DeleteDynamicThingGroupFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/delete-dynamic-thing-group/app.ts`,
    });
    deleteDynamicThingGroupFunction.role?.attachInlinePolicy(
      new Policy(this, 'iot-delete-dynamic-thing-group-policy', {
        statements: [
          new PolicyStatement({
            actions: [
              'iot:DeleteDynamicThingGroup',
            ],
            resources: ['*'],
          }),
        ],
      }),
    );
    return deleteDynamicThingGroupFunction;
  }
}
