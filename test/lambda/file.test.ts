import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
  QueryCommand,
  ScanCommand,
} from '@aws-sdk/lib-dynamodb';
import { mockClient, AwsError } from 'aws-sdk-client-mock';
// import * as createCategory from '../../lambda-assets/files/create-category/app';
import * as createFile from '../../lambda-assets/files/create-file/app';
//import * as deleteCategory from '../../lambda-assets/files/delete-category/app';
import * as deleteFile from '../../lambda-assets/files/delete-file/app';
// import * as getCategory from '../../lambda-assets/files/get-category/app';
import * as getFile from '../../lambda-assets/files/get-file/app';
// import * as listCategories from '../../lambda-assets/files/list-categories/app';
import * as listFilesByCategory from '../../lambda-assets/files/list-files-by-category/app';
import * as listFiles from '../../lambda-assets/files/list-files/app';
// import * as updateCategory from '../../lambda-assets/files/update-category/app';
import * as updateFile from '../../lambda-assets/files/update-file/app';

const ddbMock = mockClient(DynamoDBDocumentClient);

/*
const expectedJob = {
  dynamoDBArn: 'arn:aws:dynamodb:us-east-1:123456789012:table/items',
  dynamoDBId: '85f6509f-023c-48fb-8252-981653ffd561',
};

const expectedInvalidJob = {
  jobId: 'not-exists-job-id',
};*/

const expected = {
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

test('Create file API success', async () => {
  ddbMock.on(PutCommand).resolves({});
  const response = await createFile.handler({
    body: {
      location: expected.DBData.location,
      checksum: expected.DBData.fileId,
      checksumType: expected.DBData.checksumType,
      version: expected.DBData.version,
      categoryId: expected.DBData.categoryId,
      describe: expected.DBData.description,
    },
  });
  const body = JSON.parse(response.body);
  expect(response.statusCode).toEqual(200);
  expect(body.created).toEqual(true);
});

test('Create file with invalid inputs expect failure', async () => {
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
});

test('Get file API success', async () => {
  ddbMock.on(GetCommand).resolves({
    Item: {
      fileId: expected.DBData.fileId,
      version: expected.DBData.version,
      categoryId: expected.DBData.categoryId,
      location: expected.DBData.location,
      description: expected.DBData.description,
      createAt: expected.DBData.createAt,
      updatedAt: expected.DBData.updatedAt,
    },
  });
  const response = await getFile.handler({
    pathParameters: {
      fileId: expected.DBData.fileId,
    },
  });
  expect(response.statusCode).toEqual(200);
});

test('Get file with invalid inputs expect failure', async() => {
  ddbMock.on(GetCommand).resolves({
    Item: {}
  })
  const response = await getFile.handler({
    queryStringParameters: {
      fileId: "",
    },
  });
  expect(response.statusCode).toEqual(404);
})

test('List files API success', async () => {
  ddbMock.on(ScanCommand).resolves({
    Items: [
      {
        fileId: expected.DBData.fileId,
        version: expected.DBData.version,
        categoryId: expected.DBData.categoryId,
        location: expected.DBData.location,
        description: expected.DBData.description,
        createAt: expected.DBData.createAt,
        updatedAt: expected.DBData.updatedAt,
      },
      {
        fileId: expected.DBData.fileId,
        version: expected.DBData.version,
        categoryId: expected.DBData.categoryId,
        location: expected.DBData.location,
        description: expected.DBData.description,
        createAt: expected.DBData.createAt,
        updatedAt: expected.DBData.updatedAt,
      },
      {
        fileId: expected.DBData.fileId,
        version: expected.DBData.version,
        categoryId: expected.DBData.categoryId,
        location: expected.DBData.location,
        description: expected.DBData.description,
        createAt: expected.DBData.createAt,
        updatedAt: expected.DBData.updatedAt,
      },
    ],
  });
  const response = await listFiles.handler({
    pathParameters: {
      categoryId: expected.DBData.categoryId,
    },
  });
  expect(response.statusCode).toEqual(200);
});

test('List files by category API success', async () => {
  ddbMock.on(QueryCommand).resolves({
    Items: [
      {
        fileId: expected.DBData.fileId,
        version: expected.DBData.version,
        categoryId: expected.DBData.categoryId,
        location: expected.DBData.location,
        description: expected.DBData.description,
        createAt: expected.DBData.createAt,
        updatedAt: expected.DBData.updatedAt,
      },
      {
        fileId: expected.DBData.fileId,
        version: expected.DBData.version,
        categoryId: expected.DBData.categoryId,
        location: expected.DBData.location,
        description: expected.DBData.description,
        createAt: expected.DBData.createAt,
        updatedAt: expected.DBData.updatedAt,
      },
      {
        fileId: expected.DBData.fileId,
        version: expected.DBData.version,
        categoryId: expected.DBData.categoryId,
        location: expected.DBData.location,
        description: expected.DBData.description,
        createAt: expected.DBData.createAt,
        updatedAt: expected.DBData.updatedAt,
      },
    ],
  });
  const response = await listFilesByCategory.handler({
    pathParameters: {
      categoryId: expected.DBData.categoryId,
    },
  });
  expect(response.statusCode).toEqual(200);
});

test('Update file API', async () => {
  ddbMock.on(UpdateCommand).resolves({});
  const response = await updateFile.handler({
    pathParameters: {
      categoryId: expected.DBData.categoryId,
    },
    body: {
      categoryId: expected.DBData.categoryId,
    },
  });
  expect(response.statusCode).toEqual(200);
});

test('Delete file API', async () => {
  ddbMock.on(DeleteCommand).resolves({});
  const response = await deleteFile.handler({
    pathParameters: {
      fileId: "meow",
    },
  });
  console.log(response)
  expect(response.statusCode).toEqual(200);
});