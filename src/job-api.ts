import * as path from 'path';
import * as apigateway from '@aws-cdk/aws-apigateway';
import * as iam from '@aws-cdk/aws-iam';
import * as lambda from '@aws-cdk/aws-lambda-nodejs';
import * as cdk from '@aws-cdk/core';
import { RestApi, HttpMethod } from '@softchef/cdk-restapi';

const LAMBDA_ASSETS_PATH = path.resolve(__dirname, '../lambda-assets/jobs');

export interface JobApiProps {
  readonly authorizationType?: apigateway.AuthorizationType;
  readonly authorizer?: apigateway.IAuthorizer | undefined;
}

export class JobApi extends cdk.Construct {

  public readonly restApiId: string;

  constructor(scope: cdk.Construct, id: string, props?: JobApiProps) {
    super(scope, id);
    const restApi = new RestApi(this, 'JobRestApi', {
      enableCors: true,
      authorizationType: props?.authorizationType ?? apigateway.AuthorizationType.NONE,
      authorizer: props?.authorizer ?? undefined,
      resources: [
        {
          path: '/jobs/{jobId}/associate',
          httpMethod: HttpMethod.PUT,
          lambdaFunction: this.createAssociateTargetsWithJobFunction(),
        },
        {
          path: '/jobs',
          httpMethod: HttpMethod.POST,
          lambdaFunction: this.createCreateJobFunction(),
        },
        {
          path: '/jobs',
          httpMethod: HttpMethod.GET,
          lambdaFunction: this.createListJobsFunction(),
        },
        {
          path: '/jobs/{jobId}',
          httpMethod: HttpMethod.GET,
          lambdaFunction: this.createGetJobFunction(),
        },
        {
          path: '/jobs/{jobId}',
          httpMethod: HttpMethod.PUT,
          lambdaFunction: this.createUpdateJobFunction(),
        },
        {
          path: '/jobs/{jobId}',
          httpMethod: HttpMethod.DELETE,
          lambdaFunction: this.createDeleteJobFunction(),
        },
        {
          path: '/jobs/{jobId}/cancel',
          httpMethod: HttpMethod.PUT,
          lambdaFunction: this.createCancelJobFunction(),
        },
        {
          path: '/jobs/document',
          httpMethod: HttpMethod.GET,
          lambdaFunction: this.createGetJobDocumentFunction(),
        },
        {
          path: '/jobs/{jobId}/things/{thingName}',
          httpMethod: HttpMethod.GET,
          lambdaFunction: this.createGetJobExecutionFunction(),
        },
        {
          path: '/jobs/{jobId}',
          httpMethod: HttpMethod.GET,
          lambdaFunction: this.createListJobExecutionForJobFunction(),
        },
        {
          path: '/jobs/{thingName}',
          httpMethod: HttpMethod.GET,
          lambdaFunction: this.createListJobExecutionForThingFunction(),
        },
        {
          path: '/jobs/{jobId}/things/{thingName}',
          httpMethod: HttpMethod.DELETE,
          lambdaFunction: this.createDeleteJobExecutionFunction(),
        },
        {
          path: '/jobs/{jobId}/things/{thingName}/cancel',
          httpMethod: HttpMethod.PUT,
          lambdaFunction: this.createCancelJobExecutionFunction(),
        },
        {
          path: '/job-templates',
          httpMethod: HttpMethod.POST,
          lambdaFunction: this.createCreateJobTemplateFunction(),
        },
        {
          path: '/job-templates',
          httpMethod: HttpMethod.GET,
          lambdaFunction: this.createListJobTemplatesFunction(),
        },
        {
          path: '/job-templates/{jobId}',
          httpMethod: HttpMethod.GET,
          lambdaFunction: this.createGetJobTemplatesFunction(),
        },
        {
          path: '/job-templates/{jobId}',
          httpMethod: HttpMethod.DELETE,
          lambdaFunction: this.createDeleteJobTemplateFunction(),
        },
      ],
    });
    this.restApiId = restApi.restApiId;
  }

  private createAssociateTargetsWithJobFunction(): lambda.NodejsFunction {
    const createJobFunction = new lambda.NodejsFunction(this, 'AssociateTargetsWithJobFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/associate-targets-with-job/app.ts`,
    });
    createJobFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'iot-associate-targets-with-job', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'iot:AssociateTargetsWithJob',
            ],
            resources: ['*'],
          }),
        ],
      }),
    );
    return createJobFunction;
  }

  private createCreateJobFunction(): lambda.NodejsFunction {
    const createJobFunction = new lambda.NodejsFunction(this, 'CreateJobFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/create-job/app.ts`,
    });
    createJobFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'iot-create-job-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'iot:CreateJob',
            ],
            resources: ['*'],
          }),
        ],
      }),
    );
    return createJobFunction;
  }

  private createListJobsFunction(): lambda.NodejsFunction {
    const listJobsFunction = new lambda.NodejsFunction(this, 'ListJobsFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/list-jobs/app.ts`,
    });
    listJobsFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'iot-list-jobs-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'iot:ListJobs',
            ],
            resources: ['*'],
          }),
        ],
      }),
    );
    return listJobsFunction;
  }

  private createGetJobFunction(): lambda.NodejsFunction {
    const getJobFunction = new lambda.NodejsFunction(this, 'GetJobFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/get-job/app.ts`,
    });
    getJobFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'iot-describe-job-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'iot:DescribeJob',
            ],
            resources: ['*'],
          }),
        ],
      }),
    );
    return getJobFunction;
  }

  private createUpdateJobFunction(): lambda.NodejsFunction {
    const updateJobFunction = new lambda.NodejsFunction(this, 'UpdateJobFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/update-job/app.ts`,
    });
    updateJobFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'iot-update-job-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'iot:UpdateJob',
            ],
            resources: ['*'],
          }),
        ],
      }),
    );
    return updateJobFunction;
  }

  private createDeleteJobFunction(): lambda.NodejsFunction {
    const deleteJobFunction = new lambda.NodejsFunction(this, 'DeleteJobFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/delete-job/app.ts`,
    });
    deleteJobFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'iot-delete-job-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'iot:DeleteJob',
            ],
            resources: ['*'],
          }),
        ],
      }),
    );
    return deleteJobFunction;
  }

  private createCancelJobFunction(): lambda.NodejsFunction {
    const cancelJobFunction = new lambda.NodejsFunction(this, 'CancelJobFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/cancel-job/app.ts`,
    });
    cancelJobFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'iot-cancel-job-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'iot:CancelJob',
            ],
            resources: ['*'],
          }),
        ],
      }),
    );
    return cancelJobFunction;
  }

  private createGetJobExecutionFunction(): lambda.NodejsFunction {
    const getJobExecutionFunction = new lambda.NodejsFunction(this, 'GetJobExecutionFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/get-job-execution/app.ts`,
    });
    getJobExecutionFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'iot-describe-job-execution-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'iot:DescribeJobExecution',
            ],
            resources: ['*'],
          }),
        ],
      }),
    );
    return getJobExecutionFunction;
  }

  private createListJobExecutionForJobFunction(): lambda.NodejsFunction {
    const listJobExecutionForJob = new lambda.NodejsFunction(this, 'listJobExecutionForJob', {
      entry: `${LAMBDA_ASSETS_PATH}/list-job-execution-job/app.ts`,
    });
    listJobExecutionForJob.role?.attachInlinePolicy(
      new iam.Policy(this, 'list-job-execution-for-job', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'iot:ListJobExecutionForJob',
            ],
            resources: ['*'],
          }),
        ],
      }),
    );
    return listJobExecutionForJob;
  }

  private createListJobExecutionForThingFunction(): lambda.NodejsFunction {
    const listJobExecutionForThing = new lambda.NodejsFunction(this, 'listJobExecutionForThing', {
      entry: `${LAMBDA_ASSETS_PATH}/list-job-execution-thing/app.ts`,
    });
    listJobExecutionForThing.role?.attachInlinePolicy(
      new iam.Policy(this, 'list-job-execution-for-thing', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'iot:ListJobExecutionForThing',
            ],
            resources: ['*'],
          }),
        ],
      }),
    );
    return listJobExecutionForThing;
  }

  private createDeleteJobExecutionFunction(): lambda.NodejsFunction {
    const deleteJobExecutionFunction = new lambda.NodejsFunction(this, 'DeleteJobExecutionFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/delete-job-execution/app.ts`,
    });
    deleteJobExecutionFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'iot-delete-job-execution-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'iot:DeleteJobExecution',
            ],
            resources: ['*'],
          }),
        ],
      }),
    );
    return deleteJobExecutionFunction;
  }

  private createCancelJobExecutionFunction(): lambda.NodejsFunction {
    const cancelJobExecutionFunction = new lambda.NodejsFunction(this, 'CancelJobExecutionFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/cancel-job-execution/app.ts`,
    });
    cancelJobExecutionFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'iot-cancel-job-execution-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'iot:CancelJobExecution',
            ],
            resources: ['*'],
          }),
        ],
      }),
    );
    return cancelJobExecutionFunction;
  }

  private createGetJobDocumentFunction(): lambda.NodejsFunction {
    const getJobDocumentFunction = new lambda.NodejsFunction(this, 'GetJobDocumentFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/get-job-document/app.ts`,
    });
    getJobDocumentFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'iot-get-job-document', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'iot:GetJobDocument',
            ],
            resources: ['*'],
          }),
        ],
      }),
    );
    return getJobDocumentFunction;
  }

  private createCreateJobTemplateFunction(): lambda.NodejsFunction {
    const createJobTemplateFunction = new lambda.NodejsFunction(this, 'CreateJobTemplateFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/create-job-template/app.ts`,
    });
    createJobTemplateFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'iot-create-job-template-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'iot:CreateJobTemplate',
            ],
            resources: ['*'],
          }),
        ],
      }),
    );
    return createJobTemplateFunction;
  }
  private createListJobTemplatesFunction(): lambda.NodejsFunction {
    const listJobTemplatesFunction = new lambda.NodejsFunction(this, 'ListJobTemplatesFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/list-job-templates/app.ts`,
    });
    listJobTemplatesFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'iot-list-job-templates-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'iot:ListJobTemplates',
            ],
            resources: ['*'],
          }),
        ],
      }),
    );
    return listJobTemplatesFunction;
  }

  private createGetJobTemplatesFunction(): lambda.NodejsFunction {
    const getJobTemplatesFunction = new lambda.NodejsFunction(this, 'GetJobTemplatesFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/get-job-templates/app.ts`,
    });
    getJobTemplatesFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'iot-get-job-templates', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'iot:GetJobTemplates',
            ],
            resources: ['*'],
          }),
        ],
      }),
    );
    return getJobTemplatesFunction;
  }

  private createDeleteJobTemplateFunction(): lambda.NodejsFunction {
    const deleteJobTemplateFunction = new lambda.NodejsFunction(this, 'DeleteJobTemplateFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/delete-job-template/app.ts`,
    });
    deleteJobTemplateFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'iot-delete-job-template-policy', {
        statements: [
          new iam.PolicyStatement({
            actions: [
              'iot:DeleteJobTemplate',
            ],
            resources: ['*'],
          }),
        ],
      }),
    );
    return deleteJobTemplateFunction;
  }
}
