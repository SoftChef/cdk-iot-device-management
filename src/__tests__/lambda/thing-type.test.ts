import * as AWS from 'aws-sdk';
import * as AWSMock from 'aws-sdk-mock';
import * as createThingType from '../../lambda-assets/thing-types/create-thing-type/app';
import * as deleteThingType from '../../lambda-assets/thing-types/delete-thing-type/app';
// import * as deprecateThingType from '../../lambda-assets/thing-types/deprecate-thing-type/app';
// import * as listThingTypes from '../../lambda-assets/thing-types/list-thing-types/app';
// import * as getThingType from '../../lambda-assets/thing-types/get-thing-type/app';
// import * as undeprecateThingType from '../../lambda-assets/thing-types/undeprecate-thing-type/app';

AWS.config.region = 'local';
AWSMock.setSDKInstance(AWS);

test('Create thing type API', async() => {
  AWSMock.mock('Iot', 'createThingType', (parameters: { [key: string]: any }, callback: (error: any, response: any) => void) => {
    expect(parameters).toStrictEqual({ thingTypeName: 'Test' });
    callback(null, {
      thingType: 'Test',
    });
  });
  const response = await createThingType.handler({
    body: {
      name: 'Test',
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body.created).toEqual(true);
});

test('Get thing type API', async() => {
  // const response = await getThingType.handler({});
});

test('List thing types API', async() => {
  // const response = await listThingTypes.handler({});
});

test('Deprecate thing type API', async() => {
  // const response = await deprecateThingType.handler({});
});

test('Undeprecate thing type API', async() => {
  // const response = await undeprecateThingType.handler({});
});

test('Delete thing type API', async() => {
  AWSMock.mock('Iot', 'deleteThingType', (parameters: { [key: string]: any }, callback: (error: any, response: any) => void) => {
    expect(parameters).toStrictEqual({ thingTypeName: 'Test' });
    callback(null, {
      thingType: 'Test',
    });
  });
  const response = await deleteThingType.handler({
    pathParameters: {
      thingTypeName: 'Test',
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body.deleted).toEqual(true);
});