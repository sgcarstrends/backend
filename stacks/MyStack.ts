import { StackContext, Api, EventBus } from "sst/constructs";

export const api = ({ stack }: StackContext) => {
  const bus = new EventBus(stack, "bus", {
    defaults: {
      retries: 10,
    },
  });

  const api = new Api(stack, "api", {
    defaults: {
      throttle: { burst: 5, rate: 50 },
      function: {
        bind: [bus],
      },
    },
    customDomain: {
      domainName: "api.singapore-ev-trends.ruchern.xyz",
      hostedZone: "ruchern.xyz",
    },
    cors: {
      allowOrigins: ["https://singapore-ev-trends.ruchern.xyz"],
    },
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
      "GET /todo": "packages/functions/src/todo.list",
      "POST /todo": "packages/functions/src/todo.create",
    },
  });

  bus.subscribe("todo.created", {
    handler: "packages/functions/src/events/todo-created.handler",
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
};
