import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return next();
  }

  const [bearer, token] = req.headers.authorization.split(" ");

  if (/^Bearer$/i.test(bearer) && token) {
    try {
      if (!jwt.verify(token, process.env.TOKEN_SECRET!)) {
        return next();
      }

      //@ts-ignore
      req.user = jwt.decode(token) || undefined;
    } catch (e) {
      //@ts-ignore
      req.user = null;
      return next();
    }
  }

  next();
};
