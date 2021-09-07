import { CommandHandler } from "../../../../shared/command-bus";
import { LOGIN_AUTH_COMMAND_TYPE, LoginAuthCommand } from "../commands/login-auth.command";
import { AuthService } from "../../../../shared/auth-service";
import { UserRepository } from "../../users/repository/user.types";
interface LoginAuthHandlerDependencies {
  authService: AuthService;
  userRepository: UserRepository;
}

export default class LoginAuthHandler implements CommandHandler<LoginAuthCommand> {
  public commandType: string = LOGIN_AUTH_COMMAND_TYPE;

  constructor(private readonly dependencies: LoginAuthHandlerDependencies) {}

  async execute({ payload: { input } }: LoginAuthCommand) {
    const { userRepository, authService } = this.dependencies;
    const { email, password } = input;

    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw Error("user.not-found");
    }

    const token = authService.auth({ user, password });

    if (!token) {
      throw Error("invalid.credentials");
    }

    return {
      result: {
        token,
      },
    };
  }
}
