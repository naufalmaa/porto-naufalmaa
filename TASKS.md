# TASKS — Case study Geosurvai di portofolio

Pelacak pekerjaan untuk halaman proyek Geosurvai. Aturan kerja:

- Setiap commit dan push dikonfirmasi dulu.
- Screenshot dan video hanya dari lingkungan demo (operator fiktif, nilai biaya disamarkan). Tidak ada data klien.
- Isi proyek disimpan di database, jadi `git push` hanya mengubah kode dan aset. Isi artikel berubah lewat `pnpm seed:geosurvai`.

## Selesai

- [x] Review artikel lama terhadap kondisi aplikasi sekarang (stack, klaim fitur, kerahasiaan aset)
- [x] Artikel baru `public/asset/article/geosurvai-v3.md`: Zara sebagai inti cerita, migrasi PPDM 3.9, evaluasi 43/45 di data demo
- [x] Judul: "Geosurvai: Exploration Oversight, Rebuilt on Data and AI"
- [x] Thumbnail kartu (`cover.webp`, 16:9) dan gambar Open Graph (`og.jpg`, 1200x630) sesuai judul
- [x] Aset baru: 21 gambar WebP, 2 video MP4 (tur 30 detik, demo Zara); folder aset turun dari 53 MB ke 3,7 MB
- [x] `Presentation1.pptx` dan folder `raw` dikeluarkan dari `public/` (tidak lagi bisa diunduh dari situs)
- [x] Halaman proyek: daftar isi, perkiraan waktu baca, panel fakta, carousel bercaption, video, deretan angka, diagram (`flow`, `pipeline`, `arch`, `glossary`, `callout`), kartu "Next case study", metadata dan Open Graph per halaman
- [x] Beranda dan daftar proyek dirender dinamis, jadi seed langsung terlihat tanpa deploy ulang
- [x] Seed script divalidasi (marker, anchor, file aset), membuat backup baris lama, lalu membaca ulang hasil tulis
- [x] Baris Impact baru di `src/data/impact.ts`

## Berikutnya

- [ ] Push 1 ke `master` (kode, aset baru, artikel v3) dan tunggu deploy Vercel
- [ ] `pnpm seed:geosurvai` ke database produksi (backup baris lama otomatis di `.archive/backups/`)
- [ ] Cek halaman live: beranda, daftar proyek, `/projects/geosurvai`, preview link
- [ ] Push 2: hapus 10 gambar PNG lama dari `public/asset/projects/geosurvai/`

## Catatan

- Bagian Impact di `src/data/impact.ts` diimpor di beranda tetapi belum ditampilkan di halaman mana pun.
- `public/asset/projects/geoporto/` masih memuat `Presentation1.pptx` dan folder `raw` yang bisa diunduh langsung.
- Markup artikel (marker `[VIDEO: ...]`, `[CAROUSEL: ...]`, blok ` ```flow `, dst.) dijelaskan di komentar `src/lib/article.ts`. Cek artikel tanpa database: `pnpm check:article`.
