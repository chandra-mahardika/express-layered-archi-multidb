# Autentikasi JWT

## Cara mendapatkan token

Login lewat endpoint:

```powershell
curl -X POST http://localhost:3000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{"email":"admin@mail.com","password":"password123"}'
```

Response:

```json
{
  "message": "Login berhasil",
  "data": {
    "token": "eyJhbGciOi...",
    "user": { "id": 1, "name": "Admin", "email": "admin@mail.com", "role": "ADMIN" }
  }
}
```

## Menggunakan token

Sertakan di header setiap request ke endpoint yang dilindungi:

```powershell
curl http://localhost:3000/api/products `
  -H "Authorization: Bearer eyJhbGciOi..."
```

## Detail token

- Algoritma: HS256, secret dari `JWT_SECRET` di `.env`
- Masa berlaku: dari `JWT_EXPIRES_IN` (default `1d`)
- Payload: `{ "id": <userId>, "role": "ADMIN" | "USER" }`

## Role & akses

| Role | Hak |
|---|---|
| `USER` | GET `/api/products`, GET `/api/products/:id` |
| `ADMIN` | Semua akses USER + CRUD `/api/products` + semua endpoint `/api/users` |

Role disimpan di tabel `User` (field `role`), diset saat login di dalam payload JWT.
Jika role user berubah, token lama masih menyimpan role lama — user harus login ulang.
