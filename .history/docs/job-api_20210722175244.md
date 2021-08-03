## Job API Documentation

- [Associate Targets with Job](#put-jobsjobidassociate)
- [Cancel Job](#put-jobsjobidcancel)
- [Cancel Job Execution](#put-jobsjobidthingsthingnamecancel)
- [Create Job](#post-jobs)
- [Create Job Template](#post-job-templates)
- [Delete Job](#delete-jobsjobid)
- [Delete Job Execution](#delete-jobsjobidthingsthingname)
- [Delete Job Template](#delete-job-templatesjobtemplateid)
- [Get Job](#get-jobsjobid)
- [Get Job Document](#get-jobsjobiddocument)
- [Get Job Execution](#get-jobsjobidthingsthingname)
- [Get Job Template](#get-job-templatesjobtemplateid)
- [List Jobs](#get-jobs)
- [List Job Executions for Job](#get-jobs-executionsjobsjobid)
- [List Job Executions for Thing](#get-jobs-executionsthingsthingname)
- [List Job Templates](#get-job-templates)
- [Update Job](#put-jobsjobid)

---

### *PUT* /jobs/{jobId}/associate

Associates a things or thing groups with a continuous job

**Path Parameters**


| Name | Description |
| ---- | ----------- |
| jobId | Job's ID |

**Body**


| Name | Schema | Description |
| ---- | ------ | ----------- |
| targets* | String[] | A list of things or thing-groups |

**Response Success Body**

```
{
  "associated": true
}
```

**Response Failure Body**

```
{
  "error": "{reason}"
}
```

**Response Status**

| HTTP Status Code | Description |
| ---------------- | ----------- |
| 200 | Associate targets to job success |
| 404 | Job ID not found |

---

### *PUT* /jobs/{jobId}/cancel

Cancel job

**Path Parameters**

| Name | Description |
| ---- | ----------- |
| jobId* | Job's ID |

**Body**

| Name | Schema | Description |
| ---- | ------ | ----------- |
| comment | String | Describe why the job was canceled|
| force | Boolean | Force cancel |

**Response Success Body**

```
{
  "canceled": true
}
```

**Response Failure Body**

```
{
  "error": "{reason}"
}
```

**Response Status**

| HTTP Status Code | Description |
| ---------------- | ----------- |
| 200 | Delete success |
| 404 | Job ID not found |

---

### *PUT* /jobs/{jobId}/things/{thingName}/cancel

Cancel job execution

**Path Parameters**

| Name | Description |
| ---- | ----------- |
| jobId | Job's ID |
| thingName | Thing's Name

**Body**

| Name | Schema | Description |
| ---- | ------ | ----------- |
| expectedVersion | Number | The expected current version of the job execution
| statusDetails | Object | A collection of name/value pairs that describe the status of the job execution |
| detailsMap | Object | The job execution status |
| action | String | job excution's action}",
| progress | String | percentage of job execution
| force | Boolean | Force cancel |

**Response Success Body**

```
{
  "canceled": true
}
```

**Response Failure Body**

```
{
  "error": "{reason}"
}
```

**Response Status**

| HTTP Status Code | Description |
| ---------------- | ----------- |
| 200 | Cancel success |
| 404 | Job ID or thing name not found |

---

### *POST* /jobs

Create new job

**Body**


| Name | Schema | Description |
| ---- | ------ | ----------- |
| targets* | String[] | A list of thing's |
| targetSelection* | 'SNAPSHOT' \| 'CONTINUOUS' | Job status |
| document*	| String | Job's document |
| description | String | Job's description

**Response Success Body**

```
{
  "created": true
}
```

**Response Failure Body**

```
{
  "error": "{reason}"
}
```

**Response Status**

| HTTP Status Code | Description |
| ---------------- | ----------- |
| 200 | Create job success |
| 422 | Missing require field / Variable Group incorrect |

---

### *POST* /job-templates

Create new job template

**Body**

| Name | Schema | Description |
| ---- | ------ | ----------- |
| document* | String | Job templates' document|
| description* | String | Job templates' description |

**Response Success Body**

```
{
  "created": true
}
```

**Response Failure Body**

```
{
  "error": "{reason}"
}
```

**Response Status**

| HTTP Status Code | Description |
| ---------------- | ----------- |
| 200 | Create job template success |
| 422 | Missing require field / Variable Group incorrect |

---

### *DELETE* /jobs/{jobId}

Delete job by job ID

**Path Parameters**

| Name | Description |
| ---- | ----------- |
| jobId* | Job's ID |

**Body**

| Name | Schema | Description |
| ---- | ------ | ----------- |
| force | Boolean | Force delete |

**Response Success Body**

```
{
  "deleted": true
}
```

**Response Failure Body**

```
{
  "error": "{reason}"
}
```

**Response Status**

| HTTP Status Code | Description |
| ---------------- | ----------- |
| 200 | Delete success |
| 404 | Job ID not found |

---

### *DELETE* /jobs/{jobId}/things/{thingName}

Delete job execution

**Path Parameters**

| Name | Description |
| ---- | ----------- |
| jobId | Job's ID |
| thingName | Thing's Name

**Body**

| Name | Schema | Description |
| ---- | ------ | ----------- |
| executionNumber | String | The ID of the job execution
| force | Boolean | Force delete | Force delete |

**Response Success Body**

```
{
  "deleted": true
}
```

**Response Failure Body**

```
{
  "error": "{reason}"
}
```

**Response Status**

| HTTP Status Code | Description |
| ---------------- | ----------- |
| 200 | Delete success |
| 404 | Job ID or thing not found |

---

### *DELETE* /job-templates/{jobTemplateId}

Delete job template by job template ID

**Path Parameters**

| Name | Description |
| ---- | ----------- |
| jobTemplateId | String |

**Response Success Body**

```
{
  "deleted": true
}
```

**Response Failure Body**

```
{
  "error": "{reason}"
}
```

**Response Status**

| HTTP Status Code | Description |
| ---------------- | ----------- |
| 200 | Delete job template success |
| 404 | Job template ID not found |

---

### *GET* /jobs/{jobId}

Get job

**Path Parameters**

| Name | Description |
| ---- | ----------- |
| jobId | Job's ID |

**Response Success Body**

```
{
  "job": {
    "jobArn": "{job's ARN}";
    "jobId": "{job's ARN}",
    "targets": [ // A list of thing's ID
      "{thing's ID}",
    ],
    "targetSelection": "{job's status}", // "SNAPSHOT" | "CONTINUOUS"
    "description": "{job's description}",
    "status": "{job's status}" // “CANCELED” | “COMPLETED” | “DELETION_IN_PROGRESS” | “IN_PROGRESS”
  }
}
```

**Response Status**

| HTTP Status Code | Description |
| ---------------- | ----------- |
| 200 | Get job success |
| 404 | Job ID not found |

---

### *GET* /jobs/{jobId}/document

Get job document

**Path Parameters**

| Name | Description |
| ---- | ----------- |
| jobId | Job's ID |

**Path Parameters**

| Name | Schema | Description |
| ---- | ------ | ----------- |
| document | String | The job document content |

**Response Success Body**

```
{
  document: "{The job document content}"
}
```

**Response Status**

| HTTP Status Code | Description |
| ---------------- | ----------- |
| 200 | Update job success |
| 404 | Job ID not found |

---

### *GET* /job-templates/{jobTemplateId}

Get job template by Job Template ID

**Path Parameters**

| Name | Description |
| ---- | ----------- |
| jobTemplateId | Job Template's ID |

**Response Success Body**

```
{
  "jobTemplate": {
    "jobTeplateArn": "{job templates' ARN}",
    "jobTemplateId": "{Job templates’ ID}"
    "document": "{Job templates' document}"
    "description": "Test Job Template",
    "presignedUrlConfig": {"{Configuration for pre-signed file location URLs}"},
    "jobExecutionsRolloutConfig": {"{Create an exponential rate of rollout for a job}"},
    "timeoutConfig": {"{Timeout configuration}"},
  }
}
```

**Response Status**

| HTTP Status Code | Description |
| ---------------- | ----------- |
| 200 | Get Job templates success |
| 404 | Job template ID not found |

---

### *GET* /jobs/{jobId}/things/{thingName}

Get job's execution

**Path Parameters**

| Name | Description |
| ---- | ----------- |
| jobId | Job's ID |
| thingName | Thing's Name

**Response Success Body**

```
{ 
  "execution": {
    "jobId": "{Job's ID}",
    "status": "{Job execution status}" /* CANCELED | FAILED |
  IN_PROGRESS | QUEUED | REJECTED | REMOVED | SUCCEEDED | TIMED_OUT */
    "statusDetails": {
      "detailsMap": {
        "action": "{job excution's action}",
        "progress": "{percentage of job execution}",
      },
    },
    "thingArn": "{Thing's ARN}",
    "queuedAt": "{The time when the job execution was queued}",
    "startedAt": "{The time when the job execution was started}",
    "lastUpdatedAt": "{The time when the job execution was last updated}",
    "executionNumber": "{A string which identifies this particular job execution onthis particular device.}",
    "versionNumber": "{The version of the job execution}",
  }
}
```

**Response Status**

| HTTP Status Code | Description |
| ---------------- | ----------- |
| 200 | Get job's execution success |
| 404 | Job ID or thing Name not found |

---

### *GET* /jobs

List all Jobs

**Response Success Body**

```
{
    "jobs": [
    {
      "jobArn": "{job's ARN}";
      "jobId": "{job's ARN}",
      "targets": [ // A list of thing's ID
        "{thing's ID}",
      ],
      "targetSelection": "{job's status}", // "SNAPSHOT" | "CONTINUOUS"
      "description": "{job's description}",
      "status": "{job's status}" // “CANCELED” | “COMPLETED” | “DELETION_IN_PROGRESS” | “IN_PROGRESS”
    },
    ...more job objects
  ],
  "nextToken": "{Token for next data}"
}
```

**Response Status**

| HTTP Status Code | Description |
| ---------------- | ----------- |
| 200 | List jobs success |

---

### *GET* /jobs-executions/jobs/{jobId}

List job executions for job

**Path Parameters**

| Name | Description |
| ---- | ----------- |
| jobId | Job's ID |

**Query String Parameters**

| Name | Schema | Description |
| ---- | ------ | ----------- |
| status | String | Job's status |

**Response Success Body**

```
{
  "jobExecutions": [
    {
      "thingArn": "{thing's ARN}",
      "jobExecution": {
        "status": "{Job execution status}" /* CANCELED | FAILED |
  IN_PROGRESS | QUEUED | REJECTED | REMOVED | SUCCEEDED | TIMED_OUT */
        "queuedAt": "{The time when the job execution was queued}",
        "startedAt": "{The time when the job execution was started}",
        "lastUpdatedAt": "{The time when the job execution was last updated}",
        "executionNumber": "{A string which identifies this particular job execution onthis particular device.}",
      },
    }
  ],
  "nextToken": "{Token for next data}"
}
```

**Response Status**

| HTTP Status Code | Description |
| ---------------- | ----------- |
| 200 | List job execution for job success |
| 404 | Job ID not found |

---

### *GET* /jobs-executions/things/{thingName}

List job execution for thing

**Path Parameters**

| Name | Description |
| ---- | ----------- |
| thingName | Thing's name |

**Query String Parameters**

| Name | Schema | Description |
| ---- | ------ | ----------- |
| status | String | Job's status |

**Response Success Body**

```
{
  "jobExecution": [
    {
      "jobId": "{job's ID}",
      "jobExecution": {
        "status": "{Job execution status}" /* CANCELED | FAILED |
  IN_PROGRESS | QUEUED | REJECTED | REMOVED | SUCCEEDED | TIMED_OUT */
        "queuedAt": "{The time when the job execution was queued}",
        "startedAt": "{The time when the job execution was started}",
        "lastUpdatedAt": "{The time when the job execution was last updated}",
        "executionNumber": "{A string which identifies this particular job execution onthis particular device.}",
      },
    }
  ],
  "nextToken": "{Token for next data}"
}
```

**Response Status**

| HTTP Status Code | Description |
| ---------------- | ----------- |
| 200 | List job execution for job success |
| 404 | Job ID not found |

---

### *GET* /job-templates

List job templates

**Response Success Body**

```
{
  "JobTemplates": [{
    "jobTeplateArn": "{job templates' ARN}",
    "jobTemplateId": "{Job templates’ ID}"
    "document": "{Job templates' document}"
    "description": "Test Job Template",
    "presignedUrlConfig": {"{Configuration for pre-signed file location URLs}"},
    "jobExecutionsRolloutConfig": {"{Create an exponential rate of rollout for a job}"},
    "timeoutConfig": {"{Timeout configuration}"},
  }]
  "nextToken": "{Token for next data}",
}
```

**Response Status**

| HTTP Status Code | Description |
| ---------------- | ----------- |
| 200 | List job templates success |

---

### *PUT* /jobs/{jobId}

Update job

**Path Parameters**

| Name | Description |
| ---- | ----------- |
| jobId | Job's ID |

**Body**

| Name | Schema | Description |
| ---- | ------ | ----------- |
| description | String | Job's description

**Response Success Body**

```
{
  "updated": true
}
```

**Response Failure Body**

```
{
  "error": "{reason}"
}
```

**Response Status**

| HTTP Status Code | Description |
| ---------------- | ----------- |
| 200 | Update job success |
| 404 | Job ID not found |
| 422 | Missing require field / Variable Group incorrect |