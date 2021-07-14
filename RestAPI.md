# cdk-iot-device-management

![Build](https://github.com/SoftChef/cdk-iot-device-management/actions/workflows/build.yml/badge.svg)
![tag](https://img.shields.io/github/v/tag/softchef/cdk-iot-device-management)
![dependencies](https://david-dm.org/softchef/cdk-iot-device-management.svg)

<!-- Repository Description* -->

## Table of Content

- Welcome
- Contributing guide
- Method of data transfer
- HTTP Status code
- [API Overview](##API-Overview)

## Method of data transfer

- pathParameter
`https://exaple.com/test/{item:strawberry}`
- queryStringParemeter
`https://exaple.com/test?item=strawberry`
- body

``` Body example
{
  item: strawberry
}
```
  
## API Overview

## Files API

Files API contains files and category, every file has its own category.

### *POST* /categories

Create new category

**Description**

Create file's category on platform.

| Name | Schema | Description |
| -------- | ------- |  ---- |
| location* | URI | File's path|
| checksum* | String | An encrypt md5 / crc32 / sha1 value |
| checksumType* | 'md5' \| 'crc32' \| 'sha1' | File's checksum type|
| summary* | string (Allow empty string) | File's summary | 
| locale* | String | File's locale |
| version* | String | File's version|
| categoryId* | String | From category |
| description | String | File's description |

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | Create success | 
| 422 | Missing require field / Variable type incorrect |

---
### *GET* /categories/{categoryId} 
Get category by category ID, if category is root will return children category. 

**Path Parameter**

|  Name | Description |
| -------- | -------- | 
| categoryId* | Category's ID | 

**Response Object if success**

| Name | Schema | Description |
| -------- | --- | -- |
| categoryId* | String | Category's ID | 
| parentId | String | Parent category's ID |
| name* | String | Category's name |
| description | String | Category's description |
| createdAt* | String | Create time |
| updatedAt* | String | Last update time |

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | Get Category Success |
| 404 | Category ID not found |
---

### *GET* /categories

Get root category list

**Query String Parameters**

| Name | Schema |  Description |
| -------- | --- | -- |
| parentId | String | Parent category's ID |
| nextToken | String | Token for next data |

**Response Object if success**

| Name | Schema | Description |
| -------- | --- | -- |
| categoryId* | String | Category's ID | 
| parentId | String | Parent category's ID |
| name* | String | Category's name |
| description | String | Category's description |
| createdAt* | String | Created time |
| updatedAt* | String | Last updated time |
| nextToken | String | Token for next data |

```nist category response
body: {
  categories: [
    categoryId: "categoryId",
    parentId: "parentId",
    description: "description",
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  ]
  nextToken: "nextToken",
}
```


**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | List category success |

---
### *PUT* /categories/{categoryId} 
Update category by ID

**Description**

Update category description by category ID

**Path Parameter**

| Name | Schema |  Description |
| -------- | ------- |  ---- |
| categoryId* | String   | Category's ID |

**Body**

| Name | Schema |  Description |
| -------- | ------- |  ---- |  
| description* | String | Category's description |

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | Update success |
| 422 | Missing require field / Variable type incorrect |
| 404 | Category ID not found |
---
### *DELETE* /categories/{categoryId} 
Delete category by categoty ID

**Path Parameter**

| Name | Schema |  Description |
| -------- | ------- |  ---- |
| categoryId* | String | Category's ID  |

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | Delete success|
| 404 | Category ID not found |
---
### *POST* /files
Create files

**Description**

Create file's information

**Body**

| Name | Schema | Description |
| -------- | ------- |  ---- |
| location* | URI | File's path|
| checksum* | String | An encrypt md5 / crc32 / sha1 value |
| checksumType* | 'md5' \| 'crc32' \| 'sha1' | File's checksum type|
| locale* | String | File's locale |
| version* | String | File's version|
| categoryId* | String | From category |
| description | String | File's description |


**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | Create file success |
| 422 | Missing require field / Variable type incorrect / File exists |
| 404 | Category ID not found |
---
### *GET* /files/{fileId} 
Get file by file ID

**Description

Get file's information by file ID

**Path Parameter**

| Name |   Description |
| -------- | ------- | 
| fileId* | File's ID   | 

**Response Object if success**

| Name | Schema |  Description |
| -------- | ------- |  ---- |
| location* | String   | File's path|
| checksum* | String   |	An encrypt md5 / crc32 / sha1 value |
| checksumType*	| String |File's version|
| locale* | String | File's locale |
| version* | String| File's version |
| categoryId* | String | From category |
| description* | String | File's description |
| createdAt* | String | Created time |
| updatedAt* | String | Last updated time |

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | Create success |
| 404 | File ID not found |
---
### GET /files
List files 

**Query String Parameter**

| Name | Schema |  Description |
| -------- | ------- | --|
| nextToken | String | Token for next data |

**Response Object if success**

| Name | Schema |  Description |
| -------- | ------- |  ---- |
| location* | String   | File's path |
| checksum* | String   |	An encrypt md5 / crc32 / sha1 value |
| checksumType*	| String |File's version|
| locale* | String | File's locale |
| version* | String| File's version |
| categoryId* | String | From category |
| description* | String | File's description |
| createdAt* | String | Created time |
| updatedAt* | String | Last updated time |
| nextToken | String | Token for next data |

```List files response
body: {
  files: [
    location: "location",
    checksum: "checksum",
    checksumType: "checksumType",
    locale: "locale",
    version: "version",
    categoryId: "categoryId",
    description: "description",
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  ]
  nextToken: "nextToken",
}
```
**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- |
| 200 | List file success |
---
### GET /categories/{categoryId}/files
List files by category ID

**Path Parameter**

| Name  | Description |
| -------- | ------- | 
| categoryId* | Category's ID |

**Response Object if success**

| Name | Schema |  Description |
| -------- | ------- |  ---- |
| location* | String   | File's path|
| checksum* | String   |	An encrypt md5 / crc32 / sha1 value |
| checksumType*	| String |File's version|
| locale* | String |File's locale |
| version* | String| File's version|
| categoryId* | String | From category |
| description | String | File's description |
| createdAt* | String | Created time |
| updatedAt* | String | Last updated time |
| nextToken | String | Token for next data |
```List files by category response
body: {
  files: [
    location: "location",
    checksum: "checksum",
    checksumType: "checksumType",
    locale: "locale",
    version: "version",
    categoryId: "categoryId",
    description: "description",
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  ]
  nextToken: "12345",
}
```
**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | Create success|
| 404 | Category ID not found |
---

### PUT /files/{fileId}
Update file by file ID

**Description**

Update file's information by file ID

**Path Parameter**

| Name |   Description |
| -------- | ------- |
| fileId* | File's ID |

**Body**

| Name | Schema |  Description |
| -------- | ------- |  ---- |
| description* | String | File's description |

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | Update success|
| 422 | Missing require field / Variable type incorrect|
| 404 | File not found |

---
### *DELETE* /files/{fileId} 
Delete file by ID

**Path Parameter**

| Name | Description |
| -------- | ------- |
| fileId* | File's ID |

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | Delete success|
| 404 | File ID not found |
---
## Job API

### *POST* /jobs 
Create new job

**Description**
Create new job on platform

**body**
| Name | Schema |  Description |
| -------- |   ---- | --- |
| targets* | String[]  | A list of thing's |
| targetSelection* | 'SNAPSHOT' \| 'CONTINUOUS'  | Job status |
| document*	| String | Job's document |
| description | String | Job's description

**Response Object if success**
| Name | Schema |  Description |
| -------- | --- | -- |
| jobArn | String | Job's ARN |
| jobId | String | Job's ID | |
| description | String | Job's description |

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | Create job success|
| 422 | Missing require field / Variable Group incorrect | 
---
### *GET* /jobs/{jobId} 
Get job by job ID

**Description**
Get exist job form platform

**Path Parameter**
| Name | Description |
| -------- |   ---- |
| jobId* | Job's ID | 

**Response Object if success**
| Name | Schema |  Description |
| -------- | --- | -- |
| jobArn | String | Job's ARN |
| jobId | String | Job's ID |
| targets | String[]  | A list of thing's ID |
| targetSelection | "SNAPSHOT" \| "CONTINUOUS"  | Job's status |
| description | String | Job's description |
| status | "CANCELED" \| "COMPLETED" \| "DELETION_IN_PROGRESS" \| "IN_PROGRESS" | Job's status |

```Get files response
body: {
  job: [
    jobArn: 'arn:aws:iot:ap-northeast-1:012345678901:job/85f6509f-023c-48fb-8252-981653ffd561',
    jobId: '85f6509f-023c-48fb-8252-981653ffd561',
    targets: [
      'arn:aws:iot:ap-northeast-1:012345678901:thing/WorkerA',
    ],
    targetSelection: 'SNAPSHOT',
    description: 'Test Job',
    status: 'IN_PROGRESS'
  ]
}
```

**Response Status**
| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | Get job success
| 404 | Job ID not found |
---
### *GET* /jobs 

List Jobs

**Description**

List exist jobs on platform

**Response Object if success**
| Name | Schema |  Description |
| -------- | --- | -- |
| jobArn | String | Job's ARN |
| jobId | String | Job's ID |
| targets | String[] | List of thing's ARN |
| targetSelection | "SNAPSHOT" \| "CONTINUOUS"  | Job status |
| description | String | Job’s description |
| status | String | Job’s status |
| nextToken | String | Token for next data |

```List files response
body: {
  JobSummary: [{
    jobArn: 'arn:aws:iot:ap-northeast-1:012345678901:job/85f6509f-023c-48fb-8252-981653ffd561',
    jobId: '85f6509f-023c-48fb-8252-981653ffd561',
    targets: [
      'arn:aws:iot:ap-northeast-1:012345678901:thing/WorkerA'
    ],
    targetSelection: 'SNAPSHOT',
    description: 'Test Job',
    status: 'IN_PROGRESS'
  }],
  nextToken: "12345"
}
```

**Response Status**
| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | List jobs success |
---
<!--### *GET* /jobs/{jobId}/things/{thingName} 
?
Get job's thing status by job ID and thing name


**Response Object if success**
| Name | Group |  Description |
| -------- | --- | -- |
| jobArn* | String | Job's ARN |
| jobId* | String | Job's ID |
| targets* | String[]  | A list of thing ARN |
| targetSelection* | "SNAPSHOT" \| "CONTINUOUS"  | Job status |
| description* | String | Job's description
| status | String | Job's status

**Response Status**
| HTTP Status Code |  Description |
| -------- | ------- |
| 200 | 
----->

### *PUT* /jobs/{jobId}

Update job by ID

**Description**
Update job's information by job ID

**Path Parameter**
| Name | Description |
| -------- |   ---- |
| jobId* | Job's ID |

**body**
| Name | Schema |  Description |
| -------- |   ---- | --- |
| description | String | Job's description

**Response Status**
| HTTP Status Code |  Description |
| -------- | ------- |
| 200 | Update job success
| 422 | Missing require field / Variable Group incorrect |
| 404 | Job ID not found |
---

### *DELETE* /jobs/{jobId} 

Delete job by job ID

**Path Parameter**
| Name | Description |
| -------- |   ---- |
| jobId* | Job's ID   |

**body**
| Name | Schema |  Description |
| -------- |   ---- | --- |
| force | Boolean  | Force delete |

**Response Status**
| HTTP Status Code |  Description |
| -------- | ------- |
| 200 | Delete success |
| 404 | Job ID not found |
---
<!--
### *DELETE* /jobs/{jobId}/things/{thingName} 
Delete job's thing by job ID and thing name

**Path Parameter**
| Name | Description |
| -------- |   ---- |
| jobId* | Job's ID   |

**body**
| Name | Schema |  Description |
| -------- |   ---- | --- |
| force | Boolean  | Force delete |

**Response Status**
| HTTP Status Code |  Description |
| -------- | ------- |
| 200 | Delete success |
| 404 | ResourceNotFoundException |
----->

### *POST* /job-templates
Create new job template

**body**
| Name | Schema |  Description |
| -------- |   ---- | --- |
| document* | String | Job templates' document|
| description* | String | Job templates' description |

| HTTP Status Code | Description |
| -------- | ------- |
| 200 | Create job template success
| 422 | Missing require field / Variable Group incorrect|
---

### *GET* /job-templates/{jobTemplateId} 

Get job template by Job Template ID

**Path Parameter**
| Name | Description |
| -------- |   ---- |
| jobTemplateId* | Job Template's ID   |

**Response Object if success**
| Name | Schema |  Description |
| -------- | --- | -- |
| jobTemplateArn | String | Job templates' ARN |
| jobTemplateId | String | Job templates’ ID |
| document | String | Job templates' document |
| description | String | Job templates' description |
| presignedUrlConfig | Object | Configuration for pre-signed file location URLs |
| jobExecutionsRolloutConfig | Object | Create an exponential rate of rollout for a job.|
| timeoutConfig | Object | Timeout configuration |
``` Get Job template response
body: {
  job: {
    jobTemplateArn: 'arn:aws:iot:ap-northeast-1:012345678901:job/85f6509f-023c-48fb-8252-981653ffd562',
    jobTemplateId: '85f6509f-023c-48fb-8252-981653ffd562',
    document: '{ "operation":"Work" }'
    description: 'Test Job Template',
    presignedUrlConfig: {},
    jobExecutionsRolloutConfig: {},
    timeoutConfig: {},
  }
}
```
**Response Status**
| HTTP Status Code |  Description |
| -------- | ------- |
| 200 | Get Job templates success |
| 404 | Job template ID not found |
---

### *GET* /job-templates 

List job templates

**Response Object if success**
| Name | Schema |  Description |
| -------- | --- | -- |
| jobTemplateArn* | String | Job templates' ARN |
| jobTemplateId* | String | Job templates’ ID |
| document | String | Job templates' document |
| description | String | Job templates' description |
| presignedUrlConfig | Object | Configuration for pre-signed file location URLs |
| jobExecutionsRolloutConfig | Object | Create an exponential rate of rollout for a job.|
| timeoutConfig | Object | Timeout configuration |
| nextToken | String | Token for next data |

```List job template response
body: {
  JobSummary: [{
    jobTemplateArn: 'arn:aws:iot:ap-northeast-1:012345678901:job/85f6509f-023c-48fb-8252-981653ffd562',
    jobTemplateId: '85f6509f-023c-48fb-8252-981653ffd562',
    document: '{ "operation":"Work" }'
    description: 'Test Job Template',
    presignedUrlConfig: {},
    jobExecutionsRolloutConfig: {},
    timeoutConfig: {},
  }]
  nextToken: "12345",
}
```
**Response Status**
| HTTP Status Code |  Description |
| -------- | ------- |
| 200 | List job templates success |
---
### *DELETE* /job-templates/{jobTemplateId} 
Delete job template by job template ID

**Path Parameter**
| Name | Description |
| -------- |   ---- |
| jobTemplateId* | String |

**Response Status**
| HTTP Status Code |  Description |
| -------- | ------- |
| 200 | Delete job template success |
| 404 | Job template ID not found |


## Thing Group API

### POST /thing-groups

Create new thing group

**Description**
Add new thing group to platform

**Body**

| Name | Schema |  Description |
| -------- | ------- |  ---- |
| thingGroupName* | String   | Thing group's name |


**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | Create thing group success |
| 422 | Missing require field / Variable Group incorrect|
---

### *GET* /thing-groups/{thingGroupName}

Get thing group by thing group name

**Path Parameter**
| Name | Description |
| -------- |   ---- |
| thingGroupName* | Thing group's name |


**Response Object if success**

| Name | Schema |  description |
| -------- | --- | -- |
| thingGroupName | String | Thing group's name | 
| thingGroupArn | String | Thing group's ARN |
| thingGroupId | String | Thing group's ID |
| version | number | Thing group's version |

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | Get thing group success |
| 404 | Thing group name not found |

---

### *GET* /thing-groups 
List thing group list

**Description**

List exist thing group list

**Query String Parameter**
| Name | Group | Description |
| -------- |   ---- | -- |
| nextToken | String | Token for next data |

**Response Object if success**

| Name | Schema |  description |
| -------- | --- | -- |
| thingGroups | Array | A list of thing group |
| groupName | String | Thing group's name | 
| groupArn | String | Thing group's ARN | 
| nextToken | String | Token for next data |

```List thing group response
body: {
  thingGroups: [
    groupName: "groupName",
    groupArn: "groupArn"
  ],
  nextToken: "12345"
}
```

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | List thing group success |
---

### PUT /thing-groups/{thingGroupName} 

Update thing group by thing group name

**Description**

Update thing group by thing group name

**Path Parameter**

| Name |Description |
| -------- |   ---- 
| thingGroupName*  | Thing group's name | 

**Body**

| Name | Group | Description |
| -------- |   ---- | -- |
| thingGroupDescription  | String   |Thing group's description |


**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | Update success |
| 422 | Missing require field / Variable Group incorrect|
| 404 | Thing group not found |
---
### *PUT* /thing-groups/{thingGroupName}/things/{thingName} 
Add thing to thing group

**Path Parameter**

| Name  | Description |
| -------- |   ---- | 
| thingGroupName* | String | Thing group's name |
| thingName* | String | Thing's name |

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | Add thing to thing group success |
| 404 | Thing group not found |
---
### *GET* /thing-groups/{thingGroupName}/things
List things by thing group name success

**Description**

List all of things from target thing 

**Path Parameter**
| Name | Description |
| -------- |   ---- |
| thingGroupName* | Thing group's name |


**Query String Parameter**

| Name  | Description |
| -------- |   ---- | 
| nextToken | String | Token for next data |

**Response Object if success**

| Name | Schema |  description |
| -------- | --- | -- |
| things* | Array | A list of things |
| nextToken | String | Token for next data |

```List things by thing group name response
body: {
  things: [],
  nextToken: "12345",
}
```

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | List things form thing group success | 
| 404 | Thing group not found |
---
### *DELETE* /thing-groups/{thingGroupName}/things/{thingName}
Remove thing from thing group

**Path Parameter**

| Name | Schema | Description |
| -------- |   ---- | -- |
| thingGroupName* | String | Thing group's name |
| thingName* | String | Thing's name |

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | Delete thing from thing group success |
| 404 | Thing or thing group not found |
---
### *POST* /dynamic-thing-groups
Create Dynamic thing groups

**Body**

| Name | Schema |  Description |
| -------- | ------- |  ---- |
| thingGroupName* | String | The dynamic thing group name to create |
| queryString* | String  | The dynamic thing group search query string |


**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | Create dynamic thing group success|
| 422 | Missing require field / Variable Group incorrect|
---
### *PUT* /dynamic-thing-groups/{thingGroupName}
Update dynamic thing group by name //no test

**Body**

| Name | Schema |  Description |
| -------- | ------- |  ---- |
| thingGroupName* | String | Dynamic thing group's name  |
| queryString* | String  | The dynamic thing group search query string |
| description | String | Dynamic thing group's description |

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | Update Dynamic thing group's name success |
| 422 | Missing require field / Variable Group incorrect|
| 404 | Dynamic thing group not found |
---

### *DELETE* /dynamic-thing-groups/{thingGroupName} 

Delete dynamic thing group by name

**Body**

| Name | Schema |  Description |
| -------- | ------- |  ---- |
| thingGroupName* | String   | Dynamic thing group's name |

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | Delete dynamic thing group success |
| 404 | Dynamic thing group not found |

## Thing Type API

### *POST* /thing-types 
Create thing type

**Body**

| Name | Schema |  Description |
| -------- | ------- |  ---- |
| thingTypeName* | String | Thing type's name |

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | Create thing type success |
| 422 | Missing require field / Variable type incorrect|
---
### *GET* /thing-types/{thingTypeName} 
Get thing type by thing type name

**Path Parameter**

| Name | Type | Description |
| -------- |   ---- | -- |
| thingTypeName* | String   | Thing type's name |

**Response Object if success**

| Name | Schema |  Description |
| -------- | ------- |  ---- |
| thingTypeArn | String   | Thing type's ARN |
| thingTypeId | String   |	Thing type's ID |
| thingTypeName | String | Thing type's Name |

```List things by thing group name response
body: {
  thingType: [
    thingTypeArn: 'arn:aws:iot:ap-northeast-1:012345678901:thing/85f6509f-023c-48fb-8252-981653ffd561',
    thingTypeId: '85f6509f-023c-48fb-8252-981653ffd561',
    thingTypeName: 'TestThingType'
  ]
}
```

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | Get thing type success |
| 404 | Thing type not found |
---
### *GET* /thing-types
List thing type

**Description**
List exist thing type on platform

**Query String Parameter**

| Name | Type | Description |
| -------- |   ---- | -- |
| nextToken | String | Token for next data |

**Response Object if success**

| Name | Schema |  Description |
| -------- | ------- |  ---- |
| thingTypes | String   | A list of thing type's|
| thingTypeArn | String   | Thing type's ARN |
| thingTypeName | String | Thing type's name | 
| nextToken | String | Token for next data |
```
body: {
  thingTypes: [
      thingTypeArn: 'arn:aws:iot:ap-northeast-1:012345678901:thing/85f6509f-023c-48fb-8252-981653ffd561',
      thingTypeName: 'TestThingType',
  ],
  nextToken: "12345",
}
```
**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | List thing type success |
---
### PUT /thing-types/{thingTypeName}/deprecate 
Deprecated thing by thing type name

**Path Parameter**

| Name |  Description |
| -------- |   ---- |
| thingTypeName* | String | Thing type's name |

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | Deprecated thing type success |
| 404 | Thing type not found |

### PUT /thing-types/{thingTypeName}/undeprecate 
Undeprecate thing type by thing type name

**Path Parameter**

| Name |  Description |
| -------- |   ---- |
| thingTypeName* | String | Thing type's name |

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | Undeprecate thing type by thing type name|
| 404 | Thing type not found |
---
### DELETE /thing-types/{thingTypeName}
Delete thing type by thing type name

**Path Parameter**

| Name |  Description |
| -------- |   ---- |
| thingTypeName* | String | Thing type's name |

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | Delete thing type success |
| 404 | Thing type not found |
---
## Thing API

### *POST* /things 
Create thing

**Description**
Add new thing into platform.

**body**
| Name | Schema |  Description |
| -------- |   ---- | --- |
| thingName* | String  | Thing's name|

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | Create thing success |
| 422 | Missing require field / Variable Group incorrect|
---
### *GET* /things/{thingName}
Get thing 

**Description**
Get thing's information.

**Path Parameter**
| Name |    Description |
| -------- |   --- |
| thingName* | Thing's name | 

**Response Object if success**

| Name | Schema |Description | 
| -------- | --- | -- |
| thingName | String | Thing's name |
| thingTypeName | String | Thing's thing type|
| thingArn | String | Thing's ARN |
| thingId | String | Thing's ID |

``` Get thing response 
{  
  body: {
    thing: [ 
      "thingName": "MyLightBulb",
      "thingTypeName": "LightBulb",
      "thingArn": "arn:aws:iot:us-east-1:123456789012:thing/MyLightBulb",
      "thingId": "12345678abcdefgh12345678ijklmnop12345678"
    ]
  }
}
```

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | Get thing's information success |
| 404 | Thing not found  |
---
### *GET* /things 
List things

**Description**
List all of the thing.

**Path Parameter**
| Name | Description |
| -------- |   --- |
| thingName* | String   | Thing's name | 

**Response Object if success**
| Name | Schema |  Description |
| -------- | --- | -- |
| things | Array | A list of thing |
| thingName | String | Thing's name |
| thingTypeName | String | Thing's thing type |
| thingTypeArn | String | Thing's ARN |
| nextToken | String | Token for next data |
``` List thing response 
{  
  things: [{
    "thingName": "MyLightBulb",
    "thingTypeName": "LightBulb",
    "thingArn": "arn:aws:iot:us-east-1:123456789012:thing/MyLightBulb",
    "thingId": "12345678abcdefgh12345678ijklmnop12345678"
  }],
  nexttoken: '12345', 
}
```
**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | List things success|
---
### *PUT* /things/{thingName}
Update thing by name

**Description**
Update thing's information.

**Path Parameter**
| Name |    Description |
| -------- |   --- |
| thingName* | Thing's name | 

**body**
| Name | Group |  Description |
| -------- | --- | -- |
| thingTypeName | String | Thing's thing type name
| attributePayload | Object | Thing's attribute payload |
| expectedVersion | Number | Thing's expected version |
| removeThingType | Boolean | Remove thing type |

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | Update success |
| 422 | Missing require field / Variable Group incorrect|
| 404 | Thing not found |
---
### DELETE /things/{thingName} 
Delete thing by name

**Description**
Delete thing from platform

**Path Paremeter**
| Name |    Description |
| -------- |   --- |
| thingName* | Thing's name | 

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | Delete Success |
| 404 | Cannot found thing on platform |
---
### *GET* /things/{thingName}/shadows/{shadowName}
Get thing shadow

**Description**
Get thing's thing shadow payload from platform

**Path Parameter**
| Name | Description |
| -------- |   ---- |
| thingName* | Thing's name
| shadowName | Thing shadow's name

**Response Object if success**
| Name | Group |  Description |
| -------- | --- | -- |
| payload* | string | Thing's thing shadow |

**Response Status**
| HTTP Status Code |  Description |
| -------- | ------- |
| 200 | Get thing shadow success |
| 404 | Cannot found thing / thing shadow on platform |
---
### *GET* /things/{thingName}/shadows
List thing shadow

**Description**
List all thing shadow on platform.

**Path Parameter**
| Name | Description |
| -------- |   ---- |
| thingName* | String | Thing's name |

**Query String Parameter**
| Name | Group | Description |
| -------- |   ---- | -- |
| nextToken | String | Token for next data |

**Response Object if success**
| Name | Group |  Description |
| -------- | --- | -- |
| result* | String[] | List all thing shadow |
``` List thing response 
{  
  thingShadows: [
    result: [],
  ] 
  nexttoken: '12345', 
}
```

**Response Status**
| HTTP Status Code |  Description |
| -------- | ------- |
| 200 | List thing shadow success
| 404 | Thing is not found |
---

### *PUT* /things/{thingName}/shadows/{shadowName}

Update thing shadow

**Description**
Update thing shadow's payload to platform

**Path Parameter**
| Name | Description |
| -------- |   ---- |
| thingName* | Thing's name  |

**body**
| Name | Schema |  Description |
| -------- |   ---- | --- |
| payload | Object | Thing shadow's payload |
| state | Object | Thing shadow's state |
| desired | Object | Thing shadow's payload |
| reported | Object | Thing shadow's payload |
``` Update thing shadow request
state: {
  desired: {
    welcome: 'aws-iot'
  }
  reported: {
    welcome: 'aws-iot'
  }
}
```
**Status**
| HTTP Status Code |  Description |
| -------- | ------- |
| 200 | Update Success |
| 422 | Missing require field / Variable Group incorrect|
| 404 | Thing is not found |
---
### *DELETE* /things/{thingName}/shadows/{shadowName}
Delete thing shadow

**Description**
Delete thing shadow from platform

**Path Parameter**
| Name | Description |
| -------- |   ---- |
| thingName* | Thing's name |
| shadowName* | Thing shadow's name |

**Response Status**
| HTTP Status Code |  Description |
| -------- | ------- |
| 200 | Delete success |
| 404 | Thing is not found |
---
GET /search
???



<!--exports.FilesApi = class FilesApi extends cdk.Construct {
  // Define the resources
}`
```

| HTTP Method | Path | Require Value | Description |
| ------------- | -------------  | ------------- | ------------------------------ |
| GET  | /category | string | Get root category list |
| GET | Get root category list | string | Get category by ID, if category is root will return children category list
| POST | /category |  - | Create new category |  
| PUT  |  /categories/{categoryId}  | - | Update category by ID |
| DELETE  | /categories/{categoryId}  | string  | Delete category by ID |
| GET  | /files | st | Get root files list |
| GET  | updatedAt | string | Get files by category ID |
| GET | 
| POST |
| PUT |
| DELETE |

| DELETE |
-->