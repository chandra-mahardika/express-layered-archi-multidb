import { prismaTx as prisma } from "../../config/prisma";

export const findAll = () => prisma.product.findMany();

export const findById = (id: number) =>
  prisma.product.findUnique({ where: { id } });

export const create = (data: {
  name: string;
  description?: string;
  price: number;
  stock: number;
  userId: number;
}) => prisma.product.create({ data });

export const update = (
  id: number,
  data: { name?: string; description?: string; price?: number; stock?: number },
) => prisma.product.update({ where: { id }, data });

export const remove = (id: number) => prisma.product.delete({ where: { id } });
