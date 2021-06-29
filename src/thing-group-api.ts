import * as path from 'path';
import * as apigateway from '@aws-cdk/aws-apigateway';
import * as iam from '@aws-cdk/aws-iam';
import * as lambda from '@aws-cdk/aws-lambda-nodejs';
import * as cdk from '@aws-cdk/core';
import { RestApi, HttpMethod } from '@softchef/cdk-restapi';

const LAMBDA_ASSETS_PATH = path.resolve(__dirname, '../lambda-assets/thing-groups');

export interface ThingGroupApiProps {
  readonly authorizationType?: apigateway.AuthorizationType;
  readonly authorizer?: apigateway.IAuthorizer | undefined;
}

export class ThingGroupApi extends cdk.Construct {

  public readonly restApiId: string;

  constructor(scope: cdk.Construct, id: string, props?: ThingGroupApiProps) {
    super(scope, id);
    const restApi = new RestApi(this, 'ThingGroupRestApi', {
      enableCors: true,
      authorizationType: props?.authorizationType ?? apigateway.AuthorizationType.NONE,
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
    this.restApiId = restApi.restApiId;
  }

  private createCreateThingGroupFunction(): lambda.NodejsFunction {
    const createThingGroupFunction = new lambda.NodejsFunction(this, 'CreateThingGroupFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/create-thing-group/app.ts`,
    });
    createThingGroupFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'iot-create-thing-group-policy', {
        statements: [
          new iam.PolicyStatement({
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

  private createListThingGroupsFunction(): lambda.NodejsFunction {
    const listThingGroupsFunction = new lambda.NodejsFunction(this, 'ListThingGroupsFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/list-thing-groups/app.ts`,
    });
    listThingGroupsFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'iot-list-things-policy', {
        statements: [
          new iam.PolicyStatement({
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

  private createGetThingGroupFunction(): lambda.NodejsFunction {
    const getThingGroupFunction = new lambda.NodejsFunction(this, 'GetThingGroupFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/get-thing-group/app.ts`,
    });
    getThingGroupFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'iot-describe-thing-group-policy', {
        statements: [
          new iam.PolicyStatement({
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

  private createUpdateThingGroupFunction(): lambda.NodejsFunction {
    const updateThingGroupFunction = new lambda.NodejsFunction(this, 'UpdateThingGroupFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/update-thing-group/app.ts`,
    });
    updateThingGroupFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'iot-update-thing-group-policy', {
        statements: [
          new iam.PolicyStatement({
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

  private createDeleteThingGroupFunction(): lambda.NodejsFunction {
    const deleteThingGroupFunction = new lambda.NodejsFunction(this, 'DeleteThingGroupFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/delete-thing-group/app.ts`,
    });
    deleteThingGroupFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'iot-delete-thing-group-policy', {
        statements: [
          new iam.PolicyStatement({
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

  private createAddThingToThingGroupFunction(): lambda.NodejsFunction {
    const addThingToThingGroup = new lambda.NodejsFunction(this, 'AddThingToThingGroupFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/add-thing-to-thing-group/app.ts`,
    });
    addThingToThingGroup.role?.attachInlinePolicy(
      new iam.Policy(this, 'iot-add-thing-to-thing-group-policy', {
        statements: [
          new iam.PolicyStatement({
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

  private createRemoveThingFromThingGroupFunction(): lambda.NodejsFunction {
    const removeThingFromThingGroupFunction = new lambda.NodejsFunction(this, 'RemoveThingFromThingGroupFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/remove-thing-from-thing-group/app.ts`,
    });
    removeThingFromThingGroupFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'iot-remove-thing-from-thing-group-policy', {
        statements: [
          new iam.PolicyStatement({
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

  private createCreateDynamicThingGroupFunction(): lambda.NodejsFunction {
    const createDynamicThingGroupFunction = new lambda.NodejsFunction(this, 'CreateDynamicThingGroupFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/create-dynamic-thing-group/app.ts`,
    });
    createDynamicThingGroupFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'iot-create-dynamic-thing-group-policy', {
        statements: [
          new iam.PolicyStatement({
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

  private createUpdateDynamicThingGroupFunction(): lambda.NodejsFunction {
    const updateDynamicThingGroupFunction = new lambda.NodejsFunction(this, 'UpdateDynamicThingGroupFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/update-dynamic-thing-group/app.ts`,
    });
    updateDynamicThingGroupFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'iot-update-dynamic-thing-group-policy', {
        statements: [
          new iam.PolicyStatement({
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

  private createDeleteDynamicThingGroupFunction(): lambda.NodejsFunction {
    const deleteDynamicThingGroupFunction = new lambda.NodejsFunction(this, 'DeleteDynamicThingGroupFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/delete-dynamic-thing-group/app.ts`,
    });
    deleteDynamicThingGroupFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'iot-delete-dynamic-thing-group-policy', {
        statements: [
          new iam.PolicyStatement({
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
