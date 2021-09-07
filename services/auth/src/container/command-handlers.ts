import * as awilix from "awilix";
import { AwilixContainer } from "awilix";

import { asArray } from "../shared/utils/as-array";

import LoginAuthHandler from "../app/features/auth/handlers/login-auth.handler";
import SignUpAuthHandler from "../app/features/auth/handlers/sign-up-auth.handler";
// HANDLERS_IMPORTS

export async function registerCommandHandlers(container: AwilixContainer) {
  container.register({
    commandHandlers: asArray<any>([awilix.asClass(LoginAuthHandler), awilix.asClass(SignUpAuthHandler)]),
  });

  return container;
}
