## File API Documentation

- [Create Category](#post-categories)
- [Create a File](#post-filesfile)
- [Create Files](#post-files)
- [Delete Category](#delete-categoriescategoryid)
- [Delete a File](#delete-filesfileid)
- [Delete Files](#delete-fileschecksumversionsversion)
- [Get Category](#get-categoriescategoryid)
- [Get File](#get-filesfileid)
- [Get Files](#get-fileschecksumversionsversion)
- [List Categories](#get-categories)
- [List Files](#get-files)
- [List Files by Category](#get-categoriescategoryidfiles)
- [Update Category](#put-categoriescategoryid)
- [Update Files](#put-files)
- [Update File](#put-filesfileid)
---

### *POST* /categories

Create a new file category

**Body**

| Name | Schema | Description |
| ---- | ------ | ----------- |
| name* | String | Category's name |
| parentId | String | Parent category's ID |
| description	| String | Category's description |

**Response Success Body**

```
{
  created: true
}
```

**Response Failure Body**

```
{
  "error": "{reason}"
}
```

**Response Status**

| HTTP Status Code | Description |
| ---------------- | ----------- |
| 200 | Create success |
| 404 | Parent category id not found |
| 422 | Missing require field / Category already exists / Variable type incorrect |

---

### *POST* /files/file

Create a file

**Body**

| Name | Schema | Description |
| -------- | ------- | ---- |
| version* | String | File's version|
| categoryId* | String | From category |
| checksum* | String | An encrypt md5 / crc32 / sha1 value |
| checksumType* | 'md5' \| 'crc32' \| 'sha1' | File's checksum type|
| location* | URI | File's path|
| locale* | String | File's locale |
| summary* | string (Allow empty string) | File's summary|
| description* | String (Allow empty string) | File's description |

**Response Success Body**

```
{
  "created": true
}
```

**Response Failure Body**

```
{
  "error": "{reason}"
}
```

**Response Status**

| HTTP Status Code | Description |
| ---------------- | ----------- |
| 200 | Create file success |
| 404 | Category ID not found |
| 422 | Variable type incorrect |

----

### *POST* /files

Create files

**Body**

```
{
  files: [
    {
      "fileId": "{file' ID}",
      "categoryId": "{file's category ID}",
      "version": "{file's version}",
      "checksum": "{an encrypt md5 / crc32 / sha1 value}",
      "checksumType" : "{file's checksum type}",
      "location": "{file' path}",
      "locales": [{
        locale": "{file's locale}",
        summary": "{file's summary}",
        description": "{file's description}",
      }],
    },
    ...more file objects
  ]
}
```
| Name | Schema | Description |
| -------- | ------- | ---- |
| version* | String | File's version|
| categoryId* | String | From category |
| checksum* | String | An encrypt md5 / crc32 / sha1 value |
| checksumType* | 'md5' \| 'crc32' \| 'sha1' | File's checksum type|
| location* | URI | File's path|
| locale* | String | File's locale |
| summary* | string (Allow empty string) | File's summary|
| description* | String (Allow empty string) | File's description |

**Response Success Body**

```
{
  "created": true
}
```

**Response Failure Body**

```
{
  "error": "{reason}"
}
```

**Response Status**

| HTTP Status Code | Description |
| ---------------- | ----------- |
| 200 | Create file success |
| 404 | Category ID not found |
| 422 | File already exists / Variable type incorrect |

----

---### *POST* /files

Create files

**Body**

```
{
  files: [
    {
      version: "{File's version}",
      categoryId: "{File's category ID}",
      checksumType: "{File's checksum type}",
      checksum: "{File checksum}",
      location: "{File URI}",
      locales: [{
        locale: "{File's locale}",
        summary: "{File's summary}",
        description: "{File's description}",
      }],
    },
  ],
}
```

| Name | Schema | Description |
| -------- | ------- | ---- |
| version* | String | File's version|
| categoryId* | String | From category |
| checksum* | String | An encrypt md5 / crc32 / sha1 value |
| checksumType* | 'md5' \| 'crc32' \| 'sha1' | File's checksum type|
| location* | URI | File's path|
| locale* | String | File's locale |
| summary* | string (Allow empty string) | File's summary|
| description* | String (Allow empty string) | File's description |

**Response Success Body**

```
{
  "created": true
}
```

**Response Failure Body**

```
{
  "error": "{reason}"
}
```

**Response Status**

| HTTP Status Code | Description |
| ---------------- | ----------- |
| 200 | Create file success |
| 404 | Category ID not found |
| 422 | Variable type incorrect |

---

### *DELETE* /files/{checksum}/versions/{version}

Delete file

**Path Parameters**

| Name | Description |
| -------- | ------- |
| fileId | File's ID |

**Response Success Body**
```
{
  "deleted": true
}
```
**Response Failure Body**

```
{
  "error": "{reason}"
}
```

**Response Status**

| HTTP Status Code | Description |
| ---------------- | ----------- |
| 200 | Delete success |

---

### *DELETE* /files/{checksum}/versions/{version}

Delete files

**Path Parameters**

| Name | Description |
| -------- | ------- |
| checksum | File's checksum |
| version | File's version |

**Response Success Body**
```
{
  "deleted": true
}
```
**Response Failure Body**

```
{
  "error": "{reason}"
}
```

**Response Status**

| HTTP Status Code | Description |
| ---------------- | ----------- |
| 200 | Delete success |
| 404 | File not found |

---

### *GET* /categories/{categoryId}

Get category by category ID, if category is root will return children category.

**Path Parameters**

| Name | Description |
| ---- | ----------- |
| categoryId | Category's ID |

**Response Success Body**

```
{
  category: {
    "categoryId": "{the category id}",
    "parentId": "{parent category id}",
    "description": "{category's description}",
    "createdAt": "{created timestamp}",
    "updatedAt": "{last updated timestamp}",
  }
}
```

**Response Status**

| HTTP Status Code | Description |
| ---------------- | ----------- |
| 200 | Get Category Success |
| 404 | Category ID not found |

---

### *GET* /categories

Get root category list

**Query String Parameters**

| Name | Schema | Description |
| ---- | ------ | ----------- |
| parentId | String | Parent category's ID |
| nextToken | String | Token for next data |

**Response Success Body**

```
{
  categories: [
    {
      "categoryId": "{the category id}",
      "parentId": "{parent category id}",
      "description": "{category's description}",
      "createdAt": "{created timestamp}",
      "updatedAt": "{last updated timestamp}",
    },
    ... more category object
  ]
  "nextToken": "{Token for next data}"
}
```

**Response Status**

| HTTP Status Code | Description |
| ---------------- | ----------- |
| 200 | List category success |

---

### *DELETE* /categories/{categoryId}

Delete category by category ID

**Path Parameters**

| Name | Description |
| ---- | ----------- |
| categoryId | Category's ID |

**Response Success Body**

```
{
  "deleted": true
}
```

**Response Failure Body**

```
{
  "error": "{reason}"
}
```

**Response Status**

| HTTP Status Code | Description |
| ---------------- | ----------- |
| 200 | Delete success |

---

### *GET* /files/{fileId}

Get file by ID

**Path Parameters**

| Name | Description |
| ---- | ----------- |
| fileId | File's ID |

**Response Success Body**

```
{
  "location": "{file' path}",
  "checksum": "{an encrypt md5 / crc32 / sha1 value}",
  "checksumType" : "{file's checksum type}",
  "version": "{file's version}",
  "locale": "{file's locale}",
  "summary": "{file's summary}"
  "categoryId": "{file's category ID}",
  "description": "{file's description}",
  "createdAt": "{created time}",
  "updatedAt": "{last updated time}"
}
```

**Response Status**

| HTTP Status Code | Description |
| ---------------- | ----------- |
| 200 | Create success |
| 404 | File not found |

---

### *GET* /files/{checksum}/versions/{version}

Get file by checksum & version

**Path Parameters**

| Name | Description |
| ---- | ----------- |
| checksum | File's checksum |
| version | File's version |

**Response Success Body**

```
{
  files: [
    {
      "location": "{file' path}",
      "checksum": "{an encrypt md5 / crc32 / sha1 value}",
      "checksumType" : "{file's checksum type}",
      "version": "{file's version}",
      "locale": "{file's locale}",
      "summary": "{file's summary}"
      "categoryId": "{file's category ID}",
      "description": "{file's description}",
      "createdAt": "{created time}",
      "updatedAt": "{last updated time}"
    },
    ...more file objects
  ],
  "nextToken": "{Token for next data}"
}
```

**Response Status**

| HTTP Status Code | Description |
| ---------------- | ----------- |
| 200 | Create success |
| 404 | File not found |

---

### *GET* /files

List files

**Query String Parameters**

| Name | Schema | Description |
| ---- | ------ | ----------- |
| nextToken | String | Token for next data |

**Response Success Body**

```
{
  "files": [
    {
      "location": "{file' path}",
      "checksum": "{an encrypt md5 / crc32 / sha1 value}",
      "checksumType" : "{file's checksum type}",
      "version": "{file's version}",
      "locale": "{file's locale}",
      "summary": "{file's summary}"
      "categoryId": "{file's category ID}",
      "description": "{file's description}",
      "createdAt": "{created time}",
      "updatedAt": "{last updated time}" 
    },
    ...more file objects
  ]
  "nextToken": "{Token for next data}"
}
```

**Response Status**

| HTTP Status Code | Description |
| ---------------- | ----------- |
| 200 | List file success |

---

### *GET* /categories/{categoryId}/files

List files by category ID

**Path Parameters**

| Name | Description |
| ---- | ----------- |
| categoryId | Category's ID |

**Query String Parameters**

| Name | Schema | Description |
| ---- | ------ | ----------- |
| locale | String | File's locale |
| nextToken | String | Token for next data |

**Response Success Body**

```
{
  "files": [
    {
      "location": "{file' path}",
      "checksum": "{an encrypt md5 / crc32 / sha1 value}",
      "checksumType" : "{file's checksum type}",
      "version": "{file's version}",
      "locale": "{file's locale}",
      "summary": "{file's summary}"
      "categoryId": "{file's category ID}",
      "description": "{file's description}",
      "createdAt": "{created time}",
      "updatedAt": "{last updated time}" 
    },
    ...more file objects
  ]
  "nextToken": "{Token for next data}"
}
```

**Response Status**

| HTTP Status Code | Description |
| ---------------- | ----------- |
| 200 | List files success |
| 404 | Category ID not found |

---

### *PUT* /categories/{categoryId}

Update category description by category ID

**Path Parameters**

| Name | Description |
| ---- | ----------- |
| categoryId | Category's ID |

**Body**

| Name | Schema | Description |
| ---- | ------ | ----------- |
| description* | String | Category's description |

**Response Success Body**

```
{
  "updated": true
}
```

**Response Failure Body**

```
{
  "error": "{reason}"
}
```

**Response Status**

| HTTP Status Code | Description |
| ---------------- | ----------- |
| 200 | Update success |
| 404 | Category ID not found |
| 422 | Missing require description / Variable type incorrect |

---

### *PUT* /files/{fileId}

Update file summary and description by file ID.

**Path Parameters**

| Name | Description |
| ---- | ----------- |
| fileId | File's ID |

**Body**

| Name | Schema | Description |
| ---- | ------ | ----------- |
| summary* | string (Allow empty string) | File's summary|
| description* | String (Allow empty string) | File's description |

**Response Success Body**

```
{
  "updated": true
}
```

**Response Failure Body**

```
{
  "error": "{reason}"
}
```

**Response Status**

| HTTP Status Code | Description |
| ---------------- | ----------- |
| 200 | Update success |
| 404 | File not found |
| 422 | Variable type incorrect |

### *PUT* /files/{fileId}

Update file summary and description by file ID.

**Path Parameters**

| Name | Description |
| ---- | ----------- |
| fileId | File's ID |

**Body**

```
{
  files: [
    {
      "fileId": "{file' ID}",
      "categoryId": "{file's category ID}",
      "version": "{file's version}",
      "checksum": "{an encrypt md5 / crc32 / sha1 value}",
      "checksumType" : "{file's checksum type}",
      "location": "{file' path}",
      "locales": [{
        locale": "{file's locale}",
        summary": "{file's summary}",
        description": "{file's description}",
      }],
    },
    ...more file objects
  ]
}
```

| Name | Schema | Description |
| -------- | ------- | ---- |
| fileId* | String | File's ID|
| version* | String | File's version|
| categoryId* | String | From category |
| checksum* | String | An encrypt md5 / crc32 / sha1 value |
| checksumType* | 'md5' \| 'crc32' \| 'sha1' | File's checksum type|
| location* | URI | File's path|
| locale* | String | File's locale |
| summary* | string (Allow empty string) | File's summary|
| description* | String (Allow empty string) | File's description |

**Response Success Body**

```
{
  "updated": true
}
```

**Response Failure Body**

```
{
  "error": "{reason}"
}
```

**Response Status**

| HTTP Status Code | Description |
| ---------------- | ----------- |
| 200 | Update success |
| 404 | File not found |
| 422 | Variable type incorrect |