import { QueryHandler } from "../../../../shared/query-bus";
import { GET_USER_QUERY_TYPE, GetUserQuery, GetUserQueryResult } from "../queries/get-user";
import { UserRepository } from "../repository/user.types";

interface GetUserQueryHandlerDependencies {
  userRepository: UserRepository;
}

export default class GetUserQueryHandler implements QueryHandler<GetUserQuery, GetUserQueryResult> {
  public queryType: string = GET_USER_QUERY_TYPE;

  constructor(private readonly dependencies: GetUserQueryHandlerDependencies) {}

  async execute({ payload: { user } }: GetUserQuery): Promise<GetUserQueryResult> {
    const { userRepository } = this.dependencies;

    if (!user) {
      throw Error("user.unauthorized");
    }

    const found = await userRepository.findById(user.id);

    if (!found) {
      throw Error("user.not-found");
    }

    return new GetUserQueryResult({
      id: found.id,
      email: found.email,
    });
  }
}
