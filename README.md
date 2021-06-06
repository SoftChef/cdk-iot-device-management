## Features

## Thing Type API
```
exports.ThingTypeApi = class ThingTypeApi extends cdk.Construct {
  // Define the resources
}
```
- GET /thing-types - Get thing type list
- GET /thing-types/{thingTypeName} - Get thing type by name
- POST /thing-types - Create new thing type
- PUT /thing-types/{thingTypeName}/deprecate - Deprecated thing type by name
- PUT /thing-types/{thingTypeName}/undeprecate - Undeprecate thing type by name
- DELETE /thing-types/{thingTypeName} - Delete thing type

---

## Thing API
```
exports.ThingApi = class ThingApi extends cdk.Construct {
  // Define the resources
}
```
- GET /things - Get thing list
- GET /things/{thingName} - Get thing by name
- POST /things - Create new thing
- PUT /things/{thingName} - Update thing by name
- DELETE /things/{thingName} - Delete thing by name

---

## Thing Group API
```
exports.ThingGroupApi = class ThingGroupApi extends cdk.Construct {
  // Define the resources
}
```
- GET /thing-groups - Get thing group list
- GET /thing-groups/{thingGroupName} - Get thing group by name
- POST /thing-groups - Create new thing group
- PUT /thing-groups/{thingGroupName} - Update thing group by name
- DELETE /thing-groups/{thingGroupName} - Delete thing group by name
- PUT /thing-groups/{thingGroupName}/things/{thingName} - Add thing to thing group by name
- DELETE /thing-groups/{thingGroupName}/things/{thingName} - Remove thing to thing group by name
- POST /dynamic-thing-groups - Create new dynamic thing group
- PUT /dynamic-thing-groups/{thingGroupName} - Update dynamic thing group by name
- DELETE /dynamic-thing-groups/{thingGroupName} - Delete dynamic thing group by name

// BillingGroup not join

---

## File API
```
exports.FileApi = class FileApi extends cdk.Construct {
  // Define the resources
}
```
- GET /categories - Get root category list
- GET /categories/{categoryId} - Get category by ID, if category is root will return children category list
- POST /categories - Create new category
- DELETE /categories/{categoryId} - Delete category by ID
- GET /files/{categoryId} - Get files by category ID
- GET /files/{fileId} - Get file by ID
- POST /files - Create new file
- PUT /files/{fileId} - Update file by ID
- DELETE /files/{fileId} - Delete file by ID

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
- GET /jobs/{jobId} - Get job by ID
- GET /jobs/{jobId}/things/{thingName} - Get job's thing status by job ID and thing name
- GET /job-templates - Get job template list
- GET /job-templates/{jobTemplateId} - Get job template by ID
- POST /job-templates - Create new job template
- DELETE /job-templates/{jobTemplateId} - Delete job template by ID
- POST /jobs - Create new job
- PUT /jobs/{jobId} - Update job by ID
- DELETE /jobs/{jobId} - Delete job by ID
- DELETE /jobs/{jobId}/things/{thingName} - Delete job's thing by job ID and thing name

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