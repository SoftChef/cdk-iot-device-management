import { DynamoDBDocumentClient, ScanCommand, QueryCommand, PutCommand, GetCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { mockClient } from 'aws-sdk-client-mock';
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

const ddbMock = mockClient(DynamoDBDocumentClient);

const categorySeedList = [
  {
    categoryId: 'aa',
    parentId: 'aa',
    name: '',
    description: 'b',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }, {
    categoryId: 'bb',
    parentId: 'bb',
    name: '',
    description: 'cc',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }, {
    categoryId: 'aa-11',
    parentId: 'aa',
    name: '11',
    description: 'qazqaz',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

test('Create category API', async () => {
  ddbMock.on(PutCommand).resolves;
  const response = await createCategory.handler({
    body: {
      parentId: categorySeedList[0].parentId,
      description: categorySeedList[0].description,
    },
  });
  expect(response.statusCode).toEqual(200);
});

test('Get category API', async () => {
  ddbMock.on(GetCommand).resolves({
    Item: categorySeedList[0],
  });
  const response = await getCategory.handler({
    pathParameters: {
      categoryId: categorySeedList[0].categoryId,
    },
  });
  expect(response.statusCode).toEqual(200);
});

test('List categories API', async () => {
  ddbMock.on(ScanCommand).resolves({
    Items: categorySeedList,
  });
  const response = await listCategories.handler({});
  expect(response.statusCode).toEqual(200);
});

test('List categories API', async () => {
  ddbMock.on(QueryCommand).resolves({
    Items: categorySeedList,
  });
  const response = await listCategories.handler({
    queryStringParameters: {
      parentId: categorySeedList[0].parentId,
    },
  });
  expect(response.statusCode).toEqual(200);
});

test('Update category API', async () => {
  ddbMock.on(UpdateCommand).resolves;
  const response = await updateCategory.handler({
    pathParameters: {
      categoryId: categorySeedList[0].categoryId,
    },
    body: {
      description: categorySeedList[0],
    },
  });
  expect(response.statusCode).toEqual(200);
});

test('Delete category API', async () => {
  ddbMock.on(DeleteCommand).resolves;
  const response = await deleteCategory.handler({
    pathParameters: {
      categoryId: categorySeedList[0].categoryId,
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