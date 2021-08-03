# CDK Construct - IoT Device Management

![Build](https://github.com/SoftChef/cdk-iot-device-management/actions/workflows/build.yml/badge.svg)
![tag](https://img.shields.io/github/v/tag/softchef/cdk-iot-device-management)
![dependencies](https://david-dm.org/softchef/cdk-iot-device-management.svg)

IoT device management is composed of things, thing types, thing groups, jobs, files API services. The constructs can be used independently, that are based on full-managed service to create an API Gateway & Lambda function.

![Architecture](docs/cdk-iot-device-management.png)

## Installation

```
npm install @softchef/cdk-iot-device-management

or

yarn add @softchef/cdk-iot-device-management

```

## Constructs

### Thing Type API construct

```
import { ThingTypeApi } from '@softchef/cdk-iot-device-management'

const thingTypeApi = new ThingTypeApi(scope, id, {
  authorizationType?: apigateway.AuthorizationType;
  authorizer?: apigateway.IAuthorizer
})
```

[Thing Type API Docs](./docs/thing-type-api.md)

### Thing API construct

```
import { ThingApi } from '@softchef/cdk-iot-device-management'

const thingApi = new ThingApi(scope, id, {
  authorizationType?: apigateway.AuthorizationType;
  authorizer?: apigateway.IAuthorizer
})
```

[Thing API Docs](./docs/thing-api.md)

### Thing Group API construct

```
import { ThingGroupApi } from '@softchef/cdk-iot-device-management'

const thingGroupApi = new ThingGroupApi(scope, id, {
  authorizationType?: apigateway.AuthorizationType;
  authorizer?: apigateway.IAuthorizer
})
```
[Thing Group API Docs](./docs/thing-group-api.md)

### Job API construct

```
import { JobApi } from '@softchef/cdk-iot-device-management'

const jobApi = new JobApi(scope, id, {
  authorizationType?: apigateway.AuthorizationType;
  authorizer?: apigateway.IAuthorizer;
  scheduleFunction: ScheduleFunction
})
```

> The [ScheduleFunction](https://www.npmjs.com/package/@softchef/cdk-schedule-function/v/0.0.15) is support to custom create job by schedule time.

[Job API Docs](./job-api.md)

### File API construct

The file api has category & file api to manage IoT devices firmware.
```
import { fileApi } from '@softchef/cdk-iot-device-management'

const FileApi = new FileApi(scope, id, {
  authorizationType?: apigateway.AuthorizationType;
  authorizer?: apigateway.IAuthorizer;
})
```

[File API Docs](./docs/file-api.md)


### Table Schema(PI, GSI)

### Roadmap
