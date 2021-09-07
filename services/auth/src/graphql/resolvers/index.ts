import { Resolvers } from "../types";
import { CommandBus } from "../../shared/command-bus";
import { QueryBus } from "../../shared/query-bus";
import { query } from "./query";
import { mutation } from "./mutation";
import { resolveReference } from "./reference";
import { User } from "../types";

export type GraphqlContext = {
  commandBus: CommandBus;
  queryBus: QueryBus;
  user: Pick<User, "id"> | null;
};

export type MutationContext = Omit<GraphqlContext, "queryBus">;
export type QueryContext = Omit<GraphqlContext, "commandBus">;

interface ResolversDependencies {}

export const createResolvers = (_dependencies: ResolversDependencies): Resolvers => ({
  Query: query,
  Mutation: mutation,
});

export const createReferenceResolvers = () => resolveReference;
