# Noteflix

Noteflix adalah Library movie yang dibuat dengan Next.js dan Tailwind CSS.

## Demo

Aplikasi dapat diakses di: [Noteflix](https://noteflix-phi.vercel.app/)

## Fitur

- Tambah, dan hapus film dari Watchlist
- Mencari film dengan kata kunci
- Menampilkan detail film
- Menampilkan trailer film
- Menampilkan rating film
- Menampilkan review film
- Antarmuka pengguna yang responsif

## Teknologi yang Digunakan

- **Next.js 14** - Framework React untuk rendering sisi server dan sisi klien
- **Tailwind CSS** - Untuk styling yang cepat dan responsif
- **Vercel** - Untuk deployment yang cepat dan mudah
- **Shadcn UI** - Untuk antarmuka pengguna yang responsif

## Sumber API

Aplikasi ini menggunakan API dari [TMDB](https://www.themoviedb.org/) untuk mendapatkan data film.

## Cara Menjalankan Secara Lokal

1. Clone repository ini:
   ```sh
   git clone https://github.com/username/noteflix.git
   cd noteflix
   ```
2. Instal dependensi:
   ```sh
   npm install
   ```
3. Jalankan aplikasi secara lokal:
   ```sh
   npm run dev
   ```
4. Buka browser dan akses `http://localhost:3000`

## Konfigurasi Lingkungan (Opsional)

Jika aplikasi menggunakan backend seperti Firebase atau Supabase, buat file `.env.local` dan tambahkan konfigurasi yang diperlukan:

```env
NEXT_PUBLIC_TMDB_API_KEY=your-tmdb-api-key
NEXT_PUBLIC_BASE_URL=https://api.themoviedb.org/3
```

## Deployment

Aplikasi ini dapat dideploy dengan mudah ke Vercel:

```sh
vercel
```

## Kontribusi

Jika ingin berkontribusi, silakan fork repository ini dan buat pull request dengan perubahan yang diusulkan.

## Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).
