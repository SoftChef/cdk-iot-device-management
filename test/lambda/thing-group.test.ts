import {
  IoTClient,
  // CreateThingGroupCommand,
  // CreateDynamicThingGroupCommand,
  // UpdateThingGroupCommand,
  // UpdateDynamicThingGroupCommand,
  // DescribeThingGroupCommand,
  // ListThingGroupsCommand,
  // DeleteThingGroupCommand,
  // DeleteDynamicThingGroupCommand,
  AddThingToThingGroupCommand,
  // RemoveThingFromThingGroupCommand,
} from '@aws-sdk/client-iot';
import {
  mockClient,
  // AwsError,
} from 'aws-sdk-client-mock';
// import * as createThingGroup from '../../lambda-assets/thing-groups/create-thing-group/app';
// import * as updateThingGroup from '../../lambda-assets/thing-groups/update-thing-group/app';
// import * as deleteThingGroup from '../../lambda-assets/thing-groups/delete-thing-group/app';
// import * as listThingGroup from '../../lambda-assets/thing-groups/get-thing-list/app';
// import * as getThingGroup from '../../lambda-assets/thing-groups/get-thing-group/app';
import * as addThingToThingGroup from '../../lambda-assets/thing-groups/add-thing-to-thing-group/app';
// import * as removeThingFromThingGroup from '../../lambda-assets/thing-groups/remove-thing-from-thing-group/app';
// import * as createDynamicThingGroup from '../../lambda-assets/thing-groups/create-dynamic-thing-group/app';
// import * as updateDynamicThingGroup from '../../lambda-assets/thing-groups/update-dynamic-thing-group/app';
// import * as deleteDynamicThingGroup from '../../lambda-assets/thing-groups/delete-dynamic-thing-group/app';

const expected = {
  thingGroupName: 'TestThingGroup',
  thingName: 'TestThingName',
};

test('Create thing group success', async() => {
  // const response = await createThingGroup.handler({
  //   body: {
  //     thingGroupName: expected.thingGroup.thingGroupName',
  //   },
  // });
  // const body = JSON.parse(response.body);
  // expect(response.statusCode).toEqual(200);
  // expect(body.created).toEqual(true);
});

test('Create thing group with invalid input expect failure', async() => {
  // const response = await createThingGroup.handler(});
  // const body = JSON.parse(response.body);
  // expect(response.statusCode).toEqual(422);
  // expect(body.error).toEqual([]);
});

test('Get thing group success', async() => {
  // const response = await getThingGroup.handler({});
  // expect(response.statusCode).toEqual(200);
});

test('Get thing group with invalid thingGroupName expect failure', async() => {
  // const response = await getThingGroup.handler({});
  // expect(response.statusCode).toEqual(404);
});

test('List thing groups success', async() => {
  // const response = await listThingGroups.handler({});
  // expect(response.statusCode).toEqual(200);
});

test('List thing groups with nextToken success', async() => {
  // const response = await listThingGroups.handler({});
  // expect(response.statusCode).toEqual(200);
});

test('Update thing group success', async() => {
  // const response = await updateThingGroup.handler({});
  // expect(response.statusCode).toEqual(200);
});

test('Update thing group with invalid input expect failure', async() => {
  // const response = await updateThingGroup.handler({});
  // expect(response.statusCode).toEqual(422);
});

test('Update thing group with invalid thingGroupName expect failure', async() => {
  // const response = await updateThingGroup.handler({});
  // expect(response.statusCode).toEqual(404);
});

test('Delete thing group success', async() => {
  // const response = await deleteThingGroup.handler({
  //   pathParameters: {
  //     thingGroupName: expected.thingGroup.thingGroupName,
  //   },
  // });
  // const body = JSON.parse(response.body);
  // expect(response.statusCode).toEqual(200);
  // expect(body.deleted).toEqual(true);
});

test('Delete thing group with invalid thingGroupName expect failure', async() => {
  // const response = await deleteThingGroup.handler({
  //   pathParameters: {
  //     thingGroupName: expected.invalidThingGroup.thingGroupName,
  //   },
  // });
  // const body = JSON.parse(response.body);
  // expect(response.statusCode).toEqual(200);
  // expect(body.deleted).toEqual(true);
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
});

test('Add thing to thing group with invalid things expect failure', async() => {
  // const response = await addThingToThingGroup.handler({});
  // expect(response.statusCode).toEqual(400);
});

test('Remove thing from thing group success', async() => {
  // const response = await removeThingFromThingGroup.handler({});
  // expect(response.statusCode).toEqual(200);
});

test('Remove thing from thing group with invalid things expect failure', async() => {
  // const response = await removeThingFromThingGroup.handler({});
  // expect(response.statusCode).toEqual(400);
});

test('Create dynamic thing group success', async() => {
// const response = await createDynamicThingGroup.handler({});
// expect(response.statusCode).toEqual(200);
});

test('Create dynamic thing group with invalid inputs expect failure', async() => {
  // const response = await createDynamicThingGroup.handler({});
  // expect(response.statusCode).toEqual(422);
});

test('Update dynamic thing group success', async() => {
  // const response = await updateDynamicThingGroup.handler({});
  // expect(response.statusCode).toEqual(200);
});

test('Update dynamic thing group with invalid input expect failure', async() => {
  // const response = await updateDynamicThingGroup.handler({});
  // expect(response.statusCode).toEqual(422);
});

test('Update dynamic thing group with invalid thingGroupName expect failure', async() => {
  // const response = await updateDynamicThingGroup.handler({});
  // expect(response.statusCode).toEqual(404);
});

test('Delete dynamic thing group success', async() => {
  // const response = await deleteDynamicThingGroup.handler({});
  // expect(response.statusCode).toEqual(200);
});

test('Delete dynamic thing group with invalid thingGroupName expect failure', async() => {
  // const response = await deleteDynamicThingGroup.handler({});
  // expect(response.statusCode).toEqual(404);
});