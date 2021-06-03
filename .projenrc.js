const { AwsCdkConstructLibrary } = require('projen');

const project = new AwsCdkConstructLibrary({
  author: 'softchef-iot-lab',
  authorEmail: 'poke@softchef.com',
  npmAccess: NpmAccess.PUBLIC,
  cdkVersion: '1.106.1',
  projenVersion: '0.20.11',
  initialVersion: '0.0.0',
  releaseBranches: ['main'],
  defaultReleaseBranch: 'main',
  jsiiFqn: 'projen.AwsCdkConstructLibrary',
  name: '@softchef/cdk-iot-device-management',
  repositoryUrl: 'git@github.com:SoftChef/cdk-iot-device-management.git',
});

project.synth();
