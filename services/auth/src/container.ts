import * as awilix from "awilix";
import { AwilixContainer } from "awilix";
import * as http from "http";

import { createAppConfig } from "../config/app";
import { loadEnvs } from "../config/env";
import { createApp, CreateAppResult } from "./app/app";
import { createApolloServerFactory } from "./app/apollo-server";
import { winstonLogger } from "./shared/logger";
import { createResolvers, createReferenceResolvers } from "./graphql/resolvers";
import { QueryBus } from "./shared/query-bus";
import { CommandBus } from "./shared/command-bus";
import { AuthService } from "./shared/auth-service";
import { getGraphQLSchema } from "./shared/graphql-tools";
import { UserInMemoryRepository } from "./app/features/users/repository/user.repository";
import { registerQueryHandlers } from "./container/query-handlers";
import { registerCommandHandlers } from "./container/command-handlers";
import { authMiddleware } from "./middlewares/auth.middleware";

loadEnvs();

export async function createContainer(): Promise<AwilixContainer> {
  const container: AwilixContainer = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
  });

  container.register({
    appConfig: awilix.asValue(createAppConfig()),
    logger: awilix.asValue(winstonLogger),
  });

  container.register({
    graphQLSchema: awilix.asValue(getGraphQLSchema()),
    resolvers: awilix.asFunction(createResolvers),
    referenceResolvers: awilix.asFunction(createReferenceResolvers),
    queryBus: awilix.asClass(QueryBus).classic().singleton(),
    commandBus: awilix.asClass(CommandBus).classic().singleton(),
    authService: awilix.asClass(AuthService).singleton(),
    userRepository: awilix.asClass(UserInMemoryRepository).classic().singleton(),
    authMiddleware: awilix.asValue(authMiddleware),
  });

  await registerQueryHandlers(container);
  await registerCommandHandlers(container);

  container.register({
    createApolloServer: awilix.asFunction(createApolloServerFactory).singleton(),
    createAppResult: awilix.asFunction(createApp).singleton(),
  });

  container.register({
    createApolloServer: awilix.asFunction(createApolloServerFactory).singleton(),
    createAppResult: awilix.asFunction(createApp).singleton(),
  });

  const { app, apolloServer } = (await container.resolve("createAppResult")) as CreateAppResult;

  container.register({
    app: awilix.asValue(app),
    server: awilix.asValue(http.createServer(app)),
    apolloServer: awilix.asValue(apolloServer),
  });

  return container;
}
