import * as AWS from 'aws-sdk';
import * as Joi from 'joi';

import './validator';

const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

export class Request {

  public readonly event: {
    headers?: { [key: string]: string };
    pathParameters?: { [key: string]: string };
    queryStringParameters?: { [key: string]: string };
    body?: { [key: string]: any };
    requestContext?: { [key: string]: any };
  };

  public readonly headers: {
    [key: string]: string;
  };

  public readonly parameters: {
    [key: string]: string;
  }

  public readonly queries: {
    [key: string]: string;
  }

  public readonly body: {
    [key: string]: any;
  };

  public readonly requestContext: {
    [key: string]: any;
  };

  constructor(event: { [key: string]: any }) {
    this.event = event ?? {};
    this.headers = this.event.headers ?? {};
    this.parameters = this.event.pathParameters ?? {};
    this.queries = this.event.queryStringParameters ?? {};
    this.requestContext = this.event.requestContext ?? {};
    if (typeof this.event.body === 'string') {
      try {
        this.body = JSON.parse(this.event.body) ?? {};
      } catch (error) {
        this.body = {};
      }
    } else if (typeof this.event.body === 'object') {
      this.body = this.event.body ?? {};
    } else {
      this.body = {};
    }
  }
  parameter(key: string): string {
    let parameter = this.parameters[key] ?? null;
    if (parameter) {
      parameter = decodeURI(parameter);
    }
    return parameter;
  }
  get(key: string, defaultValue: any = null): any {
    let result = this.queries[key];
    if (result === undefined) {
      result = defaultValue;
    }
    return result;
  }
  input(key: string, defaultValue: any = null): any {
    let result = this.body[key];
    if (result === undefined) {
      result = this.queries[key] ?? defaultValue;
    }
    return result;
  }
  inputs(keys: string[]): { [key: string]: any } {
    const inputs: {
      [key: string]: any;
    } = {};
    for (let key of keys) {
      let input = this.input(key);
      if (input === undefined) {
        input = this.get(key);
      }
      inputs[key] = input;
    }
    return inputs;
  }
  has(key: string): boolean {
    if (this.queries[key] !== undefined) {
      return true;
    } else if (this.body[key] !== undefined) {
      return true;
    }
    return false;
  }
  header(key: string): string {
    return this.headers[key] ?? null;
  }
  async user() {
    const requestContext = this.requestContext ?? {};
    try {
      if (requestContext.authorizer) {
        let user;
        const authorizer = requestContext.authorizer ?? {};
        const claims = authorizer.claims ?? {};
        const identity = authorizer.identity ?? 'default';
        if (typeof claims === 'string') {
          user = JSON.parse(claims);
        } else {
          user = claims;
        }
        user.identity = identity;
        user.username = user['cognito:username'] ?? user.sub;
        return user;
      } else {
        const identity = requestContext.identity ?? {};
        let authProvider, userPoolId, userSub;
        authProvider = identity.cognitoAuthenticationProvider ?? {};
        if (/^.*,[\w.-]*\/(.*):.*:(.*)/.test(authProvider)) {
          [authProvider, userPoolId, userSub] = authProvider.match(/^.*,[\w.-]*\/(.*):.*:(.*)/);
          const cognitoUser = await cognitoIdentityServiceProvider.adminGetUser({
            UserPoolId: userPoolId,
            Username: userSub,
          }).promise();
          // const attributes = {};
          return cognitoUser;
          // for (const attribute of cognitoUser.UserAttributes) {
          //   attributes[attribute.Name] = attribute.Value;
          // }
          // return {
          //   enabled: user.Enabled ?? null,
          //   createdAt: user.UserCreateDate ?? null,
          //   updatedAt: user.UserLastModifiedDate ?? null,
          //   status: user.UserStatus ?? null,
          //   username: user.Username ?? null,
          //   ...attributes,
          // };
        }
      }
    } catch (error) {
      return error;
    }
  }

  validate(keysProvider: (Joi: Joi.Root) => any, options: Object = {}) {
    const keys = keysProvider(Joi);
    const schema = Joi.object().keys(keys);
    const result = schema.validate(
      this.inputs(
        Object.keys(keys),
      ),
      {
        abortEarly: false,
        ...options,
      },
    );
    let details: {
      [key: string]: string;
    }[] = [];
    if (result.error) {
      for (let detail of result.error.details) {
        details.push({
          ...detail.context,
          message: detail.message,
        });
      }
    }
    return {
      error: details.length > 0,
      details: details,
    };
  }

  async validateAsync(keysProvider: (Joi: Joi.Root) => any, options: Object = {}) {
    try {
      const keys = keysProvider(Joi);
      const schema = Joi.object().keys(keys);
      return await schema.validateAsync(
        this.inputs(
          Object.keys(keys),
        ),
        {
          abortEarly: false,
          ...options,
        },
      );
    } catch (error) {
      const errors = {};
      // for (const detail of error.details) {
      //   errors[detail.context.key] = detail.message;
      // }
      return Promise.reject(errors);
    }
  }
}