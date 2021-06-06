import * as cdk from '@aws-cdk/core';
import { ThingTypeApi, ThingApi, ThingGroupApi, FileApi, JobApi } from '../';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'cdk-iot-device-management-demo');

const thingTypeApi = new ThingTypeApi(stack, 'ThingTypeApi');
const thingApi = new ThingApi(stack, 'ThingApi');
const thingGroupApi = new ThingGroupApi(stack, 'ThingGroupApi');
const fileApi = new FileApi(stack, 'FileApi');
const jobApi = new JobApi(stack, 'JobApi');

new cdk.CfnOutput(stack, 'ThingTypeApiId', {
  value: thingTypeApi.restApiId,
});
new cdk.CfnOutput(stack, 'ThingApiId', {
  value: thingApi.restApiId,
});
new cdk.CfnOutput(stack, 'ThingGroupApiId', {
  value: thingGroupApi.restApiId,
});
new cdk.CfnOutput(stack, 'FileApiId', {
  value: fileApi.restApiId,
});
new cdk.CfnOutput(stack, 'JobApiId', {
  value: jobApi.restApiId,
});