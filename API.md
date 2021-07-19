# API Reference <a name="API Reference"></a>

## Constructs <a name="Constructs"></a>

### FileApi <a name="@softchef/cdk-iot-device-management.FileApi"></a>

#### Initializer <a name="@softchef/cdk-iot-device-management.FileApi.Initializer"></a>

```typescript
import { FileApi } from '@softchef/cdk-iot-device-management'

new FileApi(scope: Construct, id: string, props?: FileApiProps)
```

##### `scope`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.FileApi.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.FileApi.id"></a>

- *Type:* `string`

---

##### `props`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.FileApi.props"></a>

- *Type:* [`@softchef/cdk-iot-device-management.FileApiProps`](#@softchef/cdk-iot-device-management.FileApiProps)

---



#### Properties <a name="Properties"></a>

##### `restApiId`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.FileApi.restApiId"></a>

- *Type:* `string`

---


### JobApi <a name="@softchef/cdk-iot-device-management.JobApi"></a>

#### Initializer <a name="@softchef/cdk-iot-device-management.JobApi.Initializer"></a>

```typescript
import { JobApi } from '@softchef/cdk-iot-device-management'

new JobApi(scope: Construct, id: string, props?: JobApiProps)
```

##### `scope`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.JobApi.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.JobApi.id"></a>

- *Type:* `string`

---

##### `props`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.JobApi.props"></a>

- *Type:* [`@softchef/cdk-iot-device-management.JobApiProps`](#@softchef/cdk-iot-device-management.JobApiProps)

---



#### Properties <a name="Properties"></a>

##### `restApiId`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.JobApi.restApiId"></a>

- *Type:* `string`

---


### ThingApi <a name="@softchef/cdk-iot-device-management.ThingApi"></a>

#### Initializer <a name="@softchef/cdk-iot-device-management.ThingApi.Initializer"></a>

```typescript
import { ThingApi } from '@softchef/cdk-iot-device-management'

new ThingApi(scope: Construct, id: string, props?: ThingApiProps)
```

##### `scope`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.ThingApi.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.ThingApi.id"></a>

- *Type:* `string`

---

##### `props`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.ThingApi.props"></a>

- *Type:* [`@softchef/cdk-iot-device-management.ThingApiProps`](#@softchef/cdk-iot-device-management.ThingApiProps)

---



#### Properties <a name="Properties"></a>

##### `restApiId`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.ThingApi.restApiId"></a>

- *Type:* `string`

---


### ThingGroupApi <a name="@softchef/cdk-iot-device-management.ThingGroupApi"></a>

#### Initializer <a name="@softchef/cdk-iot-device-management.ThingGroupApi.Initializer"></a>

```typescript
import { ThingGroupApi } from '@softchef/cdk-iot-device-management'

new ThingGroupApi(scope: Construct, id: string, props?: ThingGroupApiProps)
```

##### `scope`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.ThingGroupApi.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.ThingGroupApi.id"></a>

- *Type:* `string`

---

##### `props`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.ThingGroupApi.props"></a>

- *Type:* [`@softchef/cdk-iot-device-management.ThingGroupApiProps`](#@softchef/cdk-iot-device-management.ThingGroupApiProps)

---



#### Properties <a name="Properties"></a>

##### `restApiId`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.ThingGroupApi.restApiId"></a>

- *Type:* `string`

---


### ThingTypeApi <a name="@softchef/cdk-iot-device-management.ThingTypeApi"></a>

#### Initializer <a name="@softchef/cdk-iot-device-management.ThingTypeApi.Initializer"></a>

```typescript
import { ThingTypeApi } from '@softchef/cdk-iot-device-management'

new ThingTypeApi(scope: Construct, id: string, props?: ThingTypeApiProps)
```

##### `scope`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.ThingTypeApi.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.ThingTypeApi.id"></a>

- *Type:* `string`

---

##### `props`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.ThingTypeApi.props"></a>

- *Type:* [`@softchef/cdk-iot-device-management.ThingTypeApiProps`](#@softchef/cdk-iot-device-management.ThingTypeApiProps)

---



#### Properties <a name="Properties"></a>

##### `restApiId`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.ThingTypeApi.restApiId"></a>

- *Type:* `string`

---


## Structs <a name="Structs"></a>

### FileApiProps <a name="@softchef/cdk-iot-device-management.FileApiProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { FileApiProps } from '@softchef/cdk-iot-device-management'

const fileApiProps: FileApiProps = { ... }
```

##### `authorizationType`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.FileApiProps.authorizationType"></a>

- *Type:* [`@aws-cdk/aws-apigateway.AuthorizationType`](#@aws-cdk/aws-apigateway.AuthorizationType)

---

##### `authorizer`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.FileApiProps.authorizer"></a>

- *Type:* [`@aws-cdk/aws-apigateway.IAuthorizer`](#@aws-cdk/aws-apigateway.IAuthorizer)

---

### JobApiProps <a name="@softchef/cdk-iot-device-management.JobApiProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { JobApiProps } from '@softchef/cdk-iot-device-management'

const jobApiProps: JobApiProps = { ... }
```

##### `authorizationType`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.JobApiProps.authorizationType"></a>

- *Type:* [`@aws-cdk/aws-apigateway.AuthorizationType`](#@aws-cdk/aws-apigateway.AuthorizationType)

---

##### `authorizer`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.JobApiProps.authorizer"></a>

- *Type:* [`@aws-cdk/aws-apigateway.IAuthorizer`](#@aws-cdk/aws-apigateway.IAuthorizer)

---

### ThingApiProps <a name="@softchef/cdk-iot-device-management.ThingApiProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { ThingApiProps } from '@softchef/cdk-iot-device-management'

const thingApiProps: ThingApiProps = { ... }
```

##### `authorizationType`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.ThingApiProps.authorizationType"></a>

- *Type:* [`@aws-cdk/aws-apigateway.AuthorizationType`](#@aws-cdk/aws-apigateway.AuthorizationType)

---

##### `authorizer`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.ThingApiProps.authorizer"></a>

- *Type:* [`@aws-cdk/aws-apigateway.IAuthorizer`](#@aws-cdk/aws-apigateway.IAuthorizer)

---

### ThingGroupApiProps <a name="@softchef/cdk-iot-device-management.ThingGroupApiProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { ThingGroupApiProps } from '@softchef/cdk-iot-device-management'

const thingGroupApiProps: ThingGroupApiProps = { ... }
```

##### `authorizationType`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.ThingGroupApiProps.authorizationType"></a>

- *Type:* [`@aws-cdk/aws-apigateway.AuthorizationType`](#@aws-cdk/aws-apigateway.AuthorizationType)

---

##### `authorizer`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.ThingGroupApiProps.authorizer"></a>

- *Type:* [`@aws-cdk/aws-apigateway.IAuthorizer`](#@aws-cdk/aws-apigateway.IAuthorizer)

---

### ThingTypeApiProps <a name="@softchef/cdk-iot-device-management.ThingTypeApiProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { ThingTypeApiProps } from '@softchef/cdk-iot-device-management'

const thingTypeApiProps: ThingTypeApiProps = { ... }
```

##### `authorizationType`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.ThingTypeApiProps.authorizationType"></a>

- *Type:* [`@aws-cdk/aws-apigateway.AuthorizationType`](#@aws-cdk/aws-apigateway.AuthorizationType)

---

##### `authorizer`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.ThingTypeApiProps.authorizer"></a>

- *Type:* [`@aws-cdk/aws-apigateway.IAuthorizer`](#@aws-cdk/aws-apigateway.IAuthorizer)

---



