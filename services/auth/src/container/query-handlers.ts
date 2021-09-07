import * as awilix from "awilix";
import { AwilixContainer } from "awilix";

import { asArray } from "../shared/utils/as-array";

import GetUserQueryHandler from "../app/features/users/query-handlers/get-user.query.handler";
// HANDLERS_IMPORTS

export async function registerQueryHandlers(container: AwilixContainer) {
  container.register({
    queryHandlers: asArray<any>([awilix.asClass(GetUserQueryHandler)]),
  });

  return container;
}
