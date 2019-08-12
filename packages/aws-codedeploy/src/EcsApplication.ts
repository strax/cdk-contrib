import {IResource, Resource, Construct, Aws} from "@aws-cdk/core"
import {CfnApplication} from "@aws-cdk/aws-codedeploy"

function arnForApplication(applicationName: string) {
    return `arn:${Aws.PARTITION}:codedeploy:${Aws.REGION}:${Aws.ACCOUNT_ID}:application:${applicationName}`;
}

/**
 * Represents a reference to a CodeDeploy Application deploying to Amazon ECS.
 *
 * If you're managing the Application alongside the rest of your CDK resources,
 * use the {@link EcsApplication} class.
 *
 * If you want to reference an already existing Application,
 * or one defined in a different CDK Stack,
 * use the {@link EcsApplication#fromEcsApplicationName} method.
 */
export interface IEcsApplication extends IResource {
  /** @attribute */
  readonly applicationArn: string
  /** @attribute */
  readonly applicationName: string
}

/**
 * Construction properties for {@link LambdaApplication}.
 */
export interface EcsApplicationProps {
  /**
   * The physical, human-readable name of the CodeDeploy Application.
   *
   * @default an auto-generated name will be used
   */
  readonly applicationName?: string
}

export class EcsApplication extends Resource implements IEcsApplication {
  static fromEcsApplicationName(scope: Construct, id: string, ecsApplicationName: string): IEcsApplication {
    class Import extends Resource implements IEcsApplication {
      readonly applicationArn = arnForApplication(ecsApplicationName)
      readonly applicationName = ecsApplicationName
    }
    return new Import(scope, id)
  }

  readonly applicationArn: string;
  readonly applicationName: string;

  constructor(scope: Construct, id: string, props: EcsApplicationProps = {}) {
    super(scope, id, { physicalName: props.applicationName })

    const resource = new CfnApplication(this, "Resource", {
      applicationName: this.physicalName,
      computePlatform: "ECS"
    })
    this.applicationName = this.getResourceNameAttribute(resource.ref)
    this.applicationArn = this.getResourceArnAttribute(arnForApplication(resource.ref), {
      service: "codedeploy",
      resource: "application",
      resourceName: this.physicalName,
      sep: ":"
    })
  }
}