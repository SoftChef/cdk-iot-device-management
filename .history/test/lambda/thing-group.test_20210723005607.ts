import {
  IoTClient,
  CreateThingGroupCommand,
  CreateDynamicThingGroupCommand,
  UpdateThingGroupCommand,
  UpdateDynamicThingGroupCommand,
  DescribeThingGroupCommand,
  ListThingGroupsCommand,
  ListThingsInThingGroupCommand,
  DeleteThingGroupCommand,
  DeleteDynamicThingGroupCommand,
  AddThingToThingGroupCommand,
  RemoveThingFromThingGroupCommand,
} from '@aws-sdk/client-iot';
import {
  mockClient,
  AwsError,
} from 'aws-sdk-client-mock';
import * as addThingToThingGroup from '../../lambda-assets/thing-groups/add-thing-to-thing-group/app';
import * as createDynamicThingGroup from '../../lambda-assets/thing-groups/create-dynamic-thing-group/app';
import * as createThingGroup from '../../lambda-assets/thing-groups/create-thing-group/app';
import * as deleteDynamicThingGroup from '../../lambda-assets/thing-groups/delete-dynamic-thing-group/app';
import * as deleteThingGroup from '../../lambda-assets/thing-groups/delete-thing-group/app';
import * as getThingGroup from '../../lambda-assets/thing-groups/get-thing-group/app';
import * as listThingGroups from '../../lambda-assets/thing-groups/list-thing-groups/app';
import * as listThingsInThingGroup from '../../lambda-assets/thing-groups/list-things-in-thing-group/app';
import * as removeThingFromThingGroup from '../../lambda-assets/thing-groups/remove-thing-from-thing-group/app';
import * as updateDynamicThingGroup from '../../lambda-assets/thing-groups/update-dynamic-thing-group/app';
import * as updateThingGroup from '../../lambda-assets/thing-groups/update-thing-group/app';

const expectedThingGroup = {
  thingGroupName: 'TestGetThingGroupName',
  thingGroupId: 'TestGetThingGroupId',
  thingGroupArn: 'TestGetThingGroupArn',
  version: 1,
  indexName: 'TestGetThingGroupIndexName',
  queryString: 'TestGetThingGroupQueryString',
  queryVersion: 'TestGetThingGroupQueryVersion',
  status: 'TestGetThingGroupStatus',
};

const expectedInvalidThingGroup = {
  thingGroupName: 'not-exists-thing-group-name',
};

const expected = {
  thingGroupName: 'TestThingGroup',
  thingName: 'TestThingName',
  queryString: 'TestQueryString',
  description: 'TestDescription',
  createDynamicThingGroup: {
    thingGroupName: 'TestCreateDynamicThingGroupName',
    queryString: 'TestCreateQueryString',
  },
  updateDynamicThingGroup: {
    thingGroupName: 'TestUpdateDynamicThingGroupName',
    thingGroupProperties: {
      thingGroupDescription: 'TestUpdateDynamicThingGroupDescription',
    },
  },
  createThingGroup: {
    thingGroupName: 'TestCreateThingGroupName',
    queryString: 'TestCreateQueryString',
  },
  getThingGroup: expectedThingGroup,
  updateThingGroup: {
    thingGroupName: 'TestUpdateThingGroupName',
    thingGroupProperties: {
      thingGroupDescription: 'TestUpdateThingGroupDescription',
    },
  },
  listThingGroups: {
    thingGroups: [
      {
        groupArn: 'TestGroupArn',
        groupName: 'TestGroup',
      },
    ],
    nextToken: 'TestNextToken',
  },
  listThingsInThingGroups: {
    things: [
      'thing'
    ],
    nextToken: 'TestNextToken',
  },
  invalidThingGroup: {
    thingGroupName: 'TestThingGroup',
  },
  invalidThingGroupError: <AwsError>{
    Code: 'ResourceNotFoundException',
    message: `ResourceNotFoundException: Thing group ${expectedInvalidThingGroup.thingGroupName} cannot be found.`,
  },
};

test('Create thing group success', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(CreateThingGroupCommand, {
    thingGroupName: expected.thingGroupName,
  }).resolves({});
  const response = await createThingGroup.handler({
    body: {
      thingGroupName: expected.thingGroupName,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body.created).toEqual(true);
});

test('Create thing group with invalid input expect failure', async () => {
  const response = await createThingGroup.handler({});
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(422);
  expect(body.error).toEqual([
    {
      label: 'thingGroupName',
      key: 'thingGroupName',
      value: null,
      message: expect.any(String),
    },
  ]);
});

test('Get thing group success', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(DescribeThingGroupCommand, {
    thingGroupName: expected.thingGroupName,
  }).resolves(expected.getThingGroup);
  const response = await getThingGroup.handler({
    pathParameters: {
      thingGroupName: expected.thingGroupName,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body).toEqual({
    thingGroup: expected.getThingGroup,
  });
  iotClientMock.restore();
});

test('Get thing group with invalid thingGroupName expect failure', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(DescribeThingGroupCommand, {
    thingGroupName: expectedInvalidThingGroup.thingGroupName,
  }).rejects(expected.invalidThingGroupError);
  const response = await getThingGroup.handler({
    pathParameters: {
      thingGroupName: expectedInvalidThingGroup.thingGroupName,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(404);
  expect(body.error).toEqual(
    Object.assign(new Error(), expected.invalidThingGroupError).toString(),
  );
  iotClientMock.restore();
});

test('List thing groups success', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(ListThingGroupsCommand).resolves({
    thingGroups: expected.listThingGroups.thingGroups,
    nextToken: expected.listThingGroups.nextToken,
  });
  const response = await listThingGroups.handler({});
  expect(response.statusCode).toEqual(200);
  iotClientMock.restore();
});

test('List thing groups with nextToken success', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(ListThingGroupsCommand).resolves({
    thingGroups: expected.listThingGroups.thingGroups,
    nextToken: expected.listThingGroups.nextToken,
  });
  const response = await listThingGroups.handler({});
  expect(response.statusCode).toEqual(200);
  iotClientMock.restore();
});

test('List things in thing groups success', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(ListThingsInThingGroupCommand, {
    thingGroupName: expected.createThingGroup.thingGroupName,
  }).resolves(expected.listThingsInThingGroups);
  const response = await listThingsInThingGroup.handler({});
  expect(response.statusCode).toEqual(200);
  iotClientMock.restore();
});

test('List things in thing groups with invalid thingGroupName expect failure', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(ListThingsInThingGroupCommand).rejects(expected.invalidThingGroupError);
  const response = await listThingsInThingGroup.handler({
    thingGroupName: expected.thingGroupName,
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(404);
  expect(body.error).toEqual(
    Object.assign(new Error(), expected.invalidThingGroupError).toString(),
  );
  iotClientMock.restore();
});

test('Update thing group success', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(CreateThingGroupCommand, {
    thingGroupName: expected.createThingGroup.thingGroupName,
  }).resolves({});
  const response = await createThingGroup.handler({
    body: {
      thingGroupName: expected.createThingGroup.thingGroupName,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body.created).toEqual(true);
  iotClientMock.restore();
});

test('Update thing group with invalid input expect failure', async () => {
  const response = await updateThingGroup.handler({
    body: {
      description: true,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(422);
  expect(body.error).toEqual([
    {
      label: 'description',
      key: 'description',
      value: true,
      message: expect.any(String),
    },
  ]);
});

test('Update thing group with invalid thingGroupName expect failure', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(UpdateThingGroupCommand, {
    thingGroupName: expected.invalidThingGroup.thingGroupName,
  }).rejects(expected.invalidThingGroupError);
  const response = await updateThingGroup.handler({
    pathParameters: {
      thingGroupName: expected.invalidThingGroup.thingGroupName,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(404);
  expect(body.error).toEqual(
    Object.assign(new Error(), expected.invalidThingGroupError).toString(),
  );
  iotClientMock.restore();
});

test('Delete thing group success', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(DeleteThingGroupCommand).resolves({});
  const response = await deleteThingGroup.handler({
    pathParameters: {
      thingGroupName: expected.thingGroupName,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body.deleted).toEqual(true);
  iotClientMock.restore();
});

test('Delete thing group with invalid thingGroupName expect failure', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(DeleteThingGroupCommand, {
    thingGroupName: expected.thingGroupName,
  }).resolves({});
  const response = await deleteThingGroup.handler({
    pathParameters: {
      thingGroupName: expected.thingGroupName,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body.deleted).toEqual(true);
  iotClientMock.restore();
});

test('Add thing to thing group success', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(AddThingToThingGroupCommand).resolves({});
  const response = await addThingToThingGroup.handler({
    pathParameters: {
      thingGroupName: expected.thingGroupName,
      thingName: expected.thingName,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body.added).toEqual(true);
  iotClientMock.restore();
});

test('Add thing to thing group with invalid things expect failure', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(AddThingToThingGroupCommand, {
    thingGroupName: expected.invalidThingGroup.thingGroupName,
    thingName: expected.thingName,
  }).rejects(expected.invalidThingGroupError);
  const response = await addThingToThingGroup.handler({
    pathParameters: {
      thingGroupName: expected.invalidThingGroup.thingGroupName,
      thingName: expected.thingName,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(404);
  expect(body.error).toEqual(
    Object.assign(new Error(), expected.invalidThingGroupError).toString(),
  );
  iotClientMock.restore();
});

test('Remove thing from thing group success', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(RemoveThingFromThingGroupCommand, {
    thingGroupName: expected.thingGroupName,
  }).resolves({});
  const response = await removeThingFromThingGroup.handler({
    pathParameters: {
      thingGroupName: expected.thingGroupName,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body.removed).toEqual(true);
  iotClientMock.restore();
});

test('Remove thing from thing group with invalid things expect failure', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(RemoveThingFromThingGroupCommand, {
    thingGroupName: expected.invalidThingGroup.thingGroupName,
  }).rejects(expected.invalidThingGroupError);
  const response = await removeThingFromThingGroup.handler({
    pathParameters: {
      thingGroupName: expected.invalidThingGroup.thingGroupName,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(404);
  expect(body.error).toEqual(
    Object.assign(new Error(), expected.invalidThingGroupError).toString(),
  );
  iotClientMock.restore();
});

test('Create dynamic thing group success', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(CreateDynamicThingGroupCommand, {
    thingGroupName: expected.createDynamicThingGroup.thingGroupName,
    queryString: expected.createDynamicThingGroup.queryString,
  }).resolves({});
  const response = await createDynamicThingGroup.handler({
    body: {
      thingGroupName: expected.createDynamicThingGroup.thingGroupName,
      queryString: expected.createDynamicThingGroup.queryString,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body.created).toEqual(true);
  iotClientMock.restore();
});

test('Create dynamic thing group with invalid inputs expect failure', async () => {
  const response = await createDynamicThingGroup.handler({
    body: {
      thingGroupName: expected.createDynamicThingGroup.thingGroupName,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(422);
  expect(body.error).toEqual([
    {
      label: 'queryString',
      key: 'queryString',
      value: null,
      message: expect.any(String),
    },
  ]);
});

test('Update dynamic thing group with invalid input expect failure', async () => {
  const response = await updateDynamicThingGroup.handler({
    body: {
      description: true,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(422);
  expect(body.error).toEqual([
    {
      label: 'description',
      key: 'description',
      value: true,
      message: expect.any(String),
    },
  ]);
});

test('Update dynamic thing group with invalid thingGroupName expect failure', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(UpdateDynamicThingGroupCommand, {
    thingGroupName: expected.invalidThingGroup.thingGroupName,
  }).rejects(expected.invalidThingGroupError);
  const response = await updateDynamicThingGroup.handler({
    pathParameters: {
      thingGroupName: expected.invalidThingGroup.thingGroupName,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(404);
  expect(body.error).toEqual(
    Object.assign(new Error(), expected.invalidThingGroupError).toString(),
  );
  iotClientMock.restore();
});

test('Delete dynamic thing group success', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(DeleteDynamicThingGroupCommand, {
    thingGroupName: expected.thingGroupName,
  }).resolves({});
  const response = await deleteDynamicThingGroup.handler({
    pathParameters: {
      thingGroupName: expected.thingGroupName,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body.deleted).toEqual(true);
  iotClientMock.restore();
});

test('Delete dynamic thing group with invalid thingGroupName expect failure', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(DeleteDynamicThingGroupCommand, {
    thingGroupName: expected.invalidThingGroup.thingGroupName,
  }).rejects(expected.invalidThingGroupError);
  const response = await deleteDynamicThingGroup.handler({
    pathParameters: {
      thingGroupName: expected.invalidThingGroup.thingGroupName,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(404);
  expect(body.error).toEqual(
    Object.assign(new Error(), expected.invalidThingGroupError).toString(),
  );
  iotClientMock.restore();
});
