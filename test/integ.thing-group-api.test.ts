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
  ThingGroupApi,
} from '../src/index';
import {
  fnGetAttArn,
  ref,
} from './utils';

const expectedRoles: {
  [name: string]: string;
} = {
  addThingToThingGroupFunctionRole: 'ThingGroupApiAddThingToThingGroupFunctionServiceRoleEBD59FAC',
  createDynamicThingGroupFunctionRole: 'ThingGroupApiCreateDynamicThingGroupFunctionServiceRoleB8CB9456',
  createThingGroupFunctionRole: 'ThingGroupApiCreateThingGroupFunctionServiceRoleFF9C912C',
  deleteDynamicThingGroupFunctionRole: 'ThingGroupApiDeleteDynamicThingGroupFunctionServiceRole287BF546',
  deleteThingGroupFunctionRole: 'ThingGroupApiDeleteThingGroupFunctionServiceRole8D37D199',
  getThingGroupFunctionRole: 'ThingGroupApiGetThingGroupFunctionServiceRole80688DA1',
  listThingGroupsFunctionRole: 'ThingGroupApiListThingGroupsFunctionServiceRole8A98D7BD',
  removeThingFromThingGroupFunctionRole: 'ThingGroupApiRemoveThingFromThingGroupFunctionServiceRoleD8AB0AC9',
};

const expectedResources: {
  [name: string]: string;
} = {
  dynamicThingGroupsResourceId: 'ThingGroupApiThingGroupRestApidynamicthinggroupsC4ED8E6C',
  dynamicThingGroupsThingGroupNameResourceId: 'ThingGroupApiThingGroupRestApidynamicthinggroupsthingGroupName8C421BEF',
  thingGroupsResourceId: 'ThingGroupApiThingGroupRestApithinggroups24E29853',
  thingGroupsThingGroupNameResourceId: 'ThingGroupApiThingGroupRestApithinggroupsthingGroupNameF0A6E81A',
  thingGroupsThingGroupNameThingsResourceId: 'ThingGroupApiThingGroupRestApithinggroupsthingGroupNamethings0C0DA311',
  thingGroupsThingGroupNameThingsThingNameResourceId: 'ThingGroupApiThingGroupRestApithinggroupsthingGroupNamethingsthingName3C02E972',
};

const expected = {
  restApiId: 'ThingGroupApiThingGroupRestApiCB757BF2',
  lambdaFunctionRuntime: Runtime.NODEJS_14_X.toString(),
};

test('minimal usage', () => {
  const app = new App();
  const stack = new Stack(app, 'test-stack');
  new ThingGroupApi(stack, 'ThingGroupApi');
  const template = Template.fromStack(stack);
  expect(template.toJSON()).toMatchSnapshot();
  template.resourceCountIs('AWS::ApiGateway::RestApi', 1);
  template.resourceCountIs('AWS::ApiGateway::Resource', 6);
  template.resourceCountIs('AWS::ApiGateway::Method', 17);
  template.resourceCountIs('AWS::Lambda::Function', 10);
  template.resourceCountIs('AWS::IAM::Role', 11);
  template.resourceCountIs('AWS::IAM::Policy', 10);
  template.hasResourceProperties('AWS::ApiGateway::RestApi', {
    Name: 'ThingGroupRestApi',
  });
  // RestAPI: /dynamic-thing-groups
  template.hasResourceProperties('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    PathPart: 'dynamic-thing-groups',
  });
  // RestAPI: /dynamic-thing-groups/{thingGroupName}
  template.hasResourceProperties('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    ParentId: ref(expectedResources.dynamicThingGroupsResourceId),
    PathPart: '{thingGroupName}',
  });
  // RestAPI: /thing-groups
  template.hasResourceProperties('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    PathPart: 'thing-groups',
  });
  // RestAPI: /thing-groups/{thingGroupName}
  template.hasResourceProperties('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    ParentId: ref(expectedResources.thingGroupsResourceId),
    PathPart: '{thingGroupName}',
  });
  // RestAPI: /thing-groups/{thingGroupName}/things
  template.hasResourceProperties('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    ParentId: ref(expectedResources.thingGroupsThingGroupNameResourceId),
    PathPart: 'things',
  });
  // RestAPI: /thing-groups/{thingGroupName}/things/{thingName}
  template.hasResourceProperties('AWS::ApiGateway::Resource', {
    RestApiId: ref(expected.restApiId),
    ParentId: ref(expectedResources.thingGroupsThingGroupNameThingsResourceId),
    PathPart: '{thingName}',
  });
  // AddThingToThingGroup API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.addThingToThingGroupFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.addThingToThingGroupFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: 'iot:AddThingToThingGroup',
          Effect: 'Allow',
          Resource: '*',
        },
      ],
    },
  });
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.thingGroupsThingGroupNameThingsThingNameResourceId),
    HttpMethod: 'PUT',
  });
  // CreateDynamicThingGroup API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.createDynamicThingGroupFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.createDynamicThingGroupFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: 'iot:CreateDynamicThingGroup',
          Effect: 'Allow',
          Resource: '*',
        },
      ],
    },
  });
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.dynamicThingGroupsResourceId),
    HttpMethod: 'POST',
  });
  // CreateThingGroup API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.createThingGroupFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.createThingGroupFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: 'iot:CreateThingGroup',
          Effect: 'Allow',
          Resource: '*',
        },
      ],
    },
  });
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.thingGroupsResourceId),
    HttpMethod: 'POST',
  });
  // DeleteDynamicThingGroup API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.deleteDynamicThingGroupFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.deleteDynamicThingGroupFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: 'iot:DeleteDynamicThingGroup',
          Effect: 'Allow',
          Resource: '*',
        },
      ],
    },
  });
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.dynamicThingGroupsThingGroupNameResourceId),
    HttpMethod: 'DELETE',
  });
  // DeleteThingGroup API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.deleteThingGroupFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.deleteThingGroupFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: 'iot:DeleteThingGroup',
          Effect: 'Allow',
          Resource: '*',
        },
      ],
    },
  });
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.thingGroupsThingGroupNameResourceId),
    HttpMethod: 'DELETE',
  });
  // GetThingGroup API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.getThingGroupFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.getThingGroupFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: 'iot:DescribeThingGroup',
          Effect: 'Allow',
          Resource: '*',
        },
      ],
    },
  });
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.thingGroupsThingGroupNameResourceId),
    HttpMethod: 'GET',
  });
  // ListThingGroups API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.listThingGroupsFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.listThingGroupsFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: 'iot:ListThingGroups',
          Effect: 'Allow',
          Resource: '*',
        },
      ],
    },
  });
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.thingGroupsResourceId),
    HttpMethod: 'GET',
  });
  // RemoveThingFromThingGroup API
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: expected.lambdaFunctionRuntime,
    Role: fnGetAttArn(expectedRoles.removeThingFromThingGroupFunctionRole),
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
    Roles: [
      ref(expectedRoles.removeThingFromThingGroupFunctionRole),
    ],
    PolicyDocument: {
      Statement: [
        {
          Action: 'iot:RemoveThingFromThingGroup',
          Effect: 'Allow',
          Resource: '*',
        },
      ],
    },
  });
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    RestApiId: ref(expected.restApiId),
    ResourceId: ref(expectedResources.thingGroupsThingGroupNameThingsThingNameResourceId),
    HttpMethod: 'DELETE',
  });
});