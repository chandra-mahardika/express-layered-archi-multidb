# express-layered-archi-multidb

Backend REST API menggunakan **Express.js + TypeScript**, **MySQL**, **Prisma ORM**, **JWT Authentication**, **RBAC**, dan validasi **Zod**.

## Ringkasan Dokumentasi (`/doc`)

### Arsitektur
| Dokumen | Ringkasan |
|---|---|
| [arsitektur.md](doc/arsitektur/arsitektur.md) | Layered architecture (Route → Middleware → Controller → Service → Repository → Prisma/DB) & modular monolith per fitur |
| [konvensi.md](doc/arsitektur/konvensi.md) | Konvensi penamaan file/folder/variabel, pola kode, cara menambah modul baru |
| [api.md](doc/arsitektur/api.md) | Daftar endpoint, akses (RBAC), contoh request/response |
| [contoh-modul.md](doc/arsitektur/contoh-modul.md) | Contoh modul lengkap dari route hingga repository |

### Teknis Development
| Dokumen | Ringkasan |
|---|---|
| [menjalankan-server.md](doc/teknikal/menjalankan-server.md) | Cara menjalankan dev server, build, dan start |
| [prisma.md](doc/teknikal/prisma.md) | Generate client, migrate, studio, reset |
| [autentikasi-jwt.md](doc/teknikal/autentikasi-jwt.md) | Cara mendapatkan & menggunakan token JWT, daftar role |
| [testing-api.md](doc/teknikal/testing-api.md) | Contoh curl untuk menguji setiap endpoint |
| [auth-transaksional.md](doc/teknikal/auth-transaksional.md) | Hubungan modul auth ↔ transaksional (JWT lokal, userId, tanpa join/HTTP) |
| [keamanan.md](doc/teknikal/keamanan.md) | JWT_SECRET, rate limiting, CORS, helmet, HTTPS |
| [deploy.md](doc/teknikal/deploy.md) | Checklist & langkah deploy ke production/hosting |

## Tech Stack

- Runtime: Node.js + TypeScript (`tsx` untuk dev)
- Framework: Express 5
- Database: MySQL via Prisma 6 (multi-database: auth/RBAC & transaksional)
- Auth: JWT (`jsonwebtoken`) + hash password (`bcryptjs`)
- Validasi: Zod

## Perintah Penting

```powershell
npm.cmd run dev              # dev server (tsx watch)
npm.cmd run build            # compile ke dist/
npm.cmd start                # jalankan hasil build
npm.cmd run prisma:generate  # generate Prisma Client
npm.cmd run prisma:migrate   # migrate database (dev)
```

## Variabel Environment (`.env`)

| Variabel | Keterangan |
|---|---|
| `DATABASE_URL_AUTH` | Koneksi MySQL untuk database auth |
| `DATABASE_URL_TX` | Koneksi MySQL untuk database transaksional |
| `JWT_SECRET` | Secret untuk signing JWT |
| `JWT_EXPIRES_IN` | Masa berlaku token |
| `PORT` | Port server (default 3000) |
