// Create the DynamoDB table
export const table = new sst.aws.Dynamo("Counter", {
  fields: {
    counter: "string",
  },
  primaryIndex: { hashKey: "counter" },
});

// Create the API Gateway
export const api = new sst.aws.ApiGatewayV2("Api", {
  routes: {
    "POST /": {
      handler: "packages/functions/src/lambda.main",
      link: [table],
    },
    "ANY /trpc/{proxy+}": {
      handler: "packages/functions/src/trpc.handler",
    },
  },
});

export const ExampleStack = {
  api,
  table
};