import { getCharacterReferenceQuery } from "../../app/features/characters/graphql/queries/get-character.query";

export const resolveReference = {
  Character: {
    __resolveReference: getCharacterReferenceQuery,
  },
};
