# Menjalankan Server

Pastikan `.env` sudah diisi (lihat `.env.example`) dan dependencies ter-install (`npm install`).

## Development (hot reload)

```powershell
npm.cmd run dev
```

Server berjalan di `http://localhost:3000` dan otomatis restart saat file di `src/` berubah.

## Build (production)

```powershell
npm.cmd run build
npm.cmd start
```

Hasil kompilasi ada di `dist/`.

## Cek server jalan

```powershell
curl http://localhost:3000/api/products
```

(Jika belum login akan mengembalikan `401 {"message":"Token tidak ditemukan"}` — itu artinya server sudah menyala.)
