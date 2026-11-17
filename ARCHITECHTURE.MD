Arsitektur Sistem & Teknis (architechtur.md)

Produk: Selaras Mobile Ecosystem

Target: Skalabilitas Tinggi, Offline-First, dan Sinkronisasi Biometrik Real-Time

1. Gambaran Umum Arsitektur Sistem

Arsitektur Selaras dirancang menggunakan pendekatan Event-Driven & Offline-First agar tetap responsif di berbagai kondisi jaringan seluler, hemat baterai saat memproses data wearable, serta menjamin kerahasiaan data kesehatan pribadi pengguna.

+-------------------------------------------------------------------+
|                     MOBILE CLIENT (iOS / Android)                 |
|  +-----------------------+    +--------------------------------+  |
|  |   UI Presentation     |    |    Wearable & Health Bridge    |  |
|  | (React Native / Swift)|    | (HealthKit / Health Connect)   |  |
|  +-----------+-----------+    +---------------+----------------+  |
|              |                                |                   |
|  +-----------v--------------------------------v----------------+  |
|  |         Local Encrypted Store (SQLite / WatermelonDB)       |  |
|  |   • Offline Queue (Hidrasi, Makan, Mood)                    |  |
|  |   • On-Device Circadian & Sedentary Rule Evaluator          |  |
|  +-----------------------------+-------------------------------+  |
+--------------------------------|----------------------------------+
                                 | HTTPS (TLS 1.3) + WebSocket
+--------------------------------v----------------------------------+
|                        API GATEWAY & AUTH                         |
|           (Rate Limiting, JWT Rotation, Zero-Trust Edge)          |
+--------+-----------------------+-----------------------+----------+
         |                       |                       |
+--------v--------+    +---------v---------+   +---------v---------+
| Biometric       |    | Nutrition &       |   | Social &          |
| Telemetry Svc   |    | Habit Service     |   | Practitioner Svc  |
| (Go / Rust)     |    | (Node.js / TS)    |   | (Elixir / Phoenix)|
+--------+--------+    +---------+---------+   +---------+---------+
         |                       |                       |
+--------v--------+    +---------v---------+   +---------v---------+
| TimescaleDB     |    | PostgreSQL 16     |   | Redis Pub/Sub &   |
| (HRV, HR, Sleep)|    | (Users, Meals,    |   | Encrypted Chat    |
|                 |    |  Programs)        |   | Storage           |
+-----------------+    +-------------------+   +-------------------+


2. Arsitektur Klien Mobile (Offline-First)

Sinkronisasi Latar Belakang Hemat Daya:

Klien tidak melakukan polling terus-menerus ke server. Aplikasi memanfaatkan background observer bawaan OS (HKObserverQuery pada iOS dan PassiveMonitoringClient pada Android Health Connect) yang hanya memicu pembaruan ketika terdapat perubahan signifikan pada HRV, langkah, atau sesi tidur selesai.

Penyimpanan Lokal Terenkripsi (Local-First Database):

Seluruh pencatatan air mineral, asupan makanan, dan check-in emosi langsung ditulis ke database lokal SQLite terenkripsi (SQLCipher) dalam waktu $< 15\text{ ms}$, sehingga antarmuka terasa instan tanpa menunggu respons jaringan.

Proses sinkronisasi ke cloud berjalan secara asinkron menggunakan idempotency key untuk mencegah duplikasi data saat koneksi tidak stabil.

3. Arsitektur Backend & Layanan Mikro

3.1 Biometric Telemetry Service (Go)

Bertanggung jawab menerima kumpulan data deret waktu (time-series) dari perangkat wearable.

Menghitung baseline pribadi pengguna menggunakan Exponential Moving Average (EMA) selama 14 hari terakhir:


$$\text{HRV}_{\text{baseline}, t} = \alpha \cdot \text{HRV}_t + (1 - \alpha) \cdot \text{HRV}_{\text{baseline}, t-1}$$


dengan faktor pemulusan $\alpha = 0,15$. Dengan pendekatan ini, evaluasi stres selalu bersifat personal terhadap kondisi fisiologis Rian sendiri, bukan perbandingan rata-rata populasi umum.

3.2 Nutrition & Habit Service (TypeScript)

Menyediakan katalog terkurasi makanan Indonesia dengan indeks glikemik, estimasi kalori, dan kepadatan mikronutrien.

Mengelola penjadwalan sesi latihan mikro dan pelacakan progres mingguan tanpa membebani perangkat pengguna.

3.3 Social & Practitioner Service (Elixir / WebSocket)

Menangani komunikasi real-time berlatensi rendah untuk fitur Lingkar Dekat (notifikasi dukungan semangat antarrekan) serta kanal konsultasi terenkripsi bersama Dokter Olahraga dan Psikolog Klinis.

4. Keamanan, Privasi, & Kepatuhan Regulasi

Pemisahan Identitas & Data Klinis (Pseudonymization): Data telemetri biometrik disimpan menggunakan telemetry_uuid yang terpisah dari identitas pribadi (user_profile), sehingga kebocoran satu lapisan data tidak dapat mengidentifikasi individu secara langsung.

Enkripsi Tingkat Kolom (Column-Level Encryption): Catatan suasana hati, jurnal refleksi, dan riwayat konsultasi psikolog dienkripsi menggunakan kunci unik per pengguna (AES-256-GCM).

Kepatuhan UU No. 27 Tahun 2022 (UU PDP): Menyediakan fitur Export Data (format JSON/CSV) dan Right to Erasure (hapus permanen seluruh rekam biometrik) dalam 1 klik di menu pengaturan.