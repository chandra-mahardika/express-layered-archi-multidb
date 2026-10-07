import { Request, Response } from "express";
import * as userService from "./user.service";

export const getAll = async (_req: Request, res: Response) => {
  const users = await userService.getAll();
  res.json({ data: users });
};

export const getById = async (req: Request, res: Response) => {
  const user = await userService.getById(Number(req.params.id));
  res.json({ data: user });
};

export const update = async (req: Request, res: Response) => {
  const user = await userService.update(Number(req.params.id), req.body);
  res.json({ message: "User diperbarui", data: user });
};

export const remove = async (req: Request, res: Response) => {
  await userService.remove(Number(req.params.id));
  res.json({ message: "User dihapus" });
};
