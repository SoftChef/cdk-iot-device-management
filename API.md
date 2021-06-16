# API Reference

**Classes**

Name|Description
----|-----------
[FileApi](#softchef-cdk-iot-device-management-fileapi)|*No description*
[JobApi](#softchef-cdk-iot-device-management-jobapi)|*No description*
[ThingApi](#softchef-cdk-iot-device-management-thingapi)|*No description*
[ThingGroupApi](#softchef-cdk-iot-device-management-thinggroupapi)|*No description*
[ThingTypeApi](#softchef-cdk-iot-device-management-thingtypeapi)|*No description*


**Structs**

Name|Description
----|-----------
[FileApiProps](#softchef-cdk-iot-device-management-fileapiprops)|*No description*
[JobApiProps](#softchef-cdk-iot-device-management-jobapiprops)|*No description*
[ThingApiProps](#softchef-cdk-iot-device-management-thingapiprops)|*No description*
[ThingGroupApiProps](#softchef-cdk-iot-device-management-thinggroupapiprops)|*No description*
[ThingTypeApiProps](#softchef-cdk-iot-device-management-thingtypeapiprops)|*No description*



## class FileApi  <a id="softchef-cdk-iot-device-management-fileapi"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new FileApi(scope: Construct, id: string, props?: FileApiProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[FileApiProps](#softchef-cdk-iot-device-management-fileapiprops)</code>)  *No description*
  * **authorizationType** (<code>[AuthorizationType](#aws-cdk-aws-apigateway-authorizationtype)</code>)  *No description* __*Optional*__
  * **authorizer** (<code>[IAuthorizer](#aws-cdk-aws-apigateway-iauthorizer)</code>)  *No description* __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**restApiId** | <code>string</code> | <span></span>



## class JobApi  <a id="softchef-cdk-iot-device-management-jobapi"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new JobApi(scope: Construct, id: string, props?: JobApiProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[JobApiProps](#softchef-cdk-iot-device-management-jobapiprops)</code>)  *No description*
  * **authorizationType** (<code>[AuthorizationType](#aws-cdk-aws-apigateway-authorizationtype)</code>)  *No description* __*Optional*__
  * **authorizer** (<code>[IAuthorizer](#aws-cdk-aws-apigateway-iauthorizer)</code>)  *No description* __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**restApiId** | <code>string</code> | <span></span>



## class ThingApi  <a id="softchef-cdk-iot-device-management-thingapi"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new ThingApi(scope: Construct, id: string, props?: ThingApiProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[ThingApiProps](#softchef-cdk-iot-device-management-thingapiprops)</code>)  *No description*
  * **authorizationType** (<code>[AuthorizationType](#aws-cdk-aws-apigateway-authorizationtype)</code>)  *No description* __*Optional*__
  * **authorizer** (<code>[IAuthorizer](#aws-cdk-aws-apigateway-iauthorizer)</code>)  *No description* __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**restApiId** | <code>string</code> | <span></span>



## class ThingGroupApi  <a id="softchef-cdk-iot-device-management-thinggroupapi"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new ThingGroupApi(scope: Construct, id: string, props?: ThingGroupApiProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[ThingGroupApiProps](#softchef-cdk-iot-device-management-thinggroupapiprops)</code>)  *No description*
  * **authorizationType** (<code>[AuthorizationType](#aws-cdk-aws-apigateway-authorizationtype)</code>)  *No description* __*Optional*__
  * **authorizer** (<code>[IAuthorizer](#aws-cdk-aws-apigateway-iauthorizer)</code>)  *No description* __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**restApiId** | <code>string</code> | <span></span>



## class ThingTypeApi  <a id="softchef-cdk-iot-device-management-thingtypeapi"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new ThingTypeApi(scope: Construct, id: string, props?: ThingTypeApiProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[ThingTypeApiProps](#softchef-cdk-iot-device-management-thingtypeapiprops)</code>)  *No description*
  * **authorizationType** (<code>[AuthorizationType](#aws-cdk-aws-apigateway-authorizationtype)</code>)  *No description* __*Optional*__
  * **authorizer** (<code>[IAuthorizer](#aws-cdk-aws-apigateway-iauthorizer)</code>)  *No description* __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**restApiId** | <code>string</code> | <span></span>



## struct FileApiProps  <a id="softchef-cdk-iot-device-management-fileapiprops"></a>






Name | Type | Description 
-----|------|-------------
**authorizationType**? | <code>[AuthorizationType](#aws-cdk-aws-apigateway-authorizationtype)</code> | __*Optional*__
**authorizer**? | <code>[IAuthorizer](#aws-cdk-aws-apigateway-iauthorizer)</code> | __*Optional*__



## struct JobApiProps  <a id="softchef-cdk-iot-device-management-jobapiprops"></a>






Name | Type | Description 
-----|------|-------------
**authorizationType**? | <code>[AuthorizationType](#aws-cdk-aws-apigateway-authorizationtype)</code> | __*Optional*__
**authorizer**? | <code>[IAuthorizer](#aws-cdk-aws-apigateway-iauthorizer)</code> | __*Optional*__



## struct ThingApiProps  <a id="softchef-cdk-iot-device-management-thingapiprops"></a>






Name | Type | Description 
-----|------|-------------
**authorizationType**? | <code>[AuthorizationType](#aws-cdk-aws-apigateway-authorizationtype)</code> | __*Optional*__
**authorizer**? | <code>[IAuthorizer](#aws-cdk-aws-apigateway-iauthorizer)</code> | __*Optional*__



## struct ThingGroupApiProps  <a id="softchef-cdk-iot-device-management-thinggroupapiprops"></a>






Name | Type | Description 
-----|------|-------------
**authorizationType**? | <code>[AuthorizationType](#aws-cdk-aws-apigateway-authorizationtype)</code> | __*Optional*__
**authorizer**? | <code>[IAuthorizer](#aws-cdk-aws-apigateway-iauthorizer)</code> | __*Optional*__



## struct ThingTypeApiProps  <a id="softchef-cdk-iot-device-management-thingtypeapiprops"></a>






Name | Type | Description 
-----|------|-------------
**authorizationType**? | <code>[AuthorizationType](#aws-cdk-aws-apigateway-authorizationtype)</code> | __*Optional*__
**authorizer**? | <code>[IAuthorizer](#aws-cdk-aws-apigateway-iauthorizer)</code> | __*Optional*__



