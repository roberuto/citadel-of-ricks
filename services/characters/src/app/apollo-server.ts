import { ApolloServer, gql } from "apollo-server-express";
import { buildFederatedSchema } from "@apollo/federation";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginInlineTraceDisabled,
} from "apollo-server-core";

import { GraphqlContext } from "../graphql/resolvers";
import { CommandBus } from "../shared/command-bus";
import { QueryBus } from "../shared/query-bus";
import { createSubgraph } from "../shared/graphql-tools";

export interface ApolloServerProps {
  commandBus: CommandBus;
  queryBus: QueryBus;
  graphQLSchema: string;
  resolvers: any;
  referenceResolvers: any;
}

export const createApolloServerFactory =
  ({ commandBus, graphQLSchema, queryBus, resolvers, referenceResolvers }: ApolloServerProps) =>
  (initialContext: Partial<GraphqlContext> = {}) => {
    const typeDefs = gql(graphQLSchema);

    createSubgraph(typeDefs);

    return new ApolloServer({
      schema: buildFederatedSchema([
        {
          typeDefs,
          resolvers: {
            ...resolvers,
            ...referenceResolvers,
          },
        },
      ]),
      plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
      context: (): GraphqlContext => ({
        commandBus,
        queryBus,
        ...initialContext,
      }),
    });
  };

export type CreateApolloServer = ReturnType<typeof createApolloServerFactory>;
