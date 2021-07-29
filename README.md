# CDK Construct - IoT Device Management

[![npm version](https://badge.fury.io/js/%40softchef%2Fcdk-iot-device-management.svg)](https://badge.fury.io/js/%40softchef%2Fcdk-iot-device-management)
![Release](https://github.com/SoftChef/cdk-iot-device-management/workflows/Release/badge.svg)
![npm](https://img.shields.io/npm/dt/@softchef/cdk-iot-device-management?label=NPM%20Downloads&color=orange)

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

[Job API Docs](./docs/job-api.md)

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


### Category Table Schema
| Name        | Schema | Primary Index | GSI(Query By ParentId) |
| ----------- | ------ | ------------- | ---------------------- |
| categoryId  | String | Partition Key |                        |
| parentId    | String |               | Partition Key          |
| name        | String |               |                        |
| description	| String |               |                        |

### File Table Schema
| Name         | Schema | Primary Index | GSI(Query By CategoryId And Locale) | GSI(Get File By Checksum And Version) |
| ------------ | ------ | ------------- | ----------------------------------- | ------------------------------------- |
| fileId        | String | Partition Key |                                     |                                       |
| categoryId   | String |               | Partition Key                       |                                       |
| checksum	   | String |               |                                     | Partition Key                         |
| version      | String |               |                                     | Sort Key                              |
| checksumType | String |               |                                     |                                       |
| location  	 | String |               |                                     |                                       |
| locale    	 | String |               | Sort Key                            |                                       |
| summary	     | String |               |                                     |                                       |
| description	 | String |               |                                     |                                       |
| updatedAt  	 | Number |               |                                     |                                       |
| createdAt	   | Number |               |                                     |                                       |
### Roadmap
