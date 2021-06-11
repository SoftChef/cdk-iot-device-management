const { AwsCdkConstructLibrary, NpmAccess } = require('projen');

const project = new AwsCdkConstructLibrary({
  author: 'softchef-iot-lab',
  authorEmail: 'poke@softchef.com',
  npmAccess: NpmAccess.PUBLIC,
  cdkVersion: '1.108.0',
  projenVersion: '0.24.0',
  initialVersion: '0.0.0',
  defaultReleaseBranch: 'main',
  dependabot: false,
  jsiiFqn: 'projen.AwsCdkConstructLibrary',
  name: '@softchef/cdk-iot-device-management',
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
    'joi',
    'semver',
    'uuid',
    '@types/node@15.12.2',
    '@types/uuid',
    '@types/semver',
    '@softchef/cdk-restapi',
    'aws-sdk',
    '@aws-sdk/client-iot',
    '@aws-sdk/client-dynamodb',
    '@aws-sdk/lib-dynamodb',
    '@aws-sdk/client-cognito-identity-provider',
  ],
  devDeps: [
    'aws-sdk-mock',
    'aws-sdk-client-mock',
  ],
  keywords: [
    'CDK',
    'IoT',
    'Device Management',
    'IoT Job',
    'OTA',
  ],
  mergify: false,
  gitignore: [
    'src/**/dist',
    'lambda-assets/**/dist',
    'test/**/dist',
    'cdk.out',
  ],
  tsconfig: {
    compilerOptions: {
      lib: [
        'ES2018',
        'DOM',
      ],
    },
  },
});

project.synth();