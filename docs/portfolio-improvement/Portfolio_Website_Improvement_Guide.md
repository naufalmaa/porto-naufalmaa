# Panduan Improvement Website Portfolio — porto-naufalmaa.vercel.app

Dibuat 16 Nov 2026. Dasar analisis: keempat tab live (Home, Geoscience, Data & AI, Beyond Work), halaman case study, source repo `porto-naufalma` (commit `702c17c`), profil GitHub publik, dan riset praktik terbaik (catatan lengkap di folder `research-notes/`).

---

## 0. Ringkasan

Isi case study-mu sudah di atas rata-rata. Proview, Geosurvai, dan SafeView punya hal yang jarang dimiliki portfolio data scientist: label yang dipikirkan matang, metrik jujur, set evaluasi, dan bagian "what it cannot do". **Masalahnya ada di lapisan luar.** Halaman tab masih berupa template generik yang belum mengikuti kualitas case study, sehingga pembaca yang hanya scan 2–3 menit tidak sempat melihat buktinya.

Lima perubahan dengan dampak terbesar, urut prioritas:

1. **Home jadi hook berbasis bukti:** positioning satu kalimat, deretan angka bukti, dan tiga pintu masuk ("lens") ke tiap tab. Urutan featured: Proview → SafeView → Geosurvai → GeoPorto.
2. **Rapikan kebersihan situs (1 jam):** sembunyikan link `/admin/login` dari navigasi, ganti file resume ke CV terbaru, dan hapus klaim yang tidak ada isinya ("open-source libraries I maintain").
3. **Ubah setiap tab dari "daftar topik" menjadi "lensa" yang membaca proyek yang sama dari sudut berbeda.** Geoscience menonjolkan keputusan domain, Data & AI menonjolkan kapabilitas dan bukti, Beyond Work menonjolkan eksplorasi nyata.
4. **Timeline di tab Geoscience** masih memakai bullet CV lama ("prototype", dominan LLM) dan bertentangan dengan case study-mu sendiri. Ganti dengan versi yang sama dengan CV Data Scientist (ML).
5. **Kode publik:** pin 3 repo dari roadmap traditional ML. GitHub sekarang punya 35 repo publik tapi hanya portfolio yang di-pin, dan bio-nya masih "life-long learner".

---

## 1. Siapa pembacanya dan apa tugas tiap tab

| Tab | Pembaca utama | Pertanyaan yang harus dijawab dalam 30 detik | Aksi yang diharapkan |
| --- | --- | --- | --- |
| Home | Recruiter umum, hiring manager yang membuka dari CV/LinkedIn | "Siapa dia, apa buktinya, ke mana aku klik?" | Klik satu case study atau satu lens |
| Geoscience | Interviewer dari perusahaan energi, mining, geospatial, subsurface digital | "Apakah dia benar-benar paham geosains, dan bisa mengubahnya jadi data/ML?" | Baca Proview/Geosurvai dari sudut domain |
| Data & AI | Interviewer data/ML/AI umum (konsultan seperti VentureSEA, startup, enterprise) | "Bisa apa saja, seberapa dalam, dan apakah sudah sampai production?" | Lompat ke bagian model/eval yang relevan |
| Beyond Work | Pembaca yang sudah tertarik dan ingin tahu orangnya | "Apa yang dia bangun di luar tugas, dan bagaimana dia belajar?" | Melihat inisiatif dan cara berpikir |

Riset yang mendasari:
- Recruiter umumnya hanya scan sekitar 3 menit, dan hiring manager jarang membaca kata demi kata. Ringkasan masalah, solusi, dan hasil harus ada di atas (survei desain informal ±2020; NN/g 2019).
- Beberapa sumber mengingatkan bahwa website yang buruk atau berisi placeholder lebih merugikan daripada tidak punya website.

---

## 2. Pendekatan yang dipertimbangkan

| Pendekatan | Cara kerja | Plus | Minus |
| --- | --- | --- | --- |
| **A. Tab sebagai "lensa" (rekomendasi)** | Proyeknya tetap sama. Setiap tab punya intro, kapabilitas, dan teks kartu sendiri yang menyoroti sisi berbeda, plus deep-link ke bagian artikel yang relevan (misalnya `/projects/proview#failure` untuk Geoscience, `#model` untuk Data & AI) | Tidak perlu menulis artikel baru. Setiap interviewer langsung mendarat di bagian yang ia pedulikan | Perlu field tambahan per proyek (teks kartu per lens) |
| B. Tab sebagai keranjang terpisah | Setiap proyek hanya masuk satu tab | Sederhana | Proview dan Geosurvai sama-sama geosains dan AI, jadi memaksa satu tab membuang setengah ceritanya |
| C. Satu halaman panjang | Hapus tab, satu halaman resume interaktif | Paling cepat discan | Kehilangan kedalaman per audiens yang justru kamu minta |

**Rekomendasiku A.** Ini paling dekat dengan struktur repo sekarang (tag `geoscience`, `data-ai`, `beyond-work` sudah ada di DB). Perubahannya cukup menambah satu field JSON `lens` per proyek.

---

## 3. Temuan lintas situs (perbaiki dulu, ±1–2 jam)

| # | Temuan | Dampak | Perbaikan | Lokasi |
| --- | --- | --- | --- | --- |
| 1 | Link `/admin/login` tampil di navigasi publik | Terlihat belum selesai, dan membuka permukaan serangan | Hapus dari nav. Akses admin cukup lewat URL langsung | `src/components/layout/Navigation.tsx` |
| 2 | Tombol Resume mengarah ke `asset/resume/CV ATS_Naufal MA.pdf`, yaitu CV lama dengan nama file berspasi | Recruiter mengunduh versi yang menyebut ML sebagai "prototypes" | Ganti ke `CV_Naufal_MA_Data_Scientist_ML.pdf`, dengan nama file tanpa spasi | `src/data/socials.ts`, `public/asset/resume/` |
| 3 | Timeline Geoscience memakai bullet CV lama ("Prototype machine learning…", "Develop LLM-powered…") | Bertentangan dengan Proview (LightGBM) dan SafeView (production) | Tulis ulang (lihat §5) | `src/app/geoscience/page.tsx` |
| 4 | Beyond Work mengklaim "open-source libraries I maintain", "Competitions", "Writing", padahal isinya hanya GeoPorto | Klaim tanpa bukti menurunkan kepercayaan pada klaim lain | Hapus klaim, isi dengan item nyata (§7) | `src/app/beyond-work/page.tsx`, `src/data/beyond-work.ts` |
| 5 | `impactData` diimpor di Home tetapi tidak ditampilkan | Bukti terkuatmu tidak terlihat | Jadikan "proof strip" (§4) | `src/app/page.tsx`, `src/data/impact.ts` |
| 6 | GeoPorto diberi tag ketiga lens dan priority tertinggi (100), jadi tampil pertama di Home | Proyek dengan bukti paling tipis (prototipe RAG) tampil paling depan | Priority: Proview 100, SafeView 98, Geosurvai 96, GeoPorto 80. Tag GeoPorto cukup `geoscience` dan `beyond-work` | `seed-*.ts` |
| 7 | Data placeholder di `src/data/*.ts` (`Enterprise RAG Knowledge System`, `Open Source Geodata Parser`, `github.com/example/geoparser`) | Tidak tampil sekarang, tapi berisiko muncul kalau ada refactor | Hapus field `projects` dari ketiga file | `src/data/` |
| 8 | Daftar isi artikel tampil dua kali (inline dan "On this page") | Terasa repetitif di mobile | Tampilkan inline hanya di mobile, dan panel saja di desktop | `src/app/projects/[slug]/page.tsx` |
| 9 | Belum ada CTA kontak di halaman tab | Pembaca yang tertarik tidak tahu langkah berikutnya | Footer CTA: "Open to Data Scientist (ML) roles, remote · Book a demo walkthrough" | `Footer.tsx` |
| 10 | GitHub: bio "life-long learner", hanya 1 repo di-pin | Reviewer ML memakai GitHub untuk memverifikasi skill (poll Chip Huyen: >50% menyebut GitHub/Kaggle sebagai sinyal teratas) | Bio: "Data Scientist (ML) · energy operations · time-series, optimisation, AI agents". Pin repo dari roadmap begitu selesai | github.com |

---

## 4. Home — hook yang mengarah ke semua karya

### SWOT

| | |
| --- | --- |
| **Strengths** | Layout split 35/65 sudah rapi. Ada 4 case study berkualitas dengan cover 16:9 dan Open Graph. Foto profil dan tombol kontak jelas |
| **Weaknesses** | Tagline "Bridging the Earth and Technology" belum memberi tahu peran atau buktinya. Belum ada satu angka pun di hero. GeoPorto (prototipe) tampil pertama. Belum ada pintu masuk ke tab lain selain navigasi. Klaim "5+ years" tidak dijelaskan (2021–2023 riset dan lapangan, 2023–sekarang data) |
| **Opportunities** | Kamu punya angka bukti yang sudah dipublikasikan dan aman dipakai: 11,4 jt well-day, lift ~5x, 43/45 eval Zara, 27/29 elemen CSMS sejalan dengan evaluator, 0 skor palsu saat LLM mati, 196k nilai teruji saat migrasi PPDM. Satu baris angka ini sudah menjawab "apa buktinya" |
| **Threats** | Recruiter scan sekitar 3 menit. Kalau yang terbaca pertama adalah "AI assistant" dan "RAG", kamu masuk keranjang "mainly LLM" |

### Wireframe usulan (desktop, tetap split)

```
KIRI (sticky)                         KANAN
[Foto]                                PROOF STRIP (4 angka)
Naufal Muhamad Adzkia                 11.4M well-days · ~5x lift · 43/45 eval · 0 invented scores
Data Scientist (ML) · Energy ops      
                                      CHOOSE YOUR LENS (3 kartu kecil)
Positioning (2 kalimat)               [Geoscience] [Data & AI] [Beyond Work]
                                      satu kalimat + "Explore →"
Open to: Data Scientist (ML),         
remote · Indonesia                    FEATURED WORK (4 kartu, urut bukti)
[Resume] [LinkedIn] [GitHub] [Email]  Proview → SafeView → Geosurvai → GeoPorto
                                      tiap kartu: judul · 1 hasil · 3 tag · status
                                      
                                      HOW I WORK (3 prinsip, 1 baris tiap prinsip)
```

### Draf copy

- **Headline:** *Data Scientist for energy operations — from messy daily data to models people act on.*
- **Positioning:** *Geological engineer turned data scientist. I own projects end to end with oil and gas teams in Indonesia: defining the label, building the model, wiring it into a decision, and saying plainly what it cannot do.*
- **Status:** *Open to Data Scientist (ML) roles · remote · Indonesia.*
- **Hasil di kartu featured** (satu baris di bawah judul, dengan chip status):
    - Proview: *Flags wells ~5x more likely to fail within 14 days* · `Pilot`
    - SafeView: *AI pre-scores 29 safety elements; 27/29 within one level of the evaluator* · `In production`
    - Geosurvai: *Zara answers 43/45 evaluation questions on a self-hosted model* · `In production`
    - GeoPorto: *Asset-centric geoscience workspace with document Q&A* · `Personal prototype`
- **How I work:** *Define the label before the model.* · *Show what the model misses.* · *Every number must exist in the data.* Ketiganya diambil dari "What I learned" di case study-mu sendiri, jadi konsisten.

### Catatan implementasi

- Tambah kolom `status` (`Pilot`, `In production`, `Prototype`) dan `headlineResult` ke model Prisma `Project`. Ini lebih baik daripada menulis teks bebas di excerpt.
- Proof strip memakai `impactData` yang sudah ada, diubah menjadi `{ value, label, href }` dan ditautkan ke bagian artikelnya.

---

## 5. Geoscience — kedalaman domain untuk interviewer geosains

### SWOT

| | |
| --- | --- |
| **Strengths** | Pengalaman domain nyata dan langka: PPDM 3.9, parameter akuisisi seismik, PUPOS, ESP, water cut, integritas sumur, MAOP, ditambah kerja lapangan (core logging, sampling, supervisi kru bor). Proview dan Geosurvai sudah menunjukkan bagaimana pengetahuan domain mengubah desain |
| **Weaknesses** | Bagian tab ini justru paling generik. Topic chips (Mining, Resource Modeling, Exploration) tidak didukung proyek. Timeline menyalin CV lama. Belum ada artefak geosains yang bisa dilihat, seperti peta, well log, atau model. Tugas akhir dan kerja lapangan LAPI tidak tampil. "The Foundation" belum menyebut contoh konkret |
| **Opportunities** | Tunjukkan **"domain knowledge → data decision"**, yang tidak bisa ditiru kandidat non-geosains. Tambahkan satu proyek publik dengan dataset geosains yang dihormati komunitas: FORCE 2020 lithology (118 sumur, CC BY 4.0; skor blind-well umumnya jauh di bawah skor test, jadi menunjukkan penilaian yang jujur) atau Volve. Iklan Halliburton/Neftex (Jan 2026) meminta GeoPandas, PostGIS, dan Git. Vale Indonesia meminta validasi database geologi dan SQL Server. Kamu sudah memegang sebagian besar |
| **Threats** | Interviewer geosains akan menguji petrofisika, geostatistik, dan drillhole. Kalau tab ini hanya berisi "aplikasi web", kamu terbaca sebagai software developer yang kebetulan lulusan geologi |

### Struktur usulan

1. **Intro (2 kalimat):** *I read the subsurface like a geologist and build like a data scientist. My models are shaped by what the field data really means.*
2. **"Where geology changed the model"** — 4 kartu kecil, masing-masing deep-link ke bagian artikel:
    - *A one-day zero is not a failure* → Proview `#failure`
    - *km of 2D seismic ≠ km² of 3D* → Geosurvai `#ask`
    - *Permits gate a seismic crew* (17 readiness checks) → Geosurvai `#collect`
    - *PPDM 3.9 as the shared language* → Geosurvai `#rebuild`
3. **Experience timeline (diringkas):** dua entri saja dengan 3 bullet berbasis bukti, sama dengan CV baru. Hapus daftar 17 teknologi per entri.
4. **From the field:** galeri 3–4 foto lapangan LAPI ITB (core, sampling, peta hidrogeologi), satu kalimat untuk tugas akhir (pemetaan geologi dan interaksi air tanah–air permukaan, DAS Citarum), dan peta TA kalau ada.
5. **Case studies (lens geosains):** Proview, Geosurvai, GeoPorto. Teks kartunya menonjolkan sisi domain, misalnya Proview: *ESP current, water cut and neighbour failures as early signs of a stopped well.*
6. **Next (diisi setelah roadmap):** satu proyek publik, misalnya *Lithology from well logs (FORCE 2020), scored on blind wells*.

### Topic chips usulan
`Subsurface data management` · `PPDM 3.9` · `Production surveillance` · `Seismic acquisition` · `GIS / PostGIS` · `Field geology` · `QA/QC`

Hapus *Mining* dan *Resource Modeling* sampai ada proyek yang mendukungnya. Kalau tetap ingin membidik mining, proyek publik drillhole/assay QA/QC (CRM, blank, duplicate) adalah cara jujur untuk menambahkannya.

---

## 6. Data & AI — kapabilitas umum data dan AI

### SWOT

| | |
| --- | --- |
| **Strengths** | Tiga case study dengan evaluasi nyata: Proview (time split, kalibrasi, PR-AUC dibanding base rate, lift), SafeView (3 juror + konsensus, 27/29, uji LLM mati di tengah review), Zara (eval 45 soal, 40→43, guardrail berlapis, 17 tool MCP). Ini persis yang dianggap kredibel oleh praktisi: evaluasi dan analisis error, bukan demo chatbot |
| **Weaknesses** | Topic chips didominasi LLM ("AI Agents, RAG Systems, LLM Applications, Knowledge Systems, Enterprise AI") dan tidak menyebut forecasting atau ML. Tiga "Core Capabilities" generik ("cutting-edge", "robust, scalable") tanpa bukti atau tautan. Belum ada kapabilitas ML prediktif dan optimisation. Belum ada kode publik |
| **Opportunities** | Ringkasan analisis 390 iklan AI-engineer (KDnuggets, Okt 2026, data mentah tidak terverifikasi): evaluation 56%, agents 50%, RAG hanya 26%, prompt engineering 7%. Pasar mencari bukti evaluasi, dan itu sudah kamu punya. Susun kapabilitas berdasarkan bukti, dengan layer bisnis di atas dan layer teknis di bawah |
| **Threats** | Filter "mainly LLM/RAG" di iklan seperti VentureSEA. Pembaca teknis yang melihat PR-AUC 0,107 tanpa konteks base rate bisa salah menilai |

### Struktur usulan

1. **Intro:** *I build predictive models and AI systems that operations teams actually use — and I measure them before I trust them.*
2. **Capability matrix** (pengganti 3 kartu generik):

| Capability | Evidence (business layer) | Technical layer | Link |
| --- | --- | --- | --- |
| Predictive ML on time-series | ~5x more failures among flagged wells | LightGBM ×3 horizons, time split, isotonic calibration, PR-AUC vs base rate | Proview `#model` |
| Decision support & optimisation | Risk turned into a daily boat plan; replay as upper bound | Greedy prioritisation by barrels/cost, sea routes, counterfactual replay | Proview `#plan` |
| Statistical anomaly detection | Flags unreasonable survey budgets | Trend fits, IQR + Z-score, economies of scale | Geosurvai `#evaluate` |
| Data foundations | 11.4M records, 196k-value round-trip test | Validated ETL, alias resolution, PPDM 3.9, PostGIS, RLS | Proview `#data`, Geosurvai `#rebuild` |
| AI agents with evals | 43/45 eval; 27/29 vs evaluator; 0 invented scores | Intent routing, schema retrieval, self-repair, 3-juror consensus, evidence checks, MCP tools | Geosurvai `#ask`, SafeView `#jurors` |
| Shipping | On-prem Docker releases, in production | 124 unit tests, 69 Cypress E2E, backup/rollback scripts, feature flags with fallbacks | Geosurvai `#rebuild`, Proview `#shipping` |

3. **Case studies:** Proview, SafeView, Geosurvai. Tambah repo publik dari roadmap begitu selesai, dengan label `Open source`.
4. **Principles (3 baris)**, sama dengan "How I work" di Home.

### Topic chips usulan
`Time-series ML` · `Gradient boosting` · `Forecasting` · `Anomaly detection` · `Optimisation` · `Data engineering` · `AI agents & evals` · `MLOps / on-prem`

Satu catatan jujur: tulis *Optimisation* sebagai heuristik sampai ada proyek solver (OR-Tools) dari roadmap.

---

## 7. Beyond Work — pekerjaan lain dan cara kamu belajar

### SWOT

| | |
| --- | --- |
| **Strengths** | Framing "tinkering mindset" cocok dengan profilmu yang suka membangun. GeoPorto sudah ada sebagai proyek pribadi |
| **Weaknesses** | Tiga dari tiga klaim (open source, writing, competitions) belum ada isinya. Hanya satu proyek, yang juga muncul di dua tab lain. Teks "enterprise architecture" tidak sesuai dengan positioning-mu |
| **Opportunities** | Ada bahan nyata: (1) **AMIGA Robot**, rekap pembayaran voucher dengan AI yang membaca PDF dan integrasi Telegram; (2) **Kawal AI**, riset menyatukan aplikasi lewat MCP; (3) **AI CV Enhancer** (ada PRD/BRD); (4) **roadmap traditional ML sebagai "learning in public"**; (5) artikel teknis yang menjembatani geosains dan data, seperti saran David Robinson: tulis "the simplest thing you understand that almost no one outside your field does". Contoh portfolio geosains yang kuat: Andy McDonald (andymcdonald.scot), dengan lab interaktif, tulisan, dan notebook |
| **Threats** | Bagian samping yang tipis atau penuh klaim kosong justru mengencerkan portfolio. Panduan menyebut "a sparse but credible portfolio is stronger than a crowded one" |

### Struktur usulan

1. **Intro:** *What I build when nobody asks: small tools, experiments, and notes on learning in public.*
2. **Now learning** (selalu terbaru): *Traditional ML roadmap — week 2 of 6: predictive maintenance on compressor sensor data.* Ditautkan ke repo/log.
3. **Builds** (maksimal 4 kartu, masing-masing dengan tanggal, hasil, dan link): GeoPorto, AMIGA Robot, Kawal AI (MCP research), dan AI CV Enhancer kalau sudah ada prototipe.
4. **Writing** (mulai dari 2 tulisan): *Why a one-day zero is not a failure*, *What 43/45 really means for a text-to-SQL assistant*. Keduanya bisa diturunkan dari case study yang sudah ada.
5. **Community** (opsional, kalau ada): talk di IAGI/HAGI/IATMI, Software Underground/TRANSFORM, mentoring.

**Aturan:** kalau item nyata kurang dari 3, gabungkan Beyond Work ke halaman Projects daripada menampilkan halaman tipis.

---

## 8. Template kartu dan case study (berlaku untuk semua proyek)

**Kartu:** judul · satu kalimat hasil (angka) · chip status (`In production` / `Pilot` / `Prototype` / `Open source`) · 3 tag · peranmu (`PIC` / `Built end to end` / `Contributor`).

**Case study:** urutannya sudah sangat baik di Proview dan SafeView. Pertahankan, dan pastikan setiap artikel punya:

1. Hasil di atas: stats row dengan 4 angka (sudah ada)
2. Masalah dan keputusan yang dipengaruhi
3. Data dan cara mendapatkannya
4. Pendekatan, termasuk alternatif yang ditolak
5. Validasi terhadap baseline (Proview: rules score PR-AUC 0,066 vs model 0,107, tampilkan ini)
6. Dampak atau aksi
7. Batasan ("What it cannot do")
8. Peranmu dan tim (sudah ada di panel fakta)

Tambahan untuk proyek ML: satu baris *"How it was validated"* di panel fakta kiri (misalnya `Time split · calibrated · 87.6k unseen well-days`), supaya interviewer teknis langsung menemukannya.

---

## 9. Checklist kerahasiaan (sudah kamu jalankan, pertahankan)

- [x] Screenshot hanya dari database demo dengan nama fiktif, koordinat digeser, dan volume diskalakan
- [x] Nilai biaya disamarkan
- [ ] Pastikan angka di Home dan CV sama persis dengan yang ada di artikel (sumber tunggal)
- [ ] Klien disebut sesuai izin: "PHE OSES" di Proview, tapi "offshore oil and gas operator" di SafeView. Samakan aturannya
- [ ] Repo publik roadmap hanya memakai data publik, dengan lisensi dataset disebut (Volve memakai lisensi CC BY yang dimodifikasi, sebutkan versi lisensinya)

---

## 10. Backlog prioritas

| Prioritas | Pekerjaan | Estimasi | File utama |
| --- | --- | --- | --- |
| **P0** | Temuan lintas situs #1, #2, #4, #6, #7 | 1–2 jam | `Navigation.tsx`, `socials.ts`, `beyond-work/page.tsx`, `seed-*.ts`, `src/data/*` |
| **P0** | Bio dan pin GitHub | 15 menit | github.com |
| **P1** | Home: headline, proof strip, lens cards, kolom `status` dan `headlineResult`, urutan featured | 1 hari | `page.tsx`, `prisma/schema.prisma`, `impact.ts`, seed |
| **P1** | Geoscience: intro, "Where geology changed the model", timeline baru, chips | 1 hari | `geoscience/page.tsx`, `geoscience.ts` |
| **P1** | Data & AI: capability matrix, chips, intro | 0,5 hari | `data-ai/page.tsx`, `data-ai.ts` |
| **P2** | Beyond Work: Now learning, Builds (AMIGA, Kawal AI), 2 tulisan | 2–3 hari | `beyond-work/page.tsx`, artikel baru |
| **P2** | Field lens per proyek (`lens: { geoscience, dataAi }` berisi teks kartu dan anchor) | 0,5 hari | Prisma + 3 halaman tab |
| **P3** | Proyek publik dari roadmap (MetroPT, Volve, MLOps, agent) dan FORCE 2020 untuk tab Geoscience | Mengikuti roadmap | Repo baru |
| **P3** | Analytics ringan (Vercel Analytics) untuk melihat halaman mana yang dibuka recruiter | 15 menit | `layout.tsx` |

---

## 11. Pertanyaan terbuka

1. **Kawal AI dan AMIGA Robot:** produk Waviv/klien atau proyek pribadi? Kalau milik Waviv, keduanya lebih tepat masuk Data & AI dengan izin, dan Beyond Work hanya berisi yang benar-benar pribadi.
2. **Penyebutan klien:** apakah "PHE OSES" boleh disebut di SafeView, seperti di Proview?
3. **Bahasa:** perlu versi Bahasa Indonesia untuk recruiter lokal, atau cukup bahasa Inggris? Rekomendasiku cukup bahasa Inggris, karena semua artikel sudah dalam bahasa Inggris.
4. **Foto lapangan dan peta TA:** apakah masih ada dan boleh ditampilkan?
5. **Arah utama:** apakah Home membidik Data Scientist (ML) umum, atau dua arah sekaligus (energi/geosains dan umum)? Draf di atas mengasumsikan **Data Scientist untuk energy operations**, yang tetap relevan untuk keduanya.

---

## Sumber

Catatan riset lengkap ada di `research-notes/` (recruiter_expectations.md, ml_vs_llm_presentation.md, geoscience_and_side_projects.md). Sumber utama:

- [Eugene Yan — Why have a data science portfolio](https://eugeneyan.com/writing/data-science-portfolio-how-why-what/)
- [Eugene Yan — Task-specific LLM evals](https://eugeneyan.com/writing/evals)
- [NN/g — UX design portfolios (2019)](https://nngroup.com/articles/ux-design-portfolios/)
- [Chip Huyen — ML Interviews Book: signals companies look for](https://huyenchip.com/ml-interviews-book/contents/2.1.3-what-signals-companies-look-for-in-candidates.html)
- [Google — Rules of Machine Learning](https://developers.google.com/machine-learning/guides/rules-of-ml)
- [Google Research — The ML Test Score](https://research.google/pubs/the-ml-test-score-a-rubric-for-ml-production-readiness-and-technical-debt-reduction/)
- [Real World Data Science — case study guidance](https://realworlddatascience.net/contributor-docs/case-studies.html)
- [KDnuggets — 5 portfolio mistakes (2025)](https://www.kdnuggets.com/5-portfolio-mistakes-that-keep-data-scientists-from-getting-hired)
- [KDnuggets — AI skills in job postings](https://kdnuggets.com/the-ai-skills-that-actually-show-up-in-job-postings-right-now)
- [Statology — Titanic, Iris and house prices in your portfolio (2026)](https://www.statology.org/what-titanic-iris-and-house-prices-say-about-your-portfolio/)
- [DataTalks.Club — Data scientist CV and portfolio (2026)](https://datatalksclub.github.io/podwiki/wiki/data-scientist-cv-and-portfolio/)
- [Halliburton — Senior AI Data Scientist (Jan 2026)](https://careers.halliburton.com/job/abingdon/senior-ai-data-scientist/543/89109307376)
- [Sodir — FORCE 2020 lithology competition results](https://sodir.no/en/force/Previous-events/2020/results-of-the-FORCE-2020-lithology-competition)
- [Agile Scientific — Equinor open data licence](https://agilescientific.com/blog/2021/5/20/equinor-should-change-its-open-data-licence)
- [Software Underground — TRANSFORM](https://softwareunderground.org/t25-instructor-info)
- [David Robinson — Start a blog (2017)](https://www.r-bloggers.com/2017/11/advice-to-aspiring-data-scientists-start-a-blog/)
