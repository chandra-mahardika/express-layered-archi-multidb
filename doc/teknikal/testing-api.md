# Testing API

Semua contoh pakai PowerShell `curl` (pakai backtick `` ` `` sebagai pemisah baris).
Ganti `TOKEN` dengan JWT hasil login.

## Register

```powershell
curl -X POST http://localhost:3000/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{"name":"Budi","email":"budi@mail.com","password":"rahasia123"}'
```

## Login

```powershell
curl -X POST http://localhost:3000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{"email":"budi@mail.com","password":"rahasia123"}'
```

## Users (butuh token ADMIN)

```powershell
# List
curl http://localhost:3000/api/users -H "Authorization: Bearer TOKEN"

# Detail
curl http://localhost:3000/api/users/1 -H "Authorization: Bearer TOKEN"

# Update
curl -X PUT http://localhost:3000/api/users/1 `
  -H "Authorization: Bearer TOKEN" `
  -H "Content-Type: application/json" `
  -d '{"role":"ADMIN"}'

# Delete
curl -X DELETE http://localhost:3000/api/users/1 -H "Authorization: Bearer TOKEN"
```

## Products

```powershell
# List (semua user login)
curl http://localhost:3000/api/products -H "Authorization: Bearer TOKEN"

# Buat (ADMIN)
curl -X POST http://localhost:3000/api/products `
  -H "Authorization: Bearer TOKEN" `
  -H "Content-Type: application/json" `
  -d '{"name":"Kopi","description":"Robusta","price":15000,"stock":100}'

# Update (ADMIN)
curl -X PUT http://localhost:3000/api/products/1 `
  -H "Authorization: Bearer TOKEN" `
  -H "Content-Type: application/json" `
  -d '{"price":17000}'

# Delete (ADMIN)
curl -X DELETE http://localhost:3000/api/products/1 -H "Authorization: Bearer TOKEN"
```

## Skenario error umum untuk uji coba

| Kasus | Cara uji | Hasil |
|---|---|---|
| Tanpa token | akses `/api/products` tanpa header | 401 |
| Token salah | header `Bearer asal` | 401 |
| Bukan ADMIN | akses `/api/users` pakai token USER | 403 |
| Validasi gagal | register tanpa email | 400 + detail Zod |
| Email duplikat | register email yang sama | 409 |
| Data tidak ada | GET `/api/products/999` | 404 |
