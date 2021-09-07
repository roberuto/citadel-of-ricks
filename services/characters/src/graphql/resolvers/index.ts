import { Resolvers } from "../types";
import { CommandBus } from "../../shared/command-bus";
import { QueryBus } from "../../shared/query-bus";
import { query } from "./query";
import { resolveReference } from "./reference";

export type GraphqlContext = {
  commandBus: CommandBus;
  queryBus: QueryBus;
};

export type MutationContext = Omit<GraphqlContext, "queryBus">;
export type QueryContext = Omit<GraphqlContext, "commandBus">;

interface ResolversDependencies {}

export const createResolvers = (_dependencies: ResolversDependencies): Resolvers => ({
  Query: query,
});

export const createReferenceResolvers = () => resolveReference;
