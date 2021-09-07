export interface AppConfig {
  appName: string;
  port: string;
  tokenExpiration: string;
  tokenSecret: string;
  passwordSalt: number;
}

export const createAppConfig = (): AppConfig => ({
  appName: String(process.env.APP_NAME),
  port: String(process.env.PORT),
  tokenExpiration: String(process.env.TOKEN_EXPIRATION),
  tokenSecret: String(process.env.TOKEN_SECRET),
  passwordSalt: Number(process.env.PASSWORD_SALT),
});
