import {
  IoTClient,
  CreateThingCommand,
  UpdateThingCommand,
  DescribeThingCommand,
  ListThingsCommand,
  DeleteThingCommand,
} from '@aws-sdk/client-iot';
import {
  mockClient,
  AwsError,
} from 'aws-sdk-client-mock';import * as createThing from '../../lambda-assets/things/create-thing/app';
import * as deleteThing from '../../lambda-assets/things/delete-thing/app';
import * as getThing from '../../lambda-assets/things/get-thing/app';
import * as listThings from '../../lambda-assets/things/list-things/app';
import * as updateThing from '../../lambda-assets/things/update-thing/app';

const expectedThing = {
  thingArn: 'arn:aws:iot:ap-northeast-1:012345678901:thing/85f6509f-023c-48fb-8252-981653ffd561',
  thingId: '85f6509f-023c-48fb-8252-981653ffd561',
  thingName: 'TestThing',
  thingTypeName: 'test',
};

const expectedInvalidThing = {
  thingName: 'NotExistsThing',
  attributePayload: {
    attributes: {
      payload: 'payload',
    },
  },
  expectedVersion: 1,
  removeThingType: true,
};

const expected = {

  thing: expectedThing,
  newThing: {
    thingName: 'NewTestThing',
  },
  listThing: {
    things: [
      expectedThing,
    ],
    nextToken: '12345',
  },
  updateThing: {
    thingTypeName: 'thingTypeName',
    attributePayload: {
      attributes: {
        payload: 'payload',
      },
    },
    expectedVersion: 1,
    removeThingType: true,
  },
  UpdateInvalidInput: {
    thingTypeName: 1,
    attributePayload: '',
    expectedVersion: '',
    removeThingType: 'true',
  },
  invalidThing: expectedInvalidThing,
  invalidThingError: <AwsError>{
    Code: 'ResourceNotFoundException',
    message: `ResourceNotFoundException: Thing ${expectedInvalidThing.thingName} cannot be found.`,
  },
};

test('Create thing success', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(CreateThingCommand, {
    thingName: expected.newThing.thingName,
  });
  const response = await createThing.handler({
    body: {
      thingName: 'Test',
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body.created).toEqual(true);
  iotClientMock.restore();
});

test('Create thing with invalid input expect failure', async () => {
  const iotClientMock = mockClient(IoTClient);
  const response = await createThing.handler({
    body: {
      thingName: '',
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(422);
  expect(body.error).toEqual([
    {
      key: 'thingName',
      label: 'thingName',
      message: expect.any(String),
      value: '',
    },
  ]);
  iotClientMock.restore();
});

test('Get thing success', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(DescribeThingCommand, {
    thingName: expected.thing.thingName,
  }).resolves({
    thingArn: expected.thing.thingArn,
    thingId: expected.thing.thingId,
    thingName: expected.thing.thingName,
    thingTypeName: 'test',
  });
  const response = await getThing.handler({
    pathParameters: {
      thingName: expected.thing.thingName,
    },
  });
  const body = JSON.parse(response.body);
  expect(body.thing).toEqual(expected.thing);
  expect(response.statusCode).toEqual(200);
  iotClientMock.restore();
});

test('List things success', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(ListThingsCommand, {
  }).resolves({
    things: expected.listThing.things,
  });
  const response = await listThings.handler({});
  const body = JSON.parse(response.body);
  expect(Array.isArray(body.things)).toBe(true);
  expect(body.things).toEqual(expected.listThing.things);
  expect(response.statusCode).toEqual(200);
  iotClientMock.restore();
});

test('List things with nextToken success', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(ListThingsCommand, {
    nextToken: expected.listThing.nextToken,
  }).resolves({
    things: expected.listThing.things,
    nextToken: expected.listThing.nextToken,
  });
  const response = await listThings.handler({
    queryStringParameters: {
      nextToken: expected.listThing.nextToken,
    },
  });
  const body = JSON.parse(response.body);
  expect(Array.isArray(body.things)).toBe(true);
  expect(body.things).toEqual(expected.listThing.things);
  expect(body.nextToken).toEqual(expected.listThing.nextToken);
  expect(response.statusCode).toEqual(200);
  iotClientMock.restore();
});

test('Update thing success', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(UpdateThingCommand, {
    thingName: expected.thing.thingName,
    thingTypeName: expected.updateThing.thingTypeName,
    attributePayload: expected.updateThing.attributePayload,
    expectedVersion: expected.updateThing.expectedVersion,
    removeThingType: expected.updateThing.removeThingType,
  }).resolves({});
  const response = await updateThing.handler({
    pathParameters: {
      thingName: expected.thing.thingName,
    },
    body: {
      thingTypeName: expected.updateThing.thingTypeName,
      attributePayload: expected.updateThing.attributePayload,
      expectedVersion: expected.updateThing.expectedVersion,
      removeThingType: expected.updateThing.removeThingType,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body.updated).toEqual(true);
  iotClientMock.restore();
});

test('Update thing with invalid input expect failure', async() => {
  const iotClientMock = mockClient(IoTClient);
  const response = await updateThing.handler({
    pathParameters: {
      thingName: '',
    },
    body: {
      thingTypeName: expected.UpdateInvalidInput.thingTypeName,
      attributePayload: expected.UpdateInvalidInput.attributePayload,
      expectedVersion: expected.UpdateInvalidInput.expectedVersion,
      removeThingType: expected.UpdateInvalidInput.removeThingType,
    },
  });
  expect(response.statusCode).toEqual(422);
  iotClientMock.restore();
});

test('Update thing with invalid thingName expect failure', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(UpdateThingCommand, {
    thingName: expected.invalidThing.thingName,
  }).rejects(expected.invalidThingError);
  const response = await updateThing.handler({
    pathParameters: {
      thingName: expected.invalidThing.thingName,
    },
  });
  expect(response.statusCode).toEqual(404);
  iotClientMock.restore();
});

test('Delete thing success', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(DeleteThingCommand, {
    thingName: expected.thing.thingName,
  }).resolves({});
  const response = await deleteThing.handler({
    pathParameters: {
      thingName: expected.thing.thingName,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body.deleted).toEqual(true);
  iotClientMock.restore();
});

test('Delete thing with invalid thingName expect failure', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(DeleteThingCommand, {
    thingName: expected.invalidThing.thingName,
  }).rejects(expected.invalidThingError);
  const response = await deleteThing.handler({
    pathParameters: {
      thingName: expected.invalidThing.thingName,
    },
  });
  expect(response.statusCode).toEqual(404);
  iotClientMock.restore();
});