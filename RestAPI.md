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

> [lambda-assets/files/create-category/app.ts](lambda-assets/files/create-category/app.ts)

**Body**

| Name | Schema |  Description |
| -------- | ------- |  ---- |
| categoryId* | String   |   |
| parentId* | String   | |
| description	| String | |

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 |Create success |
| 422 | Missing require field / Variable type incorrect |

### *GET* /categories/{categoryId} 
Get category by ID, if category is root will return children category list

**Description**

// TODO

> [lambda-assets/files/get-category/app.ts](lambda-assets/files/get-category/app.ts)

**Path Parameter**

|  Name | Description |
| -------- | -------- | 
| categoryId* |      | 

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | |
| 404 | ResourceNotFoundException |

### *GET* /categories

Get root category list

**Description**

// TODO

> [lambda-assets/files/list-category/app.ts](lambda-assets/files/list-category/app.ts)

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

### *DELETE* /categories/{categoryId} 
Delete category by ID

**Description**

// TODO

> [lambda-assets/files/delete-category/app.ts](lambda-assets/files/delete-category/app.ts)

**Path Parameter**

| Name | Schema |  Description |
| -------- | ------- |  ---- |
| categoryId* | String   |   |

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | Delete success|
| 404 | ResourceNotFoundException |

### *POST* /files
Create files

**Description**

// TODO

> [lambda-assets/files/create-file/app.ts](lambda-assets/files/create-file/app.ts)

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

### *GET* /files/{fileId} 
Get root files list

**Description**
// TODO

> [lambda-assets/files/get-file/app.ts](lambda-assets/files/get-file/app.ts)

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

### GET /files
Get root files list

**Description**
// TODO

> [lambda-assets/files/list-file/app.ts](lambda-assets/files/list-file/app.ts)

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

### GET /files/{categoryId}
List file by categoryId

**Description**
// TODO

> [lambda-assets/files/list-file-by-category/app.ts](lambda-assets/files/list-file-by-category/app.ts)

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
| -------- | ------- | |
| 200 | Create success|
| 404 | ResourceNotFoundException |

### PUT /files/{fileId} - Update file by ID

Update file by ID

**Description**

// TODO

> [lambda-assets/files/update-file/app.ts](lambda-assets/files/update-file/app.ts)

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

### *DELETE* /files/{categoryId} 
Delete files by ID

**Description**

// TODO

> [lambda-assets/files/delete-files/app.ts](lambda-assets/files/delete-files/app.ts)

**Path Parameter**

| Name | Schema |  Description |
| -------- | ------- |  ---- |
| fileId* | String   |   |

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | Delete success|
| 404 | ResourceNotFoundException |

## Job API

## Thing Group API

### POST /thing-groups 
Create new thing group

**Description**

//TODO

> [lambda-assets/files/create-thing-groups/app.ts](lambda-assets/thing-groups/create-thing-group/app.ts)

**Body**

| Name | Schema |  Description |
| -------- | ------- |  ---- |
| thingGroupName* | String   | File's path|


**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | |
| 422 | Missing require field / Variable Group incorrect|



### *GET* /thing-groups/{thingGroupName} 
Get thing group by name

**Description**

//TODO

> [lambda-assets/files/get-thing-groups/app.ts](lambda-assets/thing-groups/get-thing-group/app.ts)


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


### *GET* /thing-groups 
Get thing group list

**Description**

//TODO

> [lambda-assets/files/list-thing-groups/app.ts](lambda-assets/thing-groups/list-thing-group/app.ts)

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

### PUT /thing-groups/{thingGroupName} 
Update thing group by name

**Description**

//TODO

> [lambda-assets/files/update-thing-groups/app.ts](lambda-assets/thing-groups/update-thing-group/app.ts)

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


### DELETE /thing-groups/{thingGroupName} 
Delete thing group by name

**Description**

//TODO

> [lambda-assets/files/delete-thing-group/app.ts](lambda-assets/thing-groups/delete-thing-group/app.ts)

**Path Parameter**

| Name | Group | Description |
| -------- |   ---- | -- |
| thingGroupName* | String   | |

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | |
| 404 | ResourceNotFoundException |

### PUT /thing-groups/{thingGroupName}/things/{thingName}
Add thing to thing group by name

**Description**

//TODO

> [lambda-assets/files/add-thing-to-group/app.ts](lambda-assets/thing-groups/add-thing-to-group/app.ts)

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

### *DELETE* /thing-groups/{thingGroupName}/things/{thingName}
- Remove thing to thing group by name

**Description**

//TODO

> [lambda-assets/files/remove-thing-from-thing-group/app.ts](lambda-assets/thing-groups/remove-thing-from-thing-group/app.ts)

**Path Parameter**

| Name | Group | Description |
| -------- |   ---- | -- |
| thingGroupName* | String   | 

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | 
| 404 | ResourceNotFoundException |

### *POST* /dynamic-thing-groups
**Description**

//TODO

> [lambda-assets/files/create-dynamic-thing-groups/app.ts](lambda-assets/thing-Groups/create-thing-group/app.ts)

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

### *PUT* /dynamic-thing-groups/{thingGroupName}
Update dynamic thing group by name

**Description**

//TODO

> [lambda-assets/files/update-dynamic-thing-groups/app.ts](lambda-assets/update-dynamic-thing-groups/create-thing-group/app.ts)

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

### *DELETE* /dynamic-thing-groups/{thingGroupName} 
Delete dynamic thing group by name // BillingGroup not join

**Description**

//TODO

> [lambda-assets/files/delete-dynamic-thing-groups/app.ts](lambda-assets/thing-Groups/delete-dynamic-thing-groups/app.ts)

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

**Description**
//TODO

> [lambda-assets/files/create-thing-types/app.ts](lambda-assets/thing-types/create-thing-type/app.ts)


**Body**

| Name | Schema |  Description |
| -------- | ------- |  ---- |
| thingTypeName* | String   | |

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 | Create success|
| 422 | Missing require field / Variable type incorrect|

### *GET* /thing-types/{thingTypeName} 
Get thing type by name

**Description**
//TODO

> [lambda-assets/files/get-thing-types/app.ts](lambda-assets/thing-types/get-thing-type/app.ts)

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

### *GET* /thing-types
List thing type

> [lambda-assets/files/list-thing-types/app.ts](lambda-assets/thing-types/list-thing-types/app.ts)

**Query String Parameter**

| Name | Type | Description |
| -------- |   ---- | -- |
| thingTypeName* | String   | |
| Name |  Description |

**Response Object if success**

| Name | Type |  description |
| -------- | --- | -- |
| thingTypeName* | String |  | |

**Response Status**

| HTTP Status Code |  Description |
| -------- | ------- | 
| 200 ||

### PUT /thing-types/{thingTypeName}/deprecate 
Deprecated thing type by name

> [lambda-assets/files/deprecate-thing-type/app.ts](lambda-assets/thing-types/deprecate-thing-type/app.ts)

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

### PUT /thing-types/{thingTypeName}/undeprecate 
Undeprecate thing type by name

> [lambda-assets/files/undeprecate-thing-type/app.ts](lambda-assets/thing-types/undeprecate-thing-type/app.ts)

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
### DELETE /thing-types/{thingTypeName}
Delete thing type

> [lambda-assets/files/delete-thing-type/app.ts](lambda-assets/thing-types/delete-thing-type/app.ts)

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

## Thing API




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