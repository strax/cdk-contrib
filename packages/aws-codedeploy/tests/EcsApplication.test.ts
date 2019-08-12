import { render } from "@cdk-contrib/testing";
import test from "ava";
import { EcsApplication } from "..";

test("synthesis", async t => {
  const template = render(stack => new EcsApplication(stack, "EcsApplication", { applicationName: "test" }))

  t.snapshot(template)
})