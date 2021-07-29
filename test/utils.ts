const fnGetAttArn = (arn: string): { [key: string]: string[] } => {
  return {
    'Fn::GetAtt': [arn, 'Arn'],
  };
};

const fnJoin = (delimiter: string, values: any[]): { [key: string]: any[] } => {
  return {
    'Fn::Join': [delimiter, values],
  };
};

const ref = (name: string): { [key: string]: string } => {
  return {
    Ref: name,
  };
};

export {
  fnGetAttArn,
  fnJoin,
  ref,
};