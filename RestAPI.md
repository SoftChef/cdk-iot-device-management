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

### Files

### Create new category

- API Path
  - `POST /files`
- Local Path
  - [lambda-assets/files/create-files/app.ts](lambda-assets/files/create-files/app.ts)

| Method | Param | Type                | Required / Optional | Description |
| - | ------------- | -------------       | ----------------- | ------------- |
|pathParemeter||||||
| queryStringParemeter |   |  |  |
| body |
||location| URI | required|File's path|
||checksum|string|Required|An encrypt md5 / crc32 / sha1 value|
||checksumType|string \|<br> md5 / crc32 / sha1 |Required|Choose encrypt method for checksum|
||version|string|Required|File's version|
||categoryId|string|Required|File's category (From category table)|
||description|string|Required|File's description|

- Response Object

| HTTP Status Code | Message | Description |
| :-: | :-: | :-: |
| 200 | `{created: true}` | Create success |
| 422 | Validate Error | Missing require field / Variable type incorrect |

- API Call Example

```Create category Example
// Make a HTTP POST request

POST https://exaple.com/test/{tableName:category}/

// body

{
    name: newCategoryName,
    parentId: 
    description: newCategorydescription,
}

// If create success

{
  created: true
}
```

#### GET /categories - Get root category list

#### GET /categories/{categoryId} - Get category by ID, if category is root will return children category list

#### POST /categories - Create new category

#### PUT /categories/{categoryId} - Update category by ID

#### DELETE /categories/{categoryId} - Delete category by ID

#### GET /files - Get root files list

#### GET /files/{categoryId} - Get files by category ID

#### GET /files/{fileId} - Get file by ID

### Create new file

- API Path
  - `POST /files`
- Local Path
  - [lambda-assets/files/create-files/app.ts](lambda-assets/files/create-files/app.ts)

| Method | Param | Type                | Required / Optional | Description |
| - | ------------- | -------------       | ----------------- | ------------- |
|pathParemeter||||||
| queryStringParemeter |   |  |  |
| body |
||location| URI | required|File's path|
||checksum|string|Required|An encrypt md5 / crc32 / sha1 value|
||checksumType| string \|<br> md5 / crc32 / sha1 |Required|Choose encrypt method for checksum|
||version|string|Required|File's version|
||categoryId|string|Required|File's category (From category table)|
||description|string|Required|File's description|

- Response Object

| HTTP Status Code | Message | Description |
| :-: | :-: | :-: |
| 200 | `{created: true}` | Create success |
| 422 | Validate Error | Missing require field / Variable type incorrect |

```Create file Example
// request body

{
  location: expected.newFiles.location,
  checksum: expected.newFiles.checksum,
  checksumType: expected.newFiles.checksumType,
  version: expected.newFiles.version,
  categoryId: expected.newFiles.categoryId,
  describe: expected.newFiles.description,
}
```

#### PUT /files/{fileId} - Update file by ID

#### DELETE /files/{fileId} - Delete file by ID



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