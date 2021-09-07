import * as awilix from "awilix";
import { AwilixContainer } from "awilix";

import { createRouter } from "../app/router";
import { charactersRouting } from "../app/features/characters/routing";

export async function registerRouting(container: AwilixContainer) {
  container.register({
    router: awilix.asFunction(createRouter),
    charactersRouting: awilix.asFunction(charactersRouting),
  });

  return container;
}
