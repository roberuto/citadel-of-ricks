import { Query } from "../../../../../shared/query-bus";

export const GET_CHARACTER_QUERY_TYPE = "characters/GET_CHARACTER";

export interface GetCharacterQueryPayload {
  id: string;
}

export class GetChatacterQuery implements Query<GetCharacterQueryPayload> {
  public type: string = GET_CHARACTER_QUERY_TYPE;

  constructor(public payload: GetCharacterQueryPayload) {}
}
