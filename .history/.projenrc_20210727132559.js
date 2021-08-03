const { AwsCdkConstructLibrary, DependenciesUpgradeMechanism, NpmAccess } = require('projen');

const AUTOMATION_TOKEN = 'PROJEN_GITHUB_TOKEN';

const project = new AwsCdkConstructLibrary({
  author: 'SoftChef',
  authorEmail: 'poke@softchef.com',
  npmAccess: NpmAccess.PUBLIC,
  cdkVersion: '1.95.2',
  projenVersion: '0.27.6',
  initialVersion: '0.1.0',
  defaultReleaseBranch: 'main',
  name: '@softchef/cdk-iot-device-management',
  description: 'IoT device management is composed of things, thing types, thing groups, jobs, files API services. The constructs can be used independently, that are based on full-managed service to create an API Gateway & Lambda function.',
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
    '@aws-sdk/lib-dynamodb',
    '@aws-sdk/util-dynamodb',
    '@softchef/cdk-restapi',
    '@softchef/cdk-schedule-function',
    '@softchef/lambda-events',
    '@types/node@15.12.2',
    '@types/semver',
    '@types/uuid',
    'joi',
    'semver',
    'uuid',
  ],
  depsUpgrade: DependenciesUpgradeMechanism.githubWorkflow({
    ignoreProjen: false,
    workflowOptions: {
      labels: ['auto-approve', 'auto-merge'],
      secret: AUTOMATION_TOKEN,
    },
  }),
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['MinCheTsai'],
  },
  devDeps: [
    'aws-sdk-client-mock',
  ],
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
  },
});

project.synth();
