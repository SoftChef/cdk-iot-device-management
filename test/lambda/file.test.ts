import { DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand, DeleteCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { mockClient } from 'aws-sdk-client-mock';

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

//AWS.config.region = 'local';
//AWSMock.setSDKInstance(AWS);

const ddbMock = mockClient(DynamoDBDocumentClient);

const expected = {
  DBData: {
    fileId: 'Test',
    version: 'Test',
    categoryId: 'Test',
    location: 'Test',
    description: 'Test',
    createAt: 'Test',
    updatedAt: 'Test',
    checksum: 'Test',
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

test('Create file API', async () => {
  ddbMock.on(PutCommand).resolves({});
  const response = await createFile.handler({
    body: {
      //fileId: expected.DBData.fileId,
      version: expected.DBData.version,
      //categoryId: expected.DBData.categoryId,
      //location: expected.DBData.location,
      //description: expected.DBData.description,
      checksum: expected.DBData.description,
      createAt: expected.DBData.createAt,
      //updatedAt: expected.DBData.updatedAt,
    },
  });
  console.log(response);
  //const body = JSON.parse(response.body)
  expect(response.statusCode).toEqual(200);
  //expect(body.created).toEqual(true);
});

test('Create file invalid input failure', async() => {

});

test('Get file API', async () => {
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
      categoryId: expected.DBData.fileId,
    },
  });
  expect(response.statusCode).toEqual(200);
});

test('List files API', async () => {
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
  const response = await listFiles.handler({
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
    queryStringParameters: {
      fileId: expected.DBData.fileId,
    },
  });
  expect(response.statusCode).toEqual(200);
});