import { ApolloServer, gql } from "apollo-server";
import { buildFederatedSchema } from "@apollo/federation";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { applyMiddleware } from "graphql-middleware";

import { loadEnvs } from "../config/env";
import { getGraphQLSchema, createSubgraph } from "./utils/graphql";
import { ricksPicksRepository } from "./repository";
import { permissions } from "./permissions";
import { Character } from "./types";

loadEnvs();

const port = process.env.PORT;

const graphQLSchema = getGraphQLSchema();
const typeDefs = gql(graphQLSchema);

createSubgraph(typeDefs);

const resolvers = {
  Query: {
    listRicksPicks(_: any, __: any, { user }: any) {
      return ricksPicksRepository.findAllByUserId(user.id);
    },
  },
  Mutation: {
    pickARick(_: any, { characterId }: any, { user }: any) {
      const newPick = {
        character: { id: characterId },
        user: { id: user.id },
      };
      return ricksPicksRepository.add(newPick);
    },
  },
  RicksPicks: {
    __resolveReference({ id }: { id: string }) {
      return ricksPicksRepository.findById(id);
    },
  },
  Character: {
    ricksPicks({ id }: { id: string }) {
      return ricksPicksRepository.findByCharacterId(id);
    },
    speciesStatus(character: Character) {
      return `${character.species} ${character.status}`;
    },
  },
};

const server = new ApolloServer({
  schema: applyMiddleware(buildFederatedSchema([{ typeDefs, resolvers }]), permissions),
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
  context: ({ req }) => {
    const user = req.headers.user ? JSON.parse(req.headers.user) : null;
    return { user };
  },
});

server.listen({ port }).then(({ port }) => {
  console.log(`listening on port: ${port}`);
});
