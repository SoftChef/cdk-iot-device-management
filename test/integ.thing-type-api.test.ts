import {
  Template,
} from 'aws-cdk-lib/assertions';
import {
  Runtime,
} from 'aws-cdk-lib/aws-lambda';
import {
  App,
  Stack,
} from 'aws-cdk-lib/core';
import {
  ThingTypeApi,
} from '../src/index';
import {
  fnGetAttArn,
  ref,
} from './utils';

const expectedRoles: {
  [name: string]: string;
} = {
  createThingTypeFunctionRole: 'ThingTypeApiCreateThingTypeFunctionServiceRole6D30039C',
  deleteThingTypeFunctionRole: 'ThingTypeApiDeleteThingTypeFunctionServiceRoleCAA81649',
  listThingTypesFunctionRole: 'ThingTypeApiListThingTypesFunctionServiceRole8B05059F',
  getThingTypeFunctionRole: 'ThingTypeApiGetThingTypeFunctionServiceRoleD09A628E',
  deprecateThingTypeFunctionRole: 'ThingTypeApiDeprecateThingTypeFunctionServiceRoleB13E050D',
  undeprecateThingTypeFunctionRole: 'ThingTypeApiUndeprecateThingTypeFunctionServiceRole2394DB11',
};

const expectedResources: {
  [name: string]: string;
} = {
  thingTypesResourceId: 'ThingTypeApiThingTypeRestApithingtypes74E515F8',
  thingTypesThingTypeNameResourceId: 'ThingTypeApiThingTypeRestApithingtypesthingTypeName95051A7A',
  thingTypesThingTypeNameDeprecateResourceId: 'ThingTypeApiThingTypeRestApithingtypesthingTypeNamedeprecate69BFF3C1',
  thingTypesThingTypeNameUndeprecateResourceId: 'ThingTypeApiThingTypeRestApithingtypesthingTypeNameundeprecate03EADF25',
};

const expected = {
  restApiId: 'ThingTypeApiThingTypeRestApi6EFAA28D',
  lambdaFunctionRuntime: Runtime.NODEJS_14_X.toString(),
};

test('minimal usage', () => {
  const app = new App();
  const stack = new Stack(app, 'test-stack');
  new ThingTypeApi(stack, 'ThingTypeApi');
  const template = Template.fromStack(stack);
  expect(template.toJSON()).toMatchSnapshot();
  template.resourceCountIs('AWS::ApiGateway::RestApi', 1);
  template.resourceCountIs('AWS::ApiGateway::Resource', 4);
  template.resourceCountIs('AWS::ApiGateway::Method', 11);
  template.resourceCountIs('AWS::Lambda::Function', 6);
  template.resourceCountIs('AWS::IAM::Role', 7);
  template.resourceCountIs('AWS::IAM::Policy', 6);
  template.hasResourceProperties('AWS::ApiGateway::RestApi', {
    Name: 'ThingTypeRestApi',
  });
  // RestAPI: /thing-types
  template.hasResourceProperties('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    PathPart: 'thing-types',
  });
  // RestAPI: /thing-types/{thingTypeName}
  template.hasResourceProperties('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    ParentId: ref(expectedResources.thingTypesResourceId),
    PathPart: '{thingTypeName}',
  });
  // RestAPI: /thing-types/{thingTypeName}/deprecate
  template.hasResourceProperties('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    ParentId: ref(expectedResources.thingTypesThingTypeNameResourceId),
    PathPart: 'deprecate',
  });
  // RestAPI: /thing-types/{thingTypeName}/undeprecate
  template.hasResourceProperties('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    ParentId: ref(expectedResources.thingTypesThingTypeNameResourceId),
    PathPart: 'undeprecate',
  });
  // CreateThingType API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.createThingTypeFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.createThingTypeFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: 'iot:CreateThingType',
          Effect: 'Allow',
          Resource: '*',
        },
      ],
    },
  });
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.thingTypesResourceId),
    HttpMethod: 'POST',
  });
  // DeleteThingType API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.deleteThingTypeFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.deleteThingTypeFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: 'iot:DeleteThingType',
          Effect: 'Allow',
          Resource: '*',
        },
      ],
    },
  });
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.thingTypesThingTypeNameResourceId),
    HttpMethod: 'DELETE',
  });
  // ListThingTypes API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.listThingTypesFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.listThingTypesFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: 'iot:ListThingTypes',
          Effect: 'Allow',
          Resource: '*',
        },
      ],
    },
  });
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.thingTypesResourceId),
    HttpMethod: 'GET',
  });
  // GetThingType API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.getThingTypeFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.getThingTypeFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: 'iot:DescribeThingType',
          Effect: 'Allow',
          Resource: '*',
        },
      ],
    },
  });
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.thingTypesThingTypeNameResourceId),
    HttpMethod: 'GET',
  });
  // DeprecateThingType API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.deprecateThingTypeFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.deprecateThingTypeFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: 'iot:DeprecateThingType',
          Effect: 'Allow',
          Resource: '*',
        },
      ],
    },
  });
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.thingTypesThingTypeNameDeprecateResourceId),
    HttpMethod: 'PUT',
  });
  // UndeprecateThingType API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.undeprecateThingTypeFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.undeprecateThingTypeFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: 'iot:DeprecateThingType',
          Effect: 'Allow',
          Resource: '*',
        },
      ],
    },
  });
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.thingTypesThingTypeNameUndeprecateResourceId),
    HttpMethod: 'PUT',
  });
});