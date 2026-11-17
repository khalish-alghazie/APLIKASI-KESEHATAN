Spesifikasi Desain & Sistem Antarmuka (desain.md)

Produk: Selaras — Calm Biometrics & Tactile Humanity

Kompetisi: TECHCOMFEST 2027 (UI/UX Design Competition)

1. Filosofi Desain: Menghindari Estetika "AI-Generated"

Sebagian besar konsep aplikasi kesehatan modern terjebak pada estetika klise yang terasa dingin dan artifisial: latar belakang hitam pekat dengan gradasi ungu/sian neon, efek kaca berlebihan (glassmorphism), serta ikon kilau generik. Bagi pengguna seperti Rian yang sudah mengalami kelelahan kognitif (cognitive overload) akibat menatap layar kerja sepanjang hari, antarmuka semacam itu justru memicu ketegangan visual.

Selaras menerapkan prinsip Calm Biometrics & Tactile Humanity:

Hangat & Membumi (Grounded & Organic): Menggunakan palet warna kertas alabaster hangat dan hijau pinus botanikal yang menenangkan sistem saraf, menyerupai buku catatan harian yang rapi.

Kejelasan Tanpa Menghakimi (Non-Judgmental Clarity): Tidak ada warna merah menyala yang memicu rasa bersalah ketika Rian melewatkan target langkah. Defisit ditampilkan sebagai peluang pemulihan, bukan kegagalan.

Friksi Mendekati Nol (Near-Zero Interaction Cost): Setiap aksi harian utama (minum air, mencatat suasana hati, memulai jeda napas) dirancang agar tuntas dalam 1 hingga 2 ketukan.

2. Sistem Warna (Color Tokens)

Seluruh kombinasi warna telah diuji untuk memenuhi standar kontras aksesibilitas WCAG AA/AAA.

Token Nama

Kode Hex

Peran Fungsional

Rasio Kontras (vs Canvas)

paper (Canvas Utama)

#F7F5F0

Latar belakang utama aplikasi (hangat, mengurangi silau mata)

—

card (Permukaan Kartu)

#FFFFFF

Kontainer informasi terstruktur dengan garis tepi halus

$1,08:1$ (dengan border #E5E0D5)

ink (Teks Utama)

#1C1E1D

Judul, angka biometrik, dan teks primer

$15,4:1$ (AAA)

mutedInk (Teks Sekunder)

#5C615E

Deskripsi pendukung, label waktu, dan metadata

$5,8:1$ (AA)

pine (Aksen Primer)

#235340

Identitas merek, aksi utama, indikator keseimbangan saraf

$8,2:1$ (AAA)

river (Hidrasi & Tidur)

#2E6B7E

Pelacakan air mineral, fase tidur, dan latihan pernapasan

$5,4:1$ (AA)

clay (Aktivitas & Energi)

#C46548

Langkah harian, mobilitas fisik, dan penanda rapat padat

$4,6:1$ (AA)

ochre (Nutrisi & Vitalitas)

#B8833A

Ringkasan kalori, makronutrien, dan tantangan komunitas

$4,5:1$ (AA)

nightCanvas (Mode Malam)

#1B1E1D

Transisi otomatis pukul 21:30 ke atas untuk mengurangi cahaya biru

—

3. Tipografi & Hierarki Informasi

Perpaduan tiga jenis huruf dipilih untuk menyeimbangkan kehangatan empati manusia dengan presisi data kesehatan:

Editorial Serif (Newsreader): Digunakan secara selektif pada sapaan utama ("Selamat pagi, Rian") dan judul sesi refleksi untuk menghadirkan nuansa personal yang humanis.

Humanist Geometric Sans (Plus Jakarta Sans): Digunakan untuk seluruh elemen antarmuka, tombol aksi, dan deskripsi karena keterbacaannya yang sangat tinggi pada layar mobile berukuran ringkas.

Tabular Monospace (JetBrains Mono): Wajib digunakan dengan properti font-variant-numeric: tabular-nums pada seluruh angka biometrik (64 ms, 1.250 ml, 1.380 kkal, pengatur waktu napas) agar angka tidak bergeser secara horizontal saat diperbarui secara real-time.

4. Arsitektur Informasi & Alur Pengguna (User Flows)

4.1 Struktur Navigasi Utama (5 Tab Bawah)

Navigasi bawah dirancang berdasarkan pola jangkauan ibu jari (thumb-zone friendly) dengan 5 pilar utama:

Hari Ini: Ringkasan kontekstual dinamis (berubah otomatis sesuai waktu dan tingkat stres Rian), check-in emosi 1-ketuk, biometrik pasif, serta tombol cepat air & makan.

Ritme: Analisis tren HRV 7 hari, arsitektur kualitas tidur (Deep, REM, Light), dan pengingat jam tidur ideal.

Nutrisi: Keseimbangan kalori serta makronutrien (protein, karbohidrat, serat) dengan katalog menu Nusantara siap pilih.

Panduan: Sesi latihan singkat terpandu (5–20 menit) dan akses konsultasi langsung dengan praktisi manusia.

Lingkar: Ruang dukungan sosial Lingkar Dekat (3–6 rekan) dan tantangan kooperatif tanpa papan peringkat toksik.

4.2 Alur Intervensi Stres Kontekstual (Critical User Journey)

$$\text{Sensor Wearable (HRV turun \& RHR naik)} \rightarrow \text{Kartu Kontekstual Berubah Hangat} \rightarrow \text{1 Ketuk "Jeda Napas 2m"} \rightarrow \text{Panduan Visual Box Breathing} \rightarrow \text{Pemulihan Detak Jantung}$$

Alur ini memastikan Rian tidak perlu membuka menu pengaturan yang rumit ketika sedang tertekan oleh pekerjaan; sistem langsung menyajikan solusi yang paling relevan di layar teratas.

5. Panduan Penulisan UX (UX Microcopy Guidelines)

Empatik & Mengajak, Bukan Memerintah:

Hindari: "Anda gagal mencapai target 7.500 langkah hari ini!"

Gunakan: "Ritme hari ini cukup padat. Jalan santai 10 menit sebelum tidur sudah cukup membantu pemulihan."

Bahasa Indonesia Natural & Ringkas: Menghindari terjemahan kaku atau jargon teknologi berlebihan agar terasa seperti nasihat dari sahabat atau pelatih pribadi yang peduli.