import { QueryContext } from "../../../../../graphql/resolvers";
import { GetChatacterQuery } from "../../queries/get-character";
import { QueryGetCharacterArgs } from "../../../../../graphql/types";

export const getCharacterQuery = async (parent: any, args: QueryGetCharacterArgs, context: QueryContext) => {
  const { result } = await context.queryBus.execute(new GetChatacterQuery(args));
  return result;
};

export const getCharacterReferenceQuery = async (args: QueryGetCharacterArgs, context: QueryContext) => {
  const { result } = await context.queryBus.execute(new GetChatacterQuery(args));
  return result;
};
