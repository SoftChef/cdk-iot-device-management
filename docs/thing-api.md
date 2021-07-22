## Thing API Documentation

- [Create Thing](#post-things)
- [Delete Thing](#delete-thingsthingname)
- [Delete Thing Shadow](#delete-thingsthingnameshadowsshadowname)
- [Get Thing](#get-thingsthingname)
- [Get Thing Shadow](#get-thingsthingnameshadowsshadowname)
- [List Thing](#get-things)
- [List Thing Shadows](#get-thingsthingnameshadows)
- [Update Thing](#put-thingsthingname)
- [Update Thing Shadow](#put-thingsthingnameshadowsshadowname)

---

### *POST* /things

Create new thing

**Body**

| Name | Schema | Description |
| ---- | ------ | ----------- |
| thingName* | String | Thing's name |

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
| 200 | Create thing success |
| 422 | Missing require field / Variable Group incorrect |

---

### *DELETE* /things/{thingName}

Delete thing

**Path Paremeters**

| Name | Description |
| ---- | ----------- |
| thingName | Thing's name |

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
| 200 | Delete Success |
| 404 | Cannot found thing on platform |

---

### *DELETE* /things/{thingName}/shadows/{shadowName}

Delete thing shadow

**Path Parameters**

| Name | Description |
| ---- | ----------- |
| thingName | Thing's name |
| shadowName | Thing shadow's name |

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
| 404 | Thing is not found |

---

### *GET* /things/{thingName}

Get thing data

**Path Parameters**

| Name | Description |
| ---- | ----------- |
| thingName | Thing's name |

**Response Success Body**

```
{ 
    "thing": {
    "thingName": "{Thing's name}",
    "thingTypeName": "{Thing's thing type}",
    "thingArn": "{Thing's ARN}",
    "thingId": "{Thing's ID}"
  }
}
```

**Response Status**

| HTTP Status Code | Description |
| ---------------- | ----------- |
| 200 | Get thing's information success |
| 404 | Thing not found  |

---

### *GET* /things/{thingName}/shadows/{shadowName}

Get thing shadow

**Path Parameters**

| Name | Description |
| ---- | ----------- |
| thingName | Thing's name
| shadowName | Thing shadow's name

**Response Success Body**

```
{ 
  "thingShadow": {
    "payload": "{thing shadow payload}"
  }
}
```

**Response Status**

| HTTP Status Code | Description |
| ---------------- | ----------- |
| 200 | Get thing shadow success |
| 404 | Cannot found thing / thing shadow on platform |

---

### *GET* /things

List things

**Response Success Body**

```
{ 
  "things": [
    {
    "thingName": "Thing's name",
    "thingTypeName": "Thing's thing type",
    "thingArn": "Thing's ARN",
    "thingId": "Thing's ID"
    },
    ...more thing objects
  ],
  "nextToken": "{Token for next data}"
}
```

**Response Status**

| HTTP Status Code | Description |
| ---------------- | ----------- |
| 200 | List things success |

---

### *GET* /things/{thingName}/shadows

List thing shadow

**Path Parameters**

| Name | Description |
| ---- | ----------- |
| thingName | Thing's name |

**Query String Parameters**

| Name | Schema | Description |
| ---- | ----- | ----------- |
| nextToken | String | Token for next data |

**Response Success Body**

```
{ 
  "thingShadows": [
    {
      "thingShadowName": "{name}",
      "payload": "{payload}"
    },
    ...more thing shadow objects
  ],
  "nextToken": "{Token for next data}"
}
```

**Response Status**

| HTTP Status Code | Description |
| ---------------- | ----------- |
| 200 | List thing shadow success |
| 404 | Thing is not found |

---

### *PUT* /things/{thingName}

Update thing

**Path Parameters**

| Name | Description |
| ---- | ----------- |
| thingName | Thing's name |

**Body**

| Name | Schema | Description |
| ---- | ----- | ----------- |
| thingTypeName | String | Thing's thing type name |
| attributePayload | Object | Thing's attribute payload |
| expectedVersion | Number | Thing's expected version |
| removeThingType | Boolean | Remove thing type |

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
| 404 | Thing not found |
| 422 | Missing require field / Variable Group incorrect |

---

### *PUT* /things/{thingName}/shadows/{shadowName}

Update thing shadow

**Path Parameters**
| Name | Description |
| ---- | ----------- |
| thingName | Thing's name  |
| shadowName | Thing's name  |

**Body**

| Name | Schema | Description |
| ---- | ------ | ----------- |
| desired | Object | Thing shadow's payload |
| reported | Object | Thing shadow's payload |

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
| 200 | Update Success |
| 404 | Thing is not found |
| 422 | Missing require field / Variable Group incorrect |