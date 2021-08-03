## Thing Group API

- [Add Thing to Thing Group](#put-thing-groupsthinggroupnamethingsthingname)
- [Create Dynamic Thing Group](#post-dynamic-thing-groups)
- [Create Thing Group](#post-thing-groups)
- [Delete Dynamic Thing Group](#delete-dynamic-thing-groupsthinggroupname)
- [Delete Thing Group](#delete-thing-groupsthinggroupname)
- [Get Thing Group](#get-thing-groupsthinggroupname)
- [List Thing Groups](#get-thing-groups)
- [List Things in Thing Group](#get-thing-groupsthinggroupnamethings)
- [Update Dynamic Thing Group](#put-dynamic-thing-groupsthinggroupname)
- [Update Thing Group](#put-thing-groupsthinggroupname)
- [Remove Thing from Thing Group](#delete-thing-groupsthinggroupnamethingsthingname)

---

### *PUT* /thing-groups/{thingGroupName}/things/{thingName}

Add thing to thing group

**Path Parameters**

| Name | Description |
| ---- | ----------- |
| thingGroupName | String | Thing group's name |
| thingName | String | Thing's name |

**Response Success Body**

```
{
  "added": true
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
| 200 | Add thing to thing group success |
| 404 | Thing group or thing not found |

---


### *POST* /dynamic-thing-groups

Create Dynamic thing groups

**Body**

| Name | Schema | Description |
| ---- | ------ | ----------- |
| thingGroupName* | String | The dynamic thing group name to create |
| queryString* | String | The dynamic thing group search query string |

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
| 200 | Create dynamic thing group success |
| 422 | Missing require field / Variable Group incorrect |

---

### *POST* /thing-groups

Create new thing group

**Body**

| Name | Schema | Description |
| ---- | ------ | ----------- |
| thingGroupName* | String | Thing group's name |

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
| 200 | Create thing group success |
| 422 | Missing require field / Variable Group incorrect |

---

### *DELETE* /dynamic-thing-groups/{thingGroupName}

Delete dynamic thing group

**Body**

| Name | Schema | Description |
| ---- | ------ | ----------- |
| thingGroupName | String | Dynamic thing group's name |

**Response Success Body**

```
{
  "removed": true
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
| 200 | Delete dynamic thing group success |
| 404 | Dynamic thing group not found |

---

### *DELETE* /thing-groups/{thingGroupName}

Delete thing group

**Body**

| Name | Schema | Description |
| ---- | ------ | ----------- |
| thingGroupName | String | Thing group's name |

**Response Success Body**

```
{
  "removed": true
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
| 200 | Delete thing group success |
| 404 | Thing group not found |

---

### *GET* /thing-groups/{thingGroupName}

Get thing group by thing group name

**Path Parameters**

| Name | Description |
| ---- | ----------- |
| thingGroupName | Thing group's name |

**Response Success Body**

```
{
  "thingGroup": {
    "thingGroupName": "{job templates' ARN}",
    "thingGroupArn": "{Job templates’ ID}"
    "thingGroupId": "{Thing group's ID}",
    "version": "{Job templates' document}"
  }
}
```

**Response Status**

| HTTP Status Code | Description |
| ---------------- | ----------- |
| 200 | Get thing group success |
| 404 | Thing group name not found |

---

### *GET* /thing-groups

List thing group list

**Query String Parameters**

| Name | Group | Description |
| ---- | ----- | ----------- |
| nextToken | String | Token for next data |

**Response Success Body**

```
{
  "thingGroups": [
    {
      "groupName": "{Thing group's name}",
      "groupArn": "{Thing group's ARN}"
    },
    ...more thing group objects
  ],
  "nextToken": "{Token for next data}"
}
```

**Response Status**

| HTTP Status Code | Description |
| ---------------- | ----------- |
| 200 | List thing group success |

---

### *GET* /thing-groups/{thingGroupName}/things

List things by thing group

**Path Parameters**

| Name | Description |
| ---- | ----------- |
| thingGroupName | Thing group's name |

**Query String Parameters**

| Name | Description |
| ---- | ----------- |
| nextToken | String | Token for next data |

**Response Success Body**

```
{
  "things": [
    {"thing object"}
  ],
  "nextToken": "Token for next data",
}
```

**Response Status**

| HTTP Status Code | Description |
| ---------------- | ----------- |
| 200 | List things form thing group success |
| 404 | Thing group not found |

---

### *PUT* /dynamic-thing-groups/{thingGroupName}

Update dynamic thing group

**Path Parameters**

| Name | Description |
| ---- | ----------- |
| thingGroupName* | String | Dynamic thing group's name |

**Body**

| Name | Schema | Description |
| ---- | ------ | ----------- |
| description* | Thing group's description

**Response Success Body**

```
{
  "updated": true,
  "version": "{The Dynamic thing group version}"
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
| 200 | Update Dynamic thing group's name success |
| 404 | Dynamic thing group not found |
| 422 | Missing require field / Variable Group incorrect |

---

### PUT /thing-groups/{thingGroupName}

Update thing group

**Path Parameters**

| Name | Description |
| ---- | ----------- |
| thingGroupName | Thing group's name |

**Body**

| Name | Group | Description |
| ---- | ----- | ----------- |
| thingGroupDescription | String | Thing group's description |

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
| 404 | Thing group not found |
| 422 | Missing require field / Variable Group incorrect |

---

### *DELETE* /thing-groups/{thingGroupName}/things/{thingName}

Remove thing from thing group

**Path Parameters**

| Name | Schema | Description |
| ---- | ------ | ----------- |
| thingGroupName | String | Thing group's name |
| thingName | String | Thing's name |

**Response Success Body**

```
{
  "removed": true
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
| 200 | Delete thing from thing group success |
| 404 | Thing or thing group not found |