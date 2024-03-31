import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';

export class PhotoImageStack extends cdk.Stack {
  private stackSuffix: string;
  public readonly photoBucketArn: string;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.initializeSuffix();

    const photosBucket = new Bucket(this, 'PhotoImageBucket', {
      bucketName: `photosbucket-${this.stackSuffix}`,
    });

    this.photoBucketArn = photosBucket.bucketArn;

    // To make this accessible to to other stacks
    // new cdk.CfnOutput(this, 'photos-bucket', {
    //   value: `photos-bucket-${this.stackSuffix}`,
    //   exportName: 'photos-bucket',
    // });

    // Overidding of Logical ID
    // (myPhotoBucket.node.defaultChild as CfnBucket).overrideLogicalId(
    //   'PhotoImageBucket2'
    // );
  }

  private initializeSuffix() {
    const shortStackId = cdk.Fn.select(2, cdk.Fn.split('/', this.stackId));
    this.stackSuffix = cdk.Fn.select(4, cdk.Fn.split('-', shortStackId));
  }
}
