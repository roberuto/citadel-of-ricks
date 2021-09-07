import { QueryHandler } from "../../../../shared/query-bus";
import { RickAndMortyApi } from "../../../../clients/RickAndMortyApi";
import { LIST_CHARACTERS_QUERY_TYPE, ListChatactersQuery, ListCharactersQueryResult } from "../queries/list-characters";

interface ListAlbumsQueryHandlerDependencies {
  rickAndMortyApi: RickAndMortyApi;
}

export default class ListAlbumsQueryHandler implements QueryHandler<ListChatactersQuery, ListCharactersQueryResult> {
  public queryType: string = LIST_CHARACTERS_QUERY_TYPE;

  constructor(private readonly dependencies: ListAlbumsQueryHandlerDependencies) {}

  async execute({ payload: { page } }: ListChatactersQuery): Promise<ListCharactersQueryResult> {
    const { rickAndMortyApi } = this.dependencies;

    const result = await rickAndMortyApi.getAllCharacters(page);

    return new ListCharactersQueryResult(result);
  }
}
