import {
  DynamoDBDocumentClient,
  ScanCommand,
  QueryCommand,
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
} from '@aws-sdk/lib-dynamodb';
import {
  mockClient,
  AwsError,
} from 'aws-sdk-client-mock';
import * as createCategory from '../../lambda-assets/files/create-category/app';
import * as createFile from '../../lambda-assets/files/create-file/app';
import * as deleteCategory from '../../lambda-assets/files/delete-category/app';
import * as deleteFile from '../../lambda-assets/files/delete-file/app';
import * as getCategory from '../../lambda-assets/files/get-category/app';
import * as getFile from '../../lambda-assets/files/get-file/app';
import * as listCategories from '../../lambda-assets/files/list-categories/app';
import * as listFilesByCategory from '../../lambda-assets/files/list-files-by-category/app';
import * as listFiles from '../../lambda-assets/files/list-files/app';
import * as updateCategory from '../../lambda-assets/files/update-category/app';
import * as updateFile from '../../lambda-assets/files/update-file/app';

const expectedCategory = {
  Item: {
    categoryId: '48cc48e0d68bfd83fa4031498f21d640',
    name: 'name',
    parentId: 'name-01',
    description: 'description-00',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
};

const expected = {
  newCategory: {
    categoryId: expectedCategory.Item.categoryId,
    name: expectedCategory.Item.name,
    description: expectedCategory.Item.description,
    createdAt: expectedCategory.Item.createdAt,
    updatedAt: expectedCategory.Item.updatedAt,
  },
  category: expectedCategory,
  listCategories: {
    Items: [
      expectedCategory,
    ],
    nextToken: {
      categoryId: '48cc48e0d55bfd83114031498f21d640',
    },
  },
};

const expectedFile = {
  DBData: {
    fileId: 'Test', //checksum
    checksumType: 'md5',
    version: 'Test',
    categoryId: 'Test',
    location: 'https://example.com/Test',
    nextToken: '12345',
    description: 'Test',
    createAt: 'Test',
    updatedAt: 'Test',
  },
  //: expectedInvalidJob,
  invalidDBError: <AwsError>{
    Code: 'ResourceNotFoundException',
  },
};

test('Create category success', async () => {
  const ddbMock = mockClient(DynamoDBDocumentClient);
  ddbMock.on(PutCommand).resolves;
  const response = await createCategory.handler({
    body: {
      name: expected.newCategory.name,
      description: expected.newCategory.description,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body.created).toEqual(true);
  ddbMock.restore();
});

test('Create category with invalid inputs expect failure', async () => {
  const ddbMock = mockClient(DynamoDBDocumentClient);
  ddbMock.on(PutCommand).resolves;
  const response = await createCategory.handler({});
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(422);
  expect(body.error).toEqual([
    {
      label: 'name',
      key: 'name',
      value: null,
      message: expect.any(String),
    },
  ]);
  ddbMock.restore();
});

test('Get category success', async () => {
  const ddbMock = mockClient(DynamoDBDocumentClient);
  ddbMock.on(GetCommand, {
    Key: {
      categoryId: expected.category.Item.categoryId,
    },
  }).resolves(expected.category);
  const response = await getCategory.handler({
    pathParameters: {
      categoryId: expected.category.Item.categoryId,
    },
  });
  expect(response.statusCode).toEqual(200);
  ddbMock.restore();
});

test('Get category with invalid jobId expect failure', async () => {
  const ddbMock = mockClient(DynamoDBDocumentClient);
  ddbMock.on(GetCommand).resolves({
    Item: {},
  });
  const response = await getCategory.handler({
    pathParameters: {
      categoryId: expected.category.Item.categoryId,
    },
  });
  expect(response.statusCode).toEqual(404);
  ddbMock.restore();
});

test('Calss 1: List categories success', async () => {
  const ddbMock = mockClient(DynamoDBDocumentClient);
  ddbMock.on(ScanCommand).resolves(expected.listCategories);
  const response = await listCategories.handler({
    queryStringParameters: {
      nextToken: expected.listCategories.nextToken,
    },
  });
  expect(response.statusCode).toEqual(200);
  ddbMock.restore();
});

test('Calss 2: List categories success', async () => {
  const ddbMock = mockClient(DynamoDBDocumentClient);
  ddbMock.on(QueryCommand).resolves(expected.listCategories);
  const response = await listCategories.handler({
    queryStringParameters: {
      parentId: expected.category.Item.parentId,
    },
  });
  expect(response.statusCode).toEqual(200);
  ddbMock.restore();
});

test('Update category success', async () => {
  const ddbMock = mockClient(DynamoDBDocumentClient);
  ddbMock.on(UpdateCommand).resolves;
  const response = await updateCategory.handler({
    pathParameters: {
      categoryId: expected.category.Item.categoryId,
    },
    body: {
      description: expected.category.Item.description,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body.updated).toEqual(true);
  ddbMock.restore();
});

test('Delete category success', async () => {
  const ddbMock = mockClient(DynamoDBDocumentClient);
  ddbMock.on(DeleteCommand).resolves;
  const response = await deleteCategory.handler({
    pathParameters: {
      categoryId: expected.category.Item.categoryId,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body.deleted).toEqual(true);
  ddbMock.restore();
});

test('Create file API success', async () => {
  const ddbMock = mockClient(DynamoDBDocumentClient);
  ddbMock.on(PutCommand).resolves({});
  const response = await createFile.handler({
    body: {
      location: expectedFile.DBData.location,
      checksum: expectedFile.DBData.fileId,
      checksumType: expectedFile.DBData.checksumType,
      version: expectedFile.DBData.version,
      categoryId: expectedFile.DBData.categoryId,
      describe: expectedFile.DBData.description,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body.created).toEqual(true);
  ddbMock.restore();
});

test('Create file with invalid inputs expect failure', async () => {
  const ddbMock = mockClient(DynamoDBDocumentClient);
  const response = await createFile.handler({});
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(422);
  expect(body.error).toEqual([
    {
      label: 'location',
      key: 'location',
      value: null,
      message: expect.any(String),
    },
    {
      label: 'checksum',
      key: 'checksum',
      value: null,
      message: expect.any(String),
    },
    {
      label: 'checksumType',
      key: 'checksumType',
      value: null,
      message: expect.any(String),
    },
    {
      label: 'version',
      key: 'version',
      value: null,
      message: expect.any(String),
    },
    {
      label: 'categoryId',
      key: 'categoryId',
      value: null,
      message: expect.any(String),
    },
  ]);
  ddbMock.restore();
});

test('Get file API success', async () => {
  const ddbMock = mockClient(DynamoDBDocumentClient);
  ddbMock.on(GetCommand).resolves({
    Item: {
      fileId: expectedFile.DBData.fileId,
      version: expectedFile.DBData.version,
      categoryId: expectedFile.DBData.categoryId,
      location: expectedFile.DBData.location,
      description: expectedFile.DBData.description,
      createAt: expectedFile.DBData.createAt,
      updatedAt: expectedFile.DBData.updatedAt,
    },
  });
  const response = await getFile.handler({
    pathParameters: {
      fileId: expectedFile.DBData.fileId,
    },
  });
  expect(response.statusCode).toEqual(200);
  ddbMock.restore();
});

test('Get file with invalid inputs expect failure', async () => {
  const ddbMock = mockClient(DynamoDBDocumentClient);
  ddbMock.on(GetCommand).resolves({
    Item: {},
  });
  const response = await getFile.handler({
    pathParameters: {
      fileId: '',
      version: '',
    },
  });
  expect(response.statusCode).toEqual(404);
  ddbMock.restore();
});

test('List files API success', async () => {
  const ddbMock = mockClient(DynamoDBDocumentClient);
  ddbMock.on(ScanCommand).resolves({
    Items: [
      {
        fileId: expectedFile.DBData.fileId,
        version: expectedFile.DBData.version,
        categoryId: expectedFile.DBData.categoryId,
        location: expectedFile.DBData.location,
        description: expectedFile.DBData.description,
        createAt: expectedFile.DBData.createAt,
        updatedAt: expectedFile.DBData.updatedAt,
      },
      {
        fileId: expectedFile.DBData.fileId,
        version: expectedFile.DBData.version,
        categoryId: expectedFile.DBData.categoryId,
        location: expectedFile.DBData.location,
        description: expectedFile.DBData.description,
        createAt: expectedFile.DBData.createAt,
        updatedAt: expectedFile.DBData.updatedAt,
      },
      {
        fileId: expectedFile.DBData.fileId,
        version: expectedFile.DBData.version,
        categoryId: expectedFile.DBData.categoryId,
        location: expectedFile.DBData.location,
        description: expectedFile.DBData.description,
        createAt: expectedFile.DBData.createAt,
        updatedAt: expectedFile.DBData.updatedAt,
      },
    ],
  });
  const response = await listFiles.handler({
    pathParameters: {
      categoryId: expectedFile.DBData.categoryId,
    },
  });
  expect(response.statusCode).toEqual(200);
  ddbMock.restore();
});

test('List files by category API success', async () => {
  const ddbMock = mockClient(DynamoDBDocumentClient);
  ddbMock.on(QueryCommand).resolves({
    Items: [
      {
        fileId: expectedFile.DBData.fileId,
        version: expectedFile.DBData.version,
        categoryId: expectedFile.DBData.categoryId,
        location: expectedFile.DBData.location,
        description: expectedFile.DBData.description,
        createAt: expectedFile.DBData.createAt,
        updatedAt: expectedFile.DBData.updatedAt,
      },
      {
        fileId: expectedFile.DBData.fileId,
        version: expectedFile.DBData.version,
        categoryId: expectedFile.DBData.categoryId,
        location: expectedFile.DBData.location,
        description: expectedFile.DBData.description,
        createAt: expectedFile.DBData.createAt,
        updatedAt: expectedFile.DBData.updatedAt,
      },
      {
        fileId: expectedFile.DBData.fileId,
        version: expectedFile.DBData.version,
        categoryId: expectedFile.DBData.categoryId,
        location: expectedFile.DBData.location,
        description: expectedFile.DBData.description,
        createAt: expectedFile.DBData.createAt,
        updatedAt: expectedFile.DBData.updatedAt,
      },
    ],
  });
  const response = await listFilesByCategory.handler({
    pathParameters: {
      categoryId: expectedFile.DBData.categoryId,
    },
  });
  expect(response.statusCode).toEqual(200);
  ddbMock.restore();
});

test('Update file API', async () => {
  const ddbMock = mockClient(DynamoDBDocumentClient);
  ddbMock.on(UpdateCommand).resolves({});
  const response = await updateFile.handler({
    pathParameters: {
      categoryId: expectedFile.DBData.categoryId,
    },
    body: {
      categoryId: expectedFile.DBData.categoryId,
    },
  });
  expect(response.statusCode).toEqual(200);
  ddbMock.restore();
});

test('Delete file API', async () => {
  const ddbMock = mockClient(DynamoDBDocumentClient);
  ddbMock.on(DeleteCommand).resolves({});
  const response = await deleteFile.handler({
    pathParameters: {
      fileId: 'meow',
    },
  });
  expect(response.statusCode).toEqual(200);
  ddbMock.restore();
});