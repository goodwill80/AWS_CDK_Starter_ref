import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import {
  Code,
  Function as LamdaFunction,
  Runtime,
} from 'aws-cdk-lib/aws-lambda';
import { Fn } from 'aws-cdk-lib';

interface PhotosHandlerStackProps extends cdk.StackProps {
  targetBucketArn: string;
}

export class PhotoHandlerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: PhotosHandlerStackProps) {
    super(scope, id, props);

    // To import output from other stacks
    // const targetBucket = Fn.importValue('photos-bucket');

    new LamdaFunction(this, 'PhotosHandler', {
      runtime: Runtime.NODEJS_16_X,
      handler: 'index.handler',
      code: Code.fromInline(`
        exports.handler = async (event) => {
          console.log("hello!: " + process.env.TARGET_BUCKET)
        }
      `),
      environment: {
        TARGET_BUCKET: props.targetBucketArn,
      },
    });
  }
}
