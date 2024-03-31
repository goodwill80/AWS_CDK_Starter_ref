import * as cdk from 'aws-cdk-lib';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

// 1. cdk init
// 1a. cdk init --language=typescript
// 1b. cdk synth (To create the cloud formation template for each stack in git ignore without deployment)
// 2. cdk bootstrap (To make a starter enviroment for our CDK application)
// 3. cdk deploy "name of the stack"
// 4. Other commands:
//      - "cdk list" - list all our stacks
//      - "cdk diff" - hightlight the number of stacks with differences between local and remote
//      - "cdk doctor" - tells you if there is any issues with your cdk
//      - 'cdk destroy "name_of_stack" - to delete a stack

// c. L3 construct
class L3Bucket extends Construct {
  constructor(scope: Construct, id: string, expiration: number) {
    super(scope, id);
    new Bucket(this, 'L3Bucket', {
      lifecycleRules: [
        {
          expiration: cdk.Duration.days(expiration),
        },
      ],
    });
  }
}

export class CdkStarterStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // create an s3 bucket in 3 ways:

    // a. L1 Construct
    new CfnBucket(this, 'MyL1Bucket', {
      lifecycleConfiguration: {
        rules: [
          {
            expirationInDays: 1,
            status: 'Enabled',
          },
        ],
      },
    });

    const duration = new cdk.CfnParameter(this, 'duration', {
      default: 6,
      minValue: 1,
      maxValue: 10,
      type: 'Number',
    });

    // b. L2 Construct
    const myL2Bucket = new Bucket(this, 'MyL2Bucket', {
      lifecycleRules: [
        {
          expiration: cdk.Duration.days(duration.valueAsNumber),
        },
      ],
    });

    // console.log('bucket name: ' + myL2Bucket.bucketName);
    // Extract data from stack using CfnOutput
    new cdk.CfnOutput(this, 'MyL2BucketName', {
      value: myL2Bucket.bucketName,
    });

    // c. L3 Construct
    new L3Bucket(this, 'MyL3Bucket', 3);
  }
}
