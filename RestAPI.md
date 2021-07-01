# cdk-iot-device-management

![Build](https://github.com/SoftChef/cdk-iot-device-management/actions/workflows/build.yml/badge.svg)
![tag](https://img.shields.io/github/v/tag/softchef/cdk-iot-device-management) 
![dependencies](https://david-dm.org/softchef/cdk-iot-device-management.svg)

<!-- Repository Description* -->

## Table of content

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
```
{
  item: strawberry
}
```

## API Overview

### Files

### Create new category

- API Path
  - `POST /category`
- Local Path
  - `lambda-assets/files/create-category/`
- Input Value

| Method | Param         | Type                | Optional / Required | Description |
| - | ------------- | -------------       | ----------------- | ------------- |
| - | `TableName`   | string \| undefined | Required          | Table  which you're going to add data.
| - | `Item`  | Object | Required | Value that you're going to add.
- API Call Example
```
// Make a HTTP POST request

POST https://exaple.com/test/{TableName:category}/

// body

{
    categoryId: newCategoryId,
    name: newCategoryName,
    description: newCategorydescription,
    createdAt:newCreateTime,
    updatedAt: newUpdateTime,
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

#### POST /files - Create new file

#### PUT /files/{fileId} - Update file by ID

#### DELETE /files/{fileId} - Delete file by ID


```exports.FilesApi = class FilesApi extends cdk.Construct {
  // Define the resources
}`
```
<!--
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