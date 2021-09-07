import * as express from "express";

export interface CharactersRoutingDependencies {
  getCharacterAction: express.RequestHandler;
}

export const charactersRouting = (actions: CharactersRoutingDependencies) => {
  const router = express.Router();

  router.get("/:id", actions.getCharacterAction);

  return router;
};
