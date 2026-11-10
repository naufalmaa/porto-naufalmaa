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

---

# TASKS — Case study Proview di portofolio

Source (hanya referensi): `D:\Naufal\Working Folder\Project\waviv_product\waviv_nav_pro\proview_production`, branch `demo-ver`. Screenshot dan video hanya dari DB demo `proview_production_demo_anon` (PT Nusa Hulu Energi, fiktif). Klien boleh disebut "Production & Operation Team, PHE OSES", data tetap demo. Proposal: https://claude.ai/artifact/N8qg7xpEzwVaqkcYCTm4dF

## Selesai

- [x] Review repo Proview: riwayat git per kontributor, dokumen fitur, catatan model EWS, rencana anonimisasi
- [x] Proposal disetujui (sudut cerita EWS, struktur, wireframe); saran 5 (tautan silang dengan Geosurvai) tidak dipakai
- [x] Jumlah baris produksi dihitung di DB non-anonim: 11.384.923 baris harian per sumur, 1970–2025
- [x] Metrik model dicek ulang di DB demo: base rate 14 hari 4,8%, presisi pada ambang 0,10 sebesar 23,8% (sekitar 5x)
- [x] Capture dari demo lokal: 13 screenshot WebP, grafik model, video cover dan video Zara (MP4), cover 16:9, og.jpg; scan nama asli 0 temuan
- [x] Artikel `public/asset/article/proview-v1.md` dan `src/scripts/seed-proview.ts` + `pnpm seed:proview`; `pnpm check:article` dan type-check lolos
- [x] Dokumen fitur di repo Proview dikoreksi (belum di-commit di repo itu)

## Berikutnya

- [ ] Review artikel dan aset oleh Naufal
- [ ] Commit dan push ke `master` (minta izin dulu), tunggu deploy Vercel
- [ ] `pnpm seed:proview` ke database produksi (minta izin dulu), lalu cek halaman live dan preview link

## Catatan

- Akun admin demo lokal `portfolio-demo@waviv.test` dibuat di `proview_production_demo_anon` untuk capture.
- Halaman Upload Data kosong di demo (tidak ada riwayat upload), jadi tidak dipakai di artikel.
