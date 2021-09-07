import { MutationContext } from "../../../../../graphql/resolvers";
import { SignUpAuthCommand } from "../../commands/sign-up-auth.command";
import { MutationSignUpArgs } from "../../../../../graphql/types";

export const signUpMutation = async (parent: any, args: MutationSignUpArgs, context: MutationContext) => {
  const { result } = await context.commandBus.execute(new SignUpAuthCommand(args));
  return result;
};
