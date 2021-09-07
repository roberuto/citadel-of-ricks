import * as express from "express";

export interface RoutingDependencies {
  charactersRouting: express.Router;
}

export const createRouter = ({ charactersRouting }: RoutingDependencies) => {
  const router = express.Router();

  router.use("/characters", charactersRouting);

  return router;
};
