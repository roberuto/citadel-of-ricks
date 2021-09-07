import { listCharactersQuery } from "../../app/features/characters/graphql/queries/list-characters.query";
import { getCharacterQuery } from "../../app/features/characters/graphql/queries/get-character.query";

export const query = {
  getCharacter: getCharacterQuery,
  listCharacters: listCharactersQuery,
};
