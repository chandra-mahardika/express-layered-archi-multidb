import bcrypt from "bcryptjs";
import { prismaAuth as prisma } from "../../config/prisma";
import { ApiError } from "../../utils/ApiError";
import { signToken } from "../../utils/jwt";

const userInclude = {
  userRoles: {
    include: {
      role: {
        include: {
          permissions: { include: { permission: true } },
        },
      },
    },
  },
} as const;

const toPublicUser = (user: any) => ({
  id: user.id,
  name: user.name,
  username: user.username,
  email: user.email,
  roles: user.userRoles?.map((ur: any) => ur.role?.name) ?? [],
});

export const register = async (data: {
  name: string;
  username: string;
  email: string;
  password: string;
}) => {
  const exists = await prisma.user.findUnique({ where: { email: data.email } });
  if (exists) throw new ApiError(409, "Email sudah terdaftar");
  const usernameExists = await prisma.user.findUnique({ where: { username: data.username } });
  if (usernameExists) throw new ApiError(409, "Username sudah terdaftar");

  const defaultRole = await prisma.role.findUnique({ where: { name: "USER" } });
  if (!defaultRole) throw new ApiError(500, "Role default USER belum di-seed");

  const hashed = await bcrypt.hash(data.password, 10);
  const user = await prisma.user.create({
    data: {
      name: data.name,
      username: data.username,
      email: data.email,
      password: hashed,
      userRoles: { create: { roleId: defaultRole.id } },
    },
    include: userInclude,
  });
  return toPublicUser(user);
};

export const login = async (data: { username: string; password: string }) => {
  const user = await prisma.user.findUnique({
    where: { username: data.username },
    include: userInclude,
  });
  if (!user) throw new ApiError(401, "Username atau password salah");

  const valid = await bcrypt.compare(data.password, user.password);
  if (!valid) throw new ApiError(401, "Username atau password salah");

  const permissions = user.userRoles.flatMap((ur: any) =>
    ur.role.permissions.map((p: any) => p.permission.name),
  );
  const roleNames = user.userRoles.map((ur: any) => ur.role.name);
  const token = signToken({ id: user.id, roles: roleNames, permissions });
  return { token, user: { ...toPublicUser(user), permissions } };
};
