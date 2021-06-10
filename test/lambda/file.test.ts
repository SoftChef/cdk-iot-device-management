import * as AWS from 'aws-sdk';
import * as AWSMock from 'aws-sdk-mock';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import * as createCategory from '../../lambda-assets/files/create-category/app';
// import * as createFile from '../../lambda-assets/files/create-file/app';
import * as deleteCategory from '../../lambda-assets/files/delete-category/app';
// import * as deleteFile from '../../lambda-assets/files/delete-file/app';
import * as getCategory from '../../lambda-assets/files/get-category/app';
// import * as getFile from '../../lambda-assets/files/get-file/app';
import * as listCategories from '../../lambda-assets/files/list-categories/app';
// import * as listFiles from '../../lambda-assets/files/list-files/app';
import * as updateCategory from '../../lambda-assets/files/update-category/app';
// import * as updateFile from '../../lambda-assets/files/update-file/app';

// AWS.config.region = 'local';
AWSMock.setSDKInstance(AWS);
AWS.config.region = 'ap-southeast-1';
// AWS.config.credentials = new AWS.SharedIniFileCredentials({
//   profile: 'bls-develop',
// });
const ddbMock = mockClient(DynamoDBDocumentClient);

test('Create category API', async () => {
  AWSMock.mock('DynamoDB.DocumentClient', 'put', (parameters: AWS.DynamoDB.PutItemInput, callback: Function) => {
    expect(parameters).resolves;
    callback(null, {});
  });
  const response = await createCategory.handler({
    body: {
      parentId: 'scvs',
    },
  });
  expect(response.statusCode).toEqual(200);
});

test('Get category API', async () => {
  ddbMock.on(GetCommand).resolves({
    Item: [{ categoryId: 'a', sk: 'b' }],
  });
  const response = await getCategory.handler({
    pathParameters: {
      categoryId: 'scvs',
    },
  });
  expect(response.statusCode).toEqual(200);
});

test('List categories API', async () => {
  AWSMock.mock('DynamoDB.DocumentClient', 'scan', (parameters: AWS.DynamoDB.ScanInput, callback: Function) => {
    expect(parameters).resolves;
    callback(null, {});
  });
  const response = await listCategories.handler({});
  expect(response.statusCode).toEqual(200);
});

test('List categories API', async () => {
  AWSMock.mock('DynamoDB.DocumentClient', 'query', (parameters: AWS.DynamoDB.QueryInput, callback: Function) => {
    expect(parameters).resolves;
    callback(null, { categoryId: 'foo', sk: 'bar' });
  });
  const response = await listCategories.handler({
    queryStringParameters: {
      categoryId: 'scvs',
    },
  });
  expect(response.statusCode).toEqual(200);
});

test('Update category API', async () => {
  AWSMock.mock('DynamoDB.DocumentClient', 'update', (parameters: AWS.DynamoDB.GetItemInput, callback: Function) => {
    expect(parameters).resolves;
    callback(null, {});
  });
  const response = await updateCategory.handler({
    pathParameters: {
      categoryId: 'scvs',
    },
    body: {
      description: 'scvs',
    },
  });
  expect(response.statusCode).toEqual(200);
});

test('Delete category API', async () => {
  AWSMock.mock('DynamoDB.DocumentClient', 'delete', (parameters: AWS.DynamoDB.GetItemInput, callback: Function) => {
    expect(parameters).resolves;
    callback(null, {});
  });
  const response = await deleteCategory.handler({
    pathParameters: {
      categoryId: 'scvs',
    },
  });
  expect(response.statusCode).toEqual(200);
});

test('Create file API', async() => {
  // const response = await createFile.handler({});
});

test('Get file API', async() => {
  // const response = await getFile.handler({});
});

test('List files API', async() => {
  // const response = await listFiles.handler({});
});

test('Update file API', async() => {
  // const response = await updateFile.handler({});
});

test('Delete file API', async() => {
  // const response = await deleteFile.handler({});
});