import * as cdk from '@aws-cdk/core';
import { ThingTypeApi } from '../';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'cdk-iot-device-management-demo');

const thingTypeApi = new ThingTypeApi(stack, 'ThingTypeApi');
console.log(thingTypeApi);
// new cdk.CfnOutput(stack, 'ThingTypeApiId', {
//    value: thingTypeApi.restApi.restApiId,
// });
