import * as AWS from 'aws-sdk';
import * as AWSMock from 'aws-sdk-mock';
import * as createThing from '../../lambda-assets/things/create-thing/app';
import * as deleteThing from '../../lambda-assets/things/delete-thing/app';
// import * as updateThing from '../../lambda-assets/things/update-thing/app';
// import * as listThings from '../../lambda-assets/things/list-things/app';
// import * as getThing from '../../lambda-assets/things/get-thing/app';

AWS.config.region = 'local';
AWSMock.setSDKInstance(AWS);

test('Create thing API', async() => {
  AWSMock.mock('Iot', 'createThing', (parameters: AWS.Iot.Types.CreateThingRequest, callback: Function) => {
    expect(parameters).toStrictEqual({ thingName: 'Test' });
    callback(null, {
      thingName: 'Test',
    });
  });
  const response = await createThing.handler({
    body: {
      thingName: 'Test',
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body.created).toEqual(true);
});

test('Get thing API', async() => {
  // const response = await getThing.handler({});
});

test('List things API', async() => {
  // const response = await listThings.handler({});
});

test('Update thing API', async() => {
  // const response = await updateThing.handler({});
});

test('Delete thing API', async() => {
  AWSMock.mock('Iot', 'deleteThing', (parameters: AWS.Iot.Types.DeleteThingRequest, callback: Function) => {
    expect(parameters).toStrictEqual({ thingName: 'Test' });
    callback(null, {
      thingName: 'Test',
    });
  });
  const response = await deleteThing.handler({
    pathParameters: {
      thingName: 'Test',
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body.deleted).toEqual(true);
});