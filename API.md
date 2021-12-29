# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="constructs"></a>

### FileApi <a name="@softchef/cdk-iot-device-management.FileApi" id="softchefcdkiotdevicemanagementfileapi"></a>

#### Initializers <a name="@softchef/cdk-iot-device-management.FileApi.Initializer" id="softchefcdkiotdevicemanagementfileapiinitializer"></a>

```typescript
import { FileApi } from '@softchef/cdk-iot-device-management'

new FileApi(scope: Construct, id: string, props?: FileApiProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`scope`](#softchefcdkiotdevicemanagementfileapiparameterscope)<span title="Required">*</span> | [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct) | *No description.* |
| [`id`](#softchefcdkiotdevicemanagementfileapiparameterid)<span title="Required">*</span> | `string` | *No description.* |
| [`props`](#softchefcdkiotdevicemanagementfileapiparameterprops) | [`@softchef/cdk-iot-device-management.FileApiProps`](#@softchef/cdk-iot-device-management.FileApiProps) | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.FileApi.parameter.scope" id="softchefcdkiotdevicemanagementfileapiparameterscope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.FileApi.parameter.id" id="softchefcdkiotdevicemanagementfileapiparameterid"></a>

- *Type:* `string`

---

##### `props`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.FileApi.parameter.props" id="softchefcdkiotdevicemanagementfileapiparameterprops"></a>

- *Type:* [`@softchef/cdk-iot-device-management.FileApiProps`](#@softchef/cdk-iot-device-management.FileApiProps)

---



#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`categoryTable`](#softchefcdkiotdevicemanagementfileapipropertycategorytable)<span title="Required">*</span> | [`@aws-cdk/aws-dynamodb.Table`](#@aws-cdk/aws-dynamodb.Table) | The category table. |
| [`fileTable`](#softchefcdkiotdevicemanagementfileapipropertyfiletable)<span title="Required">*</span> | [`@aws-cdk/aws-dynamodb.Table`](#@aws-cdk/aws-dynamodb.Table) | The file table. |
| [`restApiId`](#softchefcdkiotdevicemanagementfileapipropertyrestapiid)<span title="Required">*</span> | `string` | *No description.* |

---

##### `categoryTable`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.FileApi.property.categoryTable" id="softchefcdkiotdevicemanagementfileapipropertycategorytable"></a>

```typescript
public readonly categoryTable: Table;
```

- *Type:* [`@aws-cdk/aws-dynamodb.Table`](#@aws-cdk/aws-dynamodb.Table)

The category table.

---

##### `fileTable`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.FileApi.property.fileTable" id="softchefcdkiotdevicemanagementfileapipropertyfiletable"></a>

```typescript
public readonly fileTable: Table;
```

- *Type:* [`@aws-cdk/aws-dynamodb.Table`](#@aws-cdk/aws-dynamodb.Table)

The file table.

---

##### `restApiId`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.FileApi.property.restApiId" id="softchefcdkiotdevicemanagementfileapipropertyrestapiid"></a>

```typescript
public readonly restApiId: string;
```

- *Type:* `string`

---


### JobApi <a name="@softchef/cdk-iot-device-management.JobApi" id="softchefcdkiotdevicemanagementjobapi"></a>

#### Initializers <a name="@softchef/cdk-iot-device-management.JobApi.Initializer" id="softchefcdkiotdevicemanagementjobapiinitializer"></a>

```typescript
import { JobApi } from '@softchef/cdk-iot-device-management'

new JobApi(scope: Construct, id: string, props?: JobApiProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`scope`](#softchefcdkiotdevicemanagementjobapiparameterscope)<span title="Required">*</span> | [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct) | *No description.* |
| [`id`](#softchefcdkiotdevicemanagementjobapiparameterid)<span title="Required">*</span> | `string` | *No description.* |
| [`props`](#softchefcdkiotdevicemanagementjobapiparameterprops) | [`@softchef/cdk-iot-device-management.JobApiProps`](#@softchef/cdk-iot-device-management.JobApiProps) | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.JobApi.parameter.scope" id="softchefcdkiotdevicemanagementjobapiparameterscope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.JobApi.parameter.id" id="softchefcdkiotdevicemanagementjobapiparameterid"></a>

- *Type:* `string`

---

##### `props`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.JobApi.parameter.props" id="softchefcdkiotdevicemanagementjobapiparameterprops"></a>

- *Type:* [`@softchef/cdk-iot-device-management.JobApiProps`](#@softchef/cdk-iot-device-management.JobApiProps)

---



#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`restApiId`](#softchefcdkiotdevicemanagementjobapipropertyrestapiid)<span title="Required">*</span> | `string` | *No description.* |

---

##### `restApiId`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.JobApi.property.restApiId" id="softchefcdkiotdevicemanagementjobapipropertyrestapiid"></a>

```typescript
public readonly restApiId: string;
```

- *Type:* `string`

---


### ThingApi <a name="@softchef/cdk-iot-device-management.ThingApi" id="softchefcdkiotdevicemanagementthingapi"></a>

#### Initializers <a name="@softchef/cdk-iot-device-management.ThingApi.Initializer" id="softchefcdkiotdevicemanagementthingapiinitializer"></a>

```typescript
import { ThingApi } from '@softchef/cdk-iot-device-management'

new ThingApi(scope: Construct, id: string, props?: ThingApiProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`scope`](#softchefcdkiotdevicemanagementthingapiparameterscope)<span title="Required">*</span> | [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct) | *No description.* |
| [`id`](#softchefcdkiotdevicemanagementthingapiparameterid)<span title="Required">*</span> | `string` | *No description.* |
| [`props`](#softchefcdkiotdevicemanagementthingapiparameterprops) | [`@softchef/cdk-iot-device-management.ThingApiProps`](#@softchef/cdk-iot-device-management.ThingApiProps) | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.ThingApi.parameter.scope" id="softchefcdkiotdevicemanagementthingapiparameterscope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.ThingApi.parameter.id" id="softchefcdkiotdevicemanagementthingapiparameterid"></a>

- *Type:* `string`

---

##### `props`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.ThingApi.parameter.props" id="softchefcdkiotdevicemanagementthingapiparameterprops"></a>

- *Type:* [`@softchef/cdk-iot-device-management.ThingApiProps`](#@softchef/cdk-iot-device-management.ThingApiProps)

---



#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`restApiId`](#softchefcdkiotdevicemanagementthingapipropertyrestapiid)<span title="Required">*</span> | `string` | *No description.* |

---

##### `restApiId`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.ThingApi.property.restApiId" id="softchefcdkiotdevicemanagementthingapipropertyrestapiid"></a>

```typescript
public readonly restApiId: string;
```

- *Type:* `string`

---


### ThingGroupApi <a name="@softchef/cdk-iot-device-management.ThingGroupApi" id="softchefcdkiotdevicemanagementthinggroupapi"></a>

#### Initializers <a name="@softchef/cdk-iot-device-management.ThingGroupApi.Initializer" id="softchefcdkiotdevicemanagementthinggroupapiinitializer"></a>

```typescript
import { ThingGroupApi } from '@softchef/cdk-iot-device-management'

new ThingGroupApi(scope: Construct, id: string, props?: ThingGroupApiProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`scope`](#softchefcdkiotdevicemanagementthinggroupapiparameterscope)<span title="Required">*</span> | [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct) | *No description.* |
| [`id`](#softchefcdkiotdevicemanagementthinggroupapiparameterid)<span title="Required">*</span> | `string` | *No description.* |
| [`props`](#softchefcdkiotdevicemanagementthinggroupapiparameterprops) | [`@softchef/cdk-iot-device-management.ThingGroupApiProps`](#@softchef/cdk-iot-device-management.ThingGroupApiProps) | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.ThingGroupApi.parameter.scope" id="softchefcdkiotdevicemanagementthinggroupapiparameterscope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.ThingGroupApi.parameter.id" id="softchefcdkiotdevicemanagementthinggroupapiparameterid"></a>

- *Type:* `string`

---

##### `props`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.ThingGroupApi.parameter.props" id="softchefcdkiotdevicemanagementthinggroupapiparameterprops"></a>

- *Type:* [`@softchef/cdk-iot-device-management.ThingGroupApiProps`](#@softchef/cdk-iot-device-management.ThingGroupApiProps)

---



#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`restApiId`](#softchefcdkiotdevicemanagementthinggroupapipropertyrestapiid)<span title="Required">*</span> | `string` | *No description.* |

---

##### `restApiId`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.ThingGroupApi.property.restApiId" id="softchefcdkiotdevicemanagementthinggroupapipropertyrestapiid"></a>

```typescript
public readonly restApiId: string;
```

- *Type:* `string`

---


### ThingTypeApi <a name="@softchef/cdk-iot-device-management.ThingTypeApi" id="softchefcdkiotdevicemanagementthingtypeapi"></a>

#### Initializers <a name="@softchef/cdk-iot-device-management.ThingTypeApi.Initializer" id="softchefcdkiotdevicemanagementthingtypeapiinitializer"></a>

```typescript
import { ThingTypeApi } from '@softchef/cdk-iot-device-management'

new ThingTypeApi(scope: Construct, id: string, props?: ThingTypeApiProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`scope`](#softchefcdkiotdevicemanagementthingtypeapiparameterscope)<span title="Required">*</span> | [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct) | *No description.* |
| [`id`](#softchefcdkiotdevicemanagementthingtypeapiparameterid)<span title="Required">*</span> | `string` | *No description.* |
| [`props`](#softchefcdkiotdevicemanagementthingtypeapiparameterprops) | [`@softchef/cdk-iot-device-management.ThingTypeApiProps`](#@softchef/cdk-iot-device-management.ThingTypeApiProps) | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.ThingTypeApi.parameter.scope" id="softchefcdkiotdevicemanagementthingtypeapiparameterscope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.ThingTypeApi.parameter.id" id="softchefcdkiotdevicemanagementthingtypeapiparameterid"></a>

- *Type:* `string`

---

##### `props`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.ThingTypeApi.parameter.props" id="softchefcdkiotdevicemanagementthingtypeapiparameterprops"></a>

- *Type:* [`@softchef/cdk-iot-device-management.ThingTypeApiProps`](#@softchef/cdk-iot-device-management.ThingTypeApiProps)

---



#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`restApiId`](#softchefcdkiotdevicemanagementthingtypeapipropertyrestapiid)<span title="Required">*</span> | `string` | *No description.* |

---

##### `restApiId`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.ThingTypeApi.property.restApiId" id="softchefcdkiotdevicemanagementthingtypeapipropertyrestapiid"></a>

```typescript
public readonly restApiId: string;
```

- *Type:* `string`

---


## Structs <a name="Structs" id="structs"></a>

### Capacity <a name="@softchef/cdk-iot-device-management.Capacity" id="softchefcdkiotdevicemanagementcapacity"></a>

#### Initializer <a name="[object Object].Initializer" id="object-objectinitializer"></a>

```typescript
import { Capacity } from '@softchef/cdk-iot-device-management'

const capacity: Capacity = { ... }
```

#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`readCapacity`](#softchefcdkiotdevicemanagementcapacitypropertyreadcapacity) | `number` | *No description.* |
| [`writeCapacity`](#softchefcdkiotdevicemanagementcapacitypropertywritecapacity) | `number` | *No description.* |

---

##### `readCapacity`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.Capacity.property.readCapacity" id="softchefcdkiotdevicemanagementcapacitypropertyreadcapacity"></a>

```typescript
public readonly readCapacity: number;
```

- *Type:* `number`

---

##### `writeCapacity`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.Capacity.property.writeCapacity" id="softchefcdkiotdevicemanagementcapacitypropertywritecapacity"></a>

```typescript
public readonly writeCapacity: number;
```

- *Type:* `number`

---

### CategoryTableConfig <a name="@softchef/cdk-iot-device-management.CategoryTableConfig" id="softchefcdkiotdevicemanagementcategorytableconfig"></a>

#### Initializer <a name="[object Object].Initializer" id="object-objectinitializer"></a>

```typescript
import { CategoryTableConfig } from '@softchef/cdk-iot-device-management'

const categoryTableConfig: CategoryTableConfig = { ... }
```

#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`indexQueryByParentId`](#softchefcdkiotdevicemanagementcategorytableconfigpropertyindexquerybyparentid)<span title="Required">*</span> | [`@softchef/cdk-iot-device-management.Capacity`](#@softchef/cdk-iot-device-management.Capacity) | *No description.* |
| [`primaryIndex`](#softchefcdkiotdevicemanagementcategorytableconfigpropertyprimaryindex)<span title="Required">*</span> | [`@softchef/cdk-iot-device-management.Capacity`](#@softchef/cdk-iot-device-management.Capacity) | *No description.* |

---

##### `indexQueryByParentId`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.CategoryTableConfig.property.indexQueryByParentId" id="softchefcdkiotdevicemanagementcategorytableconfigpropertyindexquerybyparentid"></a>

```typescript
public readonly indexQueryByParentId: Capacity;
```

- *Type:* [`@softchef/cdk-iot-device-management.Capacity`](#@softchef/cdk-iot-device-management.Capacity)

---

##### `primaryIndex`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.CategoryTableConfig.property.primaryIndex" id="softchefcdkiotdevicemanagementcategorytableconfigpropertyprimaryindex"></a>

```typescript
public readonly primaryIndex: Capacity;
```

- *Type:* [`@softchef/cdk-iot-device-management.Capacity`](#@softchef/cdk-iot-device-management.Capacity)

---

### FileApiProps <a name="@softchef/cdk-iot-device-management.FileApiProps" id="softchefcdkiotdevicemanagementfileapiprops"></a>

#### Initializer <a name="[object Object].Initializer" id="object-objectinitializer"></a>

```typescript
import { FileApiProps } from '@softchef/cdk-iot-device-management'

const fileApiProps: FileApiProps = { ... }
```

#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`authorizationType`](#softchefcdkiotdevicemanagementfileapipropspropertyauthorizationtype) | [`@aws-cdk/aws-apigateway.AuthorizationType`](#@aws-cdk/aws-apigateway.AuthorizationType) | Specify API Gateway all resources's authorization type, COGNTIO/IAM/CUSTOM/NONE. |
| [`authorizer`](#softchefcdkiotdevicemanagementfileapipropspropertyauthorizer) | [`@aws-cdk/aws-apigateway.IAuthorizer`](#@aws-cdk/aws-apigateway.IAuthorizer) | Specify API Gateway's authorizer, CognitoUserPool/Lambda. |
| [`categoryTableConfig`](#softchefcdkiotdevicemanagementfileapipropspropertycategorytableconfig) | [`@softchef/cdk-iot-device-management.CategoryTableConfig`](#@softchef/cdk-iot-device-management.CategoryTableConfig) | Category Table Configuration,. |
| [`fileTableConfig`](#softchefcdkiotdevicemanagementfileapipropspropertyfiletableconfig) | [`@softchef/cdk-iot-device-management.FileTableConfig`](#@softchef/cdk-iot-device-management.FileTableConfig) | File Table Configuration,. |

---

##### `authorizationType`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.FileApiProps.property.authorizationType" id="softchefcdkiotdevicemanagementfileapipropspropertyauthorizationtype"></a>

```typescript
public readonly authorizationType: AuthorizationType;
```

- *Type:* [`@aws-cdk/aws-apigateway.AuthorizationType`](#@aws-cdk/aws-apigateway.AuthorizationType)
- *Default:* apigateway.AuthorizationType.NONE

Specify API Gateway all resources's authorization type, COGNTIO/IAM/CUSTOM/NONE.

---

##### `authorizer`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.FileApiProps.property.authorizer" id="softchefcdkiotdevicemanagementfileapipropspropertyauthorizer"></a>

```typescript
public readonly authorizer: IAuthorizer;
```

- *Type:* [`@aws-cdk/aws-apigateway.IAuthorizer`](#@aws-cdk/aws-apigateway.IAuthorizer)
- *Default:* undefined

Specify API Gateway's authorizer, CognitoUserPool/Lambda.

---

##### `categoryTableConfig`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.FileApiProps.property.categoryTableConfig" id="softchefcdkiotdevicemanagementfileapipropspropertycategorytableconfig"></a>

```typescript
public readonly categoryTableConfig: CategoryTableConfig;
```

- *Type:* [`@softchef/cdk-iot-device-management.CategoryTableConfig`](#@softchef/cdk-iot-device-management.CategoryTableConfig)
- *Default:* undefined

Category Table Configuration,.

---

##### `fileTableConfig`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.FileApiProps.property.fileTableConfig" id="softchefcdkiotdevicemanagementfileapipropspropertyfiletableconfig"></a>

```typescript
public readonly fileTableConfig: FileTableConfig;
```

- *Type:* [`@softchef/cdk-iot-device-management.FileTableConfig`](#@softchef/cdk-iot-device-management.FileTableConfig)
- *Default:* undefined

File Table Configuration,.

---

### FileTableConfig <a name="@softchef/cdk-iot-device-management.FileTableConfig" id="softchefcdkiotdevicemanagementfiletableconfig"></a>

#### Initializer <a name="[object Object].Initializer" id="object-objectinitializer"></a>

```typescript
import { FileTableConfig } from '@softchef/cdk-iot-device-management'

const fileTableConfig: FileTableConfig = { ... }
```

#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`indexGetFileByChecksumAndVersion`](#softchefcdkiotdevicemanagementfiletableconfigpropertyindexgetfilebychecksumandversion)<span title="Required">*</span> | [`@softchef/cdk-iot-device-management.Capacity`](#@softchef/cdk-iot-device-management.Capacity) | *No description.* |
| [`indexQueryByCategoryIdAndLocale`](#softchefcdkiotdevicemanagementfiletableconfigpropertyindexquerybycategoryidandlocale)<span title="Required">*</span> | [`@softchef/cdk-iot-device-management.Capacity`](#@softchef/cdk-iot-device-management.Capacity) | *No description.* |
| [`primaryIndex`](#softchefcdkiotdevicemanagementfiletableconfigpropertyprimaryindex)<span title="Required">*</span> | [`@softchef/cdk-iot-device-management.Capacity`](#@softchef/cdk-iot-device-management.Capacity) | *No description.* |

---

##### `indexGetFileByChecksumAndVersion`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.FileTableConfig.property.indexGetFileByChecksumAndVersion" id="softchefcdkiotdevicemanagementfiletableconfigpropertyindexgetfilebychecksumandversion"></a>

```typescript
public readonly indexGetFileByChecksumAndVersion: Capacity;
```

- *Type:* [`@softchef/cdk-iot-device-management.Capacity`](#@softchef/cdk-iot-device-management.Capacity)

---

##### `indexQueryByCategoryIdAndLocale`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.FileTableConfig.property.indexQueryByCategoryIdAndLocale" id="softchefcdkiotdevicemanagementfiletableconfigpropertyindexquerybycategoryidandlocale"></a>

```typescript
public readonly indexQueryByCategoryIdAndLocale: Capacity;
```

- *Type:* [`@softchef/cdk-iot-device-management.Capacity`](#@softchef/cdk-iot-device-management.Capacity)

---

##### `primaryIndex`<sup>Required</sup> <a name="@softchef/cdk-iot-device-management.FileTableConfig.property.primaryIndex" id="softchefcdkiotdevicemanagementfiletableconfigpropertyprimaryindex"></a>

```typescript
public readonly primaryIndex: Capacity;
```

- *Type:* [`@softchef/cdk-iot-device-management.Capacity`](#@softchef/cdk-iot-device-management.Capacity)

---

### JobApiProps <a name="@softchef/cdk-iot-device-management.JobApiProps" id="softchefcdkiotdevicemanagementjobapiprops"></a>

#### Initializer <a name="[object Object].Initializer" id="object-objectinitializer"></a>

```typescript
import { JobApiProps } from '@softchef/cdk-iot-device-management'

const jobApiProps: JobApiProps = { ... }
```

#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`authorizationType`](#softchefcdkiotdevicemanagementjobapipropspropertyauthorizationtype) | [`@aws-cdk/aws-apigateway.AuthorizationType`](#@aws-cdk/aws-apigateway.AuthorizationType) | Specify API Gateway all resources's authorization type, COGNTIO/IAM/CUSTOM/NONE. |
| [`authorizer`](#softchefcdkiotdevicemanagementjobapipropspropertyauthorizer) | [`@aws-cdk/aws-apigateway.IAuthorizer`](#@aws-cdk/aws-apigateway.IAuthorizer) | Specify API Gateway's authorizer, CognitoUserPool/Lambda. |
| [`scheduleFunction`](#softchefcdkiotdevicemanagementjobapipropspropertyschedulefunction) | `any` | Specify Schedule Function to enable create schedule job function. |

---

##### `authorizationType`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.JobApiProps.property.authorizationType" id="softchefcdkiotdevicemanagementjobapipropspropertyauthorizationtype"></a>

```typescript
public readonly authorizationType: AuthorizationType;
```

- *Type:* [`@aws-cdk/aws-apigateway.AuthorizationType`](#@aws-cdk/aws-apigateway.AuthorizationType)
- *Default:* apigateway.AuthorizationType.NONE

Specify API Gateway all resources's authorization type, COGNTIO/IAM/CUSTOM/NONE.

---

##### `authorizer`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.JobApiProps.property.authorizer" id="softchefcdkiotdevicemanagementjobapipropspropertyauthorizer"></a>

```typescript
public readonly authorizer: IAuthorizer;
```

- *Type:* [`@aws-cdk/aws-apigateway.IAuthorizer`](#@aws-cdk/aws-apigateway.IAuthorizer)
- *Default:* undefined

Specify API Gateway's authorizer, CognitoUserPool/Lambda.

---

##### `scheduleFunction`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.JobApiProps.property.scheduleFunction" id="softchefcdkiotdevicemanagementjobapipropspropertyschedulefunction"></a>

```typescript
public readonly scheduleFunction: any;
```

- *Type:* `any`
- *Default:* undefined

Specify Schedule Function to enable create schedule job function.

---

### ThingApiProps <a name="@softchef/cdk-iot-device-management.ThingApiProps" id="softchefcdkiotdevicemanagementthingapiprops"></a>

#### Initializer <a name="[object Object].Initializer" id="object-objectinitializer"></a>

```typescript
import { ThingApiProps } from '@softchef/cdk-iot-device-management'

const thingApiProps: ThingApiProps = { ... }
```

#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`authorizationType`](#softchefcdkiotdevicemanagementthingapipropspropertyauthorizationtype) | [`@aws-cdk/aws-apigateway.AuthorizationType`](#@aws-cdk/aws-apigateway.AuthorizationType) | Specify API Gateway all resources's authorization type, COGNTIO/IAM/CUSTOM/NONE. |
| [`authorizer`](#softchefcdkiotdevicemanagementthingapipropspropertyauthorizer) | [`@aws-cdk/aws-apigateway.IAuthorizer`](#@aws-cdk/aws-apigateway.IAuthorizer) | Specify API Gateway's authorizer, CognitoUserPool/Lambda. |

---

##### `authorizationType`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.ThingApiProps.property.authorizationType" id="softchefcdkiotdevicemanagementthingapipropspropertyauthorizationtype"></a>

```typescript
public readonly authorizationType: AuthorizationType;
```

- *Type:* [`@aws-cdk/aws-apigateway.AuthorizationType`](#@aws-cdk/aws-apigateway.AuthorizationType)
- *Default:* apigateway.AuthorizationType.NONE

Specify API Gateway all resources's authorization type, COGNTIO/IAM/CUSTOM/NONE.

---

##### `authorizer`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.ThingApiProps.property.authorizer" id="softchefcdkiotdevicemanagementthingapipropspropertyauthorizer"></a>

```typescript
public readonly authorizer: IAuthorizer;
```

- *Type:* [`@aws-cdk/aws-apigateway.IAuthorizer`](#@aws-cdk/aws-apigateway.IAuthorizer)
- *Default:* undefined

Specify API Gateway's authorizer, CognitoUserPool/Lambda.

---

### ThingGroupApiProps <a name="@softchef/cdk-iot-device-management.ThingGroupApiProps" id="softchefcdkiotdevicemanagementthinggroupapiprops"></a>

#### Initializer <a name="[object Object].Initializer" id="object-objectinitializer"></a>

```typescript
import { ThingGroupApiProps } from '@softchef/cdk-iot-device-management'

const thingGroupApiProps: ThingGroupApiProps = { ... }
```

#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`authorizationType`](#softchefcdkiotdevicemanagementthinggroupapipropspropertyauthorizationtype) | [`@aws-cdk/aws-apigateway.AuthorizationType`](#@aws-cdk/aws-apigateway.AuthorizationType) | Specify API Gateway all resources's authorization type, COGNTIO/IAM/CUSTOM/NONE. |
| [`authorizer`](#softchefcdkiotdevicemanagementthinggroupapipropspropertyauthorizer) | [`@aws-cdk/aws-apigateway.IAuthorizer`](#@aws-cdk/aws-apigateway.IAuthorizer) | Specify API Gateway's authorizer, CognitoUserPool/Lambda. |

---

##### `authorizationType`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.ThingGroupApiProps.property.authorizationType" id="softchefcdkiotdevicemanagementthinggroupapipropspropertyauthorizationtype"></a>

```typescript
public readonly authorizationType: AuthorizationType;
```

- *Type:* [`@aws-cdk/aws-apigateway.AuthorizationType`](#@aws-cdk/aws-apigateway.AuthorizationType)
- *Default:* apigateway.AuthorizationType.NONE

Specify API Gateway all resources's authorization type, COGNTIO/IAM/CUSTOM/NONE.

---

##### `authorizer`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.ThingGroupApiProps.property.authorizer" id="softchefcdkiotdevicemanagementthinggroupapipropspropertyauthorizer"></a>

```typescript
public readonly authorizer: IAuthorizer;
```

- *Type:* [`@aws-cdk/aws-apigateway.IAuthorizer`](#@aws-cdk/aws-apigateway.IAuthorizer)
- *Default:* undefined

Specify API Gateway's authorizer, CognitoUserPool/Lambda.

---

### ThingTypeApiProps <a name="@softchef/cdk-iot-device-management.ThingTypeApiProps" id="softchefcdkiotdevicemanagementthingtypeapiprops"></a>

#### Initializer <a name="[object Object].Initializer" id="object-objectinitializer"></a>

```typescript
import { ThingTypeApiProps } from '@softchef/cdk-iot-device-management'

const thingTypeApiProps: ThingTypeApiProps = { ... }
```

#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`authorizationType`](#softchefcdkiotdevicemanagementthingtypeapipropspropertyauthorizationtype) | [`@aws-cdk/aws-apigateway.AuthorizationType`](#@aws-cdk/aws-apigateway.AuthorizationType) | Specify API Gateway all resources's authorization type, COGNTIO/IAM/CUSTOM/NONE. |
| [`authorizer`](#softchefcdkiotdevicemanagementthingtypeapipropspropertyauthorizer) | [`@aws-cdk/aws-apigateway.IAuthorizer`](#@aws-cdk/aws-apigateway.IAuthorizer) | Specify API Gateway's authorizer, CognitoUserPool/Lambda. |

---

##### `authorizationType`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.ThingTypeApiProps.property.authorizationType" id="softchefcdkiotdevicemanagementthingtypeapipropspropertyauthorizationtype"></a>

```typescript
public readonly authorizationType: AuthorizationType;
```

- *Type:* [`@aws-cdk/aws-apigateway.AuthorizationType`](#@aws-cdk/aws-apigateway.AuthorizationType)
- *Default:* apigateway.AuthorizationType.NONE

Specify API Gateway all resources's authorization type, COGNTIO/IAM/CUSTOM/NONE.

---

##### `authorizer`<sup>Optional</sup> <a name="@softchef/cdk-iot-device-management.ThingTypeApiProps.property.authorizer" id="softchefcdkiotdevicemanagementthingtypeapipropspropertyauthorizer"></a>

```typescript
public readonly authorizer: IAuthorizer;
```

- *Type:* [`@aws-cdk/aws-apigateway.IAuthorizer`](#@aws-cdk/aws-apigateway.IAuthorizer)
- *Default:* undefined

Specify API Gateway's authorizer, CognitoUserPool/Lambda.

---



