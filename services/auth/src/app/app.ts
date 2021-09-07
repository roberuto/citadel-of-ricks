import * as express from "express";
import { Application } from "express";
import * as helmet from "helmet";
import * as cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { AppConfig } from "../../config/app";
import { CreateApolloServer } from "./apollo-server";

export interface AppProps {
  router: express.Router;
  appConfig: AppConfig;
  createApolloServer: CreateApolloServer;
  authMiddleware: any;
}

export interface CreateAppResult {
  app: Application;
  apolloServer: ApolloServer;
}

export const createApp = async ({ appConfig, createApolloServer, authMiddleware }: AppProps) => {
  const app = express();
  const apolloServer = createApolloServer();

  app.use(cors());
  app.use(helmet({ contentSecurityPolicy: process.env.NODE_ENV === "production" ? undefined : false }));
  app.use(express.json({ limit: "2Mb" }));
  app.use(authMiddleware);

  app.get("/health", (_, res) => {
    res.status(200).json({
      status: "200 - ok",
    });
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, path: "/graphql" });

  return { app, apolloServer };
};
