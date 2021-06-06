import * as AWS from 'aws-sdk';
import * as AWSMock from 'aws-sdk-mock';
import * as createThing from '../../lambda-assets/things/create-thing/app';
import * as deleteThing from '../../lambda-assets/things/delete-thing/app';
// import * as deprecateThing from '../../lambda-assets/things/deprecate-thing/app';
// import * as getThingList from '../../lambda-assets/things/get-thing-list/app';
// import * as getThing from '../../lambda-assets/things/get-thing/app';
// import * as undeprecateThing from '../../lambda-assets/things/undeprecate-thing/app';

AWS.config.region = 'local';
AWSMock.setSDKInstance(AWS);

test('Create thing API', async() => {
  AWSMock.mock('Iot', 'createThing', (parameters: { [key: string]: any }, callback: (error: any, response: any) => void) => {
    expect(parameters).toStrictEqual({ thingTypeName: 'Test' });
    callback(null, {
      thingType: 'Test',
    });
  });
  const response = await createThing.handler({
    body: {
      name: 'Test',
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body.created).toEqual(true);
});

test('Get thing API', async() => {
  // const response = await getThing.handler({});
});

test('Get thing list API', async() => {
  // const response = await getThingList.handler({});
});

test('Update thing API', async() => {
  // const response = await deprecateThing.handler({});
});

test('Delete thing API', async() => {
  AWSMock.mock('Iot', 'deleteThing', (parameters: { [key: string]: any }, callback: (error: any, response: any) => void) => {
    expect(parameters).toStrictEqual({ thingTypeName: 'Test' });
    callback(null, {
      thingType: 'Test',
    });
  });
  const response = await deleteThing.handler({
    pathParameters: {
      thingTypeName: 'Test',
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body.deleted).toEqual(true);
});