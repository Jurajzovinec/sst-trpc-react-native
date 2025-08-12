/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "expo-app",
      region: "eu-central-1",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    const { ExampleStack } = await import("./stacks/ExampleStack");
    return {
      outputs: {
        api: ExampleStack.api.url,
      },
    };
  },
});
