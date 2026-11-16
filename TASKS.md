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
- [x] Dokumen fitur di repo Proview dikoreksi
- [x] Review oleh Naufal; commit dan push ke `master` (d6b68bb), deploy Vercel
- [x] `pnpm seed:proview` ke database produksi, halaman live dicek (desktop dan ponsel: tanpa error, gambar dan video termuat)
- [x] Dokumen fitur di-commit di repo Proview, branch `demo-ver` (6722614)

## Berikutnya

- [ ] Push branch `demo-ver` repo Proview (kalau diminta)

## Catatan

- Akun admin demo lokal `portfolio-demo@waviv.test` dibuat di `proview_production_demo_anon` untuk capture.
- Halaman Upload Data kosong di demo (tidak ada riwayat upload), jadi tidak dipakai di artikel.

---

# TASKS — Case study SafeView (AI CSMS) di portofolio

Source (hanya referensi): `D:\Naufal\Working Folder\Project\PHE_AI_Product_HSE\apps-fullstack`, branch `fullstack-ver` (kode tidak diubah). Screenshot dan video dari demo SafeView lokal `safeview_hse_demo` (PT Nusa Hulu Energi, fiktif). Nama kontraktor, nomor kontrak, alamat server, dan isi rubrik tidak dipublikasikan. Proposal: https://claude.ai/artifact/F8ujAcnmJCGgMaQythTDsQ · Rencana perbaikan: https://claude.ai/artifact/HEWEVWqs4HFKT6KZNiBCLG

Keputusan Naufal:
- 2026-11-15: nama produk SafeView; angka data asli boleh sebagai rasio; Naufal PIC aplikasi, Toto Sugito dan Fahira satu tim; sudah dipakai di produksi; SafeView = modul HSE Waviv Nav Pro, tanpa tautan silang; featured, di bawah Proview.
- 2026-11-16: judul "SafeView: Safety, People, and Documents, with AI as a Peer Assistant"; PHE OSES cukup disebut (tidak di cover); posisi HSE berbasis keselamatan yang juga cocok untuk HR (bagian pendek "Beyond HSE"); re-run AI di demo dengan dokumen sintetis 3/6/10 (boleh ubah skor evaluator demo, rubrik terkalibrasi, cukup lokal).

## Selesai

- [x] Review repo HSE dan proposal; jawaban 8 pertanyaan terbuka
- [x] Demo dijalankan lokal (backend :3100, frontend :5174 mode demo, mesin AI :8002)
- [x] Artikel `public/asset/article/safeview-v1.md`, `src/scripts/seed-safeview.ts` + `pnpm seed:safeview`
- [x] Review pertama Naufal; rencana perbaikan disetujui
- [x] Backup DB demo (`.archive/safeview-demo-backup/safeview_hse_demo-20261116.dump`) dan `uploads_demo` (55 MB)
- [x] Rubrik terkalibrasi v5 diimpor ke DB demo sebagai versi aktif
- [x] 29 PDF sintetis tiga tingkat untuk Nusa-1 `10-10-2026 - PB` (9 tingkat 10, 12 tingkat 6, 8 tingkat 3; 3.4, 4.4, 7.2 berupa pindaian); skor evaluator disesuaikan (total 66,6); cache ekstraksi folder dihapus
- [x] Re-run AI mode Menyeluruh 29 elemen: 32 menit; AI 10 di 5 elemen, 6 di 14, 3 di 10; 24/29 sama dengan evaluator, 28/29 dalam satu tingkat; 5 yang meleset semuanya lebih ketat (3.2, 3.5, 6.2, 6.4, 8.1)
- [x] Capture ulang dari DB demo: 10 layar AI, `tiers.webp` (tiga tingkat), `tour.mp4` 33 detik, `ai-run.mp4` 24 detik, cover dan og.jpg dengan judul baru; folder aset 3,5 MB
- [x] Artikel diperbarui: judul, Overview (PHE OSES disebut sekali), panel fakta, bagian "Beyond HSE", paragraf demo tiga tingkat; `pnpm check:article` dan type-check lolos
- [x] Pratinjau lokal (`porto_preview`, `next dev` :3005): desktop dan ponsel tanpa error, tanpa scroll horizontal, kedua video termuat

## Rilis 2026-11-16

- [x] Review dan izin publish dari Naufal
- [x] Commit 2ea9de1 dan push ke `master` (remote `porto-naufalmaa`); deploy Vercel menyajikan aset baru
- [x] `pnpm seed:safeview` ke database produksi (dry run dulu; baris baru, jadi tidak ada backup)
- [x] Halaman live dicek: beranda, `/projects`, `/projects/safeview`; desktop dan ponsel tanpa error, tanpa scroll horizontal, kedua video dan semua aset 200

## Berikutnya

- [ ] Push 2: perbarui TASKS.md ini (izin dulu)

## Catatan

- Angka data asli yang dipakai: 278 berkas dan 49% pindaian, 19/29 sama persis dan 27/29 dalam satu tingkat, mode cepat 5 menjadi 11 dari 29 (in-sample, disebut di artikel), 7/7 keyakinan >= 0,85. Angka demo (24/29) tidak dipakai sebagai klaim akurasi, karena dokumennya dirancang.
- Pembuat dokumen sintetis: skrip di scratchpad sesi (`make_tiered_docs.py`), tidak masuk repo mana pun.
- Saat menyalakan backend demo, percobaan pertama memuat `.env` bawaan, sehingga pemeriksaan skema otomatis backend sempat berjalan di `pheview_hse`. Setelah itu backend dijalankan dengan `--env-file=.env.demo`. Rubrik v5 dibaca (read-only) dari `pheview_hse`.
- Repo HSE punya 3 berkas berubah yang belum di-commit (`.env.demo.example` backend dan csms-ai, `.env.demo` frontend); tidak disentuh.

---

# TASKS — Revamp halaman tab (Home, Geoscience, Data & AI, Beyond Work)

Panduan: `docs/portfolio-improvement/Portfolio_Website_Improvement_Guide.md` (riset di `docs/portfolio-improvement/research-notes/`). Tidak ada perubahan skema atau seed: cara tiap proyek ditampilkan per tab ada di `src/data/showcase.ts`.

## Selesai (belum di-commit)

- [x] Navigasi: link `/admin/login` dihapus dari header publik (halaman admin tetap ada lewat URL)
- [x] Resume mengarah ke `public/asset/resume/CV_Naufal_MA_Data_Scientist_ML.pdf` (file lama tetap ada)
- [x] `src/data/showcase.ts`: urutan (Proview, SafeView, Geosurvai, GeoPorto), status, peran, satu baris hasil, dan teks + anchor per lens; AMIGA Robot Admin dan riset MCP hub sebagai item eksternal
- [x] `src/lib/showcase.ts` + `src/components/portfolio/ProjectCard.tsx`: daftar proyek bersama untuk semua tab; proyek baru dari DB tetap muncul lewat tag
- [x] Home: headline, positioning, status "open to", proof track 4 angka (link ke bagian artikel), 3 lens, case studies, How I work
- [x] Geoscience: intro baru, "Where geology changed the model" (4 keputusan domain), timeline baru selaras CV, chips tanpa Mining/Resource Modeling
- [x] Data & AI: tabel kapabilitas (hasil, metode, link bukti), chips baru, prinsip kerja
- [x] Beyond Work: klaim kosong dihapus, "Now learning" (roadmap traditional ML), AMIGA + riset MCP + GeoPorto
- [x] Placeholder di `src/data/*.ts` dihapus; `/geoscience/[slug]` dan `/data-ai/[slug]` redirect ke `/projects/[slug]`
- [x] Footer CTA, metadata situs
- [x] Skills di `.claude/skills` (lihat `skills-lock.json`)
- [x] `tsc --noEmit` lolos; render lokal desktop + 390 px tanpa scroll horizontal dan tanpa error console

## Berikutnya

- [ ] Review Naufal, lalu commit dan push ke `master`
- [ ] Cek halaman live setelah deploy Vercel
- [ ] Bio dan pin repo GitHub
- [ ] Update "Now learning" tiap langkah roadmap selesai (`src/app/beyond-work/page.tsx`)
- [ ] Opsional: daftar isi artikel tidak tampil dua kali di desktop
