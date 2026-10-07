import { Request, Response } from "express";
import * as productService from "./product.service";
import { AuthRequest } from "../../middlewares/auth.middleware";

export const getAll = async (_req: Request, res: Response) => {
  const products = await productService.getAll();
  res.json({ data: products });
};

export const getById = async (req: Request, res: Response) => {
  const product = await productService.getById(Number(req.params.id));
  res.json({ data: product });
};

export const create = async (req: Request, res: Response) => {
  const user = (req as AuthRequest).user!;
  const product = await productService.create(req.body, user.id);
  res.status(201).json({ message: "Produk dibuat", data: product });
};

export const update = async (req: Request, res: Response) => {
  const product = await productService.update(Number(req.params.id), req.body);
  res.json({ message: "Produk diperbarui", data: product });
};

export const remove = async (req: Request, res: Response) => {
  await productService.remove(Number(req.params.id));
  res.json({ message: "Produk dihapus" });
};
