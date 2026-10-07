import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { AuthRequest } from "./auth.middleware";

export const authorize =
  (...roles: string[]) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const user = (req as AuthRequest).user;
    if (!user || !roles.some((r) => user.roles?.includes(r))) {
      return next(new ApiError(403, "Akses ditolak"));
    }
    next();
  };

export const requirePermission =
  (...permissions: string[]) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const user = (req as AuthRequest).user;
    if (!user) {
      return next(new ApiError(401, "Tidak terautentikasi"));
    }
    const hasAll = permissions.every((p) => user.permissions?.includes(p));
    if (!hasAll) {
      return next(new ApiError(403, "Akses ditolak: permission tidak cukup"));
    }
    next();
  };
