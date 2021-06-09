import * as AWS from 'aws-sdk';
import * as AWSMock from 'aws-sdk-mock';
import * as createThingGroup from '../../lambda-assets/thing-groups/create-thing-group/app';
// import * as updateThingGroup from '../../lambda-assets/thing-groups/update-thing-group/app';
import * as deleteThingGroup from '../../lambda-assets/thing-groups/delete-thing-group/app';
// import * as listThingGroup from '../../lambda-assets/thing-groups/get-thing-list/app';
// import * as getThingGroup from '../../lambda-assets/thing-groups/get-thing-group/app';
// import * as addThingToThingGroup from '../../lambda-assets/thing-groups/add-thing-to-thing-group/app';
// import * as removeThingFromThingGroup from '../../lambda-assets/thing-groups/remove-thing-from-thing-group/app';
// import * as createDynamicThingGroup from '../../lambda-assets/thing-groups/create-dynamic-thing-group/app';
// import * as updateDynamicThingGroup from '../../lambda-assets/thing-groups/update-dynamic-thing-group/app';
// import * as deleteDynamicThingGroup from '../../lambda-assets/thing-groups/delete-dynamic-thing-group/app';

AWS.config.region = 'local';
AWSMock.setSDKInstance(AWS);

test('Create thing group API', async() => {
  AWSMock.mock('Iot', 'createThingGroup', (parameters: AWS.Iot.Types.CreateThingGroupRequest, callback: Function) => {
    expect(parameters).toStrictEqual({ thingGroupName: 'Test' });
    callback(null, {
      thingGroupName: 'Test',
    });
  });
  const response = await createThingGroup.handler({
    body: {
      thingGroupName: 'Test',
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body.created).toEqual(true);
});

test('Get thing group API', async() => {
  // const response = await getThingGroup.handler({});
});

test('List thing groups API', async() => {
  // const response = await listThingGroups.handler({});
});

test('Update thing group API', async() => {
  // const response = await updateThingGroup.handler({});
});

test('Delete thing group API', async() => {
  AWSMock.mock('Iot', 'deleteThingGroup', (parameters: AWS.Iot.Types.DeleteThingGroupRequest, callback: Function) => {
    expect(parameters).toStrictEqual({ thingGroupName: 'Test' });
    callback(null, {
      thingGroup: 'Test',
    });
  });
  const response = await deleteThingGroup.handler({
    pathParameters: {
      thingGroupName: 'Test',
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body.deleted).toEqual(true);
});

test('Add thing to thing group API', async() => {
  // const response = await addThingToThingGroup.handler({});
});

test('Remove thing from thing group API', async() => {
  // const response = await removeThingFromThingGroup.handler({});
});

test('Create dynamic thing group API', async() => {
// const response = await createDynamicThingGroup.handler({});
});

test('Update dynamic thing group API', async() => {
  // const response = await updateDynamicThingGroup.handler({});
});

test('Delete dynamic thing group API', async() => {
  // const response = await deleteDynamicThingGroup.handler({});
});