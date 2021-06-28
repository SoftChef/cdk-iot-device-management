import {
  IoTClient,
  CreateThingTypeCommand,
  DeprecateThingTypeCommand,
  DescribeThingTypeCommand,
  ListThingTypesCommand,
  //ThingTypeDefinition,
  DeleteThingTypeCommand,
} from '@aws-sdk/client-iot';
import {
  mockClient,
  AwsError,
} from 'aws-sdk-client-mock';
import * as createThingType from '../../lambda-assets/thing-types/create-thing-type/app';
import * as deleteThingType from '../../lambda-assets/thing-types/delete-thing-type/app';
import * as deprecateThingType from '../../lambda-assets/thing-types/deprecate-thing-type/app';
import * as getThingType from '../../lambda-assets/thing-types/get-thing-type/app';
import * as listThingTypes from '../../lambda-assets/thing-types/list-thing-types/app';
import * as undeprecateThingType from '../../lambda-assets/thing-types/undeprecate-thing-type/app';

const expectedThingType = {
  thingTypeArn: 'arn:aws:iot:ap-northeast-1:012345678901:thing/85f6509f-023c-48fb-8252-981653ffd561',
  thingTypeId: '85f6509f-023c-48fb-8252-981653ffd561',
  thingTypeName: 'TestThingType',
};

const expectedInvalidThingType = {
  thingTypeName: 'NotExistsThingType',
};

const expected = {
  thingType: expectedThingType,
  newThingType: {
    thingTypeName: 'NewThingType',
  },
  listThingType: {
    ThingType: [
      expectedThingType,
    ],
    nextToken: '12345',
  },
  invalidThingType: expectedInvalidThingType,
  invalidThingTypeName: '(((ﾟДﾟ;)))',
  invalidThingTypeError: <AwsError>{
    Code: 'ResourceNotFoundException',
    message: `ResourceNotFoundException: Job ${expectedInvalidThingType.thingTypeName} cannot be found.`,
  },
};

test('Create thing type success', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(CreateThingTypeCommand, {
    thingTypeName: expected.newThingType.thingTypeName,
  });
  const response = await createThingType.handler({
    body: {
      thingTypeName: expected.newThingType.thingTypeName,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body.created).toEqual(true);
  iotClientMock.restore();
});

test('Create thing type with invalid inputs expect failure', async () => {
  const iotClientMock = mockClient(IoTClient);
  const response = await createThingType.handler({
    body: {
      thingTypeName: '',
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(422);
  expect(body.error.details).toEqual([
    {
      key: 'thingTypeName',
      label: 'thingTypeName',
      message: expect.any(String),
      value: '',
    },
  ]);
  iotClientMock.restore();
});

test('Get thing type success', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(DescribeThingTypeCommand, {
    thingTypeName: expected.thingType.thingTypeName,
  }).resolves({
    thingTypeArn: expected.thingType.thingTypeArn,
    thingTypeId: expected.thingType.thingTypeId,
    thingTypeName: expected.thingType.thingTypeName,
  });
  const response = await getThingType.handler({
    pathParameters: {
      thingTypeName: expected.thingType.thingTypeName,
    },
  });
  const body = JSON.parse(response.body);
  expect(body.thingType).toEqual(expected.thingType);
  expect(response.statusCode).toEqual(200);
  iotClientMock.restore();
});

test('Get thing type with invalid thingTypeName expect failure', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(DescribeThingTypeCommand, {
    thingTypeName: expected.invalidThingType.thingTypeName,
  }).rejects(expected.invalidThingTypeError);
  const response = await getThingType.handler({
    pathParameters: {
      thingTypeName: expected.invalidThingType.thingTypeName,
    },
  });
  expect(response.statusCode).toEqual(404);
});

test('List thing types success', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(ListThingTypesCommand, {
  }).resolves({
    thingTypes: expected.listThingType.ThingType,
  });
  const response = await listThingTypes.handler({});
  const body = JSON.parse(response.body);
  expect(Array.isArray(body.thingTypes)).toBe(true);
  expect(body.thingTypes).toEqual(expected.listThingType.ThingType);
  expect(response.statusCode).toEqual(200);
  iotClientMock.restore();
});

test('List thing types with nextToken success', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(ListThingTypesCommand, {
    nextToken: expected.listThingType.nextToken,
  }).resolves({
    thingTypes: expected.listThingType.ThingType,
    nextToken: expected.listThingType.nextToken,
  });
  const response = await listThingTypes.handler({
    queryStringParameters: {
      nextToken: expected.listThingType.nextToken,
    },
  });
  const body = JSON.parse(response.body);
  expect(Array.isArray(body.thingTypes)).toBe(true);
  expect(body.thingTypes).toEqual(expected.listThingType.ThingType);
  expect(body.nextToken).toEqual(expected.listThingType.nextToken);
  expect(response.statusCode).toEqual(200);
  iotClientMock.restore();
});

test('Deprecate thing type success', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(DeprecateThingTypeCommand, {
    thingTypeName: expected.thingType.thingTypeName,
  }).resolves({});
  const response = await deprecateThingType.handler({
    pathParameters: {
      thingTypeName: expected.thingType.thingTypeName,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body.deprecated).toEqual(true);
  iotClientMock.restore();
});

test('Deprecate thing type with invalid thingTypeName expect failure', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(DeprecateThingTypeCommand, {
    thingTypeName: expected.invalidThingType.thingTypeName,
  }).rejects(expected.invalidThingTypeError);
  const response = await deprecateThingType.handler({
    pathParameters: {
      thingTypeName: expected.invalidThingType.thingTypeName,
    },
  });
  expect(response.statusCode).toEqual(404);
});

test('Undeprecate thing type success', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(DeprecateThingTypeCommand, {
    thingTypeName: expected.thingType.thingTypeName,
  }).resolves({});
  const response = await undeprecateThingType.handler({
    pathParameters: {
      thingTypeName: expected.thingType.thingTypeName,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body.undeprecated).toEqual(true);
  iotClientMock.restore();
});

test('Undeprecate thing type with invalid thingTypeName expect failure', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(DeprecateThingTypeCommand, {
    thingTypeName: expected.invalidThingType.thingTypeName,
  }).rejects(expected.invalidThingTypeError);
  const response = await undeprecateThingType.handler({
    pathParameters: {
      thingTypeName: expected.invalidThingType.thingTypeName,
    },
  });
  expect(response.statusCode).toEqual(404);
});

test('Delete thing type success', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(DeleteThingTypeCommand, {
    thingTypeName: expected.thingType.thingTypeName,
  }).resolves({});
  const response = await deleteThingType.handler({
    pathParameters: {
      thingTypeName: expected.thingType.thingTypeName,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body.deleted).toEqual(true);
  iotClientMock.restore();
});

test('Delete thing type with invalid thingTypeName expect failure', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(DeleteThingTypeCommand, {
    thingTypeName: expected.invalidThingType.thingTypeName,
  }).rejects(expected.invalidThingTypeError);
  const response = await deleteThingType.handler({
    pathParameters: {
      thingTypeName: expected.invalidThingType.thingTypeName,
    },
  });
  expect(response.statusCode).toEqual(404);
});