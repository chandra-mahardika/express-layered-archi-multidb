import { prismaAuth as prisma } from "../../config/prisma";
import { ApiError } from "../../utils/ApiError";
import * as userRepository from "./user.repository";

export const getAll = () => userRepository.findAll();

export const getById = async (id: number) => {
  const user = await userRepository.findById(id);
  if (!user) throw new ApiError(404, "User tidak ditemukan");
  return user;
};

export const update = async (
  id: number,
  data: { name?: string; email?: string; username?: string; roleId?: number },
) => {
  await getById(id);
  if (data.roleId) {
    await prisma.userRole.deleteMany({ where: { userId: id } });
    await prisma.userRole.create({ data: { userId: id, roleId: data.roleId } });
    const { roleId: _roleId, ...rest } = data;
    return userRepository.update(id, rest);
  }
  return userRepository.update(id, data);
};

export const remove = async (id: number) => {
  await getById(id);
  return userRepository.remove(id);
};
