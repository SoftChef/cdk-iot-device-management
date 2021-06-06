import * as cdk from '@aws-cdk/core';
import { ThingTypeApi, ThingApi } from '../';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'cdk-iot-device-management-demo');

const thingTypeApi = new ThingTypeApi(stack, 'ThingTypeApi');
const thingApi = new ThingApi(stack, 'ThingApi');

new cdk.CfnOutput(stack, 'ThingTypeApiId', {
  value: thingTypeApi.restApiId,
});
new cdk.CfnOutput(stack, 'ThingApiId', {
  value: thingApi.restApiId,
});