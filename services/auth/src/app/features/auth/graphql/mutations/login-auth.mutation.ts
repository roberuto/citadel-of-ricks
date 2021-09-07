import { MutationContext } from "../../../../../graphql/resolvers";
import { LoginAuthCommand } from "../../commands/login-auth.command";
import { MutationLoginArgs } from "../../../../../graphql/types";

export const loginMutation = async (parent: any, args: MutationLoginArgs, context: MutationContext) => {
  const { result } = await context.commandBus.execute(new LoginAuthCommand(args));
  return result;
};
