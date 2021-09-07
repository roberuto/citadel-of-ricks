import { QueryResult } from "../../../../../shared/query-bus";
import { Character } from "../../../../../graphql/types";

export class GetCharacterQueryResult implements QueryResult<Character> {
  constructor(public result: Character) {}
}
