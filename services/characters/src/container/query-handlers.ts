import * as awilix from "awilix";
import { AwilixContainer } from "awilix";

import { asArray } from "../shared/utils/as-array";

import ListAlbumsQueryHandler from "../app/features/characters/query-handlers/list-characters.query.handler";
import GetCharacterQueryHandler from "../app/features/characters/query-handlers/get-character.query.handler";
// HANDLERS_IMPORTS

export async function registerQueryHandlers(container: AwilixContainer) {
  container.register({
    queryHandlers: asArray<any>([awilix.asClass(ListAlbumsQueryHandler), awilix.asClass(GetCharacterQueryHandler)]),
  });

  return container;
}
