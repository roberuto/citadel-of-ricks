import { ApolloGateway, RemoteGraphQLDataSource } from "@apollo/gateway";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import * as express from "express";

import { loadEnvs } from "./config/env";
import { getSubgraphs } from "./utils/graphql";
import { authMiddleware } from "./middlewares/auth.middleware";

loadEnvs();

getSubgraphs();

const port = process.env.PORT;
const app = express();

app.use(authMiddleware);

const gateway = new ApolloGateway({
  ...getSubgraphs(),
  buildService({ url }) {
    return new RemoteGraphQLDataSource({
      url,
      willSendRequest({ request, context }) {
        //@ts-ignore
        request?.http?.headers.set("authorization", context?.authorization ? context?.authorization : null);
        //@ts-ignore
        request?.http?.headers.set("user", context?.user ? JSON.stringify(context.user) : null);
      },
    });
  },
});

const server = new ApolloServer({
  gateway,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
  context: ({ req }) => {
    const user = req.user || null;
    const authorization = req.headers?.authorization;

    return { user, authorization };
  },
});

server.start().then(() => {
  server.applyMiddleware({ app });

  app.listen({ port }, () => console.log(`listening on port: ${port}`));
});
