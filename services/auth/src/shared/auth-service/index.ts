import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

import { User } from "../../app/features/users/repository/user.types";
import { AppConfig } from "../../../config/app";
import { Logger } from "../logger";

interface AuthServiceDependencies {
  appConfig: AppConfig;
  logger: Logger;
}

interface AuthUserProps {
  user: User;
  password: string;
}

export class AuthService {
  constructor(private dependencies: AuthServiceDependencies) {}

  private generateToken(subject: object) {
    const { appConfig } = this.dependencies;
    return jwt.sign(subject, appConfig.tokenSecret, { expiresIn: appConfig.tokenExpiration });
  }

  private verifyToken(token: string) {
    const { appConfig } = this.dependencies;
    return jwt.verify(token, appConfig.tokenSecret);
  }

  auth({ user, password }: AuthUserProps) {
    const { logger } = this.dependencies;

    if (bcrypt.compareSync(password, user.password)) {
      return this.generateToken({ id: user.id });
    }

    logger.info("Authentication failed");

    return false;
  }

  generate(user: User) {
    return this.generateToken({ id: user.id });
  }

  hashPassword(password: string) {
    const { appConfig } = this.dependencies;
    return bcrypt.hashSync(password, appConfig.passwordSalt);
  }
}
