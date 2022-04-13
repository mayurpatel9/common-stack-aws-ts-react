import { Stack, StackProps, CfnParameter, Duration, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import { Bucket } from 'aws-cdk-lib/aws-s3'

export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const days = new CfnParameter(this, 'duration', {
      type: 'Number',
      default: 6,
      minValue: 1,
      maxValue: 10

    })

    const myBucket = new Bucket(this, 'myBucket', {
      lifecycleRules: [{
        expiration: Duration.days(days.valueAsNumber)
      }]
    })

    new CfnOutput(this, 'outputBucket', {
      value: myBucket.bucketName
    });
 
    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
