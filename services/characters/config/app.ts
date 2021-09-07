export interface AppConfig {
  appName: string;
  port: string;
  rickAndMortyApi: string;
}

export const createAppConfig = (): AppConfig => ({
  appName: String(process.env.APP_NAME),
  port: String(process.env.PORT),
  rickAndMortyApi: String(process.env.RICK_AND_MORTY_API),
});
