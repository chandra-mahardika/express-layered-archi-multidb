import { prismaAuth as prisma } from "../../config/prisma";

const selectWithoutPassword = {
  id: true,
  name: true,
  username: true,
  email: true,
  createdAt: true,
  updatedAt: true,
  userRoles: {
    select: { role: { select: { id: true, name: true } } },
  },
} as const;

export const findAll = () =>
  prisma.user.findMany({ select: selectWithoutPassword });

export const findById = (id: number) =>
  prisma.user.findUnique({ where: { id }, select: selectWithoutPassword });

export const update = (id: number, data: { name?: string; email?: string; username?: string }) =>
  prisma.user.update({ where: { id }, data, select: selectWithoutPassword });

export const remove = (id: number) => prisma.user.delete({ where: { id } });
