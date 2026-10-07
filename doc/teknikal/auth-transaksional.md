# Hubungan Auth ↔ Modul Transaksional

Backend ini menggunakan dua database dalam satu server:

- `db_auth_rbac` — User, role, (auth data)
- `db_transactional` — Product, penjualan, dll.

## Prinsip

1. **Join lintas database tidak digunakan** — Prisma tidak mendukung join lintas DB.
2. **API internal HTTP tidak digunakan** — modul auth bukan service terpisah; semua masih satu proses monolith.
3. **Verifikasi token dilakukan secara lokal** oleh middleware.

## Alur Autentikasi

```
Request (Authorization: Bearer <jwt>)
        │
        ▼
src/middlewares/auth.middleware.ts
  → verifyToken() menggunakan JWT_SECRET (tanpa query DB / tanpa HTTP)
  → isi req.user = { id, role }
        │
        ▼
src/middlewares/rbac.middleware.ts
  → authorize("ADMIN") cek req.user.role
        │
        ▼
Modul bisnis (mis. products)
  → pakai req.user.id untuk simpan/ambil data pemilik
```

## Mengambil Data User dari Modul Transaksional

Jika modul transaksional butuh nama/email user, query langsung via client auth — **bukan HTTP internal**:

```ts
import { prismaAuth } from "../../config/prisma";

const user = await prismaAuth.user.findUnique({
  where: { id: product.userId },
  select: { id: true, name: true },
});
```

Relasi di tabel transaksional cukup menyimpan `userId` sebagai kolom angka biasa
(`prisma/transactions/schema.prisma`). Tidak ada foreign key lintas DB.

## Kapan Perlu API Internal?

Hanya jika modul auth dipisah menjadi **service/microservice tersendiri**. Dalam arsitektur monolith saat ini, memanggil API HTTP dari dalam modul lain menambah overhead dan coupling tanpa manfaat.
