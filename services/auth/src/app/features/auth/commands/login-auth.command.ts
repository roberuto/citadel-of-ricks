import { Command } from "../../../../shared/command-bus";
import { AuthInput } from "../../../../graphql/types";

export const LOGIN_AUTH_COMMAND_TYPE = "auth/LOGIN_AUTH";

export interface LoginAuthCommandPayload {
  input: AuthInput;
}

export class LoginAuthCommand implements Command<LoginAuthCommandPayload> {
  public type: string = LOGIN_AUTH_COMMAND_TYPE;

  constructor(public payload: LoginAuthCommandPayload) {}
}
