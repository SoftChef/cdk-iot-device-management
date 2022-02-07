import * as path from 'path';
import {
  RestApi,
  HttpMethod,
} from '@softchef/cdk-restapi';
import {
  ScheduleFunction,
} from '@softchef/cdk-schedule-function';
import {
  AuthorizationType,
  IAuthorizer,
} from 'aws-cdk-lib/aws-apigateway';
import {
  Policy,
  PolicyStatement,
} from 'aws-cdk-lib/aws-iam';
import {
  NodejsFunction,
} from 'aws-cdk-lib/aws-lambda-nodejs';
import {
  Construct,
} from 'constructs';

const LAMBDA_ASSETS_PATH = path.resolve(__dirname, '../lambda-assets/jobs');

/**
 * Job API props
 */
export interface JobApiProps {
  /**
   * Specify API Gateway all resources's authorization type, COGNTIO/IAM/CUSTOM/NONE
   * @default AuthorizationType.NONE
   */
  readonly authorizationType?: AuthorizationType;
  /**
   * Specify API Gateway's authorizer, CognitoUserPool/Lambda
   * @default undefined
   */
  readonly authorizer?: IAuthorizer | undefined;
  /**
   * Specify Schedule Function to enable create schedule job function
   * @default undefined
   */
  readonly scheduleFunction?: ScheduleFunction;
}

/**
 * Job API construct
 */
export class JobApi extends Construct {
  /**
   * The Job API Gateway
   */
  private readonly _restApi: RestApi;

  constructor(scope: Construct, id: string, props?: JobApiProps) {
    super(scope, id);
    this._restApi = new RestApi(this, 'JobRestApi', {
      enableCors: true,
      authorizationType: props?.authorizationType ?? AuthorizationType.NONE,
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
          path: '/jobs/{jobId}/document',
          httpMethod: HttpMethod.GET,
          lambdaFunction: this.createGetJobDocumentFunction(),
        },
        {
          path: '/jobs/{jobId}/things/{thingName}',
          httpMethod: HttpMethod.GET,
          lambdaFunction: this.createGetJobExecutionFunction(),
        },
        {
          path: 'jobs/{jobId}/status',
          httpMethod: HttpMethod.GET,
          lambdaFunction: this.createListJobExecutionsForJobFunction(),
        },
        {
          path: '/things/{thingName}/jobs',
          httpMethod: HttpMethod.GET,
          lambdaFunction: this.createListJobExecutionsForThingFunction(),
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
          path: '/job-templates/{jobTemplateId}',
          httpMethod: HttpMethod.GET,
          lambdaFunction: this.createGetJobTemplateFunction(),
        },
        {
          path: '/job-templates/{jobTemplateId}',
          httpMethod: HttpMethod.DELETE,
          lambdaFunction: this.createDeleteJobTemplateFunction(),
        },
      ],
    });
    if (props?.scheduleFunction) {
      const targetType: string = 'CreateJob';
      props.scheduleFunction.addTargetFunction(targetType, {
        targetFunction: this.createCreateScheduleJobFunction(),
      });
      props?.scheduleFunction?.listSchedulesFunction.addEnvironment('FIXED_TARGET_TYPE', targetType);
      props?.scheduleFunction?.createScheduleFunction.addEnvironment('FIXED_TARGET_TYPE', targetType);
      this._restApi.addResources([
        {
          path: '/schedules',
          httpMethod: HttpMethod.GET,
          lambdaFunction: props?.scheduleFunction.listSchedulesFunction,
        },
        {
          path: '/schedules',
          httpMethod: HttpMethod.POST,
          lambdaFunction: props?.scheduleFunction.createScheduleFunction,
        },
        {
          path: '/schedules/{scheduleId}',
          httpMethod: HttpMethod.GET,
          lambdaFunction: props?.scheduleFunction.fetchScheduleFunction,
        },
        {
          path: '/schedules/{scheduleId}',
          httpMethod: HttpMethod.PUT,
          lambdaFunction: props?.scheduleFunction.updateScheduleFunction,
        },
        {
          path: '/schedules/{scheduleId}',
          httpMethod: HttpMethod.DELETE,
          lambdaFunction: props?.scheduleFunction.deleteScheduleFunction,
        },
      ]);
    }
  }

  /**
   * Job API API ID
   */
  get restApiId(): string {
    return this._restApi.restApiId;
  }

  private createCreateScheduleJobFunction(): NodejsFunction {
    const createJobFunction = new NodejsFunction(this, 'CreateScheduleJobFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/create-schedule-job/app.ts`,
    });
    createJobFunction.role?.attachInlinePolicy(
      new Policy(this, 'iot-create-schedule-job-policy', {
        statements: [
          new PolicyStatement({
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

  private createAssociateTargetsWithJobFunction(): NodejsFunction {
    const createJobFunction = new NodejsFunction(this, 'AssociateTargetsWithJobFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/associate-targets-with-job/app.ts`,
    });
    createJobFunction.role?.attachInlinePolicy(
      new Policy(this, 'iot-associate-targets-with-job', {
        statements: [
          new PolicyStatement({
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

  private createCreateJobFunction(): NodejsFunction {
    const createJobFunction = new NodejsFunction(this, 'CreateJobFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/create-job/app.ts`,
    });
    createJobFunction.role?.attachInlinePolicy(
      new Policy(this, 'iot-create-job-policy', {
        statements: [
          new PolicyStatement({
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

  private createListJobsFunction(): NodejsFunction {
    const listJobsFunction = new NodejsFunction(this, 'ListJobsFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/list-jobs/app.ts`,
    });
    listJobsFunction.role?.attachInlinePolicy(
      new Policy(this, 'iot-list-jobs-policy', {
        statements: [
          new PolicyStatement({
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

  private createGetJobFunction(): NodejsFunction {
    const getJobFunction = new NodejsFunction(this, 'GetJobFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/get-job/app.ts`,
    });
    getJobFunction.role?.attachInlinePolicy(
      new Policy(this, 'iot-describe-job-policy', {
        statements: [
          new PolicyStatement({
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

  private createUpdateJobFunction(): NodejsFunction {
    const updateJobFunction = new NodejsFunction(this, 'UpdateJobFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/update-job/app.ts`,
    });
    updateJobFunction.role?.attachInlinePolicy(
      new Policy(this, 'iot-update-job-policy', {
        statements: [
          new PolicyStatement({
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

  private createDeleteJobFunction(): NodejsFunction {
    const deleteJobFunction = new NodejsFunction(this, 'DeleteJobFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/delete-job/app.ts`,
    });
    deleteJobFunction.role?.attachInlinePolicy(
      new Policy(this, 'iot-delete-job-policy', {
        statements: [
          new PolicyStatement({
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

  private createCancelJobFunction(): NodejsFunction {
    const cancelJobFunction = new NodejsFunction(this, 'CancelJobFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/cancel-job/app.ts`,
    });
    cancelJobFunction.role?.attachInlinePolicy(
      new Policy(this, 'iot-cancel-job-policy', {
        statements: [
          new PolicyStatement({
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

  private createGetJobExecutionFunction(): NodejsFunction {
    const getJobExecutionFunction = new NodejsFunction(this, 'GetJobExecutionFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/get-job-execution/app.ts`,
    });
    getJobExecutionFunction.role?.attachInlinePolicy(
      new Policy(this, 'iot-describe-job-execution-policy', {
        statements: [
          new PolicyStatement({
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

  private createListJobExecutionsForJobFunction(): NodejsFunction {
    const listJobExecutionsForJob = new NodejsFunction(this, 'listJobExecutionsForJob', {
      entry: `${LAMBDA_ASSETS_PATH}/list-job-executions-for-job/app.ts`,
    });
    listJobExecutionsForJob.role?.attachInlinePolicy(
      new Policy(this, 'list-job-execution-for-job', {
        statements: [
          new PolicyStatement({
            actions: [
              'iot:ListJobExecutionsForJob',
            ],
            resources: ['*'],
          }),
        ],
      }),
    );
    return listJobExecutionsForJob;
  }

  private createListJobExecutionsForThingFunction(): NodejsFunction {
    const listJobExecutionsForThing = new NodejsFunction(this, 'listJobExecutionsForThing', {
      entry: `${LAMBDA_ASSETS_PATH}/list-job-executions-for-thing/app.ts`,
    });
    listJobExecutionsForThing.role?.attachInlinePolicy(
      new Policy(this, 'list-job-executions-for-thing', {
        statements: [
          new PolicyStatement({
            actions: [
              'iot:ListJobExecutionsForThing',
            ],
            resources: ['*'],
          }),
        ],
      }),
    );
    return listJobExecutionsForThing;
  }

  private createDeleteJobExecutionFunction(): NodejsFunction {
    const deleteJobExecutionFunction = new NodejsFunction(this, 'DeleteJobExecutionFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/delete-job-execution/app.ts`,
    });
    deleteJobExecutionFunction.role?.attachInlinePolicy(
      new Policy(this, 'iot-delete-job-execution-policy', {
        statements: [
          new PolicyStatement({
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

  private createCancelJobExecutionFunction(): NodejsFunction {
    const cancelJobExecutionFunction = new NodejsFunction(this, 'CancelJobExecutionFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/cancel-job-execution/app.ts`,
    });
    cancelJobExecutionFunction.role?.attachInlinePolicy(
      new Policy(this, 'iot-cancel-job-execution-policy', {
        statements: [
          new PolicyStatement({
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

  private createGetJobDocumentFunction(): NodejsFunction {
    const getJobDocumentFunction = new NodejsFunction(this, 'GetJobDocumentFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/get-job-document/app.ts`,
    });
    getJobDocumentFunction.role?.attachInlinePolicy(
      new Policy(this, 'iot-get-job-document', {
        statements: [
          new PolicyStatement({
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

  private createCreateJobTemplateFunction(): NodejsFunction {
    const createJobTemplateFunction = new NodejsFunction(this, 'CreateJobTemplateFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/create-job-template/app.ts`,
    });
    createJobTemplateFunction.role?.attachInlinePolicy(
      new Policy(this, 'iot-create-job-template-policy', {
        statements: [
          new PolicyStatement({
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
  private createListJobTemplatesFunction(): NodejsFunction {
    const listJobTemplatesFunction = new NodejsFunction(this, 'ListJobTemplatesFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/list-job-templates/app.ts`,
    });
    listJobTemplatesFunction.role?.attachInlinePolicy(
      new Policy(this, 'iot-list-job-templates-policy', {
        statements: [
          new PolicyStatement({
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

  private createGetJobTemplateFunction(): NodejsFunction {
    const getJobTemplateFunction = new NodejsFunction(this, 'GetJobTemplateFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/get-job-template/app.ts`,
    });
    getJobTemplateFunction.role?.attachInlinePolicy(
      new Policy(this, 'iot-get-job-template', {
        statements: [
          new PolicyStatement({
            actions: [
              'iot:DescribeJobTemplate',
            ],
            resources: ['*'],
          }),
        ],
      }),
    );
    return getJobTemplateFunction;
  }

  private createDeleteJobTemplateFunction(): NodejsFunction {
    const deleteJobTemplateFunction = new NodejsFunction(this, 'DeleteJobTemplateFunction', {
      entry: `${LAMBDA_ASSETS_PATH}/delete-job-template/app.ts`,
    });
    deleteJobTemplateFunction.role?.attachInlinePolicy(
      new Policy(this, 'iot-delete-job-template-policy', {
        statements: [
          new PolicyStatement({
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
