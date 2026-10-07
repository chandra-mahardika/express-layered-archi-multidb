import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import { ApiError } from "../utils/ApiError";

export interface AuthRequest extends Request {
  user?: { id: number; roles: string[]; permissions: string[] };
}

export const authenticate = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return next(new ApiError(401, "Token tidak ditemukan"));
  }
  try {
    const payload = verifyToken(header.split(" ")[1]);
    (req as AuthRequest).user = payload;
    next();
  } catch {
    next(new ApiError(401, "Token tidak valid"));
  }
};
