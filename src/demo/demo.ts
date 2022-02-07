import {
  ScheduleFunction,
} from '@softchef/cdk-schedule-function';
import {
  App,
  CfnOutput,
  Duration,
  Stack,
} from 'aws-cdk-lib/core';
import {
  ThingTypeApi,
  ThingApi,
  ThingGroupApi,
  FileApi,
  JobApi,
} from '../';

const app = new App();
const stack = new Stack(app, 'cdk-iot-device-management-demo');

const scheduleFunction = new ScheduleFunction(stack, 'Schedule', {
  recentMinutes: Duration.minutes(3),
});

const thingTypeApi = new ThingTypeApi(stack, 'ThingTypeApi');
const thingApi = new ThingApi(stack, 'ThingApi');
const thingGroupApi = new ThingGroupApi(stack, 'ThingGroupApi');
const fileApi = new FileApi(stack, 'FileApi');
const jobApi = new JobApi(stack, 'JobApi', {
  scheduleFunction: scheduleFunction,
});

new CfnOutput(stack, 'ThingTypeApiId', {
  value: thingTypeApi.restApiId,
});
new CfnOutput(stack, 'ThingApiId', {
  value: thingApi.restApiId,
});
new CfnOutput(stack, 'ThingGroupApiId', {
  value: thingGroupApi.restApiId,
});
new CfnOutput(stack, 'FileApiId', {
  value: fileApi.restApiId,
});
new CfnOutput(stack, 'JobApiId', {
  value: jobApi.restApiId,
});