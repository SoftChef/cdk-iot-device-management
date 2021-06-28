import {
  GetThingShadowCommand,
  IoTDataPlaneClient,
  //   UpdateThingCommand,
  //GetThingShadowCommand,
  //ListNamedShadowsForThingCommand,
  //   DeleteThingShadowCommand,
} from '@aws-sdk/client-iot-data-plane';
import {
  mockClient,
  //   AwsError,
} from 'aws-sdk-client-mock';
// import * as deleteThing from '../../lambda-assets/things/delete-thing/app';
// import * as updateThing from '../../lambda-assets/things/update-thing/app';
//import * as listThingShadow from '../../lambda-assets/thing-shadow/list-thing-shadow/app';
import * as getThingShadow from '../../lambda-assets/thing-shadow/get-thing-shadow/app';

const expectedThingShadow = {
  metadata: {
    desired: {
      welcome: {
        timestamp: 1624519760,
      },
    },
    reported: {
      welcome: {
        timestamp: 1624519760,
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
const expectedInvalidThing = {
  thingName: 'NotExistsThing',
};
*/
const expected = {
  thingShadow: expectedThingShadow,
  thingName: 'Test',
  thingShadowName: 'Test',
  listThing: {
    things: [
      'test',
    ],
    nextToken: '12345',
  },
};

test('Get thing shadow success', async () => {
  const iotDataPlaneClientMock = mockClient(IoTDataPlaneClient);
  iotDataPlaneClientMock.on(GetThingShadowCommand, {
    thingName: expected.thingName,
  }).resolves({
    payload: new Uint8Array(
      Buffer.from(
        JSON.stringify(expected.thingShadow),
      ),
    ),
  });
  const response = await getThingShadow.handler({
    pathParameters: {
      thingName: expected.thingName,
    },
  });
  console.log(response);
  const body = JSON.parse(response.body);
  console.log(response.body);
  expect(body).toEqual(expected.thingShadow);
  expect(response.statusCode).toEqual(200);
  iotDataPlaneClientMock.restore();
});
/*
test('List thing success', async () => {
  const iotDataPlaneClientMock = mockClient(IoTDataPlaneClient);
  iotDataPlaneClientMock.on(ListNamedShadowsForThingCommand, {
  }).resolves({
    //things: expected.listThing.things,
  });
  const response = await listThingShadow.handler({});
  console.log(response);
  const body = JSON.parse(response.body);
  expect(Array.isArray(body.thing)).toBe(true);
  expect(body.thingShadow.payload)).toEqual(expected.thingShadow);
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


test('Update thing success', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(UpdateThingCommand, {
    thingName: expected.thing.thingName,
  }).resolves({});
  const response = await updateThing.handler({
    body: {
      thingName: expected.thing.thingName,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body.updated).toEqual(true);
  iotClientMock.restore;
});

test('Update thing with invalid input expect failure', async() => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(UpdateThingCommand, {
    thingName: '',
  }).rejects(expected.invalidThingError);
  const response = await updateThing.handler({
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

test('Update thing with invalid thingName expect failure', async () => {
  const iotClientMock = mockClient(IoTClient);
  iotClientMock.on(UpdateThingCommand, {
    thingName: '(((ﾟДﾟ;)))',
  }).rejects(expected.invalidThingError);
  const response = await updateThing.handler({
    body: {
      thingName: '(((ﾟДﾟ;)))',
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
    body: {
      thingName: expected.thing.thingName,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body.deleted).toEqual(true);
  iotClientMock.restore();
});
*/