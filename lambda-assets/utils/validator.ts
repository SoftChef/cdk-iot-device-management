import * as Joi from 'joi';
import * as semver from 'semver';

const ALLOW_AWS_REGIONS = [
  'us-east-1',
  'us-east-2',
  'us-west-1',
  'us-west-2',
  'af-south-1',
  'ap-east-1',
  'ap-south-1',
  'ap-northeast-1',
  'ap-northeast-2',
  'ap-northeast-3',
  'ap-southeast-1',
  'ap-southeast-2',
  'ca-central-1',
  'eu-central-1',
  'eu-west-1',
  'eu-west-2',
  'eu-west-3',
  'eu-south-1',
  'eu-north-1',
  'me-south-1',
  'sa-east-1',
];

Joi.extend((joi: Joi.Root) => {
  return {
    type: 'awsRegion',
    base: joi.string(),
    messages: {
      'awsRegion.base': 'isn\'t allow AWS region',
    },
    validate(value: string, helpers: Joi.CustomHelpers<any>): any {
      if (ALLOW_AWS_REGIONS.indexOf(value) === -1) {
        return {
          value,
          errors: helpers.error('awsRegion.base'),
        };
      }
    },
  };
}).extend((joi: Joi.Root) => {
  return {
    type: 'semanticVersion',
    base: joi.string(),
    messages: {
      'semanticVersion.base': 'isn\'t semantic version format',
    },
    validate(value: string, helpers: Joi.CustomHelpers<any>): any {
      if (!semver.valid(value)) {
        return {
          value,
          errors: helpers.error('semanticVersion.base'),
        };
      }
    },
  };
});

// You can extend Joi after extend()
// example: Joi.extend(...).extend(...).extend(...)
