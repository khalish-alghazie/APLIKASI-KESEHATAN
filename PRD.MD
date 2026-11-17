Product Requirements Document (PRD)

Nama Produk: Selaras — Ritme Sehat Tanpa Beban

Kompetisi: UI/UX Design Competition TECHCOMFEST 2027 ("CHAMPIONS OF THE DEEP: Pioneer of Ultimate Tech Core")

Versi Dokumen: 1.0 (Competition Blueprint)

Target Platform: Mobile Application (iOS & Android) dengan Integrasi Wearable Ecosystem

1. Ringkasan Eksekutif & Latar Belakang Masalah

1.1 Konteks Studi Kasus

Masyarakat urban usia produktif memiliki kesadaran yang tinggi untuk menerapkan gaya hidup sehat, tetapi sering gagal membangun konsistensi akibat beban kerja yang padat, jadwal yang tidak terprediksi, serta kurangnya ekosistem pendukung yang manusiawi.

1.2 Persona Utama: Rian

Profil: Pekerja profesional dengan mobilitas dan intensitas rapat harian yang tinggi.

Tantangan Utama (Pain Points):

Friksi Pencatatan (Tracking Fatigue): Terlalu sibuk untuk memasukkan data kalori, olahraga, atau kondisi tubuh secara manual setiap saat.

Stres Terselubung (Unnoticed Stress): Mengalami kelelahan mental dan lonjakan stres di tengah padatnya rutinitas tanpa menyadari sinyal fisiologis tubuhnya.

Disregulasi Istirahat & Hidrasi: Sering melewatkan waktu minum air mineral dan mengorbankan durasi tidur demi menyelesaikan pekerjaan.

Kehilangan Arah & Motivasi: Memiliki niat berolahraga, namun bingung memulai dari mana dan merasa berjuang sendirian tanpa pendampingan terstruktur.

1.3 Proposisi Nilai (Value Proposition)

Selaras adalah aplikasi pendamping kesehatan holistik berbasis user-centered design yang menjembatani data biometrik pasif dengan regulasi emosi, pemenuhan nutrisi praktis, panduan terarah dari praktisi manusia, serta dukungan sosial lingkaran terdekat—tanpa membebani pengguna dengan input manual yang rumit.

2. Tujuan Produk & Metrik Keberhasilan (KPI)

Kategori Metrik

Indikator Keberhasilan

Target (90 Hari Pasca-Rilis)

Retensi & Kebiasaan

Weekly Active Habit Retention (pengguna aktif minimal 4 hari/minggu)

$\ge 62\%$

Efisiensi Interaksi

Waktu rata-rata pencatatan hidrasi/suasana hati (Time-to-Log)

$< 5\text{ detik}$

Pemulihan Stres

Tingkat penyelesaian intervensi Box Breathing saat HRV menurun

$\ge 48\%$

Keseimbangan Nutrisi

Konsistensi pencatatan asupan harian melalui preset menu lokal

$\ge 4,5\text{ hari/minggu}$

Dukungan Sosial

Pengguna yang tergabung dalam Lingkar Dekat (3–6 rekan)

$\ge 70\%$

3. Kebutuhan Fungsional (Functional Requirements)

Seluruh fitur utama dipetakan langsung terhadap lima pilar tantangan dalam studi kasus TECHCOMFEST 2027:

FR-01: Pemantauan Aktivitas & Biometrik Tanpa Friksi (Zero-Friction Biometrics)

FR-01.1 Sinkronisasi Pasif Otomatis: Integrasi latar belakang dengan Apple HealthKit, Google Health Connect, dan perangkat wearable (Garmin, Apple Watch, Mi Band) untuk menarik data langkah, Heart Rate Variability (HRV), dan Resting Heart Rate (RHR).

FR-01.2 Skor Kesiapan Kontekstual: Mengolah kombinasi kualitas tidur semalam dan HRV pagi hari menjadi indikator kesiapan tubuh yang mudah dipahami tanpa istilah medis yang membingungkan.

FR-01.3 Deteksi Sedentari Cerdas: Mengirimkan pengingat halus untuk bergerak 5–10 menit apabila sensor mendeteksi posisi duduk terus-menerus selama $> 90\text{ menit}$.

FR-02: Manajemen Emosi & Waktu Istirahat (Emotion & Sleep Architecture)

FR-02.1 Check-In Emosi 1-Ketuk: Antarmuka pencatatan suasana hati berbasis kondisi nyata (Tenang, Fokus, Lelah, Tegang, Penuh) yang membutuhkan waktu kurang dari 3 detik.

FR-02.2 Intervensi Regulasi Stres Otomatis: Ketika RHR meningkat signifikan atau HRV turun drastis di sela jadwal padat, aplikasi menawarkan panduan Pernapasan Kotak (Box Breathing 4-4-4-4) interaktif berdurasi 2 menit.

FR-02.3 Arsitektur Tidur & Transisi Malam (Wind-Down Mode): Menampilkan proporsi Deep Sleep dan REM, serta mengaktifkan tampilan redup otomatis 45 menit sebelum target jam tidur ideal pengguna.

FR-03: Pemenuhan Nutrisi & Hidrasi Terukur (Measured Nutrition)

FR-03.1 Pelacak Hidrasi 1-Ketuk: Tombol cepat +250 ml (1 gelas) dan +500 ml (1 botol) yang menyesuaikan target cairan harian berdasarkan aktivitas fisik.

FR-03.2 Katalog Preset Gizi Nusantara: Pencatatan makan berbasis porsi visual makanan lokal Indonesia (contoh: Nasi Merah & Ayam Panggang, Gado-Gado Lontong, Soto Ayam Bening) yang langsung menghitung estimasi kalori, protein, karbohidrat kompleks, dan serat tanpa perlu menimbang gramasi bahan baku.

FR-04: Intervensi & Panduan Profesional (Structured Guidance & Human Experts)

FR-04.1 Sesi Mikro Terstruktur (Micro-Sessions): Kumpulan panduan olahraga dan mobilitas berdurasi 5–20 menit tanpa alat (seperti Peregangan Bahu & Punggung Meja Kerja) yang disesuaikan dengan kondisi energi pengguna saat itu.

FR-04.2 Konsultasi Praktisi Terverifikasi: Akses langsung untuk berkonsultasi singkat melalui pesan atau tele-sesi dengan Dokter Kedokteran Olahraga ($\text{Sp.KO}$), Psikolog Klinis ($\text{M.Psi.}$), dan Ahli Gizi ($\text{S.Gz}$).

FR-05: Sistem Dukungan Sosial (Lingkar Sehat)

FR-05.1 Lingkar Dekat (3–6 Orang): Ruang interaksi privat bersama teman dekat atau rekan kerja untuk saling berbagi progres harian secara suportif tanpa papan peringkat (leaderboard) kompetitif yang mengintimidasi pemula.

FR-05.2 Interaksi Dukungan Cepat: Fitur kirim dukungan 1-ketuk ("Beri Semangat" atau "Ajak Jalan Sore") serta tantangan kooperatif berbasis komunitas (contoh: Konsisten Tidur Sebelum Pukul 23:00).

4. Kebutuhan Non-Fungsional (Non-Functional Requirements)

Performa & Responsivitas: Waktu muat layar utama (Cold Start) maksimal $1,5\text{ detik}$ dengan dukungan penuh mode luring (offline-first) untuk pencatatan air, makan, dan suasana hati.

Privasi & Keamanan Data: Enkripsi end-to-end untuk catatan emosi/konsultasi psikolog dan kepatuhan penuh terhadap regulasi perlindungan data pribadi (UU PDP Indonesia). Pengguna memegang kendali penuh untuk mencabut izin akses data biometrik kapan saja.

Aksesibilitas (WCAG 2.1 AA): Kontras teks minimal $4,5:1$, ukuran area sentuh tombol minimal $44 \times 44\text{ dp}$, dan dukungan penskalaan huruf dinamis.

5. Batasan Ruang Lingkup (Out of Scope untuk Prototipe Lomba)

Diagnosis klinis otomatis atau peresepan obat-obatan medis (aplikasi berfungsi sebagai sistem preventif dan pendamping gaya hidup, dengan eskalasi ke tenaga profesional manusia).

Pemindaian barcode kemasan ritel secara real-time (digantikan oleh katalog preset menu sehat yang lebih relevan untuk makanan rumahan/kantor).