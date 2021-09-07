import { CommandHandler } from "../../../../shared/command-bus";
import { SIGN_UP_AUTH_COMMAND_TYPE, SignUpAuthCommand } from "../commands/sign-up-auth.command";
import { AuthService } from "../../../../shared/auth-service";
import { UserRepository } from "../../users/repository/user.types";

interface SignUpAuthHandlerDependencies {
  authService: AuthService;
  userRepository: UserRepository;
}

export default class SignUpAuthHandler implements CommandHandler<SignUpAuthCommand> {
  public commandType: string = SIGN_UP_AUTH_COMMAND_TYPE;

  constructor(private readonly dependencies: SignUpAuthHandlerDependencies) {}

  async execute({ payload: { input } }: SignUpAuthCommand) {
    const { userRepository, authService } = this.dependencies;
    const { email, password } = input;

    const existingUser = await userRepository.findByEmail(email);

    if (existingUser) {
      throw Error("user.already-exists");
    }

    const hashedPassword = authService.hashPassword(password);
    const user = await userRepository.createUser({ email, password: hashedPassword });
    const token = authService.generate(user);

    return {
      result: {
        token,
      },
    };
  }
}
