Arsitektur Kecerdasan Kontekstual & Multi-Agent (ai_agents.md)

Prinsip Utama: Quiet Intelligence — Kecerdasan yang bekerja senyap di balik layar untuk menyederhanakan keputusan pengguna, tanpa tampil sebagai chatbot robotik yang berisik.

1. Filosofi Quiet Intelligence

Pengguna seperti Rian tidak membutuhkan asisten virtual yang terus-menerus mengirimkan pesan panjang atau meminta masukan teks. Dalam Selaras, sistem multi-agen berperan sebagai orkestrator konteks di latar belakang yang menyaring sinyal biometrik, jadwal harian, dan pola nutrisi menjadi satu rekomendasi tindakan nyata yang paling relevan pada saat itu.

                  [ Sinyal Biometrik & Jadwal Rian ]
                                  |
                 +----------------v----------------+
                 |   Context Orchestrator Router   |
                 |  (Prioritization & Fatigue Cap) |
                 +--+-------------+-------------+--+
                    |             |             |
      +-------------v-+     +-----v-------+   +-v---------------+
      | Biometric &   |     | Empathy &   |   | Adaptive        |
      | Circadian     |     | Stress      |   | Nutrition &     |
      | Sentinel      |     | Triage      |   | Hydration Pacer |
      +-------------+--+     +-----+-------+   +-+---------------+
                    |             |             |
                 +--v-------------v-------------v--+
                 |   Clinical Safety & Guardrails  |
                 |  (Deterministic Rule Validator) |
                 +----------------+----------------+
                                  |
                 [ 1 Kartu Aksi Tenang di Layar Utama ]


2. Spesifikasi Agen Spesialis

2.1 Biometric & Circadian Sentinel Agent

Tugas Utama: Memantau ritme sirkadian, kualitas pemulihan tidur, dan durasi sedentari (duduk terlalu lama).

Input: Aliran data HRV, Resting Heart Rate (RHR), tahapan tidur (Deep/REM), dan akselerometer langkah.

Keluaran: Menentukan status kesiapan harian (Optimal, Perlu Ritme Sedang, atau Prioritas Pemulihan) serta memicu pengingat peregangan 7 menit jika pengguna tidak beranjak dari kursi selama $> 90\text{ menit}$.

2.2 Empathy & Stress Triage Agent

Tugas Utama: Mendeteksi potensi stres terselubung sebelum pengguna mengalami burnout.

Logika Deteksi: Mengorelasikan penurunan HRV sebesar $\ge 20\%$ dari baseline pribadi dengan kepadatan jadwal rapat dan input mood terakhir (Tegang atau Penuh).

Intervensi: Mengubah kartu utama di layar Hari Ini menjadi ajakan lembut untuk melakukan Pernapasan Kotak 2 menit atau mendengarkan audio relaksasi singkat, serta menyesuaikan nada bahasa antarmuka agar lebih menenangkan.

2.3 Adaptive Nutrition & Hydration Pacer Agent

Tugas Utama: Menjaga konsistensi asupan gizi dan cairan di tengah jam kerja yang padat.

Logika Adaptif: Menghitung kebutuhan hidrasi dinamis berdasarkan berat badan, durasi aktivitas fisik, dan jeda waktu sejak pencatatan minum terakhir. Jika Rian melewatkan jam makan siang lewat pukul 13:30, agen merekomendasikan 2 pilihan menu seimbang terdekat dari riwayat favoritnya.

2.4 Professional & Social Bridge Agent

Tugas Utama: Mengenali batas kemampuan swadaya (self-help) dan menghubungkan Rian dengan dukungan manusia.

Eskalasi Praktisi: Apabila pola tidur buruk dan indikator stres tinggi berlangsung selama $\ge 5\text{ hari}$ berturut-turut, agen menyarankan sesi konsultasi ringan dengan Psikolog Klinis atau Dokter Olahraga terverifikasi di tab Panduan.

Pemicu Dukungan Sosial: Mengirimkan sinyal halus kepada rekan di Lingkar Dekat (atas izin privasi Rian) agar saling menyapa atau mengajak jalan santai bersama.

3. Guardrails, Pencegahan Kelelahan Notifikasi, & Keamanan Klinis

Batas Maksimal Intervensi (Notification Fatigue Cap):

Context Orchestrator membatasi maksimal 3 dorongan kontekstual (nudges) per hari dan menerapkan Quiet Hours otomatis pada pukul 21:30 – 07:00 agar aplikasi tidak menjadi sumber stres baru.

Batasan Keamanan Medis (Clinical Guardrails):

Sistem dilarang keras memberikan diagnosis penyakit jantung, gangguan kecemasan klinis, atau rekomendasi diet ekstrem ($< 1.200\text{ kkal/hari}$).

Setiap anomali detak jantung ekstrem (misalnya takikardia istirahat $> 120\text{ bpm}$ berkelanjutan) langsung diarahkan melalui protokol deterministik untuk beristirahat dan menghubungi tenaga medis profesional.

Target Latensi Inferensi:

Evaluasi aturan konteks lokal pada perangkat (on-device) berjalan dalam waktu $< 50\text{ ms}$, sementara pembaruan rekomendasi adaptif dari server memiliki batas latensi maksimal $300\text{ ms}$.