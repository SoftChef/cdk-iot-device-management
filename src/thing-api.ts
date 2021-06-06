import * as path from 'path';
import * as iam from '@aws-cdk/aws-iam';
import * as lambda from '@aws-cdk/aws-lambda-nodejs';
import * as cdk from '@aws-cdk/core';
import { RestApi, HttpMethod } from '@softchef/cdk-restapi';

const LAMBDA_ASSETS_PATH = path.resolve(__dirname, '../src/lambda-assets/things');

// interface ThingApiProps {

// }

export class ThingApi extends cdk.Construct {

  public readonly restApiId: string;

  constructor(scope: cdk.Construct, id: string) {
    super(scope, id);
    const restApi = new RestApi(this, 'ThingRestApi', {
      enableCors: true,
      resources: [
        {
          path: '/things',
          httpMethod: HttpMethod.POST,
          lambdaFunction: this.createCreateThingFunction(),
        },
        {
          path: '/things',
          httpMethod: HttpMethod.GET,
          lambdaFunction: this.createListThingFunction(),
        },
        {
          path: '/things/{thingTypeName}',
          httpMethod: HttpMethod.GET,
          lambdaFunction: this.createGetThingFunction(),
        },
        {
          path: '/things/{thingTypeName}',
          httpMethod: HttpMethod.PUT,
          lambdaFunction: this.createUpdateThingFunction(),
        },
        {
          path: '/things/{thingTypeName}',
          httpMethod: HttpMethod.DELETE,
          lambdaFunction: this.createDeleteThingFunction(),
        },
      ],
    });
    this.restApiId = restApi.restApiId;
  }

  private createCreateThingFunction(): lambda.NodejsFunction {
    const createThingFunction = new lambda.NodejsFunction(this, 'CreateThingFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/get-thing/app.ts`,
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

  private createListThingFunction(): lambda.NodejsFunction {
    const listThingFunction = new lambda.NodejsFunction(this, 'ListThingFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/list-things/app.ts`,
    });
    listThingFunction.role?.attachInlinePolicy(
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
    return listThingFunction;
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
}