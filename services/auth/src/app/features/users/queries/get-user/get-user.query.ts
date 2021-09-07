import { Query } from "../../../../../shared/query-bus";
import { User } from "../../../../../graphql/types";

export const GET_USER_QUERY_TYPE = "users/GET_USER";

export interface GetUserQueryPayload {
  user: Pick<User, "id"> | null;
}

export class GetUserQuery implements Query<GetUserQueryPayload> {
  public type: string = GET_USER_QUERY_TYPE;

  constructor(public payload: GetUserQueryPayload) {}
}
