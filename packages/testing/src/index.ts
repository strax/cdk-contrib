import { App, Stack } from "@aws-cdk/core"
import { CloudAssembly, CloudFormationStackArtifact } from "@aws-cdk/cx-api"

export function render(f: (stack: Stack) => void): unknown {
  const app = new App()
  const stack = new Stack(app, "Stack")
  f(stack)
  const asm = app.synth() as CloudAssembly
  const artifact = asm.artifacts[0] as CloudFormationStackArtifact
  return artifact.template
}