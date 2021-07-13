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

Files API contains files and category two DB table. Every file has its own category.

### *POST* /categories

Create new category

**Description**

Create file's category on platform.

**Body**

| Name | Schema |  Description |
| -------- | ------- |  ---- |
| categoryId* | String| Category's ID |
| parentId* | String   | Sub category's ID |
| description	| String | Category's description |

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
| parentId* | String | Sub category's ID |
| name* | String | Category's name |
| description | String | Category's description |
| createAt* | String | Create time |
| updateAt* | String | Last update time |

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
| categoryId* | String | Category's ID 

**Response Object if success**

| Name | Schema | Description |
| -------- | --- | -- |
| categoryId* | String | Category's ID | 
| parentId* | String | Sub category's ID |
| name* | String | Category's name |
| description | String | Category's description |
| createAt* | String | Create time |
| updateAt* | String | Last update time |

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | List category success |

---
### *PUT* /categories/{categoryId} 
Update category by ID

**Description**

Update category information by category ID

**Path Parameter**

| Name | Schema |  Description |
| -------- | ------- |  ---- |
| categoryId* | String   | Category's ID |

**Body**

| Name | Schema |  Description |
| -------- | ------- |  ---- |  
| Description*	| String | Category's description |

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | Update success |
| 422 | Missing require field / Variable type incorrect |
| 404 | Category ID not found |
---
### *DELETE* /categories/{categoryId} 
Delete category by ID

**Description**

Delete category by category ID

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

Create file's information when user upload file

**Body**

| Name | Schema |  Description |
| -------- | ------- |  ---- |
| location* | URI | File's path|
| checksum* | String | An encrypt md5 / crc32 / sha1 value |
| checksumType* | 'md5' \| 'crc32' \| 'sha1' | File's checksum type|
| locale* | String | File's locale |
| version* | String| File's version|
| categoryId* | String | File's category (From category table)
| description | String | File's description |


**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | Create file success|
| 422 | Missing require field / Variable type incorrect|
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
| categoryId* | String | File's category (From category table) |
| description | String | File's description |

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | Create success |
| 404 | File ID not found |
---
### GET /files
Get root files list

**Query String Parameter**

| Name | Schema |  Description |
| -------- | ------- | --|
| fileId* | String | File's ID   |

**Response Object if success**

| Name | Schema |  Description |
| -------- | ------- |  ---- |
| location* | URI | File's path|
| checksum* | String | An encrypt md5 / crc32 / sha1 value |
| checksumType* | 'md5' \| 'crc32' \| 'sha1' | File's checksum type|
| locale* | String | File's locale |
| version* | String| File's version|
| categoryId* | String | File's category (From category table)
| description | String | File's description |

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- |
| 200 | List file success|
---
### GET /files/{categoryId}
List files by categoryId

**Query String Parameter**

| Name | Schema | Description |
| -------- | ------- | --- |
| categoryId* | String | Category's ID |

**Response Object if success**

| Name | Schema |  Description |
| -------- | ------- |  ---- |
| location* | String   | File's path|
| checksum* | String   |	An encrypt md5 / crc32 / sha1 value |
| checksumType*	| String |File's version|
| locale* | String |File's locale |
| version* | String| File's version|
| categoryId* | String | File's category (From category table)
| description | String | File's description |

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | Create success|
| 404 | Category ID not found |

---

### PUT /files/{fileId} - Update file by ID

Update file by file ID

**Description**

Update file's information by file ID

**Path Parameter**

| Name |   Description |
| -------- | ------- |
| fileId* | File's ID   |

**Body**

| Name | Schema |  Description |
| -------- | ------- |  ---- |
| checksumType* | String |
| checksum* |  String |
| description* | String |

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | Update success|
| 422 | Missing require field / Variable type incorrect|
| 404 | File not found |

---
### *DELETE* /files/{categoryId} 
Delete file by ID

**Path Parameter**

| Name |   Description |
| -------- | ------- |
| fileId* | File's ID   |

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
| description* | String | Job's description

**Response Object if success**
| Name | Schema |  Description |
| -------- | --- | -- |
| jobArn* | String | Job's ARN|
| jobId* | String | Job's ID | |
| description* | String | Job's description |

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | Create job success|
| 422 | Missing require field / Variable Group incorrect|
---
### *GET* /jobs/{jobId} 
Get job by ID

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
| status | String | Job’s status

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
| description* | String | Job's description

**Response Object if success**
| Name | Schema |  Description |
| -------- | --- | -- |
| jobId | String | Job's ID |
| description | String | Job's description |

**Response Status**
| HTTP Status Code |  Description |
| -------- | ------- |
| 200 | Update job success
| 422 | Missing require field / Variable Group incorrect|
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
| force* | Boolean  | Force delete |

**Response Status**
| HTTP Status Code |  Description |
| -------- | ------- |
| 200 | Delete success |
| 404 | Job Id not found |
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

**Response Object if success**
| Name | Schema |  Description |
| -------- | --- | -- |
| jobTemplateArn* | String | Job templates' ARN |
| jobTemplateId* | String | Job templates’ ID |

| HTTP Status Code |  Description |
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
| description | String | Job templates' description |

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
| 404 | ResourceNotFoundException |


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
| thingGroupName* | Thing group's name   |

**Response Object if success**

| Name | Schema |  description |
| -------- | --- | -- |
| thingGroupName* | String | Thing group's name | 

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

**Response Object if success**

| Name | Schema |  description |
| -------- | --- | -- |
| thingGroups* | Array | A list of thing group |

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
| thingGroupDescription* | String   |Thing group's description |


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
List things form thing group success

**Description**

List all of things from target thing group

**Query String Parameter**

| Name  | Description |
| -------- |   ---- | 
| thingGroupName* | String | Thing group's name |

**Response Object if success**

| Name | Schema |  description |
| -------- | --- | -- |
| things* | Array | A list of things |

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
| thingName | String | Thing's name |

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

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | Update Dynamic thing group's name success |
| 422 | Missing require field / Variable Group incorrect|
| 404 | Dynamic thing group not found |
---
### *DELETE* /dynamic-thing-groups/{thingGroupName} 
Delete dynamic thing group by name // BillingGroup not join

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
| thingTypeArn* | String   | Thing type's ARN |
| thingTypeId* | String   |	Thing type's ID |
| thingTypeName* | String | Thing type's Name |

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
| thingTypeName* | String | Thing type's name |

**Response Object if success**

| Name | Schema |  Description |
| -------- | ------- |  ---- |
| thingTypeArn* | String   | Thing type's ARN |
| thingTypeId* | String   |	Thing type's ID |
| thingTypeName* | String | Thing type's Name |

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
| thingName* | String | Thing's name |
| thingTypeName* | String | Thing's thing type|
| thingArn* | String | Thing's ARN |
| thingId* | String | Thing's ID |

``` Get thing response 
{
    "thingName": "MyLightBulb",
    "thingTypeName": "LightBulb",
    "thingArn": "arn:aws:iot:us-east-1:123456789012:thing/MyLightBulb",
    "thingId": "12345678abcdefgh12345678ijklmnop12345678"
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
| thingName* | String | Thing's name |
| thingTypeName* | String | Thing's thing type|
| thingArn* | String | Thing's ARN |
| thingId* | String | Thing's ID |

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
| attributePayload | String | Thing's attribute payload |
| expectedVersion | String | Thing's expected version |
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
| shadowName* | Thing shadow's name

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

**Response Object if success**
| Name | Group |  Description |
| -------- | --- | -- |
| result* | String[] | List all thing shadow |

**Response Status**
| HTTP Status Code |  Description |
| -------- | ------- |
| 200 | List thing shadow success
| 404 | Cannot found thing on platform |
---
### *PUT* /things/{thingName}/shadows/{shadowName
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
| payload* | Uint8Array | Thing shadow's payload|

**Response Status**
| HTTP Status Code |  Description |
| -------- | ------- |
| 200 | Update Success |
| 422 | Missing require field / Variable Group incorrect|
| 404 | Cannot found thing on platform |
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
| 404 | Cannot found thing on platform |
---
## Special Varible Type
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