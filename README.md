# Selaras — Ritme Sehat Tanpa Beban
> **Kompetisi:** UI/UX Design Competition TECHCOMFEST 2027  
> **Tema:** *"CHAMPIONS OF THE DEEP: Pioneer of Ultimate Tech Core"*  
> **Filosofi Antarmuka:** *Calm Biometrics & Tactile Humanity* (Bebas Klise AI & Gradasi Ungu/Sian)

---

## 1. Ikhtisar Produk & Nilai Utama

**Selaras** adalah aplikasi pendamping kesehatan holistik mobile-first yang dirancang khusus untuk mengatasi *tracking fatigue* (kelelahan mencatat data manual) dan *unnoticed stress* (stres terselubung) pada pekerja urban produktif (Persona: **Rian**, 30-an, Product Lead).

Aplikasi ini menolak estetika klise "AI-generated" (seperti latar belakang hitam pekat dengan gradasi ungu/sian neon, efek kaca berlebihan, dan chatbot robotik yang cerewet). Sebagai gantinya, Selaras mengusung prinsip **Quiet Intelligence**: kecerdasan yang bekerja senyap di latar belakang untuk menyaring sinyal biometrik menjadi **1 kartu aksi tenang** di layar utama, dengan waktu interaksi harian di bawah 5 detik.

---

## 2. Sistem Desain & Palet Warna (Bebas Estetika AI)

Semua token warna telah diverifikasi memenuhi standar aksesibilitas kontras **WCAG 2.1 AA/AAA**:

| Token Token | Hex Code | Peran Fungsional & Filosofi |
| :--- | :--- | :--- |
| `paper` | `#F7F5F0` | Kanvas utama alabaster hangat (mengurangi ketegangan mata lelah) |
| `card` | `#FFFFFF` | Permukaan kartu dengan garis tepi halus `#E5E0D5` |
| `ink` | `#1C1E1D` | Tipografi primer (kontras 15.4:1 - AAA) |
| `mutedInk` | `#5C615E` | Keterangan waktu, label sekunder, dan panduan non-menghakimi |
| `pine` | `#235340` | Aksen primer: stabilitas sistem saraf & identitas merek |
| `river` | `#2E6B7E` | Hidrasi terukur, fase tidur, dan latihan pernapasan |
| `clay` | `#C46548` | Langkah fisik, mobilitas tubuh, dan pengingat duduk lama |
| `ochre` | `#B8833A` | Nutrisi Nusantara terkurasi & tantangan kooperatif |
| `nightCanvas` | `#1B1E1D` | Mode redup transisi malam otomatis (aktif pukul 21:30+) |

### Hierarki Tipografi 3-Lapis
1. **Editorial Serif (`Newsreader`):** Sapaan hangat personal (*"Selamat pagi, Rian"*) dan judul sesi refleksi.
2. **Humanist Geometric Sans (`Plus Jakarta Sans`):** Keterbacaan optimal pada layar mobile untuk tombol aksi dan label.
3. **Tabular Monospace (`JetBrains Mono`):** Seluruh angka biometrik (`64 ms`, `1.250 ml`, `00:04`) dengan `font-variant-numeric: tabular-nums` agar tidak bergeser saat diperbarui real-time.

---

## 3. Fitur Utama & Pemetaan Dokumen PRD

### 🟢 Tab 1: Hari Ini (Today) — FR-01, FR-02, FR-03
- **Kartu Orkestrator Konteks (Quiet Intelligence):** Menganalisis korelasi penurunan HRV dan jadwal rapat padat secara otomatis. Menghasilkan 1 aksi mikro relevan (contoh: ajakan napas kotak 2m).
- **Check-In Emosi 1-Ketuk (FR-02.1):** 5 kondisi nyata (*Tenang* 🍃, *Fokus* 🎯, *Lelah* ☕, *Tegang* ⚡, *Penuh* 🌧️) tuntas dalam `< 3 detik`.
- **Strip Biometrik Pasif (FR-01.1):** Sinkronisasi otomatis latar belakang perangkat wearable (*Garmin / Apple HealthKit*) menampilkan HRV (`48 ms` vs baseline `64 ms`), Detak Istirahat (`78 bpm`), Langkah (`5.420 / 7.500`), dan Tidur (`7j 15m`).
- **Pelacak Hidrasi Cepat (FR-03.1):** Tombol 1-ketuk `+250 ml` (gelas) dan `+500 ml` (botol) dengan bilah progres dinamis.
- **Deteksi Sedentari Cerdas (FR-01.3):** Banner otomatis muncul saat posisi duduk mencapai `> 90 menit`.

### 🧘 Intervensi Kritis: Box Breathing (Pernapasan Kotak 4-4-4-4) — FR-02.2
- Siklus terpandu: **Tarik (4s) ➔ Tahan (4s) ➔ Hembuskan (4s) ➔ Tahan Kosong (4s)**.
- Visual pacer organik: Bola river/pine yang mengembang dan mengempis halus.
- Genta audio sintetis lembut (Web Audio API).
- Simulasi pemulihan fisiologis: Detak jantung turun dari `82 bpm` menuju `66 bpm`, memulihkan saraf parasimpatis.

### 🌙 Tab 2: Ritme (Circadian & Recovery) — FR-01.2, FR-02.3
- **Skor Kesiapan Harian (84/100):** Dihitung dari pemulihan HRV semalam (45%), Deep Sleep (35%), dan stabilitas RHR bangun tidur (20%).
- **Grafik Tren HRV 7 Hari:** Dilengkapi garis batas baseline personal berbasis **Exponential Moving Average (EMA)**:
  $$\text{HRV}_{\text{baseline}, t} = \alpha \cdot \text{HRV}_t + (1 - \alpha) \cdot \text{HRV}_{\text{baseline}, t-1} \quad (\alpha = 0,15)$$
- **Arsitektur Kualitas Tidur:** Visualisasi proporsi *Deep Sleep* (`1j 42m`, 23%), *REM Sleep* (`1j 55m`, 26%), dan *Light Sleep*.
- **Mode Transisi Malam (Wind-Down Mode):** Meredupkan layar 45 menit sebelum jam tidur ideal (`22:30`) untuk menekan paparan sinar biru.

### 🍲 Tab 3: Nutrisi (Nusantara Mindful Fuel) — FR-03.2
- **Katalog Preset Menu Nusantara 1-Ketuk:** Makanan rumahan dan kantin Indonesia terkurasi tanpa perlu menimbang gramasi:
  1. *Nasi Merah & Ayam Panggang Tempe* (480 kkal, 38g protein, 6g serat)
  2. *Gado-Gado Lontong Telur Rebus* (390 kkal, 18g protein, 8g serat)
  3. *Soto Ayam Bening Bihun & Telur* (340 kkal, 26g protein, 3g serat)
  4. *Pecel Sayur Madiun & Tahu Panggang* (310 kkal, 14g protein, 9g serat)
  5. *Ikan Kembung Bakar Sambal Dabu-Dabu & Sayur Bayam* (420 kkal, 34g protein, 5g serat)
  6. *Overnight Oats Pisang & Madu Hutan* (320 kkal, 12g protein, 7g serat)
- **Keseimbangan Makronutrien Ramah:** Ringkasan kalori, protein, karbohidrat kompleks, dan serat harian.
- **Kontainer Hidrasi Visual:** Animasi level air yang naik secara mulus saat dicatat.

### 🩺 Tab 4: Panduan (Micro-Sessions & Human Practitioners) — FR-04
- **Sesi Mikro Meja Kerja Tanpa Alat (5–12 Menit):** *Peregangan Bahu & Leher Meja Kerja* (5m), *Jalan Dekompresi Pikiran* (12m), dan *Pelepasan Ketegangan Punggung Bawah* (8m) lengkap dengan panduan langkah interaktif.
- **Direktori Praktisi Manusia Terverifikasi (Bukan AI):**
  - **dr. Danang Wicaksono, Sp.KO** (Spesialis Kedokteran Olahraga & Ergonomi Meja)
  - **Sarah Nabila, M.Psi., Psikolog** (Psikolog Klinis Dewasa — Burnout & Stres Kerja)
  - **Raditya Pratama, S.Gz., RD** (Ahli Gizi Klinis — Pola Makan Pekerja Kantoran)
- Modal pemesanan jadwal sesi singkat 15 menit dan chat terenkripsi.

### 👥 Tab 5: Lingkar (Social Support & UU PDP Privacy Hub) — FR-05, NFR
- **Lingkar Dekat (3–6 Rekan):** Ruang privat tanpa *toxic leaderboard* yang mengintimidasi.
- **Dukungan Empati 1-Ketuk:** *Kirim Semangat* 🌿, *Ajak Jalan Sore* 👟, *Ingatkan Minum* 💧.
- **Tantangan Kooperatif:** *"Konsisten Tidur Sebelum 23:00 Bersama"* (pencapaian bersama, bukan ranking perorangan).
- **Pusat Privasi UU PDP No. 27 Tahun 2022:**
  - Granular sharing controls (sembunyikan detak jantung klinis dari publik).
  - Tombol **Unduh Seluruh Data Biometrik (Format JSON)** (*Right to Access*).
  - Tombol **Hapus Permanen Seluruh Rekam Data** (*Right to Erasure*) dalam 1-klik.

---

## 4. Cara Menjalankan & Menguji Aplikasi

Aplikasi dibangun menggunakan teknologi web mobile modern (HTML5, CSS Variables, Modular ES6, Web Audio API, PWA Service Worker) tanpa memerlukan kompilasi bundle yang berat.

### Menjalankan Server Lokal:
```bash
python3 server.py
```
Akses di browser:
- **Di Laptop / PC:** `http://localhost:8080`
- **Di Smartphone (HP pada jaringan Wi-Fi yang sama):** `http://<IP-LAPTOP>:8080`

### Fitur Pengujian untuk Juri (Simulator Toolbar di Layar Atas):
1. **⚡ Stres Rapat:** Mensimulasikan penurunan HRV ke `48 ms` dan memicu kartu intervensi pernapasan kotak 2m.
2. **☀️ Kesiapan Prima:** Mensimulasikan kondisi pagi hari dengan skor kesiapan `84`.
3. **🪑 Duduk > 90m:** Mensimulasikan posisi duduk lama dan memunculkan pengingat peregangan meja kerja.
4. **🔔 Audio Organik:** Mengaktifkan/menonaktifkan efek suara sintetis (kayu lembut, tetesan air, genta meditasi).
5. **🖥️ Layar Penuh / Bingkai Mobile:** Beralih antara tampilan frame iPhone presisi atau tampilan layar penuh responsif.
6. **🌙 Mode Malam (Ikon Bulan di Header):** Menguji palet canvas malam arang hangat (`#1B1E1D`) untuk transisi tidur sehat.
