import { QueryContext } from "../../../../../graphql/resolvers";
import { ListChatactersQuery } from "../../queries/list-characters";
import { QueryListCharactersArgs } from "../../../../../graphql/types";

export const listCharactersQuery = async (parent: any, args: QueryListCharactersArgs, context: QueryContext) => {
  const { result } = await context.queryBus.execute(new ListChatactersQuery(args));
  return result;
};
