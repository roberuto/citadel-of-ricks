import { Request, Response, NextFunction } from "express";
import { QueryBus } from "../../../../shared/query-bus";
import { GetChatacterQuery } from "../queries/get-character/get-character.query";

export interface CurrenciesActionDependencies {
  queryBus: QueryBus;
}

export const getCharacterAction =
  ({ queryBus }: CurrenciesActionDependencies) =>
  (req: Request, res: Response, next: NextFunction) => {
    queryBus
      .execute(new GetChatacterQuery({ id: req.params.id }))
      .then((queryResult) => {
        res.json(queryResult.result);
      })
      .catch(next);
  };
