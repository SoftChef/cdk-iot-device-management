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

### *POST* /categories

Create new category

**Description**

Create File's category.

**Body**

| Name | Schema |  Description |
| -------- | ------- |  ---- |
| categoryId* | String| Category's ID|
| parentId* | String   | |
| description	| String | |

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 |Create success |
| 422 | Missing require field / Variable type incorrect |

---
### *GET* /categories/{categoryId} 
Get category by ID, if category is root will return children category 

**Description**

// TODO

**Path Parameter**

|  Name | Description |
| -------- | -------- | 
| categoryId* |      | 

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | |
| 404 | ResourceNotFoundException |
---

### *GET* /categories

Get root category list

**Description**

// TODO

**Query String Parameters**

| Name | Schema |  Description |
| -------- | --- | -- |
| categoryId* | String |  

**Response Object if success**

| Name | Schema |  description |
| -------- | --- | -- |
| categoryId* | String |  | |
| parentId* | String |
| name* | String | |
| description | String |
| createAt* | String|
| updateAt* | String|

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | |

---
### *PUT* /categories/{categoryId} 
Update category by ID

**Description**

// TODO

> [lambda-assets/files/update-category/app.ts](lambda-assets/files/update-category/app.ts)

**Path Parameter**

| Name | Schema |  Description |
| -------- | ------- |  ---- |
| categoryId* | String   |   |

**Body**

| Name | Schema |  Description |
| -------- | ------- |  ---- |  
| description*	| String | 

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | Update success|
| 422 | Missing require field / Variable type incorrect|
| 404 | ResourceNotFoundException |
---
### *DELETE* /categories/{categoryId} 
Delete category by ID

**Description**

// TODO

**Path Parameter**

| Name | Schema |  Description |
| -------- | ------- |  ---- |
| categoryId* | String   |   |

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | Delete success|
| 404 | ResourceNotFoundException |
---
### *POST* /files
Create files

**Description**

// TODO

**Body**

| Name | Schema |  Description |
| -------- | ------- |  ---- |
| location* | String | File's path|
| checksum* | String | An encrypt md5 / crc32 / sha1 value |
| checksumType* | String | File's version |
| locale* | String |
| version* | String| File's version|
| categoryId* | String | File's category (From category table)
| description | String | |


**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | Create success|
| 422 | Missing require field / Variable type incorrect|
| 404 | ResourceNotFoundException |
---
### *GET* /files/{fileId} 
Get root files list

**Description**
// TODO

**Path Parameter**

| Name |   Description |
| -------- | ------- | 
| fileId* | String   | 

**Response Object if success**

| Name | Schema |  Description |
| -------- | ------- |  ---- |
| location* | String   | File's path|
| checksum* | String   |	An encrypt md5 / crc32 / sha1 value |
| checksumType*	| String |File's version|
| locale* | String |
| version* | String| File's version|
| categoryId* | String | File's category (From category table)
| description | String | |

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | Create success|
| 404 | ResourceNotFoundException |
---
### GET /files
Get root files list

**Description**
// TODO

**Query String Parameter**

| Name |   Description |
| -------- | ------- |
| fileId* | String   |

**Response Object if success**

| Name | Schema |  Description |
| -------- | ------- |  ---- |
| location* | String   | File's path|
| checksum* | String   |	An encrypt md5 / crc32 / sha1 value |
| checksumType*	| String |File's version|
| locale* | String |
| version* | String| File's version|
| categoryId* | String | File's category (From category table)
| description | String | |

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- |
| 200 ||
---
### GET /files/{categoryId}
List file by categoryId

**Description**
// TODO

**Query String Parameter**

| Name |   Description |
| -------- | ------- |
| categoryId* | String |

**Response Object if success**

| Name | Schema |  Description |
| -------- | ------- |  ---- |
| location* | String   | File's path|
| checksum* | String   |	An encrypt md5 / crc32 / sha1 value |
| checksumType*	| String |File's version|
| locale* | String |
| version* | String| File's version|
| categoryId* | String | File's category (From category table)
| description | String | |

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | Create success|
| 404 | ResourceNotFoundException |

---

### PUT /files/{fileId} - Update file by ID

Update file by ID

**Description**

// TODO

**Path Parameter**

| Name | Schema |  Description |
| -------- | ------- |  ---- |
| fileId* | String   |   |

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
| 404 | ResourceNotFoundException |

---
### *DELETE* /files/{categoryId} 
Delete files by ID

**Description**

// TODO

**Path Parameter**

| Name | Schema |  Description |
| -------- | ------- |  ---- |
| fileId* | String   |   |

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | Delete success|
| 404 | ResourceNotFoundException |

---
## Job API

### *POST* /jobs 
Create new job

**Description**
Create new job on platform

**body**
| Name | Schema |  Description |
| -------- |   ---- | --- |
| targets* | String[]  | A list of thing's arn |
| targetSelection* | "SNAPSHOT" \| "CONTINUOUS"  | Job status |
| document*	| String | Job's document |
| description* | String | Job's description

**Response Object if success**
| Name | Group |  Description |
| -------- | --- | -- |
| jobArn* | String | Job's arn |
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
Get exist job for platform

**Path Parameter**
| Name | Description |
| -------- |   ---- |
| jobId* | Job's ID | 

**Response Object if success**
| Name | Group |  Description |
| -------- | --- | -- |
| jobArn* | String | Job's arn |
| jobId* | String | Job's ID |
| targets* | String[]  | A list of thing's ID |
| targetSelection* | "SNAPSHOT" \| "CONTINUOUS"  | Job's status |
| description* | String | Job's description |
| status | String | Job's status |

**Response Status**
| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | Get job success
| 404 | ResourceNotFoundException |
---
### *GET* /jobs 
Get job list

**Description**
List jobs on platform

**Response Object if success**
| Name | Group |  Description |
| -------- | --- | -- |
| jobArn* | String | Job's arn |
| jobId* | String | Job's ID |
| targets* | String[] | List of thing's arn |
| targetSelection* | "SNAPSHOT" \| "CONTINUOUS"  | Job status|
| description* | String | Job’s description
| status | String | Job’s status

**Response Status**
| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | List jobs success|
---
### *GET* /jobs/{jobId}/things/{thingName} 
?
Get job's thing status by job ID and thing name

**Description**
//TODO

**Response Object if success**
| Name | Group |  Description |
| -------- | --- | -- |
| jobArn* | String | Job's arn |
| jobId* | String | Job's ID |
| targets* | String[]  | A list of thing arn |
| targetSelection* | "SNAPSHOT" \| "CONTINUOUS"  | Job status |
| description* | String | Job's description
| status | String | Job's status

**Response Status**
| HTTP Status Code |  Description |
| -------- | ------- |
| 200 | 
---
### *PUT* /jobs/{jobId}
Update job by ID

**Description**
Update Job's information

**Path Parameter**
| Name | Description |
| -------- |   ---- |
| jobId* | Job's ID   |

**body**
| Name | Schema |  Description |
| -------- |   ---- | --- |
| description* | String | Job's description

**Response Object if success**
| Name | Group |  Description |
| -------- | --- | -- |
| jobId* | String | Job's Id |
| description* | String | Job's description

**Response Status**
| HTTP Status Code |  Description |
| -------- | ------- |
| 200 | Update job success
| 422 | Missing require field / Variable Group incorrect|
| 404 | ResourceNotFoundException |
---
### *DELETE* /jobs/{jobId} - Delete job by ID

**Description**
//TODO

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
| 200 | Delete success
| 404 | ResourceNotFoundException |
---
### *DELETE* /jobs/{jobId}/things/{thingName} 
Delete job's thing by job ID and thing name

**Description**
//TODO

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
---

### *POST* /job-templates
Create new job template

**body**
| Name | Schema |  Description |
| -------- |   ---- | --- |
| document* | String | job templates' document|
| description* | String | job templates' description |

**Response Object if success**
| Name | Group |  Description |
| -------- | --- | -- |
| jobTemplateArn* | String | Job templates' arn |
| jobTemplateId* | String | Job templates’ ID |

| HTTP Status Code |  Description |
| -------- | ------- |
| 200 | Create job template success
| 422 | Missing require field / Variable Group incorrect|
---
### *GET* /job-templates/{jobTemplateId} 
\Get job template by ID

**Description**
//TODO

**Path Parameter**
| Name | Description |
| -------- |   ---- |
| jobTemplateId* | Job Template's ID   |

**Response Object if success**
| Name | Group |  Description |
| -------- | --- | -- |
| jobTemplateId* | String | Job Template's ID|

**Response Status**
| HTTP Status Code |  Description |
| -------- | ------- |
| 200 | Get Job templates success |
| 404 | ResourceNotFoundException |
---
### *GET* /job-templates 
List job template 

**Description**
//TODO

**Response Object if success**
| Name | Group |  Description |
| -------- | --- | -- |
| jobTemplateId* | String | |

**Response Status**
| HTTP Status Code |  Description |
| -------- | ------- |
| 200 | 
---
### *DELETE* /job-templates/{jobTemplateId} - Delete job template by ID

**Description**
//TODO

**Path Parameter**
| Name | Description |
| -------- |   ---- |
| jobTemplateId* | String   |

**Response Status**
| HTTP Status Code |  Description |
| -------- | ------- |
| 200 | 
| 404 | ResourceNotFoundException |


## Thing Group API

### POST /thing-groups 
Create new thing group

**Description**

//TODO

**Body**

| Name | Schema |  Description |
| -------- | ------- |  ---- |
| thingGroupName* | String   | File's path|


**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | |
| 422 | Missing require field / Variable Group incorrect|

---
### *GET* /thing-groups/{thingGroupName} 
Get thing group by name

**Description**

//TODO

**Path Parameter**
| Name | Description |
| -------- |   ---- |
| thingGroupName* | String   |

**Response Object if success**

| Name | Group |  description |
| -------- | --- | -- |
| thingGroupName* | String |  | |

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | |
| 404 | ResourceNotFoundException |

---
### *GET* /thing-groups 
Get thing group list

**Description**

//TODO

**Query String Parameter**

| Name | Group | Description |
| -------- |   ---- | -- |
| thingGroups* | String   | |

**Response Object if success**

| Name | Group |  description |
| -------- | --- | -- |
| thingGroups* | String |  | |

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | 

---
### PUT /thing-groups/{thingGroupName} 
Update thing group by name

**Description**

//TODO

**Path Parameter**

| Name | Group | Description |
| -------- |   ---- | -- |
| thingGroupName* | String   | |

**Body**

| Name | Group | Description |
| -------- |   ---- | -- |
| thingGroupDescription* | String   | |


**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | |
| 422 | Missing require field / Variable Group incorrect|
| 404 | ResourceNotFoundException |

---
### DELETE /thing-groups/{thingGroupName} 
Delete thing group by name

**Description**

//TODO


**Path Parameter**

| Name | Group | Description |
| -------- |   ---- | -- |
| thingGroupName* | String   | |

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | |
| 404 | ResourceNotFoundException |

---
### *PUT* /thing-groups/{thingGroupName}/things/{thingName} 
Add thing to thing group by name

**Description**

//TODO

**Path Parameter**

| Name  | Description |
| -------- |   ---- | 
| thingGroupName* | String   | 
| thingName* | String |

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | 
| 404 | ResourceNotFoundException |
---
### *GET* /thing-groups/{thingGroupName}/things
List thing in thing group

**Description**

//TODO

**Path Parameter**

| Name  | Description |
| -------- |   ---- | 
| thingGroupName* | String   | 
| thingName* | String |

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | 
| 404 | ResourceNotFoundException |-->
---
### *DELETE* /thing-groups/{thingGroupName}/things/{thingName}
- Remove thing to thing group by name

**Description**

//TODO

**Path Parameter**

| Name | Group | Description |
| -------- |   ---- | -- |
| thingGroupName* | String   | 

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | 
| 404 | ResourceNotFoundException |
---
### *POST* /dynamic-thing-groups
**Description**

//TODO


**Body**

| Name | Schema |  Description |
| -------- | ------- |  ---- |
| thingGroupName* | String   | |
| queryString* | String   | |


**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | |
| 422 | Missing require field / Variable Group incorrect|
---
### *PUT* /dynamic-thing-groups/{thingGroupName}
Update dynamic thing group by name

**Description**

//TODO

**Path Parameter**
| Name | Description |
| -------- |   ---- |
| thingGroupName* |    |

**Body**

| Name | Schema |  Description |
| -------- | ------- |  ---- |
| thingGroupDescription* | String   | |

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | |
| 422 | Missing require field / Variable Group incorrect|
---
### *DELETE* /dynamic-thing-groups/{thingGroupName} 
Delete dynamic thing group by name // BillingGroup not join

**Description**

//TODO

**Body**

| Name | Schema |  Description |
| -------- | ------- |  ---- |
| thingGroupName* | String   | File's path|

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | |
| 404 | ResourceNotFoundException |

## Thing Type API

### *POST* /thing-types 
**Description*
//TODO

**Body**

| Name | Schema |  Description |
| -------- | ------- |  ---- |
| thingTypeName* | String   | |

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | Create success|
| 422 | Missing require field / Variable type incorrect|
---
### *GET* /thing-types/{thingTypeName} 
Get thing type by name

**Description**
//TODO

**Path Parameter**

| Name | Type | Description |
| -------- |   ---- | -- |
| thingTypeName* | String   | |

**Response Object if success**

| Name | Schema |  Description |
| -------- | ------- |  ---- |
| thingTypeArn* | String   | |
| thingTypeId* | String   |	|
| thingTypeName* | String ||

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | Create success|
| 404 | ResourceNotFoundException |
---
### *GET* /thing-types
List thing type

**Description**
//TODO

**Query String Parameter**

| Name | Type | Description |
| -------- |   ---- | -- |
| thingTypeName* | String   | |

**Response Object if success**

| Name | Type |  description |
| -------- | --- | -- |
| thingTypeName* | String |  | |

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 ||
---
### PUT /thing-types/{thingTypeName}/deprecate 
Deprecated thing type by name

**Description**
//TODO

**Path Parameter**

| Name |  Description |
| -------- |   ---- |
| thingTypeName* | String   |

**Response Object if success**

| Name | Type |  description |
| -------- | --- | -- |
| thingTypeName* | String |  | |

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | |
| 404 | ResourceNotFoundException |
---
### PUT /thing-types/{thingTypeName}/undeprecate 
Undeprecate thing type by name

**Description**
//TODO

**Path Parameter**

| Name |  Description |
| -------- |   ---- |
| thingTypeName* | String   |

**Response Object if success**

| Name | Type |  description |
| -------- | --- | -- |
| thingTypeName* | String |  | |

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | |
| 404 | ResourceNotFoundException 
---
### DELETE /thing-types/{thingTypeName}
Delete thing type

**Description**
//TODO

**Path Parameter**

| Name |  Description |
| -------- |   ---- |
| thingTypeName* | String   |

**Response Object if success**

| Name | Type |  description |
| -------- | --- | -- |
| thingTypeName* | String |  | |

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | |
| 404 | ResourceNotFoundException |
---
## Thing API

### *POST* /things 
Create thing

**Description**
Add new thing into platform.

**body**
| Name | Schema |  Description |
| -------- |   ---- | --- |
| thingName* | String   | Thing's name|

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | Create thing success|
| 422 | Missing require field / Variable Group incorrect|
---
### *GET* /things/{thingName}
Get thing 

**Description**
Get thing's information.

**Path Parameter**
| Name |    Description |
| -------- |   --- |
| thingName* | String   | Thing's name | 

**Response Object if success**
| Name | Group |  Description |
| -------- | --- | -- |
| thingName* | String | Thing's name |
| thingTypeName* | String | Thing's thing type|
| thingArn* | String | Thing's Arn |
| thingId* | String | Thing's ID |


**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | Get thing's information success |
| 404 | ResourceNotFoundException |
---
### *GET* /things 
List things

**Description**
List all of the thing.

**Path Parameter**
| Name |    Description |
| -------- |   --- |
| thingName* | String   | Thing's name | 

**Response Object if success**
| Name | Group |  Description |
| -------- | --- | -- |
| thingName* | String | Thing's name |
| thingTypeName* | String | Thing's thing type|
| thingArn* | String | Thing's Arn |
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
| thingTypeName* | String | Thing's thing type name
| attributePayload* | String | Thing's attribute payload  |
| expectedVersion* | String | Thing's expected version |
| removeThingType* | Boolean | Remove thing type |

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | |
| 422 | Missing require field / Variable Group incorrect|
| 404 | ResourceNotFoundException |
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
| 200 | Delete Success|
| 404 | ResourceNotFoundException |
---
### *GET* /things/{thingName}/shadows/{shadowName}
Get thing shadow

**Description**
Get thing's thing shadow payload from platform

**Path Parameter**
| Name | Description |
| -------- |   ---- |
| thingName* | String   | Thing's name
| shadowName* | String | Thing shadow's name

**Response Object if success**
| Name | Group |  Description |
| -------- | --- | -- |
| payload* | Uint8Array | Thing's thing shadow |

**Response Status**
| HTTP Status Code |  Description |
| -------- | ------- |
| 200 | Get thing shadow success |
| 404 | ResourceNotFoundException |
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
| 404 | ResourceNotFoundException |
---
### *PUT* /things/{thingName}/shadows/{shadowName
Update thing shadow

**Description**
Update thing shadow's payload to platform

**Path Parameter**
| Name | Description |
| -------- |   ---- |
| thingName* | Thing's name   |

**body**
| Name | Schema |  Description |
| -------- |   ---- | --- |
| payload* | Uint8Array | Thing shadow's payload|

**Response Status**
| HTTP Status Code |  Description |
| -------- | ------- |
| 200 | Update Success |
| 422 | Missing require field / Variable Group incorrect|
| 404 | ResourceNotFoundException |
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
| 404 | ResourceNotFoundException |


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