/**
 * Selaras — View: Panduan (Micro-Sessions & Human Practitioners)
 * Sesuai Dokumen: PRD.MD (FR-04.1, FR-04.2), AIAGENT.MD (Section 2.4)
 * Menjembatani Batas Swadaya dengan Praktisi Manusia Terverifikasi (Sp.KO, M.Psi, S.Gz)
 */

window.practitionersList = [
  {
    id: 'doc1',
    name: 'dr. Danang Wicaksono, Sp.KO',
    title: 'Dokter Spesialis Kedokteran Olahraga',
    license: 'SIP: 446/Sp.KO/2021 • RS Olahraga Nasional',
    avatar: 'DW',
    focus: 'Koreksi postur leher/bahu akibat duduk lama, pemulihan stamina fisiologis',
    availability: 'Tersedia Sore Ini (15:30 - 17:00)',
    actionLabel: 'Jadwalkan Konsultasi 15m'
  },
  {
    id: 'psy1',
    name: 'Sarah Nabila, M.Psi., Psikolog',
    title: 'Psikolog Klinis Dewasa',
    license: 'HIMPSI: 2018-04921 • Konseling Profesional',
    avatar: 'SN',
    focus: 'Manajemen stres rapat padat, prevensi burnout, regulasi emosi kerja',
    availability: 'Kanal Chat Terenkripsi Aktif',
    actionLabel: 'Chat Aman Terenkripsi'
  },
  {
    id: 'nut1',
    name: 'Raditya Pratama, S.Gz., RD',
    title: 'Ahli Gizi Klinis & Dietisien Terdaftar',
    license: 'PERSAGI: 3171/RD/2020 • Nutrisi Pekerja',
    avatar: 'RP',
    focus: 'Strategi makan sehat warung & kantin kantor, jadwal makan anti-asam lambung',
    availability: 'Tersedia Besok Pagi (09:30)',
    actionLabel: 'Pilih Jadwal Sesi'
  }
];

window.activeMicroSession = null;

window.microSessions = [
  {
    id: 'desk-stretch',
    title: 'Peregangan Bahu & Leher Meja Kerja',
    duration: '5 menit',
    category: 'Mobilitas Meja',
    badgeClass: 'clay',
    desc: '4 gerakan mobilitas leher dan pelepasan otot trapezius tanpa beranjak dari kursi kantor.',
    steps: [
      'Putar bahu ke belakang perlahan sebanyak 8 kali sambil bernapas santai.',
      'Miringkan kepala ke kanan, gunakan tangan kanan memberi beban lembut selama 15 detik.',
      'Gantikan ke sisi kiri dengan tarikan napas halus selama 15 detik.',
      'Kaitkan kedua telapak tangan di belakang punggung, dorong dada ke depan secara lembut.'
    ]
  },
  {
    id: 'walk-decomp',
    title: 'Jalan Dekompresi Pikiran',
    duration: '12 menit',
    category: 'Kardio Rendah',
    badgeClass: 'pine',
    desc: 'Langkah santai beritme pelan di luar ruangan atau lorong kantor untuk memutus siklus kortisol.',
    steps: [
      'Tinggalkan perangkat kerja atau simpan ponsel di saku dalam mode hening.',
      'Mulai langkah kaki dengan kecepatan santai tanpa tergesa.',
      'Arahkan pandangan ke objek berjarak jauh untuk merelaksasi otot fokus mata.',
      'Tutup dengan 3 tarikan napas dalam sebelum kembali ke meja.'
    ]
  },
  {
    id: 'lumbar-release',
    title: 'Pelepasan Ketegangan Punggung Bawah',
    duration: '8 menit',
    category: 'Postur Ergonomis',
    badgeClass: 'ochre',
    desc: 'Gerakan dekompresi tulang belakang lumbal untuk mengurangi pegal pinggang.',
    steps: [
      'Duduk tegak di ujung kursi, putar tubuh atas perlahan ke kanan sambil memegang sandaran.',
      'Tahan putaran selama 10 detik, lalu hembuskan napas.',
      'Ulangi putaran ke sisi kiri dengan ritme yang sama.',
      'Rundukkan tubuh ke depan hingga dada mendekati paha untuk meregangkan punggung bawah.'
    ]
  }
];

window.startMicroSession = function(sessionId) {
  const session = window.microSessions.find(s => s.id === sessionId);
  if (!session) return;

  const modal = document.getElementById('consultation-modal');
  const modalContent = document.getElementById('consultation-modal-content');
  if (!modal || !modalContent) return;

  modalContent.innerHTML = `
    <div class="modal-handle-bar"></div>
    <div class="modal-header-row">
      <div>
        <span class="card-badge ${session.badgeClass}">${session.category} • ${session.duration}</span>
        <h2 class="modal-title" style="margin-top:4px;">${session.title}</h2>
      </div>
      <button class="modal-close-btn" onclick="window.SelarasApp.closeModal()">✕</button>
    </div>

    <p style="font-size:13px; color:var(--color-ink-secondary); line-height:1.45; margin-bottom:14px;">
      ${session.desc}
    </p>

    <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:20px;">
      ${session.steps.map((st, i) => `
        <div style="display:flex; gap:12px; align-items:flex-start; padding:10px; background:var(--color-paper-subtle); border-radius:var(--radius-sm);">
          <div style="width:24px; height:24px; border-radius:50%; background:var(--color-card); border:1px solid var(--color-border); display:flex; align-items:center; justify-content:center; font-family:var(--font-mono); font-size:12px; font-weight:700; color:var(--color-ink); flex-shrink:0;">
            ${i + 1}
          </div>
          <div style="font-size:12.5px; color:var(--color-ink); line-height:1.4;">
            ${st}
          </div>
        </div>
      `).join('')}
    </div>

    <button 
      class="context-cta-btn" 
      style="background:var(--color-pine);"
      onclick="window.SelarasApp.closeModal(); window.SelarasApp.showToast('Sesi peregangan selesai! Sirkulasi tubuh kembali segar 🌿', '🧘');">
      Tandai Selesai & Kembali
    </button>
  `;

  modal.classList.add('active');
};

window.openPractitionerBooking = function(pracId) {
  const prac = window.practitionersList.find(p => p.id === pracId);
  if (!prac) return;

  const modal = document.getElementById('consultation-modal');
  const modalContent = document.getElementById('consultation-modal-content');
  if (!modal || !modalContent) return;

  modalContent.innerHTML = `
    <div class="modal-handle-bar"></div>
    <div class="modal-header-row">
      <div>
        <span class="card-badge pine">Praktisi Manusia Terverifikasi</span>
        <h2 class="modal-title" style="margin-top:4px;">${prac.name}</h2>
      </div>
      <button class="modal-close-btn" onclick="window.SelarasApp.closeModal()">✕</button>
    </div>

    <div style="font-size:12px; color:var(--color-pine); font-weight:600; margin-bottom:2px;">${prac.title}</div>
    <div style="font-size:11px; color:var(--color-ink-tertiary); margin-bottom:12px;">${prac.license}</div>

    <div style="background:var(--color-paper-subtle); padding:12px; border-radius:var(--radius-sm); margin-bottom:14px;">
      <div style="font-size:12px; font-weight:700; color:var(--color-ink); margin-bottom:4px;">Fokus Pendampingan:</div>
      <div style="font-size:12.5px; color:var(--color-ink-secondary); line-height:1.4;">${prac.focus}</div>
    </div>

    <div style="background:var(--color-card-elevated); border:1px solid var(--color-border); padding:12px; border-radius:var(--radius-sm); margin-bottom:16px;">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span style="font-size:12px; color:var(--color-ink-secondary);">Jadwal Tersedia</span>
        <span class="card-badge pine" style="font-size:11px;">${prac.availability}</span>
      </div>
      <div style="font-size:11.5px; color:var(--color-ink-tertiary); margin-top:6px;">
        🔒 Sesi tele-konsultasi dilindungi enkripsi end-to-end sesuai standar regulasi privasi UU PDP.
      </div>
    </div>

    <div style="display:flex; gap:10px;">
      <button 
        class="context-cta-btn" 
        style="flex:1;"
        onclick="window.SelarasApp.closeModal(); window.SelarasApp.showToast('Jadwal konsultasi bersama ${prac.name} berhasil terkonfirmasi! 📅', '🌿');">
        Konfirmasi Janji Sesi (15m)
      </button>
    </div>
  `;

  modal.classList.add('active');
};

window.renderGuidanceView = function(state) {
  // Render Micro-Sessions Cards
  const microSessionsHTML = window.microSessions.map(session => {
    return `
      <div class="selaras-card" style="margin-bottom:10px;">
        <div class="card-header-row">
          <span class="card-label" style="color:var(--color-ink);">${session.title}</span>
          <span class="card-badge ${session.badgeClass}">${session.duration}</span>
        </div>
        <p style="font-size:12.5px; color:var(--color-ink-secondary); line-height:1.4; margin-bottom:10px;">
          ${session.desc}
        </p>
        <button 
          class="quick-action-btn" 
          style="width:100%; justify-content:center;"
          onclick="window.startMicroSession('${session.id}'); window.SelarasAudio.playTap();">
          Buka Panduan Gerakan (Tanpa Alat)
        </button>
      </div>
    `;
  }).join('');

  // Render Practitioners
  const practitionersHTML = window.practitionersList.map(prac => {
    return `
      <div class="practitioner-card">
        <div class="practitioner-top">
          <div class="practitioner-avatar">${prac.avatar}</div>
          <div class="practitioner-meta">
            <div class="practitioner-name">${prac.name}</div>
            <div class="practitioner-title">${prac.title}</div>
            <div class="practitioner-license">${prac.license}</div>
          </div>
        </div>

        <div class="practitioner-focus">
          <strong>Fokus:</strong> ${prac.focus}
        </div>

        <div class="practitioner-action-row">
          <span class="session-badge">${prac.availability}</span>
          <button 
            class="consult-btn" 
            onclick="window.openPractitionerBooking('${prac.id}'); window.SelarasAudio.playTap();">
            ${prac.actionLabel}
          </button>
        </div>
      </div>
    `;
  }).join('');

  return `
    <!-- Header Panduan -->
    <header class="app-header">
      <div class="header-top-row">
        <span class="card-badge pine">Sentuhan Manusia & Mobilitas</span>
        <span class="wearable-sync-badge">
          <span>Non-Klinis Preventif</span>
        </span>
      </div>
      <div>
        <h1 class="headline-editorial">Panduan Sesi & Praktisi</h1>
        <p class="subheadline-warm">Bimbingan terarah dari praktisi nyata, bukan diagnosis bot otomatis</p>
      </div>
    </header>

    <!-- Sesi Mikro Terstruktur Tanpa Alat (FR-04.1) -->
    <div class="section-title">
      <span>Sesi Mikro Meja Kerja (5–12 Menit)</span>
      <span style="font-size:11.5px; color:var(--color-ink-secondary);">Tanpa Alat Khusus</span>
    </div>

    ${microSessionsHTML}

    <!-- Direktori Praktisi Manusia Terverifikasi (FR-04.2) -->
    <div class="section-title" style="margin-top:16px;">
      <span>Konsultasi Praktisi Terverifikasi</span>
      <span class="card-badge pine">Human Experts</span>
    </div>

    <div style="font-size:12px; color:var(--color-ink-secondary); background:var(--color-paper-subtle); padding:10px 12px; border-radius:var(--radius-sm); margin-bottom:12px; line-height:1.4;">
      🛡️ <strong>Etika Klinis & Privasi:</strong> Selaras tidak melakukan diagnosis medis mandiri. Praktisi terdaftar (<span style="font-weight:600;">Sp.KO, M.Psi, S.Gz</span>) hadir untuk memberikan pendampingan yang tepat sasaran.
    </div>

    ${practitionersHTML}
  `;
};
