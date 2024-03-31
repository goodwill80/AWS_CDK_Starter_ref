#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
// import { CdkStarterStack } from '../lib/cdk-starter-stack';
import { PhotoImageStack } from '../lib/PhotoStack';
import { PhotoHandlerStack } from '../lib/PhotoHandlerStack';
import { BucketTagger } from './Tagger';

const app = new cdk.App();
// new CdkStarterStack(app, 'CdkStarterStack');
const photosStack = new PhotoImageStack(app, 'PhotoImageStack');
new PhotoHandlerStack(app, 'PhotoHandlerStack', {
  targetBucketArn: photosStack.photoBucketArn,
});

const tagger = new BucketTagger('level', 'test');
cdk.Aspects.of(app).add(tagger);
