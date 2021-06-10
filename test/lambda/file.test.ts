import * as AWS from 'aws-sdk';
import * as AWSMock from 'aws-sdk-mock';
// import * as createCategory from '../../lambda-assets/files/create-category/app';
import * as createFile from '../../lambda-assets/files/create-file/app';
//import * as deleteCategory from '../../lambda-assets/files/delete-category/app';
import * as deleteFile from '../../lambda-assets/files/delete-file/app';
// import * as getCategory from '../../lambda-assets/files/get-category/app';
import * as getFile from '../../lambda-assets/files/get-file/app';
// import * as listCategories from '../../lambda-assets/files/list-categories/app';
import * as listFiles from '../../lambda-assets/files/list-files/app';
// import * as updateCategory from '../../lambda-assets/files/update-category/app';
import * as updateFile from '../../lambda-assets/files/update-file/app';

AWS.config.region = 'local';
AWSMock.setSDKInstance(AWS);

test('Create category API', async () => {
  // const response = await createCategory.handler({});
});

test('Get category API', async () => {
  // const response = await getCategory.handler({});
});

test('List categories API', async () => {
  // const response = await listCategories.handler({});
});

test('Update category API', async () => {
  // const response = await updateCategory.handler({});
});

test('Delete category API', async () => {
  // const response = await deleteCategory.handler({});
});

test('Create file API', async () => {
  AWSMock.mock('DynamoDB.DocumentClient', 'put', (parameters: AWS.DynamoDB.PutItemInput, callback: Function) => {
    expect(parameters).resolves;
    callback(null, {});
  });
  const response = await createFile.handler({
    body: {
      location: 'Test',
      checksum: 'Test',
      version: 'Test',
      categoryId: 'Test',
      description: 'Test',
    },
  });
  expect(response.statusCode).toEqual(200);
});

test('Get file API', async () => {
  AWSMock.mock('DynamoDB.DocumentClient', 'get', (parameters: AWS.DynamoDB.GetItemInput, callback: Function) => {
    expect(parameters).resolves;
    callback(null, {
      Item: {
        fileId: 'Test',
      },
    });
  });
  const response = await getFile.handler({
    pathParameters: {
      categoryId: 'Test',
    },
  });
  expect(response.statusCode).toEqual(200);
});

test('List files API', async () => {
  AWSMock.mock('DynamoDB.DocumentClient', 'query', (parameters: AWS.DynamoDB.ListTablesInput, callback: Function) => {
    expect(parameters).resolves;
    callback(null, {});
  });
  const response = await listFiles.handler({});
  console.log(response);
  expect(response.statusCode).toEqual(200);
});

test('Update file API', async () => {
  AWSMock.mock('DynamoDB.DocumentClient', 'put', (parameters: AWS.DynamoDB.UpdateItemInput, callback: Function) => {
    expect(parameters).resolves;
    callback(null, {});
  });
  const response = await updateFile.handler({
    pathParameters: {
      categoryId: 'Test',
    },
    body: {
      description: 'Test',
    },
  });
  expect(response.statusCode).toEqual(200);
});

test('Delete file API', async () => {
  AWSMock.mock('DynamoDB.DocumentClient', 'delete', (parameters: AWS.DynamoDB.DeleteItemInput, callback: Function) => {
    expect(parameters).resolves;
    callback(null, {
      Item: {
        fileId: 'Test',
      },
    });
  });
  const response = await deleteFile.handler({
    queryStringParameters: {
      fileId: 'Test',
    },
  });
  expect(response.statusCode).toEqual(200);
});