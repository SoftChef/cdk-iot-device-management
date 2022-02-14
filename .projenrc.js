const { awscdk } = require('projen');

const AUTOMATION_TOKEN = 'PROJEN_GITHUB_TOKEN';

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'SoftChef',
  authorName: 'SoftChef',
  authorEmail: 'poke@softchef.com',
  authorUrl: 'https://www.softchef.com',
  authorOrganization: true,
  cdkVersion: '1.73.0',
  defaultReleaseBranch: 'main',
  name: '@softchef/cdk-iot-device-management',
  description: 'IoT device management is composed of things, thing types, thing groups, jobs, files API services. The constructs can be used independently, that are based on full-managed service to create an API Gateway & Lambda function.',
  license: 'Apache-2.0',
  copyrightOwner: 'SoftChef',
  copyrightPeriod: '2022',
  repositoryUrl: 'git@github.com:SoftChef/cdk-iot-device-management.git',
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
    'CDK',
    'IoT',
    'Device Management',
    'IoT Job',
    'OTA',
  ],
  gitignore: [
    'src/**/dist',
    'lambda-assets/**/dist',
    'test/**/dist',
    'cdk.out',
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

project.synth();