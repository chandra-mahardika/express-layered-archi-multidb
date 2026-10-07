import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../config/env";

export const signToken = (payload: object): string =>
  jwt.sign(payload, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn as SignOptions["expiresIn"],
  });

export const verifyToken = (token: string) =>
  jwt.verify(token, env.jwtSecret) as { id: number; roles: string[]; permissions: string[] };
