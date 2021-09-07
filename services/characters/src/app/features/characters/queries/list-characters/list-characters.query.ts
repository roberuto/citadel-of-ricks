import { Query } from "../../../../../shared/query-bus";
import { Maybe } from "../../../../../graphql/types";

export const LIST_CHARACTERS_QUERY_TYPE = "characters/LIST_CHARACTERS";

export interface ListCharactersQueryPayload {
  page?: Maybe<number>;
}

export class ListChatactersQuery implements Query<ListCharactersQueryPayload> {
  public type: string = LIST_CHARACTERS_QUERY_TYPE;

  constructor(public payload: ListCharactersQueryPayload) {}
}
