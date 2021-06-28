import {
  IoTClient,
  CreateThingCommand,
  UpdateThingCommand,
  DescribeThingCommand,
  ListThingsCommand,
  DeleteThingCommand,
} from '@aws-sdk/client-iot';
import {
  IoTDataPlaneClient,
  GetThingShadowCommand,
  //UpdateThingShadowCommand
  //GetThingShadowCommand,
  //ListNamedShadowsForThingCommand,
  //   DeleteThingShadowCommand,
} from '@aws-sdk/client-iot-data-plane';
import {
  mockClient,
  AwsError,
} from 'aws-sdk-client-mock'; import * as createThing from '../../lambda-assets/things/create-thing/app';
import * as deleteThing from '../../lambda-assets/things/delete-thing/app';
import * as getThing from '../../lambda-assets/things/get-thing/app';
import * as listThings from '../../lambda-assets/things/list-things/app';
import * as updateThing from '../../lambda-assets/things/update-thing/app';

const expectedThing = {
  thingArn: 'arn:aws:iot:ap-northeast-1:012345678901:thing/85f6509f-023c-48fb-8252-981653ffd561',
  thingId: '85f6509f-023c-48fb-8252-981653ffd561',
  thingName: 'Test',
  thingTypeName: 'test',
};

const expectedThingShadowRequest = {
  metadata: {
    desired: {
      welcome: {
        timestamp: Date.now(),
      },
    },
    reported: {
      welcome: {
        timestamp: Date.now(),
      },
    },
  },
  state: {
    desire: {
      welcome: 'aws-iot',
    },
    reported: {
      welcome: 'aws-iot',
    },
  },
};
/*
const expectedThingShadowResponse = {
  thing: {
    $metadata: {
      httpStatusCode: 200,
      requestId: "45512e4a-1844-4fe7-950a-6e3dc6ed383b",
      attempts: 1,
      totalRetryDelay: 0
    },
    "attributes": {},
    "defaultClientId": "Test",
    "thingArn": "arn:aws:iot:us-east-1:520095059637:thing/Test", "thingId": "09a5d7bf-d44c-4e18-ac29-5dc26e07df67", "thingName": "Test", "version": 10
  },
}*/
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

const expectedInvalidThingShadow = {
  thingName: 'NotExistsThingShadow',
};

const expected = {
  thing: expectedThing,
  thingShadow: expectedThingShadowRequest,
  newThing: {
    thingName: 'NewTestThing',
  },
  thingShadowName: 'Test',
  listThing: {
    things: [
      expectedThing,
    ],
    nextToken: '12345',
  },
  listThingsShadow: {
    thingsShadow: [
      'test',
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
  invalidThingShadowError: <AwsError>{
    Code: 'ResourceNotFoundException',
    message: `ResourceNotFoundException: No shadow exists with name ${expectedInvalidThingShadow.thingName}`,
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
  iotClientMock.restore();
  const iotDataPlaneClientMock = mockClient(IoTDataPlaneClient);
  iotDataPlaneClientMock.on(GetThingShadowCommand, {
    thingName: expected.thing.thingName,
  }).resolves({
    payload: new Uint8Array(
      Buffer.from(
        JSON.stringify(expected.thingShadow),
      ),
    ),
  });
  const response = await getThing.handler({
    pathParameters: {
      thingName: expected.thing.thingName,
    },
  });
  console.log(response);
  const body = JSON.parse(response.body);
  const payload = JSON.parse(body.payloadString)
  expect(body.thing).toEqual(expected.thing);
  expect(payload).toEqual(expected.thingShadow);
  expect(response.statusCode).toEqual(200);
  iotDataPlaneClientMock.restore();
  iotClientMock.restore();
});

test('Get thing with invalid thingName expect failure', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(DescribeThingCommand, {
    thingName: expected.invalidThing.thingName,
  }).rejects(expected.invalidThingError);
  const response = await getThing.handler({
    pathParameters: {
      thingName: expected.invalidThing.thingName,
    },
  });
  expect(response.statusCode).toEqual(404);
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

test('Update thing with invalid input expect failure', async () => {
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