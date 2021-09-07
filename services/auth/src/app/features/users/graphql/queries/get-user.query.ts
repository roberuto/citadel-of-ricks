import { QueryContext } from "../../../../../graphql/resolvers";
import { GetUserQuery } from "../../queries/get-user";
import {} from "../../../../../graphql/types";

export const getUserQuery = async (parent: any, args: any, context: QueryContext) => {
  const { result } = await context.queryBus.execute(new GetUserQuery({ user: context.user }));
  return result;
};

export const getUserReferenceQuery = async (args: any, context: QueryContext) => {
  const { result } = await context.queryBus.execute(new GetUserQuery({ user: context.user }));
  return result;
};
