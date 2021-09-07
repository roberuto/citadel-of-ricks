import * as awilix from "awilix";
import { AwilixContainer } from "awilix";

import { getCharacterAction } from "../app/features/characters/actions/get-character.action";

export async function registerActions(container: AwilixContainer) {
  container.register({
    getCharacterAction: awilix.asFunction(getCharacterAction),
  });

  return container;
}
