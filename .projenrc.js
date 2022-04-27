const { awscdk, AUTOMATION_TOKEN } = require('projen');

const PROJECT_NAME = '@softchef/cdk-iot-device-management';
const PROJECT_DESCRIPTION = 'IoT device management is composed of things, thing types, thing groups, jobs, files API services. The constructs can be used independently, that are based on full-managed service to create an API Gateway & Lambda function.';

const project = new awscdk.AwsCdkConstructLibrary({
  authorName: 'SoftChef',
  authorEmail: 'poke@softchef.com',
  authorUrl: 'https://www.softchef.com',
  authorOrganization: true,
  name: PROJECT_NAME,
  description: PROJECT_DESCRIPTION,
  repositoryUrl: 'git@github.com:SoftChef/cdk-iot-device-management.git',
  cdkVersion: '1.73.0',
  defaultReleaseBranch: 'main',
  majorVersion: 2,
  releaseBranches: {
    cdkv1: {
      npmDistTag: 'cdkv1',
      majorVersion: 1,
    },
  },
  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-iam',
    '@aws-cdk/aws-apigateway',
    '@aws-cdk/aws-lambda',
    '@aws-cdk/aws-lambda-nodejs',
    '@aws-cdk/aws-dynamodb',
  ],
  bundledDeps: [
    '@aws-sdk/client-dynamodb',
    '@aws-sdk/client-iot',
    '@aws-sdk/client-iot-data-plane',
    '@aws-sdk/client-s3',
    '@aws-sdk/lib-dynamodb',
    '@aws-sdk/util-dynamodb',
    '@softchef/cdk-restapi',
    '@softchef/cdk-schedule-function',
    '@softchef/lambda-events',
    '@types/semver',
    '@types/uuid',
    'joi',
    'semver',
    'uuid',
  ],
  devDeps: [
    'aws-sdk-client-mock',
    'esbuild',
  ],
  depsUpgradeOptions: {
    ignoreProjen: false,
    workflowOptions: {
      schedule: {
        cron: ['0 2 * * *'],
      },
      labels: ['auto-approve', 'auto-merge'],
      secret: AUTOMATION_TOKEN,
    },
  },
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['MinCheTsai'],
  },
  keywords: [
    'AWS',
    'CDK',
    'IoT',
    'Device Management',
    'IoT Job',
    'OTA',
  ],
  tsconfig: {
    compilerOptions: {
      lib: [
        'ES2020',
        'DOM',
      ],
    },
    include: [
      'lambda-assets/**/*.ts',
    ],
  },
});

project.package.addField('resolutions', {
  'jest-environment-jsdom': '27.3.1',
});

const commonExclude = [
  'cdk.out',
  'cdk.context.json',
  'yarn-error.log',
];

project.npmignore.exclude(...commonExclude);
project.gitignore.exclude(...commonExclude);

project.synth();