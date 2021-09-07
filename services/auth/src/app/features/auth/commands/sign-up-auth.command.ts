import { Command } from "../../../../shared/command-bus";
import { AuthInput } from "../../../../graphql/types";

export const SIGN_UP_AUTH_COMMAND_TYPE = "auth/SIGN_UP_AUTH";

export interface SignUpAuthCommandPayload {
  input: AuthInput;
}

export class SignUpAuthCommand implements Command<SignUpAuthCommandPayload> {
  public type: string = SIGN_UP_AUTH_COMMAND_TYPE;

  constructor(public payload: SignUpAuthCommandPayload) {}
}
