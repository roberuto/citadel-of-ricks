import { QueryHandler } from "../../../../shared/query-bus";
import { RickAndMortyApi } from "../../../../clients/RickAndMortyApi";
import { GET_CHARACTER_QUERY_TYPE, GetChatacterQuery, GetCharacterQueryResult } from "../queries/get-character";

interface ListAlbumsQueryHandlerDependencies {
  rickAndMortyApi: RickAndMortyApi;
}

export default class GetCharacterQueryHandler implements QueryHandler<GetChatacterQuery, GetCharacterQueryResult> {
  public queryType: string = GET_CHARACTER_QUERY_TYPE;

  constructor(private readonly dependencies: ListAlbumsQueryHandlerDependencies) {}

  async execute({ payload: { id } }: GetChatacterQuery): Promise<GetCharacterQueryResult> {
    const { rickAndMortyApi } = this.dependencies;

    const result = await rickAndMortyApi.getCharacter(id);

    return new GetCharacterQueryResult(result);
  }
}
