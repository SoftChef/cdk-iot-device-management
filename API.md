# API Reference <a name="API Reference"></a>

## Constructs <a name="Constructs"></a>

### FileApi <a name="@softchef/cdk-iot-device-management.FileApi"></a>

#### Initializers <a name="@softchef/cdk-iot-device-management.FileApi.Initializer"></a>

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

##### `categoryTable`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.FileApi.property.categoryTable"></a>

```typescript
public readonly categoryTable: Table;
```

- *Type:* [`@aws-cdk/aws-dynamodb.Table`](#@aws-cdk/aws-dynamodb.Table)

The category table.

---

##### `fileTable`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.FileApi.property.fileTable"></a>

```typescript
public readonly fileTable: Table;
```

- *Type:* [`@aws-cdk/aws-dynamodb.Table`](#@aws-cdk/aws-dynamodb.Table)

The file table.

---

##### `restApiId`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.FileApi.property.restApiId"></a>

```typescript
public readonly restApiId: string;
```

- *Type:* `string`

---


### JobApi <a name="@softchef/cdk-iot-device-management.JobApi"></a>

#### Initializers <a name="@softchef/cdk-iot-device-management.JobApi.Initializer"></a>

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

```typescript
public readonly restApiId: string;
```

- *Type:* `string`

---


### ThingApi <a name="@softchef/cdk-iot-device-management.ThingApi"></a>

#### Initializers <a name="@softchef/cdk-iot-device-management.ThingApi.Initializer"></a>

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

```typescript
public readonly restApiId: string;
```

- *Type:* `string`

---


### ThingGroupApi <a name="@softchef/cdk-iot-device-management.ThingGroupApi"></a>

#### Initializers <a name="@softchef/cdk-iot-device-management.ThingGroupApi.Initializer"></a>

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

```typescript
public readonly restApiId: string;
```

- *Type:* `string`

---


### ThingTypeApi <a name="@softchef/cdk-iot-device-management.ThingTypeApi"></a>

#### Initializers <a name="@softchef/cdk-iot-device-management.ThingTypeApi.Initializer"></a>

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

```typescript
public readonly restApiId: string;
```

- *Type:* `string`

---


## Structs <a name="Structs"></a>

### Capacity <a name="@softchef/cdk-iot-device-management.Capacity"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { Capacity } from '@softchef/cdk-iot-device-management'

const capacity: Capacity = { ... }
```

##### `readCapacity`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.Capacity.property.readCapacity"></a>

```typescript
public readonly readCapacity: number;
```

- *Type:* `number`

---

##### `writeCapacity`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.Capacity.property.writeCapacity"></a>

```typescript
public readonly writeCapacity: number;
```

- *Type:* `number`

---

### CategoryTableConfig <a name="@softchef/cdk-iot-device-management.CategoryTableConfig"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { CategoryTableConfig } from '@softchef/cdk-iot-device-management'

const categoryTableConfig: CategoryTableConfig = { ... }
```

##### `indexQueryByParentId`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.CategoryTableConfig.property.indexQueryByParentId"></a>

```typescript
public readonly indexQueryByParentId: Capacity;
```

- *Type:* [`@softchef/cdk-iot-device-management.Capacity`](#@softchef/cdk-iot-device-management.Capacity)

---

##### `primaryIndex`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.CategoryTableConfig.property.primaryIndex"></a>

```typescript
public readonly primaryIndex: Capacity;
```

- *Type:* [`@softchef/cdk-iot-device-management.Capacity`](#@softchef/cdk-iot-device-management.Capacity)

---

### FileApiProps <a name="@softchef/cdk-iot-device-management.FileApiProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { FileApiProps } from '@softchef/cdk-iot-device-management'

const fileApiProps: FileApiProps = { ... }
```

##### `authorizationType`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.FileApiProps.property.authorizationType"></a>

```typescript
public readonly authorizationType: AuthorizationType;
```

- *Type:* [`@aws-cdk/aws-apigateway.AuthorizationType`](#@aws-cdk/aws-apigateway.AuthorizationType)
- *Default:* apigateway.AuthorizationType.NONE

Specify API Gateway all resources's authorization type, COGNTIO/IAM/CUSTOM/NONE.

---

##### `authorizer`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.FileApiProps.property.authorizer"></a>

```typescript
public readonly authorizer: IAuthorizer;
```

- *Type:* [`@aws-cdk/aws-apigateway.IAuthorizer`](#@aws-cdk/aws-apigateway.IAuthorizer)
- *Default:* undefined

Specify API Gateway's authorizer, CognitoUserPool/Lambda.

---

##### `categoryTableConfig`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.FileApiProps.property.categoryTableConfig"></a>

```typescript
public readonly categoryTableConfig: CategoryTableConfig;
```

- *Type:* [`@softchef/cdk-iot-device-management.CategoryTableConfig`](#@softchef/cdk-iot-device-management.CategoryTableConfig)
- *Default:* undefined

Category Table Configuration,.

---

##### `fileTableConfig`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.FileApiProps.property.fileTableConfig"></a>

```typescript
public readonly fileTableConfig: FileTableConfig;
```

- *Type:* [`@softchef/cdk-iot-device-management.FileTableConfig`](#@softchef/cdk-iot-device-management.FileTableConfig)
- *Default:* undefined

File Table Configuration,.

---

### FileTableConfig <a name="@softchef/cdk-iot-device-management.FileTableConfig"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { FileTableConfig } from '@softchef/cdk-iot-device-management'

const fileTableConfig: FileTableConfig = { ... }
```

##### `indexGetFileByChecksumAndVersion`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.FileTableConfig.property.indexGetFileByChecksumAndVersion"></a>

```typescript
public readonly indexGetFileByChecksumAndVersion: Capacity;
```

- *Type:* [`@softchef/cdk-iot-device-management.Capacity`](#@softchef/cdk-iot-device-management.Capacity)

---

##### `indexQueryByCategoryIdAndLocale`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.FileTableConfig.property.indexQueryByCategoryIdAndLocale"></a>

```typescript
public readonly indexQueryByCategoryIdAndLocale: Capacity;
```

- *Type:* [`@softchef/cdk-iot-device-management.Capacity`](#@softchef/cdk-iot-device-management.Capacity)

---

##### `primaryIndex`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.FileTableConfig.property.primaryIndex"></a>

```typescript
public readonly primaryIndex: Capacity;
```

- *Type:* [`@softchef/cdk-iot-device-management.Capacity`](#@softchef/cdk-iot-device-management.Capacity)

---

### JobApiProps <a name="@softchef/cdk-iot-device-management.JobApiProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { JobApiProps } from '@softchef/cdk-iot-device-management'

const jobApiProps: JobApiProps = { ... }
```

##### `authorizationType`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.JobApiProps.property.authorizationType"></a>

```typescript
public readonly authorizationType: AuthorizationType;
```

- *Type:* [`@aws-cdk/aws-apigateway.AuthorizationType`](#@aws-cdk/aws-apigateway.AuthorizationType)
- *Default:* apigateway.AuthorizationType.NONE

Specify API Gateway all resources's authorization type, COGNTIO/IAM/CUSTOM/NONE.

---

##### `authorizer`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.JobApiProps.property.authorizer"></a>

```typescript
public readonly authorizer: IAuthorizer;
```

- *Type:* [`@aws-cdk/aws-apigateway.IAuthorizer`](#@aws-cdk/aws-apigateway.IAuthorizer)
- *Default:* undefined

Specify API Gateway's authorizer, CognitoUserPool/Lambda.

---

##### `scheduleFunction`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.JobApiProps.property.scheduleFunction"></a>

```typescript
public readonly scheduleFunction: any;
```

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

```typescript
public readonly authorizationType: AuthorizationType;
```

- *Type:* [`@aws-cdk/aws-apigateway.AuthorizationType`](#@aws-cdk/aws-apigateway.AuthorizationType)
- *Default:* apigateway.AuthorizationType.NONE

Specify API Gateway all resources's authorization type, COGNTIO/IAM/CUSTOM/NONE.

---

##### `authorizer`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.ThingApiProps.property.authorizer"></a>

```typescript
public readonly authorizer: IAuthorizer;
```

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

```typescript
public readonly authorizationType: AuthorizationType;
```

- *Type:* [`@aws-cdk/aws-apigateway.AuthorizationType`](#@aws-cdk/aws-apigateway.AuthorizationType)
- *Default:* apigateway.AuthorizationType.NONE

Specify API Gateway all resources's authorization type, COGNTIO/IAM/CUSTOM/NONE.

---

##### `authorizer`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.ThingGroupApiProps.property.authorizer"></a>

```typescript
public readonly authorizer: IAuthorizer;
```

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

```typescript
public readonly authorizationType: AuthorizationType;
```

- *Type:* [`@aws-cdk/aws-apigateway.AuthorizationType`](#@aws-cdk/aws-apigateway.AuthorizationType)
- *Default:* apigateway.AuthorizationType.NONE

Specify API Gateway all resources's authorization type, COGNTIO/IAM/CUSTOM/NONE.

---

##### `authorizer`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.ThingTypeApiProps.property.authorizer"></a>

```typescript
public readonly authorizer: IAuthorizer;
```

- *Type:* [`@aws-cdk/aws-apigateway.IAuthorizer`](#@aws-cdk/aws-apigateway.IAuthorizer)
- *Default:* undefined

Specify API Gateway's authorizer, CognitoUserPool/Lambda.

---



