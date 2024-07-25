#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkTutStack } from '../lib/cdk_tut-stack';

const app = new cdk.App();
new CdkTutStack(app, 'CdkTutStack', {
  
  env: {
    account: '058264150249', 
    region: 'ap-southeast-1'
  }
});

app.synth();