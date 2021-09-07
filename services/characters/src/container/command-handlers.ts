import * as awilix from "awilix";
import { AwilixContainer } from "awilix";

import { asArray } from "../shared/utils/as-array";

// HANDLERS_IMPORTS

export async function registerCommandHandlers(container: AwilixContainer) {
  container.register({
    commandHandlers: asArray<any>([]),
  });

  return container;
}
