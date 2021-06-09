"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
/**
 * @todo
 * - Empty test function
 * - Job full properties
 * metting
 * category ready?
 * JITR/JITP/Fleet provisioning
 * Yaturn
 */
var AWS = require("aws-sdk");
var AWSMock = require("aws-sdk-mock");
// import * as createJobTemplate from '../../lambda-assets/jobs/create-job-template/app';
var createJob = require("../../lambda-assets/jobs/create-job/app");
// import * as deleteJobExecution from '../../lambda-assets/jobs/delete-job-execution/app';
// import * as deleteJobTemplate from '../../lambda-assets/jobs/delete-job-template/app';
var deleteJob = require("../../lambda-assets/jobs/delete-job/app");
// import * as getJobExecution from '../../lambda-assets/jobs/get-job-execution/app';
// import * as getJobTemplate from '../../lambda-assets/jobs/get-job-template/app';
var getJob = require("../../lambda-assets/jobs/get-job/app");
// import * as listJobTemplates from '../../lambda-assets/jobs/list-job-templates/app';
var listJobs = require("../../lambda-assets/jobs/list-jobs/app");
// import * as updateJob from '../../lambda-assets/jobs/update-job/app';
// AWS.config.region = 'local';
AWSMock.setSDKInstance(AWS);
AWS.config.region = 'ap-northeast-1';
AWS.config.credentials = new AWS.SharedIniFileCredentials({
    profile: 'lab-cli'
});
var expectedJob = {
    jobArn: 'arn:aws:iot:ap-northeast-1:012345678901:job/85f6509f-023c-48fb-8252-981653ffd561',
    jobId: '85f6509f-023c-48fb-8252-981653ffd561',
    targets: [
        'arn:aws:iot:ap-northeast-1:079794712254:thing/WorkerA',
    ],
    targetSelection: 'SNAPSHOT',
    description: 'Test Job',
    status: 'IN_PROGRESS'
};
var expected = {
    newJob: {
        targets: expectedJob.targets,
        targetSelection: expectedJob.targetSelection,
        document: JSON.stringify({
            operation: 'Work'
        }),
        description: expectedJob.description
    },
    job: expectedJob,
    listJobs: {
        jobs: [
            expectedJob,
        ],
        nextToken: '12345'
    }
};
test('Create job success', function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, body;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                AWSMock.mock('Iot', 'createJob', function (parameters, callback) {
                    expect(parameters).toMatchObject({
                        jobId: expect.any(String),
                        targets: expected.newJob.targets,
                        document: expected.newJob.document,
                        targetSelection: expected.newJob.targetSelection
                    });
                    callback(null, {
                        jobArn: expected.job.jobArn,
                        jobId: expected.job.jobId,
                        description: expected.job.description
                    });
                });
                return [4 /*yield*/, createJob.handler({
                        body: {
                            targets: expected.newJob.targets,
                            targetSelection: expected.newJob.targetSelection,
                            document: expected.newJob.document,
                            description: expected.newJob.description
                        }
                    })];
            case 1:
                response = _a.sent();
                body = JSON.parse(response.body);
                expect(response.statusCode).toEqual(200);
                expect(body.created).toEqual(true);
                expect(body.job).toEqual({
                    jobArn: expected.job.jobArn,
                    jobId: expected.job.jobId,
                    description: expected.job.description
                });
                AWSMock.restore('Iot', 'createJob');
                return [2 /*return*/];
        }
    });
}); });
test('Create job with invalid inputs expect failure', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); });
test('Get job suucess', function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, body;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                AWSMock.mock('Iot', 'describeJob', function (parameters, callback) {
                    expect(parameters).toEqual({
                        jobId: expected.job.jobId
                    });
                    callback(null, {
                        job: expected.job,
                        documentSource: null
                    });
                });
                return [4 /*yield*/, getJob.handler({
                        pathParameters: {
                            jobId: expected.job.jobId
                        }
                    })];
            case 1:
                response = _a.sent();
                body = JSON.parse(response.body);
                expect(body.job).toEqual(expected.job);
                expect(response.statusCode).toEqual(200);
                AWSMock.restore('Iot', 'describeJob');
                return [2 /*return*/];
        }
    });
}); });
test('Get job with invalid id expect failure', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); });
test('List jobs success', function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, body;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                AWSMock.mock('Iot', 'listJobs', function (parameters, callback) {
                    expect(parameters).toEqual({});
                    callback(null, {
                        jobs: expected.listJobs.jobs,
                        nextToken: null
                    });
                });
                return [4 /*yield*/, listJobs.handler({})];
            case 1:
                response = _a.sent();
                body = JSON.parse(response.body);
                expect(Array.isArray(body.jobs)).toBe(true);
                expect(body.jobs.length).toEqual(1);
                expect(body.jobs).toEqual(expected.listJobs.jobs);
                expect(body.nextToken).toEqual(null);
                expect(response.statusCode).toEqual(200);
                AWSMock.restore('Iot', 'listJobs');
                return [2 /*return*/];
        }
    });
}); });
test('List jobs with nextToken success', function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, body;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                AWSMock.mock('Iot', 'listJobs', function (parameters, callback) {
                    expect(parameters).toEqual({
                        nextToken: expected.listJobs.nextToken
                    });
                    callback(null, {
                        jobs: expected.listJobs.jobs,
                        nextToken: expected.listJobs.nextToken
                    });
                });
                return [4 /*yield*/, listJobs.handler({
                        queryStringParameters: {
                            nextToken: expected.listJobs.nextToken
                        }
                    })];
            case 1:
                response = _a.sent();
                body = JSON.parse(response.body);
                expect(Array.isArray(body.jobs)).toBe(true);
                expect(body.jobs.length).toEqual(1);
                expect(body.jobs).toEqual(expected.listJobs.jobs);
                expect(body.nextToken).toEqual(expected.listJobs.nextToken);
                expect(response.statusCode).toEqual(200);
                AWSMock.restore('Iot', 'listJobs');
                return [2 /*return*/];
        }
    });
}); });
test('Update job success', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); });
test('Update job success', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); });
test('Delete job success', function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, body;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, deleteJob.handler({
                    pathParameters: {
                        jobId: expected.job.jobId
                    }
                })];
            case 1:
                response = _a.sent();
                body = JSON.parse(response.body);
                expect(response.statusCode).toEqual(200);
                expect(body.deleted).toEqual(true);
                return [2 /*return*/];
        }
    });
}); });
test('Create job template success', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); });
test('Get job template success', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); });
test('List job templates success', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); });
test('Delete job template success', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); });
test('Get job execution success', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); });
test('Delete job execution success', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); });
// Mock
// const jobs: {
//   jobs: [
//     {
//       jobArn: 'arn:aws:iot:ap-northeast-1:079794712254:job/85f6509f-023c-48fb-8252-981653ffd561',
//       jobId: '85f6509f-023c-48fb-8252-981653ffd561',
//       thingGroupId: null,
//       targetSelection: 'SNAPSHOT',
//       status: 'IN_PROGRESS',
//       createdAt: '2021-06-07T10:03:13.025Z',
//       lastUpdatedAt: '2021-06-07T10:03:15.185Z',
//       completedAt: null,
//     },
//   ],
// };
// const job = {
//   "job": {
//     "forceCanceled": null,
//     "reasonCode": null,
//     "comment": null,
//     "presignedUrlConfig": {
//       "roleArn": null,
//       "expiresInSec": null
//     },
//     "jobExecutionsRolloutConfig": {
//       "maximumPerMinute": null
//     },
//     "jobProcessDetails": {
//       "numberOfCanceledThings": 0,
//       "numberOfSucceededThings": 0,
//       "numberOfFailedThings": 0,
//       "numberOfRejectedThings": 0,
//       "numberOfQueuedThings": 1,
//       "numberOfInProgressThings": 0,
//       "numberOfRemovedThings": 0,
//       "numberOfTimedOutThings": 0
//     },
//     "timeoutConfig": {
//       "inProgressTimeoutInMinutes": null
//     },
//     "namespaceId": null,
//       "jobTemplateArn": null
//     }
//   }
// };
