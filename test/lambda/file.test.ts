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

const expectedFiles = {
  Item: {
    fileId: {
      zh_TW: '550e8400-e29b-41d4-a716-446655440000',
      zh_CN: '550e8400-e29b-41d4-a716-446655440001',
      en_US: '550e8400-e29b-41d4-a716-446655440002',
    },
    categoryId: expectedCategory.Item.categoryId,
    version: '1.0',
    location: 'https://example.com/Test',
    checksum: '0CBC6611F5540BD0809A388DC95A615B',
    checksumType: 'md5',
    locale: {
      zh_TW: 'zh_TW',
      zh_CN: 'zh_CN',
      en_US: 'en_US',
    },
    summary: {
      zh_TW: 'zh_TW summary',
      zh_CN: 'zh_CN summary',
      en_US: 'en_US summary',
    },
    description: 'Test',
    createAt: Date.now(),
    updatedAt: Date.now(),
  },
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
  newFiles: {
    location: expectedFiles.Item.location,
    checksum: expectedFiles.Item.checksum,
    checksumType: expectedFiles.Item.checksumType,
    summary: expectedFiles.Item.summary,
    locale: expectedFiles.Item.locale,
    version: expectedFiles.Item.version,
    categoryId: expectedFiles.Item.categoryId,
    description: expectedFiles.Item.description,
  },
  files: expectedFiles,
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


test('Create file API success', async () => {
  const documentClientMock = mockClient(DynamoDBDocumentClient);
  documentClientMock.on(GetCommand, {
    TableName: process.env.CATEGORY_TABLE_NAME,
    Key: {
      categoryId: expected.category.Item.categoryId,
    },
  }).resolves({
    Item: {
      categoryId: expected.category.Item.categoryId,
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
      ':checksum': expected.newFiles.checksum,
      ':version': expected.newFiles.version,
    },
  }).resolves({});
  documentClientMock.on(BatchWriteCommand, {
    RequestItems: {
      fileTable: [{
        PutRequest: {
          Item: {
            location: expected.newFiles.location,
            checksum: expected.newFiles.checksum,
            checksumType: expected.newFiles.checksumType,
            version: expected.newFiles.version,
            locale: expected.newFiles.locale.zh_TW,
            summary: expected.newFiles.summary.zh_TW,
            categoryId: expected.newFiles.categoryId,
            description: expected.newFiles.description,
          },
        },
      },
      {
        PutRequest: {
          Item: {
            location: expected.newFiles.location,
            checksum: expected.newFiles.checksum,
            checksumType: expected.newFiles.checksumType,
            version: expected.newFiles.version,
            locale: expected.newFiles.locale.zh_CN,
            summary: expected.newFiles.summary.zh_CN,
            categoryId: expected.newFiles.categoryId,
            description: expected.newFiles.description,
          },
        },
      },
      {
        PutRequest: {
          Item: {
            location: expected.newFiles.location,
            checksum: expected.newFiles.checksum,
            checksumType: expected.newFiles.checksumType,
            version: expected.newFiles.version,
            locale: expected.newFiles.locale.en_US,
            summary: expected.newFiles.summary.en_US,
            categoryId: expected.newFiles.categoryId,
            description: expected.newFiles.description,
          },
        },
      }],
    },
  }).resolves({});
  const response = await createFile.handler({
    body: {
      files: [
        {
          location: expected.newFiles.location,
          checksum: expected.newFiles.checksum,
          checksumType: expected.newFiles.checksumType,
          version: expected.newFiles.version,
          locale: expected.newFiles.locale.zh_TW,
          summary: expected.newFiles.summary.zh_TW,
          categoryId: expected.newFiles.categoryId,
          description: expected.newFiles.description,
        },
        {
          location: expected.newFiles.location,
          checksum: expected.newFiles.checksum,
          checksumType: expected.newFiles.checksumType,
          version: expected.newFiles.version,
          locale: expected.newFiles.locale.zh_CN,
          summary: expected.newFiles.summary.zh_CN,
          categoryId: expected.newFiles.categoryId,
          description: expected.newFiles.description,
        },
        {
          location: expected.newFiles.location,
          checksum: expected.newFiles.checksum,
          checksumType: expected.newFiles.checksumType,
          version: expected.newFiles.version,
          locale: expected.newFiles.locale.en_US,
          summary: expected.newFiles.summary.en_US,
          categoryId: expected.newFiles.categoryId,
          description: expected.newFiles.description,
        },
      ],
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body.created).toEqual(true);
  documentClientMock.restore();
});

test('Create file with does not exist category', async () => {
  const documentClientMock = mockClient(DynamoDBDocumentClient);
  documentClientMock.on(GetCommand, {
    TableName: CATEGORY_TABLE_NAME,
    Key: {
      categoryId: expected.newFiles.categoryId,
    },
  }).resolves({});
  const response = await createFile.handler({
    body: {
      files: [
        {
          location: expected.newFiles.location,
          checksum: expected.newFiles.checksum,
          checksumType: expected.newFiles.checksumType,
          version: expected.newFiles.version,
          locale: expected.newFiles.locale.zh_TW,
          summary: expected.newFiles.summary.zh_TW,
          categoryId: expected.newFiles.categoryId,
          description: expected.newFiles.description,
        },
        {
          location: expected.newFiles.location,
          checksum: expected.newFiles.checksum,
          checksumType: expected.newFiles.checksumType,
          version: expected.newFiles.version,
          locale: expected.newFiles.locale.zh_CN,
          summary: expected.newFiles.summary.zh_CN,
          categoryId: expected.newFiles.categoryId,
          description: expected.newFiles.description,
        },
        {
          location: expected.newFiles.location,
          checksum: expected.newFiles.checksum,
          checksumType: expected.newFiles.checksumType,
          version: expected.newFiles.version,
          locale: expected.newFiles.locale.en_US,
          summary: expected.newFiles.summary.en_US,
          categoryId: expected.newFiles.categoryId,
          description: expected.newFiles.description,
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
          checksum: '',
          checksumType: '',
          version: '',
          locale: '',
          summary: '',
          categoryId: '',
          description: '',
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
      label: 'files[0].locale',
      key: 'locale',
      value: '',
      message: expect.any(String),
    },
    {
      label: 'files[0].categoryId',
      key: 'categoryId',
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
      checksum: '',
      checksumType: '',
      version: '',
      locale: '',
      summary: '',
      categoryId: '',
      description: '',
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
  documentClientMock.on(QueryCommand, {
    TableName: FILE_TABLE_NAME,
    IndexName: 'get-file-by-checksum-and-version',
    KeyConditionExpression: '#checksum = :checksum and #version = :version',
    ExpressionAttributeNames: {
      '#checksum': 'checksum',
      '#version': 'version',
    },
    ExpressionAttributeValues: {
      ':checksum': expected.files.Item.checksum,
      ':version': expected.files.Item.version,
    },
  }).resolves({
    Items: [{
      location: expected.files.Item.location,
      checksum: expected.files.Item.checksum,
      checksumType: expected.files.Item.checksumType,
      version: expected.files.Item.version,
      locale: expected.files.Item.locale.zh_TW,
      summary: expected.files.Item.summary.zh_TW,
      categoryId: expected.files.Item.categoryId,
      description: expected.files.Item.description,
      createAt: expected.files.Item.createAt,
      updatedAt: expected.files.Item.updatedAt,
    },
    {
      location: expected.files.Item.location,
      checksum: expected.files.Item.checksum,
      checksumType: expected.files.Item.checksumType,
      version: expected.files.Item.version,
      locale: expected.files.Item.locale.zh_CN,
      summary: expected.files.Item.summary.zh_CN,
      categoryId: expected.files.Item.categoryId,
      description: expected.files.Item.description,
      createAt: expected.files.Item.createAt,
      updatedAt: expected.files.Item.updatedAt,
    },
    {
      location: expected.files.Item.location,
      checksum: expected.files.Item.checksum,
      checksumType: expected.files.Item.checksumType,
      version: expected.files.Item.version,
      locale: expected.files.Item.locale.en_US,
      summary: expected.files.Item.summary.en_US,
      categoryId: expected.files.Item.categoryId,
      description: expected.files.Item.description,
      createAt: expected.files.Item.createAt,
      updatedAt: expected.files.Item.updatedAt,
    }],
  });
  const response = await getFile.handler({
    pathParameters: {
      checksum: expected.files.Item.checksum,
      version: expected.files.Item.version,
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
  const response = await getFile.handler({
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
    Items: [{
      location: expected.files.Item.location,
      checksum: expected.files.Item.checksum,
      checksumType: expected.files.Item.checksumType,
      version: expected.files.Item.version,
      locale: expected.files.Item.locale.zh_TW,
      summary: expected.files.Item.summary.zh_TW,
      categoryId: expected.files.Item.categoryId,
      description: expected.files.Item.description,
      createAt: expected.files.Item.createAt,
      updatedAt: expected.files.Item.updatedAt,
    },
    {
      location: expected.files.Item.location,
      checksum: expected.files.Item.checksum,
      checksumType: expected.files.Item.checksumType,
      version: expected.files.Item.version,
      locale: expected.files.Item.locale.zh_CN,
      summary: expected.files.Item.summary.zh_CN,
      categoryId: expected.files.Item.categoryId,
      description: expected.files.Item.description,
      createAt: expected.files.Item.createAt,
      updatedAt: expected.files.Item.updatedAt,
    },
    {
      location: expected.files.Item.location,
      checksum: expected.files.Item.checksum,
      checksumType: expected.files.Item.checksumType,
      version: expected.files.Item.version,
      locale: expected.files.Item.locale.en_US,
      summary: expected.files.Item.summary.en_US,
      categoryId: expected.files.Item.categoryId,
      description: expected.files.Item.description,
      createAt: expected.files.Item.createAt,
      updatedAt: expected.files.Item.updatedAt,
    }],
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
      ':categoryId': expected.files.Item.categoryId,
      ':locale': expected.files.Item.locale.en_US,
    },
  }).resolves({
    Items: [
      {
        location: expected.files.Item.location,
        checksum: expected.files.Item.checksum,
        checksumType: expected.files.Item.checksumType,
        version: expected.files.Item.version,
        locale: expected.files.Item.locale.en_US,
        summary: expected.files.Item.summary.en_US,
        categoryId: expected.files.Item.categoryId,
        description: expected.files.Item.description,
        createAt: expected.files.Item.createAt,
        updatedAt: expected.files.Item.updatedAt,
      },
    ],
  });
  const response = await listFilesByCategory.handler({
    pathParameters: {
      categoryId: expected.files.Item.categoryId,
    },
    queryStringParameters: {
      locale: expected.files.Item.locale.en_US,
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
      ':checksum': expected.files.Item.checksum,
      ':version': expected.files.Item.version,
    },
  }).resolves({
    Items: [{
      checksum: expected.files.Item.checksum,
      version: expected.files.Item.version,
    }],
  });
  documentClientMock.on(UpdateCommand, {
    TableName: FILE_TABLE_NAME,
    Key: {
      fileId: expected.files.Item.fileId.en_US,
      version: expected.files.Item.version,
    },
    UpdateExpression: 'set #description = :description',
    ExpressionAttributeNames: {
      '#description': 'description',
    },
    ExpressionAttributeValues: {
      ':description': expected.files.Item.description,
    },
  }).resolves({});
  const response = await updateFile.handler({
    pathParameters: {
      fileId: expected.files.Item.fileId.en_US,
      version: expected.files.Item.version,
      checksum: expected.files.Item.checksum,
    },
    body: {
      files: [
        {
          fileId: expected.files.Item.fileId.en_US,
          locale: expected.files.Item.locale.en_US,
          summary: expected.files.Item.summary.en_US,
          description: expected.files.Item.description,
        },
      ],
    },
  });
  console.log(response);
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
      ':checksum': expected.files.Item.checksum,
      ':version': expected.files.Item.version,
    },
  }).resolves({
    Items: [{
      checksum: expected.files.Item.checksum,
      version: expected.files.Item.version,
      fileId: expected.files.Item.fileId,
    }],
  });
  documentClientMock.on(BatchWriteCommand, {
    RequestItems: {
      fileTable: [{
        DeleteRequest: {
          Key: {
            fileId: expected.files.Item.fileId.zh_TW,
          },
        },
      },
      {
        DeleteRequest: {
          Key: {
            fileId: expected.files.Item.fileId.zh_CN,
          },
        },
      },
      {
        DeleteRequest: {
          Key: {
            fileId: expected.files.Item.fileId.en_US,
          },
        },
      }],
    },
  }).resolves({});
  const response = await deleteFile.handler({
    pathParameters: {
      checksum: expected.files.Item.checksum,
      version: expected.files.Item.version,
    },
  });
  expect(response.statusCode).toEqual(200);
  documentClientMock.restore();
});