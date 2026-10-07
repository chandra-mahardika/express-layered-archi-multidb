# API Reference

Base URL: `http://localhost:3000/api`

Autentikasi: header `Authorization: Bearer <token>` (token didapat dari `/auth/login`).

## Auth

### POST /api/auth/register
Akses: publik

```json
{ "name": "Budi", "email": "budi@mail.com", "password": "rahasia123" }
```

Response `201`:
```json
{ "message": "Registrasi berhasil", "data": { "id": 1, "name": "Budi", "email": "budi@mail.com", "role": "USER" } }
```

> Role selalu `USER` saat registrasi. Jadikan ADMIN via update manual di DB atau oleh ADMIN lain.

### POST /api/auth/login
Akses: publik

```json
{ "email": "budi@mail.com", "password": "rahasia123" }
```

Response `200`:
```json
{ "message": "Login berhasil", "data": { "token": "<jwt>", "user": { "id": 1, "name": "Budi", "email": "budi@mail.com", "role": "USER" } } }
```

## Users (semua endpoint: Bearer token + role ADMIN)

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/api/users` | Daftar semua user |
| GET | `/api/users/:id` | Detail user |
| PUT | `/api/users/:id` | Update `name` / `email` / `role` |
| DELETE | `/api/users/:id` | Hapus user |

Body PUT (semua opsional):
```json
{ "name": "Budi Baru", "email": "budi2@mail.com", "role": "ADMIN" }
```

## Products (Bearer token wajib)

| Method | Endpoint | Akses | Keterangan |
|---|---|---|---|
| GET | `/api/products` | USER, ADMIN | Daftar produk |
| GET | `/api/products/:id` | USER, ADMIN | Detail produk |
| POST | `/api/products` | ADMIN | Buat produk |
| PUT | `/api/products/:id` | ADMIN | Update produk |
| DELETE | `/api/products/:id` | ADMIN | Hapus produk |

Body POST:
```json
{ "name": "Kopi", "description": "Kopi robusta", "price": 15000, "stock": 100 }
```

Body PUT: sebagian field yang sama, semua opsional.

## Format Error

```json
{ "message": "Validasi gagal", "errors": [ { "path": ["email"], "message": "Email tidak valid" } ] }
```

```json
{ "message": "Akses ditolak" }
```
