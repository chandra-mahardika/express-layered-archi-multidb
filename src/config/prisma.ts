import { PrismaClient as AuthPrismaClient } from "../generated/auth";
import { PrismaClient as TxPrismaClient } from "../generated/transactions";

export const prismaAuth = new AuthPrismaClient();
export const prismaTx = new TxPrismaClient();
