import { prismaAuth } from "../../src/config/prisma";
import bcrypt from "bcryptjs";

const PERMISSIONS = [
  "users:manage",
  "products:read",
  "products:create",
  "products:update",
  "products:delete",
] as const;

async function main() {
  const permissions = [];
  for (const name of PERMISSIONS) {
    permissions.push(
      await prismaAuth.permission.upsert({
        where: { name },
        update: {},
        create: { name },
      }),
    );
  }

  const admin = await prismaAuth.role.upsert({
    where: { name: "ADMIN" },
    update: {},
    create: { name: "ADMIN" },
  });

  const user = await prismaAuth.role.upsert({
    where: { name: "USER" },
    update: {},
    create: { name: "USER" },
  });

  for (const p of permissions) {
    await prismaAuth.rolePermission.upsert({
      where: { roleId_permissionId: { roleId: admin.id, permissionId: p.id } },
      update: {},
      create: { roleId: admin.id, permissionId: p.id },
    });
  }

  const readPerm = permissions.find((p) => p.name === "products:read")!;
  await prismaAuth.rolePermission.upsert({
    where: { roleId_permissionId: { roleId: user.id, permissionId: readPerm.id } },
    update: {},
    create: { roleId: user.id, permissionId: readPerm.id },
  });

  const adminPassword = await bcrypt.hash("password123", 10);
  await prismaAuth.user.upsert({
    where: { email: "admin@example.com" },
    update: { username: "admin", userRoles: { deleteMany: {}, create: { roleId: admin.id } } },
    create: {
      name: "Admin",
      username: "admin",
      email: "admin@example.com",
      password: adminPassword,
      userRoles: { create: { roleId: admin.id } },
    },
  });

  const userPassword = await bcrypt.hash("password123", 10);
  await prismaAuth.user.upsert({
    where: { email: "user@example.com" },
    update: { username: "user", userRoles: { deleteMany: {}, create: { roleId: user.id } } },
    create: {
      name: "User",
      username: "user",
      email: "user@example.com",
      password: userPassword,
      userRoles: { create: { roleId: user.id } },
    },
  });

  console.log("Seed selesai: roles, permissions, dan user (admin@example.com / user@example.com, password: password123) terbuat.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prismaAuth.$disconnect());
