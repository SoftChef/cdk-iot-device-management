import * as crypto from 'crypto';
import {
  DynamoDBDocumentClient,
  ScanCommand,
  QueryCommand,
  PutCommand,
  BatchWriteCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
} from '@aws-sdk/lib-dynamodb';
import {
  mockClient,
} from 'aws-sdk-client-mock';
import * as listCategories from '../../lambda-assets/files/list-categories/app';
import * as createCategory from '../../lambda-assets/files/create-category/app';
import * as deleteCategory from '../../lambda-assets/files/delete-category/app';
import * as getCategory from '../../lambda-assets/files/get-category/app';
import * as updateCategory from '../../lambda-assets/files/update-category/app';
import * as createFile from '../../lambda-assets/files/create-file/app';
import * as getFile from '../../lambda-assets/files/get-file/app';
import * as getFiles from '../../lambda-assets/files/get-files/app';
import * as listFilesByCategory from '../../lambda-assets/files/list-files-by-category/app';
import * as listFiles from '../../lambda-assets/files/list-files/app';
import * as updateFile from '../../lambda-assets/files/update-file/app';
import * as deleteFile from '../../lambda-assets/files/delete-file/app';
const CATEGORY_TABLE_NAME = 'category_table_name';
const FILE_TABLE_NAME = 'file_table_name';

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

const expectedInvalidCategoryExecution = {
  categoryId: '3afcc48lfdldbfd83fa4031498f21d64',
};

const expectedFile = {
  fileId: '550e8400-e29b-41d4-a716-446655440000',
  categoryId: expectedCategory.Item.categoryId,
  version: '1.0',
  location: 'https://example.com/Test',
  checksum: '0CBC6611F5540BD0809A388DC95A615B',
  checksumType: 'md5',
  locale: 'zh_TW',
  summary: 'zh_TW summary',
  description: 'Test',
};

const expectedInvalidFileExecution = {
  fileId: 'not-exists-file-id',
  version: 'not-exists-version',
  checksum: 'not-exist-checksum',
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
      expectedCategory.Item,
    ],
    LastEvaluatedKey: {
      categoryId: '48cc48e0d55bfd83114031498f21d640',
    },
  },
  file: {
    ...expectedFile,
    createAt: Date.now(),
    updatedAt: Date.now(),
  },
  newFile: {
    ...expectedFile,
    createAt: Date.now(),
    updatedAt: Date.now(),
  },
  files: [
    {
      ...expectedFile,
      createAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      ...expectedFile,
      createAt: Date.now(),
      updatedAt: Date.now(),
    },
  ],
};

beforeEach(() => {
  process.env = {
    CATEGORY_TABLE_NAME,
    FILE_TABLE_NAME,
  };
});

test('Create category success', async () => {
  const md5 = crypto.createHash('md5');
  const documentClientMock = mockClient(DynamoDBDocumentClient);
  documentClientMock.on(GetCommand, {
    TableName: CATEGORY_TABLE_NAME,
    Key: {
      categoryId: md5.update(expected.newCategory.name).digest('hex'),
    },
  }).resolves({});
  documentClientMock.on(PutCommand, {
    TableName: CATEGORY_TABLE_NAME,
    ...expectedCategory,
  }).resolves({});
  const response = await createCategory.handler({
    body: {
      name: expected.newCategory.name,
      description: expected.newCategory.description,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body.created).toEqual(true);
  documentClientMock.restore();
});

test('Create category with invalid inputs expect failure', async () => {
  const documentClientMock = mockClient(DynamoDBDocumentClient);
  documentClientMock.on(PutCommand).resolves({});
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
  documentClientMock.restore();
});

test('Create category already exists', async () => {
  const md5 = crypto.createHash('md5');
  const documentClientMock = mockClient(DynamoDBDocumentClient);
  documentClientMock.on(GetCommand, {
    TableName: CATEGORY_TABLE_NAME,
    Key: {
      categoryId: md5.update(expected.newCategory.name).digest('hex'),
    },
  }).resolves(expected.category);
  const response = await createCategory.handler({
    body: {
      name: expected.newCategory.name,
      description: expected.newCategory.description,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(422);
  expect(body.error).toEqual('Category already exists.');
  documentClientMock.restore();
});

test('Get category success', async () => {
  const documentClientMock = mockClient(DynamoDBDocumentClient);
  documentClientMock.on(GetCommand, {
    TableName: CATEGORY_TABLE_NAME,
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
  documentClientMock.restore();
});

test('Get category with does not exist category', async () => {
  const documentClientMock = mockClient(DynamoDBDocumentClient);
  documentClientMock.on(GetCommand, {
    TableName: CATEGORY_TABLE_NAME,
    Key: {
      categoryId: expectedInvalidCategoryExecution.categoryId,
    },
  }).resolves({});
  const response = await getCategory.handler({
    pathParameters: {
      categoryId: expectedInvalidCategoryExecution.categoryId,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(404);
  expect(body.error).toEqual('Category does not exist.');
  documentClientMock.restore();
});

test('Class 1: List categories success', async () => {
  const documentClientMock = mockClient(DynamoDBDocumentClient);
  documentClientMock.on(ScanCommand, {
    TableName: CATEGORY_TABLE_NAME,
    ExclusiveStartKey: {
      Key: expected.listCategories.LastEvaluatedKey,
    },
  }).resolves(expected.listCategories);
  const response = await listCategories.handler({
    queryStringParameters: {
      nextToken: Buffer.from(
        JSON.stringify(expected.listCategories.LastEvaluatedKey),
      ).toString('base64'),
    },
  });
  expect(response.statusCode).toEqual(200);
  documentClientMock.restore();
});

test('Class 2: List categories success', async () => {
  const documentClientMock = mockClient(DynamoDBDocumentClient);
  documentClientMock.on(QueryCommand, {
    TableName: CATEGORY_TABLE_NAME,
    IndexName: 'query-by-parent-id',
    KeyConditionExpression: '#parentId = :parentId',
    ExpressionAttributeNames: {
      '#parentId': 'parentId',
    },
    ExpressionAttributeValues: {
      ':parentId': expectedCategory.Item.parentId,
    },
  }).resolves(expected.listCategories);
  const response = await listCategories.handler({
    queryStringParameters: {
      parentId: expected.category.Item.parentId,
    },
  });
  expect(response.statusCode).toEqual(200);
  documentClientMock.restore();
});

test('Update category success', async () => {
  const documentClientMock = mockClient(DynamoDBDocumentClient);
  documentClientMock.on(GetCommand, {
    TableName: CATEGORY_TABLE_NAME,
    Key: {
      categoryId: expected.category.Item.categoryId,
    },
  }).resolves(expected.category);
  documentClientMock.on(UpdateCommand, {
    TableName: CATEGORY_TABLE_NAME,
    Key: {
      categoryId: expected.category.Item.categoryId,
    },
  }).resolves({});
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
  documentClientMock.restore();
});

test('Update with does not exist category', async () => {
  const documentClientMock = mockClient(DynamoDBDocumentClient);
  documentClientMock.on(GetCommand, {
    TableName: CATEGORY_TABLE_NAME,
    Key: {
      categoryId: expectedInvalidCategoryExecution.categoryId,
    },
  }).resolves({});
  const response = await updateCategory.handler({
    pathParameters: {
      categoryId: expectedInvalidCategoryExecution.categoryId,
    },
    body: {
      description: expected.category.Item.description,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(404);
  expect(body.error).toEqual('Not found.');
  documentClientMock.restore();
});

test('Delete category success', async () => {
  const documentClientMock = mockClient(DynamoDBDocumentClient);
  documentClientMock.on(DeleteCommand, {
    TableName: CATEGORY_TABLE_NAME,
    Key: {
      categoryId: expected.category.Item.categoryId,
    },
  }).resolves({});
  const response = await deleteCategory.handler({
    pathParameters: {
      categoryId: expected.category.Item.categoryId,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body.deleted).toEqual(true);
  documentClientMock.restore();
});

test('Create files API success', async () => {
  const documentClientMock = mockClient(DynamoDBDocumentClient);
  documentClientMock.on(GetCommand, {
    TableName: process.env.CATEGORY_TABLE_NAME,
    Key: {
      categoryId: expected.newFile.categoryId,
    },
  }).resolves({
    Item: {
      categoryId: expected.newFile.categoryId,
    },
  });
  documentClientMock.on(QueryCommand, {
    TableName: FILE_TABLE_NAME,
    IndexName: 'get-file-by-checksum-and-version',
    KeyConditionExpression: '#checksum = :checksum and #version = :version',
    ExpressionAttributeNames: {
      '#checksum': 'checksum',
      '#version': 'version',
    },
    ExpressionAttributeValues: {
      ':checksum': expected.newFile.checksum,
      ':version': expected.newFile.version,
    },
  }).resolves({});
  documentClientMock.on(BatchWriteCommand, {
    RequestItems: {
      [`${FILE_TABLE_NAME}`]: [
        {
          PutRequest: {
            Item: expected.newFile,
          },
        },
        {
          PutRequest: {
            Item: expected.newFile,
          },
        },
        {
          PutRequest: {
            Item: expected.newFile,
          },
        },
      ],
    },
  }).resolves({});
  const response = await createFile.handler({
    body: {
      files: [
        {
          location: expected.newFile.location,
          checksumType: expected.newFile.checksumType,
          checksum: expected.newFile.checksum,
          version: expected.newFile.version,
          categoryId: expected.newFile.categoryId,
          locales: [{
            locale: expected.newFile.locale,
            summary: expected.newFile.summary,
            description: expected.newFile.description,
          }],
        },
        {
          location: expected.newFile.location,
          checksumType: expected.newFile.checksumType,
          checksum: expected.newFile.checksum,
          version: expected.newFile.version,
          categoryId: expected.newFile.categoryId,
          locales: [{
            locale: expected.newFile.locale,
            summary: expected.newFile.summary,
            description: expected.newFile.description,
          },
          {
            locale: expected.newFile.locale,
            summary: expected.newFile.summary,
            description: expected.newFile.description,
          }],
        },
      ],
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body.created).toEqual(true);
  documentClientMock.restore();
});

test('Create files with does not exist category', async () => {
  const documentClientMock = mockClient(DynamoDBDocumentClient);
  documentClientMock.on(GetCommand, {
    TableName: CATEGORY_TABLE_NAME,
    Key: {
      categoryId: expected.newFile.categoryId,
    },
  }).resolves({});
  const response = await createFile.handler({
    body: {
      files: [
        {
          location: expected.newFile.location,
          checksumType: expected.newFile.checksumType,
          checksum: expected.newFile.checksum,
          version: expected.newFile.version,
          categoryId: expected.newFile.categoryId,
          locales: [{
            locale: expected.newFile.locale,
            summary: expected.newFile.summary,
            description: expected.newFile.description,
          },
          {
            locale: expected.newFile.locale,
            summary: expected.newFile.summary,
            description: expected.newFile.description,
          }],
        },
      ],
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(422);
  expect(body.error).toEqual('Category does not exist.');
  documentClientMock.restore();
});

test('Create file with invalid inputs expect failure (value in files array)', async () => {
  const documentClientMock = mockClient(DynamoDBDocumentClient);
  const response = await createFile.handler({
    body: {
      files: [
        {
          location: '',
          checksumType: '',
          checksum: '',
          version: '',
          categoryId: '',
          locales: [{
            locale: '',
            summary: '',
            description: '',
          },
          {
            locale: '',
            summary: '',
            description: '',
          }],
        },
      ],
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(422);
  expect(body.error).toEqual([
    {
      label: 'files[0].location',
      key: 'location',
      value: '',
      message: expect.any(String),
    },
    {
      label: 'files[0].checksumType',
      key: 'checksumType',
      value: '',
      message: expect.any(String),
    },
    {
      label: 'files[0].checksum',
      key: 'checksum',
      value: '',
      message: expect.any(String),
    },
    {
      label: 'files[0].version',
      key: 'version',
      value: '',
      message: expect.any(String),
    },
    {
      label: 'files[0].categoryId',
      key: 'categoryId',
      value: '',
      message: expect.any(String),
    },
    {
      label: 'files[0].locales[0].locale',
      key: 'locale',
      value: '',
      message: expect.any(String),
    },
    {
      label: 'files[0].locales[1].locale',
      key: 'locale',
      value: '',
      message: expect.any(String),
    },
  ]);
  documentClientMock.restore();
});

test('Create file with invalid inputs expect failure (files array not exist)', async () => {
  const documentClientMock = mockClient(DynamoDBDocumentClient);
  const response = await createFile.handler({
    body: {
      location: '',
      checksumType: '',
      checksum: '',
      version: '',
      categoryId: '',
      locales: [{
        locale: '',
        summary: '',
        description: '',
      },
      {
        locale: '',
        summary: '',
        description: '',
      }],
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(422);
  expect(body.error).toEqual([
    {
      label: 'files',
      key: 'files',
      value: null,
      message: expect.any(String),
    },
  ]);
  documentClientMock.restore();
});

test('Get file API success', async () => {
  const documentClientMock = mockClient(DynamoDBDocumentClient);
  documentClientMock.on(GetCommand, {
    TableName: FILE_TABLE_NAME,
    Key: {
      fileId: expected.file.fileId,
    },
  }).resolves({
    Item: expected.file,
  });
  const response = await getFile.handler({
    pathParameters: {
      fileId: expected.file.fileId,
    },
  });
  expect(response.statusCode).toEqual(200);
  documentClientMock.restore();
});

test('Get file with invalid inputs expect failure', async () => {
  const documentClientMock = mockClient(DynamoDBDocumentClient);
  documentClientMock.on(GetCommand, {
    TableName: FILE_TABLE_NAME,
    Key: {
      fileId: expected.file.fileId,
    },
  }).resolves({});
  const response = await getFile.handler({
    pathParameters: {
      fileId: expected.file.fileId,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(404);
  expect(body.error).toEqual('File not found.');
  documentClientMock.restore();
});

test('Get file API success', async () => {
  const documentClientMock = mockClient(DynamoDBDocumentClient);
  documentClientMock.on(QueryCommand, {
    TableName: FILE_TABLE_NAME,
    IndexName: 'get-file-by-checksum-and-version',
    KeyConditionExpression: '#checksum = :checksum and #version = :version',
    ExpressionAttributeNames: {
      '#checksum': 'checksum',
      '#version': 'version',
    },
    ExpressionAttributeValues: {
      ':checksum': expected.file.checksum,
      ':version': expected.file.version,
    },
  }).resolves({
    Items: expected.files,
  });
  const response = await getFiles.handler({
    pathParameters: {
      checksum: expected.file.checksum,
      version: expected.file.version,
    },
  });
  expect(response.statusCode).toEqual(200);
  documentClientMock.restore();
});

test('Get file with invalid inputs expect failure', async () => {
  const documentClientMock = mockClient(DynamoDBDocumentClient);
  documentClientMock.on(QueryCommand, {
    TableName: FILE_TABLE_NAME,
    IndexName: 'get-file-by-checksum-and-version',
    KeyConditionExpression: '#checksum = :checksum and #version = :version',
    ExpressionAttributeNames: {
      '#checksum': 'checksum',
      '#version': 'version',
    },
    ExpressionAttributeValues: {
      ':checksum': expectedInvalidFileExecution.checksum,
      ':version': expectedInvalidFileExecution.version,
    },
  }).resolves({});
  const response = await getFiles.handler({
    pathParameters: {
      checksum: expectedInvalidFileExecution.checksum,
      version: expectedInvalidFileExecution.version,
    },
  });
  expect(response.statusCode).toEqual(404);
  documentClientMock.restore();
});

test('List files API success', async () => {
  const documentClientMock = mockClient(DynamoDBDocumentClient);
  documentClientMock.on(ScanCommand, {
    TableName: FILE_TABLE_NAME,
  }).resolves({
    Items: expected.files,
  });
  const response = await listFiles.handler({});
  expect(response.statusCode).toEqual(200);
  documentClientMock.restore();
});

test('List files by category API success', async () => {
  const documentClientMock = mockClient(DynamoDBDocumentClient);
  documentClientMock.on(QueryCommand, {
    TableName: process.env.FILE_TABLE_NAME,
    IndexName: 'query-by-category-id-and-locale',
    KeyConditionExpression: '#categoryId = :categoryId and #locale = :locale',
    ExpressionAttributeNames: {
      '#categoryId': 'categoryId',
      '#locale': 'locale',
    },
    ExpressionAttributeValues: {
      ':categoryId': expected.file.categoryId,
      ':locale': expected.file.locale,
    },
  }).resolves({
    Items: expected.files,
  });
  const response = await listFilesByCategory.handler({
    pathParameters: {
      categoryId: expected.file.categoryId,
    },
    queryStringParameters: {
      locale: expected.file.locale,
    },
  });
  expect(response.statusCode).toEqual(200);
  documentClientMock.restore();
});

test('Update file API', async () => {
  const documentClientMock = mockClient(DynamoDBDocumentClient);
  documentClientMock.on(QueryCommand, {
    TableName: FILE_TABLE_NAME,
    IndexName: 'get-file-by-checksum-and-version',
    KeyConditionExpression: '#checksum = :checksum and #version = :version',
    ExpressionAttributeNames: {
      '#checksum': 'checksum',
      '#version': 'version',
    },
    ExpressionAttributeValues: {
      ':checksum': expected.file.checksum,
      ':version': expected.file.version,
    },
  }).resolves({
    Items: expected.files,
  });
  documentClientMock.on(BatchWriteCommand, {
    RequestItems: {
      [`${FILE_TABLE_NAME}`]: [{
        PutRequest: {
          Item: expected.file,
        },
      }],
    },
  }).resolves({});
  const response = await updateFile.handler({
    pathParameters: {
      version: expected.file.version,
    },
    body: {
      files: [
        {
          fileId: expected.file.fileId,
          categoryId: expected.file.categoryId,
          checksumType: expected.file.checksum,
          checksum: expected.file.checksum,
          version: expected.file.version,
          location: expected.file.location,
          locales: [
            {
              locale: expected.file.locale,
              summary: expected.file.summary,
              description: expected.file.description,
            },
          ],
        },
      ],
    },
  });
  expect(response.statusCode).toEqual(200);
  documentClientMock.restore();
});

test('Delete file API', async () => {
  const documentClientMock = mockClient(DynamoDBDocumentClient);
  documentClientMock.on(QueryCommand, {
    TableName: FILE_TABLE_NAME,
    IndexName: 'get-file-by-checksum-and-version',
    KeyConditionExpression: '#checksum = :checksum and #version = :version',
    ExpressionAttributeNames: {
      '#checksum': 'checksum',
      '#version': 'version',
    },
    ExpressionAttributeValues: {
      ':checksum': expected.file.checksum,
      ':version': expected.file.version,
    },
  }).resolves({
    Items: [{
      checksum: expected.file.checksum,
      version: expected.file.version,
      fileId: expected.file.fileId,
    }],
  });
  documentClientMock.on(BatchWriteCommand, {
    RequestItems: {
      [`${FILE_TABLE_NAME}`]: [{
        DeleteRequest: {
          Key: {
            fileId: expected.file.fileId,
          },
        },
      },
      {
        DeleteRequest: {
          Key: {
            fileId: expected.file.fileId,
          },
        },
      },
      {
        DeleteRequest: {
          Key: {
            fileId: expected.file.fileId,
          },
        },
      }],
    },
  }).resolves({});
  const response = await deleteFile.handler({
    pathParameters: {
      checksum: expected.file.checksum,
      version: expected.file.version,
    },
  });
  expect(response.statusCode).toEqual(200);
  documentClientMock.restore();
});