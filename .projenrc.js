const { AwsCdkConstructLibrary, NpmAccess } = require('projen');

const project = new AwsCdkConstructLibrary({
  author: 'softchef-iot-lab',
  authorEmail: 'poke@softchef.com',
  npmAccess: NpmAccess.PUBLIC,
  cdkVersion: '1.107.0',
  projenVersion: '0.22.0',
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
  ],
  bundledDeps: [
    'joi',
    'semver',
    '@types/semver',
    '@softchef/cdk-restapi',
    'aws-sdk',
  ],
  devDeps: [
    'aws-sdk-mock',
  ],
  keywords: [
    'CDK',
    'IoT',
    'Device Management',
    'IoT Job',
    'OTA',
  ],
  testdir: 'src/__tests__',
  mergify: false,
  gitignore: [
    'src/**/dist',
  ],
});

project.synth();
