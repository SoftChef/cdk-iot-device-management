## Thing Type API Documentation

- [Create Thing Type](#post-thing-types)
- [Delete Thing Type](#delete-thing-typesthingtypename)
- [Deprecate Thing Type](#put-thing-typesthingtypenamedeprecate)
- [Get Thing Type](#get-thing-typesthingtypename)
- [List Thing Types](#get-thing-types)
- [Undeprecate Thing Type](#put-thing-typesthingtypenameundeprecate)

---

### *POST* /thing-types

Create thing type

**Body**

| Name | Schema | Description |
| ---- | ------ | ----------- |
| thingTypeName* | String | Thing type's name |

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
| 200 | Create thing type success |
| 422 | Missing require field / Variable type incorrect |

---

### *DELETE* /thing-types/{thingTypeName}

Delete thing type

**Path Parameters**

| Name | Description |
| ---- | ----------- |
| thingTypeName | Thing type's name |

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
| 200 | Delete thing type success |
| 400 | Thing type not deprecated |
| 404 | Thing type not found |

---

### *PUT* /thing-types/{thingTypeName}/deprecate

Deprecated thing

**Path Parameters**

| Name | Description |
| ---- | ----------- |
| thingTypeName | Thing type's name |

**Response Success Body**

```
{
  "deprecated": true
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
| 200 | Deprecated thing type success |
| 404 | Thing type not found |

---

### *GET* /thing-types/{thingTypeName}

Get thing type by thing type name

**Path Parameters**

| Name | Description |
| ---- | ----------- |
| thingTypeName | Thing type's name |

**Response Success Body**

```
{
  "thingType": {
    "thingTypeArn": "{Thing type's ARN}"
    "thingTypeId": "{Thing type's ID}"
    "thingTypeName": "{Thing type's Name}"
  }
}
```

**Response Status**

| HTTP Status Code | Description |
| ---------------- | ----------- |
| 200 | Get thing type success |
| 404 | Thing type not found |

---

### *GET* /thing-types

List thing types

**Query String Parameters**

| Name | Schema | Description |
| ---- | ------ | ----------- |
| nextToken? | String | Token for next data |

**Response Success Body**

```
{
  "thingTypes": [
    {
      "thingTypeArn": "{Thing type's ARN}"
      "thingTypeName": "{Thing type's name}",
    },
    ...more thing type objects
  ],
  "nextToken": "{Token for next data}",
}
```

**Response Status**

| HTTP Status Code | Description |
| ---------------- | ----------- |
| 200 | List thing type success |

---

### *PUT* /thing-types/{thingTypeName}/undeprecate

Undeprecate thing type

**Path Parameters**

| Name | Description |
| ---- | ----------- |
| thingTypeName | String | Thing type's name |

**Response Status**

| HTTP Status Code | Description |
| ---------------- | ----------- |
| 200 | Undeprecate thing type by thing type name |
| 404 | Thing type not found |