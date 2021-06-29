import {
  IoTClient,
  CreateThingCommand,
  DescribeThingCommand,
  ListThingsCommand,
  UpdateThingCommand,
  DeleteThingCommand,
} from '@aws-sdk/client-iot';
import {
  IoTDataPlaneClient,
  GetThingShadowCommand,
  ListNamedShadowsForThingCommand,
  UpdateThingShadowCommand,
  DeleteThingShadowCommand,
} from '@aws-sdk/client-iot-data-plane';
import {
  mockClient,
  AwsError,
} from 'aws-sdk-client-mock';
import * as createThing from '../../lambda-assets/things/create-thing/app';
import * as deleteThingShadow from '../../lambda-assets/things/delete-thing-shadow/app';
import * as deleteThing from '../../lambda-assets/things/delete-thing/app';
import * as getThingShadow from '../../lambda-assets/things/get-thing-shadow/app';
import * as getThing from '../../lambda-assets/things/get-thing/app';
import * as listThingShadows from '../../lambda-assets/things/list-thing-shadows/app';
import * as listThings from '../../lambda-assets/things/list-things/app';
import * as UpdateThingShadow from '../../lambda-assets/things/update-thing-shadow/app';
import * as updateThing from '../../lambda-assets/things/update-thing/app';

const expectedThingResponse = {
  thingArn: 'arn:aws:iot:ap-northeast-1:012345678901:thing/85f6509f-023c-48fb-8252-981653ffd561',
  thingId: '85f6509f-023c-48fb-8252-981653ffd561',
  thingName: 'thingName',
  thingTypeName: 'thingTypeName',
};

const expectedThingShadowPayload = {
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
  thingShadowName: 'NotExistsThingShadow',
};

const expected = {
  thingResponse: expectedThingResponse,
  //expectedThingShadowRequest: expectedThingShadowRequest,
  thingName: expectedThingResponse.thingName,
  shadowName: 'shadowName',
  payload: new Uint8Array(
    Buffer.from(
      JSON.stringify(expectedThingShadowPayload),
    ),
  ),
  newThing: {
    thingName: expectedThingResponse.thingName,
  },
  listThing: {
    things: [
      expectedThingResponse,
    ],
    nextToken: '12345',
  },
  listThingShadows: {
    results: [
      'test',
    ],
    nextToken: '12345',
  },
  updateThing: {
    thingTypeName: expectedThingResponse.thingTypeName,
    attributePayload: {
      attributes: {
        payload: 'payload',
      },
    },
    expectedVersion: 1,
    removeThingType: true,
    payload: new Uint8Array(
      Buffer.from(
        JSON.stringify(expectedThingShadowPayload),
      ),
    ),
  },
  updateInvalidInput: {
    thingName: expectedInvalidThing.thingName,
    thingTypeName: '',
    attributePayload: {
      attributes: {
        payload: '',
      },
    },
    expectedVersion: '',
    removeThingType: '',
    payload: '',
  },
  invalidThing: {
    thingName: expectedInvalidThing.thingName,
    shadowName: 'invalidShadowName',
    thingTypeName: 1,
    attributePayload: '',
    expectedVersion: '',
    removeThingType: 'true',
    payload: new Uint8Array(
      Buffer.from(
        JSON.stringify(''),
      ),
    ),
  },
  invalidThingError: <AwsError>{
    Code: 'ResourceNotFoundException',
    message: `ResourceNotFoundException: Thing ${expectedInvalidThing.thingName} cannot be found.`,
  },
  invalidThingShadowError: <AwsError>{
    Code: 'ResourceNotFoundException',
    message: `ResourceNotFoundException: No shadow exists with name ${expectedInvalidThing.thingShadowName}`,
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
    thingName: expected.thingName,
  }).resolves({
    thingArn: expected.thingResponse.thingArn,
    thingId: expected.thingResponse.thingId,
    thingName: expected.thingResponse.thingName,
    thingTypeName: expected.thingResponse.thingTypeName,
  });
  const response = await getThing.handler({
    pathParameters: {
      thingName: expected.thingName,
    },
  });
  const body = JSON.parse(response.body);
  expect(body.thing).toEqual(expected.thingResponse);
  expect(response.statusCode).toEqual(200);
  iotClientMock.restore();
});

test('Get thing shadow success', async () => {
  const iotDataPlaneClientMock = mockClient(IoTDataPlaneClient);
  iotDataPlaneClientMock.on(GetThingShadowCommand, {
    thingName: expected.thingName,
    shadowName: expected.shadowName,
  }).resolves({
    payload: expected.payload,
  });
  const response = await getThingShadow.handler({
    pathParameters: {
      thingName: expected.thingName,
      shadowName: expected.shadowName,
    },
  });
  const body = JSON.parse(response.body);
  const payload = JSON.parse(body.payloadString);
  expect(payload).toEqual(expectedThingShadowPayload);
  expect(response.statusCode).toEqual(200);
  iotDataPlaneClientMock.restore();
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
// ====================================================================
test('Get thing shadow with invalid thingName expect failure', async () => {
  const iotDataPlaneClientMock = mockClient(IoTDataPlaneClient);
  iotDataPlaneClientMock.on(GetThingShadowCommand, {
    thingName: expected.invalidThing.thingName,
    shadowName: expected.invalidThing.shadowName,
  }).rejects(expected.invalidThingShadowError);
  const response = await getThingShadow.handler({
    pathParameters: {
      thingName: expected.invalidThing.thingName,
      shadowName: expected.invalidThing.shadowName,
    },
  });
  expect(response.statusCode).toEqual(404);
  iotDataPlaneClientMock.restore();
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

test('List thing shadows success', async () => {
  const iotDataPlaneClientMock = mockClient(IoTDataPlaneClient);
  iotDataPlaneClientMock.on(ListNamedShadowsForThingCommand, {
    thingName: expected.thingName,
  }).resolves({
    results: expected.listThingShadows.results,
  });
  const response = await listThingShadows.handler({
    pathParameters: {
      thingName: expected.thingName,
    },
  });
  const body = JSON.parse(response.body);
  expect(Array.isArray(body.thingShadows.results)).toBe(true);
  expect(body.thingShadows.results).toEqual(expected.listThingShadows.results);
  expect(response.statusCode).toEqual(200);
  iotDataPlaneClientMock.restore();
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

test('List thing shadows with nextToken success', async () => {
  const iotDataPlaneClientMock = mockClient(IoTDataPlaneClient);
  iotDataPlaneClientMock.on(ListNamedShadowsForThingCommand, {
    nextToken: expected.listThingShadows.nextToken,
  }).resolves({
    results: expected.listThingShadows.results,
    nextToken: expected.listThingShadows.nextToken,
  });
  const response = await listThingShadows.handler({
    queryStringParameters: {
      nextToken: expected.listThingShadows.nextToken,
    },
  });
  const body = JSON.parse(response.body);
  expect(Array.isArray(body.thingShadows.results)).toBe(true);
  expect(body.thingShadows.results).toEqual(expected.listThingShadows.results);
  expect(body.thingShadows.nextToken).toEqual(expected.listThingShadows.nextToken);
  expect(response.statusCode).toEqual(200);
  iotDataPlaneClientMock.restore();
});

test('Update thing success', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(UpdateThingCommand, {
    thingName: expected.thingName,
    thingTypeName: expected.updateThing.thingTypeName,
    attributePayload: expected.updateThing.attributePayload,
    expectedVersion: expected.updateThing.expectedVersion,
    removeThingType: expected.updateThing.removeThingType,
  }).resolves({});
  const response = await updateThing.handler({
    pathParameters: {
      thingName: expected.thingName,
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

test('Update thing shadow success', async () => {
  const iotDataPlaneClientMock = mockClient(IoTDataPlaneClient);
  iotDataPlaneClientMock.on(UpdateThingShadowCommand, {
    thingName: expected.thingName,
    payload: expected.updateThing.payload,
  }).resolves({});
  const response = await UpdateThingShadow .handler({
    pathParameters: {
      thingName: expected.thingName,
    },
    body: {
      payload: expected.updateThing.payload,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body.updated).toEqual(true);
  iotDataPlaneClientMock.restore();
});

test('Update thing with invalid input expect failure', async () => {
  const iotClientMock = mockClient(IoTClient);
  const response = await updateThing.handler({
    pathParameters: {
      thingName: expected.updateInvalidInput.thingName,
    },
    body: {
      thingTypeName: expected.updateInvalidInput.thingTypeName,
      attributePayload: expected.updateInvalidInput.attributePayload,
      expectedVersion: expected.updateInvalidInput.expectedVersion,
      removeThingType: expected.updateInvalidInput.removeThingType,
    },
  });
  expect(response.statusCode).toEqual(422);
  iotClientMock.restore();
});

test('Update thing shadow with invalid input expect failure', async () => {
  const iotDataPlaneClientMock = mockClient(IoTDataPlaneClient);
  const response = await UpdateThingShadow.handler({
    pathParameters: {
      thingName: expected.updateInvalidInput.thingName,
    },
    body: {
      payload: expected.updateInvalidInput.payload,
    },
  });
  expect(response.statusCode).toEqual(422);
  iotDataPlaneClientMock.restore();
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

test('Update thing shadow with invalid thingName expect failure', async () => {
  const iotDataPlaneClientMock = mockClient(IoTDataPlaneClient);
  iotDataPlaneClientMock.on(UpdateThingShadowCommand, {
    thingName: expected.invalidThing.thingName,
    shadowName: expected.invalidThing.shadowName,
    payload: expected.invalidThing.payload,
  }).rejects(expected.invalidThingShadowError);
  const response = await UpdateThingShadow.handler({
    pathParameters: {
      thingName: expected.invalidThing.thingName,
      shadowName: expected.invalidThing.shadowName,
    },
    body: {
      payload: expected.invalidThing.payload,
    },
  });
  expect(response.statusCode).toEqual(404);
  iotDataPlaneClientMock.restore();
});

test('Delete thing success', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(DeleteThingCommand, {
    thingName: expected.thingName,
  }).resolves({});
  const response = await deleteThing.handler({
    pathParameters: {
      thingName: expected.thingName,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body.deleted).toEqual(true);
  iotClientMock.restore();
});

test('Delete thing shadow success', async () => {
  const iotDataPlaneClientMock = mockClient(IoTDataPlaneClient);
  iotDataPlaneClientMock.on(DeleteThingShadowCommand, {
    thingName: expected.thingName,
    shadowName: expected.shadowName,
  }).resolves({});
  const response = await deleteThingShadow.handler({
    pathParameters: {
      thingName: expected.thingName,
      shadowName: expected.shadowName,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body.deleted).toEqual(true);
  iotDataPlaneClientMock.restore();
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

test('Delete thing shadow with invalid thingName expect failure', async () => {
  const iotDataPlaneClientMock = mockClient(IoTDataPlaneClient);
  iotDataPlaneClientMock.on(DeleteThingShadowCommand, {
    thingName: expected.invalidThing.thingName,
    shadowName: expected.invalidThing.shadowName,
  }).rejects(expected.invalidThingShadowError);
  const response = await deleteThingShadow.handler({
    pathParameters: {
      thingName: expected.invalidThing.thingName,
      shadowName: expected.invalidThing.shadowName,
    },
  });
  expect(response.statusCode).toEqual(404);
  iotDataPlaneClientMock.restore();
});