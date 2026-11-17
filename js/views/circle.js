/**
 * Selaras — View: Lingkar (Social Support & UU PDP Privacy Hub)
 * Sesuai Dokumen: PRD.MD (FR-05.1, FR-05.2, NFR), ARCHITECHTURE.MD (Section 4)
 * Dukungan Sosial 3-6 Rekan Tanpa Leaderboard Toksik & Kendali Privasi Penuh
 */

window.downloadUserData = function(state) {
  const exportData = {
    exportVersion: '1.0',
    exportTimestamp: new Date().toISOString(),
    legalReference: 'Kepatuhan UU No. 27 Tahun 2022 (UU PDP)',
    userProfile: {
      pseudonymUuid: 'usr_87d45ea4-fb4d-4d98-8812',
      name: state.user.name,
      role: state.user.role,
      wearable: state.user.wearable
    },
    biometricSummary: {
      hrvCurrent: state.biometrics.hrvCurrent,
      hrvBaselineEMA: state.biometrics.hrvBaseline,
      restingHeartRate: state.biometrics.restingHeartRate,
      stepsToday: state.biometrics.currentSteps,
      sleepEfficiencyPercent: state.sleepArchitecture.efficiencyPercent
    },
    hydrationHistory: state.hydration.logs,
    nutritionLoggedMeals: state.nutrition.loggedMeals
  };

  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportData, null, 2));
  const dlAnchor = document.createElement('a');
  dlAnchor.setAttribute('href', dataStr);
  dlAnchor.setAttribute('download', `selaras_data_rian_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(dlAnchor);
  dlAnchor.click();
  dlAnchor.remove();

  if (window.SelarasApp) {
    window.SelarasApp.showToast('Data biometrik berhasil diunduh (JSON UU PDP) 📁', '🔒');
  }
};

window.confirmDataErasure = function() {
  const confirmed = confirm('Apakah Anda yakin ingin menghapus permanen seluruh data kesehatan biometrik Anda sesuai hak Right to Erasure (UU PDP)? Tindakan ini tidak dapat dibatalkan.');
  if (confirmed) {
    window.SelarasStore.eraseAllData();
    if (window.SelarasApp) {
      window.SelarasApp.showToast('Seluruh data kesehatan telah dihapus permanen dari perangkat.', '🧹');
    }
  }
};

window.renderCircleView = function(state) {
  const { circle, privacy } = state;

  // Render Member List
  const membersHTML = circle.members.map(member => {
    const isMe = member.id === 'u1';
    return `
      <div class="circle-member-item">
        <div class="circle-member-left">
          <div class="circle-avatar ${member.isOnline ? 'online' : ''}">${member.avatar}</div>
          <div class="circle-info">
            <div class="circle-name">${member.name}</div>
            <div class="circle-status-quote">${member.status}</div>
          </div>
        </div>

        ${!isMe ? `
          <div class="empathy-actions">
            <button 
              class="empathy-btn" 
              onclick="window.SelarasStore.sendCircleEmpathy('${member.name}', 'Kirim Semangat 🌿'); window.SelarasAudio.playTap(); window.SelarasApp.showToast('Semangat terkirim ke ${member.name} 🌿');"
              title="Kirim dukungan semangat">
              🌿 Semangat
            </button>
            <button 
              class="empathy-btn" 
              onclick="window.SelarasStore.sendCircleEmpathy('${member.name}', 'Ajak Jalan Sore 👟'); window.SelarasAudio.playTap(); window.SelarasApp.showToast('Ajakan jalan terkirim ke ${member.name} 👟');"
              title="Ajak jalan santai">
              👟 Jalan
            </button>
          </div>
        ` : `
          <span class="card-badge pine">Anda</span>
        `}
      </div>
    `;
  }).join('');

  // Render Aktivitas Dukungan Terkini
  const activitiesHTML = circle.empathyActivities.map(act => {
    return `
      <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 0; border-bottom:1px solid var(--color-border-subtle); font-size:12px;">
        <div>
          <strong>${act.from}</strong> memberikan <em>${act.action}</em> kepada <strong>${act.to}</strong>
        </div>
        <span class="font-mono" style="font-size:11px; color:var(--color-ink-secondary);">${act.time}</span>
      </div>
    `;
  }).join('');

  return `
    <!-- Header Lingkar -->
    <header class="app-header">
      <div class="header-top-row">
        <span class="card-badge ochre">Dukungan Sosial Tanpa Beban</span>
        <span class="wearable-sync-badge">
          <span>${circle.members.length} Rekan Dekat</span>
        </span>
      </div>
      <div>
        <h1 class="headline-editorial">Lingkar Sehat</h1>
        <p class="subheadline-warm">Berbagi ritme sehat tanpa papan peringkat (leaderboard) yang kompetitif</p>
      </div>
    </header>

    <!-- Tantangan Kooperatif (Bukan Kompetitif) -->
    <div class="coop-challenge-card">
      <div class="coop-header">
        <span class="coop-title">🎯 ${circle.cooperativeChallenge.title}</span>
        <span class="coop-metric">${circle.cooperativeChallenge.progressDays} / ${circle.cooperativeChallenge.targetDays} Hari</span>
      </div>
      <p style="font-size:12px; color:var(--color-ink-secondary); line-height:1.4; margin-bottom:8px;">
        Seluruh anggota lingkar berhasil tidur sebelum pukul 23:00 selama 3 malam berturut-turut.
      </p>
      <div class="hydration-progress-track" style="margin-top:0;">
        <div class="hydration-progress-bar" style="width: 60%; background:var(--color-ochre);"></div>
      </div>
    </div>

    <!-- Anggota Lingkar Dekat (FR-05.1) -->
    <div class="section-title">
      <span>${circle.name}</span>
      <span style="font-size:11.5px; color:var(--color-ink-secondary);">Privat (3–6 Rekan)</span>
    </div>

    <div class="circle-member-list" style="margin-bottom:14px;">
      ${membersHTML}
    </div>

    <!-- Feed Interaksi Emosi Terkini (FR-05.2) -->
    <section class="selaras-card">
      <div class="card-header-row">
        <span class="card-label">Sinyal Dukungan Hari Ini</span>
        <span class="card-badge pine">Interaksi Tenang</span>
      </div>
      <div>
        ${activitiesHTML}
      </div>
    </section>

    <!-- Pusat Kendali Privasi Data (UU PDP No. 27/2022) -->
    <div class="section-title" style="margin-top:16px;">
      <span>Kepatuhan UU PDP No. 27 Tahun 2022</span>
      <span class="card-badge river">Privasi Terjamin</span>
    </div>

    <section class="selaras-card">
      <p style="font-size:12.5px; color:var(--color-ink-secondary); line-height:1.45; margin-bottom:12px;">
        Kesehatan Anda adalah milik pribadi Anda. Selaras menerapkan pseudonymization, enkripsi kolom unik per pengguna, dan kendali mutlak di tangan Anda.
      </p>

      <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:16px;">
        <div style="display:flex; justify-content:space-between; align-items:center; padding:6px 0;">
          <span style="font-size:12.5px; color:var(--color-ink);">Bagikan Status Mood ke Rekan</span>
          <span class="card-badge pine">Aktif</span>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; padding:6px 0; border-top:1px solid var(--color-border-subtle);">
          <span style="font-size:12.5px; color:var(--color-ink);">Sembunyikan Nilai Detak Jantung Klinis</span>
          <span class="card-badge pine">Dirahasiakan</span>
        </div>
      </div>

      <div style="display:flex; gap:10px;">
        <button 
          class="quick-action-btn" 
          style="flex:1; justify-content:center; padding:9px;"
          onclick="window.downloadUserData(window.SelarasStore.getState())">
          📁 Unduh Data (JSON)
        </button>
        <button 
          class="quick-action-btn" 
          style="color:var(--color-clay); border-color:var(--color-clay-border); padding:9px;"
          onclick="window.confirmDataErasure()">
          Hapus Permanen
        </button>
      </div>
    </section>
  `;
};
