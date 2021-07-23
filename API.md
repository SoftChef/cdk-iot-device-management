# API Reference <a name="API Reference"></a>

## Constructs <a name="Constructs"></a>

### FileApi <a name="@softchef/cdk-iot-device-management.FileApi"></a>

#### Initializer <a name="@softchef/cdk-iot-device-management.FileApi.Initializer"></a>

```typescript
import { FileApi } from '@softchef/cdk-iot-device-management'

new FileApi(scope: Construct, id: string, props?: FileApiProps)
```

##### `scope`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.FileApi.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.FileApi.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.FileApi.parameter.props"></a>

- *Type:* [`@softchef/cdk-iot-device-management.FileApiProps`](#@softchef/cdk-iot-device-management.FileApiProps)

---



#### Properties <a name="Properties"></a>

##### `restApiId`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.FileApi.property.restApiId"></a>

- *Type:* `string`

The File API Gateway's ID.

---


### JobApi <a name="@softchef/cdk-iot-device-management.JobApi"></a>

#### Initializer <a name="@softchef/cdk-iot-device-management.JobApi.Initializer"></a>

```typescript
import { JobApi } from '@softchef/cdk-iot-device-management'

new JobApi(scope: Construct, id: string, props?: JobApiProps)
```

##### `scope`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.JobApi.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.JobApi.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.JobApi.parameter.props"></a>

- *Type:* [`@softchef/cdk-iot-device-management.JobApiProps`](#@softchef/cdk-iot-device-management.JobApiProps)

---



#### Properties <a name="Properties"></a>

##### `restApiId`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.JobApi.property.restApiId"></a>

- *Type:* `string`

---


### ThingApi <a name="@softchef/cdk-iot-device-management.ThingApi"></a>

#### Initializer <a name="@softchef/cdk-iot-device-management.ThingApi.Initializer"></a>

```typescript
import { ThingApi } from '@softchef/cdk-iot-device-management'

new ThingApi(scope: Construct, id: string, props?: ThingApiProps)
```

##### `scope`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.ThingApi.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.ThingApi.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.ThingApi.parameter.props"></a>

- *Type:* [`@softchef/cdk-iot-device-management.ThingApiProps`](#@softchef/cdk-iot-device-management.ThingApiProps)

---



#### Properties <a name="Properties"></a>

##### `restApiId`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.ThingApi.property.restApiId"></a>

- *Type:* `string`

The Thing API Gateway's ID.

---


### ThingGroupApi <a name="@softchef/cdk-iot-device-management.ThingGroupApi"></a>

#### Initializer <a name="@softchef/cdk-iot-device-management.ThingGroupApi.Initializer"></a>

```typescript
import { ThingGroupApi } from '@softchef/cdk-iot-device-management'

new ThingGroupApi(scope: Construct, id: string, props?: ThingGroupApiProps)
```

##### `scope`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.ThingGroupApi.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.ThingGroupApi.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.ThingGroupApi.parameter.props"></a>

- *Type:* [`@softchef/cdk-iot-device-management.ThingGroupApiProps`](#@softchef/cdk-iot-device-management.ThingGroupApiProps)

---



#### Properties <a name="Properties"></a>

##### `restApiId`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.ThingGroupApi.property.restApiId"></a>

- *Type:* `string`

The ThingGroup API Gateway's ID.

---


### ThingTypeApi <a name="@softchef/cdk-iot-device-management.ThingTypeApi"></a>

#### Initializer <a name="@softchef/cdk-iot-device-management.ThingTypeApi.Initializer"></a>

```typescript
import { ThingTypeApi } from '@softchef/cdk-iot-device-management'

new ThingTypeApi(scope: Construct, id: string, props?: ThingTypeApiProps)
```

##### `scope`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.ThingTypeApi.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.ThingTypeApi.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.ThingTypeApi.parameter.props"></a>

- *Type:* [`@softchef/cdk-iot-device-management.ThingTypeApiProps`](#@softchef/cdk-iot-device-management.ThingTypeApiProps)

---



#### Properties <a name="Properties"></a>

##### `restApiId`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.ThingTypeApi.property.restApiId"></a>

- *Type:* `string`

The ThingType API Gateway's ID.

---


## Structs <a name="Structs"></a>

### FileApiProps <a name="@softchef/cdk-iot-device-management.FileApiProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { FileApiProps } from '@softchef/cdk-iot-device-management'

const fileApiProps: FileApiProps = { ... }
```

##### `authorizationType`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.FileApiProps.property.authorizationType"></a>

- *Type:* [`@aws-cdk/aws-apigateway.AuthorizationType`](#@aws-cdk/aws-apigateway.AuthorizationType)
- *Default:* apigateway.AuthorizationType.NONE

Specify API Gateway all resources's authorization type, COGNTIO/IAM/CUSTOM/NONE.

---

##### `authorizer`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.FileApiProps.property.authorizer"></a>

- *Type:* [`@aws-cdk/aws-apigateway.IAuthorizer`](#@aws-cdk/aws-apigateway.IAuthorizer)
- *Default:* undefined

Specify API Gateway's authorizer, CognitoUserPool/Lambda.

---

##### `categoryTableQueryByParentIdRCU`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.FileApiProps.property.categoryTableQueryByParentIdRCU"></a>

- *Type:* `number`

---

##### `categoryTableQueryByParentIdWCU`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.FileApiProps.property.categoryTableQueryByParentIdWCU"></a>

- *Type:* `number`

---

##### `categoryTableRCU`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.FileApiProps.property.categoryTableRCU"></a>

- *Type:* `number`

---

##### `categoryTableWCU`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.FileApiProps.property.categoryTableWCU"></a>

- *Type:* `number`

---

##### `fileTableGetFileByChecksumAndVersionRCU`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.FileApiProps.property.fileTableGetFileByChecksumAndVersionRCU"></a>

- *Type:* `number`

---

##### `fileTableGetFileByChecksumAndVersionWCU`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.FileApiProps.property.fileTableGetFileByChecksumAndVersionWCU"></a>

- *Type:* `number`

---

##### `fileTableQueryByCategoryIdAndLocaleRCU`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.FileApiProps.property.fileTableQueryByCategoryIdAndLocaleRCU"></a>

- *Type:* `number`

---

##### `fileTableQueryByCategoryIdAndLocaleWCU`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.FileApiProps.property.fileTableQueryByCategoryIdAndLocaleWCU"></a>

- *Type:* `number`

---

##### `fileTableRCU`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.FileApiProps.property.fileTableRCU"></a>

- *Type:* `number`

---

##### `fileTableWCU`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.FileApiProps.property.fileTableWCU"></a>

- *Type:* `number`

---

### JobApiProps <a name="@softchef/cdk-iot-device-management.JobApiProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { JobApiProps } from '@softchef/cdk-iot-device-management'

const jobApiProps: JobApiProps = { ... }
```

##### `authorizationType`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.JobApiProps.property.authorizationType"></a>

- *Type:* [`@aws-cdk/aws-apigateway.AuthorizationType`](#@aws-cdk/aws-apigateway.AuthorizationType)
- *Default:* apigateway.AuthorizationType.NONE

Specify API Gateway all resources's authorization type, COGNTIO/IAM/CUSTOM/NONE.

---

##### `authorizer`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.JobApiProps.property.authorizer"></a>

- *Type:* [`@aws-cdk/aws-apigateway.IAuthorizer`](#@aws-cdk/aws-apigateway.IAuthorizer)
- *Default:* undefined

Specify API Gateway's authorizer, CognitoUserPool/Lambda.

---

##### `scheduleFunction`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.JobApiProps.property.scheduleFunction"></a>

- *Type:* `any`
- *Default:* undefined

Specify Schedule Function to enable create schedule job function.

---

### ThingApiProps <a name="@softchef/cdk-iot-device-management.ThingApiProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { ThingApiProps } from '@softchef/cdk-iot-device-management'

const thingApiProps: ThingApiProps = { ... }
```

##### `authorizationType`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.ThingApiProps.property.authorizationType"></a>

- *Type:* [`@aws-cdk/aws-apigateway.AuthorizationType`](#@aws-cdk/aws-apigateway.AuthorizationType)
- *Default:* apigateway.AuthorizationType.NONE

Specify API Gateway all resources's authorization type, COGNTIO/IAM/CUSTOM/NONE.

---

##### `authorizer`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.ThingApiProps.property.authorizer"></a>

- *Type:* [`@aws-cdk/aws-apigateway.IAuthorizer`](#@aws-cdk/aws-apigateway.IAuthorizer)
- *Default:* undefined

Specify API Gateway's authorizer, CognitoUserPool/Lambda.

---

### ThingGroupApiProps <a name="@softchef/cdk-iot-device-management.ThingGroupApiProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { ThingGroupApiProps } from '@softchef/cdk-iot-device-management'

const thingGroupApiProps: ThingGroupApiProps = { ... }
```

##### `authorizationType`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.ThingGroupApiProps.property.authorizationType"></a>

- *Type:* [`@aws-cdk/aws-apigateway.AuthorizationType`](#@aws-cdk/aws-apigateway.AuthorizationType)
- *Default:* apigateway.AuthorizationType.NONE

Specify API Gateway all resources's authorization type, COGNTIO/IAM/CUSTOM/NONE.

---

##### `authorizer`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.ThingGroupApiProps.property.authorizer"></a>

- *Type:* [`@aws-cdk/aws-apigateway.IAuthorizer`](#@aws-cdk/aws-apigateway.IAuthorizer)
- *Default:* undefined

Specify API Gateway's authorizer, CognitoUserPool/Lambda.

---

### ThingTypeApiProps <a name="@softchef/cdk-iot-device-management.ThingTypeApiProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { ThingTypeApiProps } from '@softchef/cdk-iot-device-management'

const thingTypeApiProps: ThingTypeApiProps = { ... }
```

##### `authorizationType`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.ThingTypeApiProps.property.authorizationType"></a>

- *Type:* [`@aws-cdk/aws-apigateway.AuthorizationType`](#@aws-cdk/aws-apigateway.AuthorizationType)
- *Default:* apigateway.AuthorizationType.NONE

Specify API Gateway all resources's authorization type, COGNTIO/IAM/CUSTOM/NONE.

---

##### `authorizer`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.ThingTypeApiProps.property.authorizer"></a>

- *Type:* [`@aws-cdk/aws-apigateway.IAuthorizer`](#@aws-cdk/aws-apigateway.IAuthorizer)
- *Default:* undefined

Specify API Gateway's authorizer, CognitoUserPool/Lambda.

---



