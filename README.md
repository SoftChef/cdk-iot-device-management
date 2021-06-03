## Features

## Thing Type API
```
exports.ThingTypeApi = class ThingTypeApi extends cdk.Construct {
  // Define the resources
}
```
- GET /thing-types - Get thing type list
- GET /thing-types/{thing-type-name} - Get thing type by name
- POST /thing-types - Create new thing type
- PUT /thing-types/{thing-type-name}/deprecated - Deprecated or Undeprecate thing type by name
- DELETE /thing-types/{thing-type-name} - Delete thing type

---

## Thing API
```
exports.ThingApi = class ThingApi extends cdk.Construct {
  // Define the resources
}
```
- GET /things - Get thing list
- GET /things/{thing-name} - Get thing by name
- POST /things - Create new thing
- PUT /things/{thing-name} - Update thing by name
- DELETE /things/{thing-name} - Delete thing by name

---

## Thing Group API
```
exports.ThingGroupApi = class ThingGroupApi extends cdk.Construct {
  // Define the resources
}
```
- GET /thing-groups - Get thing group list
- GET /thing-groups/{thing-group-name} - Get thing group by name
- POST /thing-groups - Create new thing group, include static and dynamic thing group
- PUT /thing-groups/{thing-group-name} - Update thing group by name
- DELETE /thing-groups/{thing-group-name} - Delete thing group by name

---

## File API
```
exports.FileApi = class FileApi extends cdk.Construct {
  // Define the resources
}
```
- GET /categories - Get root category list
- GET /categories/{category-id} - Get category by ID, if category is root will return children category list
- POST /categories - Create new category
- DELETE /categories/{category-id} - Delete category by ID
- GET /files/{category-id} - Get files by category ID
- GET /files/{file-id} - Get file by ID
- POST /files - Create new file
- PUT /files/{file-id} - Update file by ID
- DELETE /files/{file-id} - Delete file by ID

### POST /categories Body
```
{
  id: string, // The uniqu id
  name: string,
  description: string,
  parent: string // Optional, the exists category id when category is sub-category, null is root category
}
```

### POST /files Body
```
{
  location: string, // File URI location
  checksum: string, // MD5/CRC32/SHA1 file checksum
  version: string, // Semantic version format
  categoryId: string, // Follow the category ID
  description: string
}
```
> Semantic versioning https://semver.org/

---

## Job API
```
exports.FileApi = class FileApi extends cdk.Construct {
  // Define the resources
}
```
- GET /jobs - Get job list
- GET /jobs/{job-id} - Get job by ID
- GET /jobs/{job-id}/things/{thing-name} - Get job's thing status by job ID and thing name
- GET /job-templates - Get job template list
- GET /job-templates/{job-template-id} - Get job template by ID
- POST /job-templates - Create new job template
- DELETE /job-templates/{job-template-id} - Delete job template by ID
- POST /jobs - Create new job
- PUT /jobs/{job-id} - Update job by ID
- DELETE /jobs/{job-id} - Delete job by ID
- DELETE /jobs/{job-id}/things/{thing-name} - Delete job's thing by job ID and thing name

### POST /jobs Body
```
{
  jobTemplateArn: string, // Optional, if you don't specify a value for "document"
  document: string, // Optional, if don't specify a value for "jobTemplateArn"
  targets: string[], // Array of things or thing groups
  targetSelection: string // CONTINUOUS or SNAPSHOT
}
```

---

## DynamoDB Table Schema

### File Table

| Key | Columns  | Type | Description |
| ------------- | ------------- | ------------- | ------------- |
| PK  | fileId | string | checksum |
| SK | version | string | - |
| GPK  | categoryId | string | - |
| -  | location | string | - |
| -  | description | string | - |
| -  | createdAt | string | - |
| -  | updatedAt | string | - |

### Category Table

| Key | Columns  | Type | Description |
| ------------- | ------------- | ------------- | ------------- |
| PK  | categoryId | string | - |
| GPK  | parentId | string | - |
| -  | name | string | - |
| -  | description | string | - |
| -  | createdAt | string | - |
| -  | updatedAt | string | - |