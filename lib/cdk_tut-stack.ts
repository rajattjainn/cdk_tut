import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { ManualApprovalStep } from 'aws-cdk-lib/pipelines';
import { MyPipelineAppStage } from './stage';

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkTutStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline (this, 'Pipeline', {
      pipelineName: 'TestPipeline',
      synth: new ShellStep ('Synth', {
        input: CodePipelineSource.gitHub('rajattjainn/cdk_tut', 'main'),
      commands: ['npm ci',
        'npm run build',
        'npx cdk synth']
      }),
    });     

    const testingStage = pipeline.addStage(new MyPipelineAppStage (this, 'test', {
      env: {account: "058264150249", region: 'ap-southeast-1'}
    }))

    testingStage.addPost(new ManualApprovalStep ('Manual Approval before production'));

    const prodStage = pipeline.addStage(new MyPipelineAppStage (this, 'Prod', {
      env: {account: "058264150249", region: 'ap-southeast-1'}
    }))
  }
}
