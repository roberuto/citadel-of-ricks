import { QueryResult } from "../../../../../shared/query-bus";
import { Characters } from "../../../../../graphql/types";

export class ListCharactersQueryResult implements QueryResult<Characters> {
  constructor(public result: Characters) {}
}
