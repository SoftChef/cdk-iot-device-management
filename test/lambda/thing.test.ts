// import {
//   IoTClient,
//   CreateThingCommand,
//   UpdateThingCommand,
//   DescribeThingCommand,
//   ListThingsCommand,
//   DeleteThingCommand,
// } from '@aws-sdk/client-iot';
// import {
//   mockClient,
//   AwsError,
// } from 'aws-sdk-client-mock';
// import * as createThing from '../../lambda-assets/things/create-thing/app';
// import * as deleteThing from '../../lambda-assets/things/delete-thing/app';
// import * as updateThing from '../../lambda-assets/things/update-thing/app';
// import * as listThings from '../../lambda-assets/things/list-things/app';
// import * as getThing from '../../lambda-assets/things/get-thing/app';

// const iotClientMock = mockClient(IoTClient);

// const expectedThing = {
//   thingName: 'TestThing',
// };

// const expectedInvalidThing = {
//   thingName: 'NotExistsThing',
// };

// const expected = {
//   thing: {
//     thingName: expectedThing.thingName,
//   },
//   newThing: {
//     thingName: 'NewTestThing',
//   },
//   invalidThing: expectedInvalidThing,
//   invalidThingError: <AwsError> {
//     Code: 'ResourceNotFoundException',
//     message: `ResourceNotFoundException: Job ${expectedInvalidThing.thingName} cannot be found.`,
//   },
// };

test('Create thing success', async() => {
  // iotClientMock.on(CreateThingCommand, {
  //   thingName: expected.newThing.thingName,
  // }).resolves({
  //   thingName: expected.newThing.thingName,
  // });
  // const response = await createThing.handler({
  //   body: {
  //     thingName: 'Test',
  //   },
  // });
  // const body = JSON.parse(response.body);
  // expect(response.statusCode).toEqual(200);
  // expect(body.created).toEqual(true);
});

test('Create thing with invalid input expect failure', async() => {
  // const response = await createThing.handler({});
  // const body = JSON.parse(response.body);
  // expect(response.statusCode).toEqual(422);
  // expect(body.error).toEqual([]);
});

test('Get thing success', async() => {
  // const response = await getThing.handler({});
  // const body = JSON.parse(response.body);
  // expect(response.statusCode).toEqual(200);
});

test('List things success', async() => {
  // const response = await listThings.handler({});
  // const body = JSON.parse(response.body);
  // expect(response.statusCode).toEqual(200);
});

test('List things with nextToken success', async() => {
  // const response = await listThings.handler({});
  // const body = JSON.parse(response.body);
  // expect(response.statusCode).toEqual(200);
});

test('Update thing success', async() => {
  // const response = await updateThing.handler({});
  // const body = JSON.parse(response.body);
  // expect(response.statusCode).toEqual(200);
});

test('Update thing with invalid input expect failure', async() => {
  // const response = await updateThing.handler({});
  // const body = JSON.parse(response.body);
  // expect(response.statusCode).toEqual(422);
});

test('Update thing with invalid thingName expect failure', async() => {
  // const response = await updateThing.handler({});
  // const body = JSON.parse(response.body);
  // expect(response.statusCode).toEqual(404);
});

test('Delete thing success', async() => {
  // iotClientMock.on(DeleteThingCommand, {
  //   thingName: expected.thing.thingName,
  // }).resolves({});
  // const response = await deleteThing.handler({
  //   pathParameters: {
  //     thingName: 'Test',
  //   },
  // });
  // const body = JSON.parse(response.body);
  // expect(response.statusCode).toEqual(200);
  // expect(body.deleted).toEqual(true);
});

test('Delete thing with invalid thingName expect failure', async() => {
  // const response = await deleteThing.handler({});
  // const body = JSON.parse(response.body);
  // expect(response.statusCode).toEqual(404);
});