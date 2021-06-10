// import {
//   IoTClient,
//   CreateThingTypeCommand,
//   DeprecateThingTypeCommand,
//   DescribeThingTypeCommand,
//   ListThingTypesCommand,
//   DeleteThingTypeCommand,
// } from '@aws-sdk/client-iot';
// import {
//   mockClient,
//   AwsError,
// } from 'aws-sdk-client-mock';
// import * as createThingType from '../../lambda-assets/thing-types/create-thing-type/app';
// import * as deleteThingType from '../../lambda-assets/thing-types/delete-thing-type/app';
// import * as deprecateThingType from '../../lambda-assets/thing-types/deprecate-thing-type/app';
// import * as listThingTypes from '../../lambda-assets/thing-types/list-thing-types/app';
// import * as getThingType from '../../lambda-assets/thing-types/get-thing-type/app';
// import * as undeprecateThingType from '../../lambda-assets/thing-types/undeprecate-thing-type/app';

// const iotClientMock = mockClient(IoTClient);

// const expectedThingType = {};

// const expectedInvalidThingType = {
//   thingTypeName: 'NotExistsThingType',
// };

// const expected = {
//   thingType: expectedThingType,
//   newThingType: {},
//   invalidThingType: expectedInvalidThingType,
//   invalidThingTypeError: <AwsError> {
//     Code: 'ResourceNotFoundException',
//     message: `ResourceNotFoundException: Job ${expectedInvalidThingType.thingTypeName} cannot be found.`,
//   },
//   deleteThingType: {},
// };

test('Create thing type success', async() => {
  // const response = await createThingType.handler({
  //   body: {
  //     thingTypeName: expected.newThingType.thingTypeName,
  //   },
  // });
  // const body = JSON.parse(response.body);
  // expect(response.statusCode).toEqual(200);
  // expect(body.created).toEqual(true);
});

test('Create thing type with invalid inputs expect failure', async() => {
  // const response = await createThingType.handler({});
  // const body = JSON.parse(response.body);
  // expect(response.statusCode).toEqual(422);
});

test('Get thing type success', async() => {
  // const response = await getThingType.handler({});
  // const body = JSON.parse(response.body);
  // expect(response.statusCode).toEqual(200);
});

test('Get thing type with invalid thingTypeName expect failure', async() => {
  // const response = await getThingType.handler({});
  // const body = JSON.parse(response.body);
  // expect(response.statusCode).toEqual(404);
});

test('List thing types success', async() => {
  // const response = await listThingTypes.handler({});
  // const body = JSON.parse(response.body);
  // expect(response.statusCode).toEqual(200);
});

test('List thing types with nextToken success', async() => {
  // const response = await listThingTypes.handler({});
  // const body = JSON.parse(response.body);
  // expect(response.statusCode).toEqual(200);
});

test('Deprecate thing type success', async() => {
  // const response = await deprecateThingType.handler({});
  // const body = JSON.parse(response.body);
  // expect(response.statusCode).toEqual(404);
});

test('Deprecate thing type with invalid thingTypeName expect failure', async() => {
  // const response = await deprecateThingType.handler({});
  // const body = JSON.parse(response.body);
  // expect(response.statusCode).toEqual(404);
});

test('Undeprecate thing type success', async() => {
  // const response = await undeprecateThingType.handler({});
  // const body = JSON.parse(response.body);
  // expect(response.statusCode).toEqual(200);
});

test('Undeprecate thing type with invalid thingTypeName expect failure', async() => {
  // const response = await undeprecateThingType.handler({});
  // const body = JSON.parse(response.body);
  // expect(response.statusCode).toEqual(404);
});

test('Delete thing type success', async() => {
  // const response = await deleteThingType.handler({
  //   pathParameters: {
  //     thingTypeName: expected.deleteThingType.thingTypeName',
  //   },
  // });
  // const body = JSON.parse(response.body);
  // expect(response.statusCode).toEqual(200);
  // expect(body.deleted).toEqual(true);
});

test('Delete thing type with invalid thingTypeName expect failure', async() => {
  // const response = await deleteThingType.handler({});
  // const body = JSON.parse(response.body);
  // expect(response.statusCode).toEqual(404);
});