import { Stack, StackProps, CfnParameter, Duration, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Code, Function as LambdaFunction, Runtime } from 'aws-cdk-lib/aws-lambda';
import { join } from 'path';
import {LambdaIntegration, RestApi} from 'aws-cdk-lib/aws-apigateway'
import { HttpMethod } from 'aws-cdk-lib/aws-events';
import { GenericTable } from './GenericTable';

export class CdkStack extends Stack {
  
  private api = new RestApi(this, 'helloApi')
  private spaceTable = new GenericTable('SpacesTable', 'spaceId', this)

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);



    const helloLambda = new LambdaFunction(this, 'helloFunction', {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset(join(__dirname, '..', 'services', 'hello')),
      handler: 'hello.main'
    })

    //hello api integration
    const helloLambdaIntegration = new LambdaIntegration(helloLambda);
    const helloLambdaResource = this.api.root.addResource('hello');
    helloLambdaResource.addMethod(HttpMethod.GET, helloLambdaIntegration);
  }
}
