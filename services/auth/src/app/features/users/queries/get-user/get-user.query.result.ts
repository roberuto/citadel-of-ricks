import { QueryResult } from "../../../../../shared/query-bus";
import { User } from "../../../../../graphql/types";

export class GetUserQueryResult implements QueryResult<User> {
  constructor(public result: User) {}
}
