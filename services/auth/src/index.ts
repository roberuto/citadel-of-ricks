import { Server } from "http";
import { createContainer } from "./container";
import { AppConfig } from "../config/app";
import { Logger } from "./shared/logger";

(async () => {
  const container = await createContainer();

  process.on("uncaughtException", (err) => {
    process.exit(1);
  });

  process.on("unhandledRejection", (err) => {
    process.exit(1);
  });

  const server = container.resolve<Server>("server");

  const { port } = container.resolve<AppConfig>("appConfig");

  server.listen(port);
  const logger = container.resolve<Logger>("logger");

  logger.info(`listening on port: ${port}`);
})();
