/**
 * Selaras — View: Hari Ini (Today)
 * Sesuai Dokumen: PRD.MD (FR-01, FR-02, FR-03), DESAIN.MD (Section 4.1)
 * Prinsip: Calm Biometrics & Quiet Intelligence (1-Ketuk & Nol Friksi)
 */

window.renderTodayView = function(state) {
  const { user, biometrics, currentEmotion, hydration, sedentary, activeScenario } = state;
  const hydrationPct = Math.min(100, Math.round((hydration.currentMl / hydration.targetMl) * 100));
  const stepsPct = Math.min(100, Math.round((biometrics.currentSteps / biometrics.targetSteps) * 100));

  // Waktu sapaan dinamis
  const hour = new Date().getHours();
  let greetingWord = 'pagi';
  if (hour >= 11 && hour < 15) greetingWord = 'siang';
  else if (hour >= 15 && hour < 18) greetingWord = 'sore';
  else if (hour >= 18 || hour < 5) greetingWord = 'malam';

  // Format tanggal Indonesia ramah
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const now = new Date();
  const dateString = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]}`;

  // Logika Context Orchestrator Card (Quiet Intelligence)
  let contextCardHTML = '';
  if (activeScenario === 'stress_detected') {
    contextCardHTML = `
      <div class="context-orchestrator-card" role="region" aria-label="Rekomendasi Kontekstual Tenang">
        <div class="context-tag-row">
          <span class="context-tag">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
            </svg>
            Deteksi Stres Terselubung
          </span>
          <span class="context-time">${currentEmotion.timestamp || 'Baru saja'}</span>
        </div>
        <h2 class="context-headline">Detak istirahat meningkat di sela jadwal rapat maraton</h2>
        <p class="context-body">
          HRV Anda saat ini (${biometrics.hrvCurrent} ms) berada di bawah baseline pribadi (${biometrics.hrvBaseline} ms). 
          Ambil jeda 2 menit untuk menstabilkan kembali saraf parasimpatis Anda.
        </p>
        <button class="context-cta-btn" onclick="window.SelarasBreathing.start()">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M10 8l6 4-6 4V8z"/>
          </svg>
          Mulai Jeda Napas Kotak (2m)
        </button>
      </div>
    `;
  } else if (activeScenario === 'morning_readiness') {
    contextCardHTML = `
      <div class="context-orchestrator-card" role="region" aria-label="Rekomendasi Kontekstual Tenang">
        <div class="context-tag-row">
          <span class="context-tag">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M12 3a9 9 0 000 18 9 9 0 000-18z"/>
              <path d="M12 7v5l3 3"/>
            </svg>
            Kesiapan Fisiologis Tubuh
          </span>
          <span class="context-time">Pagi Ini</span>
        </div>
        <h2 class="context-headline">Skor Kesiapan: ${biometrics.readinessScore} • Ritme Prima</h2>
        <p class="context-body">
          Tidur semalam ${biometrics.sleepTotalHours}j ${biometrics.sleepTotalMinutes}m memberikan pemulihan seluler optimal. 
          Kapasitas kognitif dan fisik Anda siap menghadapi agenda penting hari ini.
        </p>
        <button class="context-cta-btn" onclick="window.SelarasApp.switchTab('rhythm')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 12h18M13 6l6 6-6 6"/>
          </svg>
          Lihat Arsitektur Ritme & Tidur
        </button>
      </div>
    `;
  } else {
    contextCardHTML = `
      <div class="context-orchestrator-card" role="region" aria-label="Rekomendasi Kontekstual Tenang">
        <div class="context-tag-row">
          <span class="context-tag" style="color: var(--color-clay);">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
              <circle cx="8.5" cy="7" r="4"/>
            </svg>
            Sinyal Mobilitas Tubuh
          </span>
          <span class="context-time">Posisi Duduk &gt; 90m</span>
        </div>
        <h2 class="context-headline">Punggung & Bahu Membutuhkan Gerakan Singkat</h2>
        <p class="context-body">
          Anda telah duduk selama ${sedentary.currentMinutes} menit. Peregangan ringan tanpa alat di meja kerja akan melancarkan sirkulasi darah tanpa membuang waktu rapat.
        </p>
        <button class="context-cta-btn" style="background: var(--color-clay);" onclick="window.SelarasApp.switchTab('guidance')">
          Peregangan Meja Kerja (5m)
        </button>
      </div>
    `;
  }

  // Emosi list options
  const emotions = [
    { state: 'Tenang', symbol: '🍃' },
    { state: 'Fokus', symbol: '🎯' },
    { state: 'Lelah', symbol: '☕' },
    { state: 'Tegang', symbol: '⚡' },
    { state: 'Penuh', symbol: '🌧️' }
  ];

  const emotionChipsHTML = emotions.map(em => {
    const isSelected = currentEmotion.state === em.state;
    return `
      <button 
        class="emotion-chip ${isSelected ? 'selected' : ''}" 
        onclick="window.SelarasStore.setEmotion('${em.state}', '${em.symbol}'); window.SelarasAudio.playTap();"
        aria-label="Pilih suasana hati ${em.state}">
        <span class="emotion-symbol">${em.symbol}</span>
        <span class="emotion-name">${em.state}</span>
      </button>
    `;
  }).join('');

  return `
    <!-- Top Header & Sapaan Hangat -->
    <header class="app-header">
      <div class="header-top-row">
        <div class="wearable-sync-badge" title="Tersinkronisasi otomatis via Health Connect">
          <span class="sync-pulse-dot"></span>
          <span>${user.wearable}</span>
          <span style="opacity:0.6;">•</span>
          <span class="font-mono">${user.syncTime}</span>
        </div>

        <button 
          class="night-mode-toggle-btn" 
          onclick="window.SelarasStore.toggleNightMode(); window.SelarasAudio.playTap();"
          title="Alihkan Tampilan Transisi Malam (Wind-Down)">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
          </svg>
        </button>
      </div>

      <div>
        <h1 class="headline-editorial">Selamat ${greetingWord}, ${user.name}</h1>
        <p class="subheadline-warm">${dateString} • Menjaga ritme kerja tetap seimbang</p>
      </div>
    </header>

    <!-- Quiet Intelligence Orchestrator Card -->
    ${contextCardHTML}

    <!-- Check-In Emosi 1-Ketuk (FR-02.1) -->
    <section class="selaras-card" aria-label="Check-in suasana hati">
      <div class="card-header-row">
        <span class="card-label">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
            <line x1="9" y1="9" x2="9.01" y2="9"/>
            <line x1="15" y1="9" x2="15.01" y2="9"/>
          </svg>
          Check-In Emosi 1-Ketuk
        </span>
        <span class="card-badge pine">&lt; 3 Detik</span>
      </div>

      <div class="emotion-picker-grid">
        ${emotionChipsHTML}
      </div>

      <div class="emotion-feedback-bar">
        <span>Kondisi tercatat: <strong>${currentEmotion.symbol} ${currentEmotion.state}</strong></span>
        <span class="font-mono" style="font-size:11px;">${currentEmotion.timestamp}</span>
      </div>
    </section>

    <!-- Strip Biometrik Pasif 4-Metrik (FR-01) -->
    <div class="section-title">
      <span>Biometrik Pasif Terhubung</span>
      <span class="section-link" onclick="window.SelarasApp.switchTab('rhythm')">Detail Tren ➔</span>
    </div>

    <div class="biometrics-grid">
      <!-- HRV Metric -->
      <div class="metric-box">
        <div class="metric-top">
          <span class="metric-title">HRV Saat Ini</span>
          <span class="metric-pill ${biometrics.hrvCurrent >= biometrics.hrvBaseline ? 'positive' : 'neutral'}">
            ${biometrics.hrvCurrent >= biometrics.hrvBaseline ? '+' : ''}${biometrics.hrvCurrent - biometrics.hrvBaseline} ms
          </span>
        </div>
        <div class="metric-value-row">
          <span class="metric-num">${biometrics.hrvCurrent}</span>
          <span class="metric-unit">ms</span>
        </div>
        <div class="metric-footnote">Baseline: ${biometrics.hrvBaseline} ms (EMA 14h)</div>
      </div>

      <!-- Detak Istirahat (RHR) -->
      <div class="metric-box">
        <div class="metric-top">
          <span class="metric-title">Detak Istirahat</span>
          <span class="metric-pill neutral">Normal</span>
        </div>
        <div class="metric-value-row">
          <span class="metric-num">${biometrics.restingHeartRate}</span>
          <span class="metric-unit">bpm</span>
        </div>
        <div class="metric-footnote">Rata-rata 7 hari: 60 bpm</div>
      </div>

      <!-- Langkah -->
      <div class="metric-box">
        <div class="metric-top">
          <span class="metric-title">Langkah Harian</span>
          <span class="metric-pill positive">${stepsPct}%</span>
        </div>
        <div class="metric-value-row">
          <span class="metric-num">${biometrics.currentSteps.toLocaleString('id-ID')}</span>
          <span class="metric-unit">/ ${biometrics.targetSteps.toLocaleString('id-ID')}</span>
        </div>
        <div class="metric-footnote">Ritme langkah teratur</div>
      </div>

      <!-- Tidur Semalam -->
      <div class="metric-box">
        <div class="metric-top">
          <span class="metric-title">Tidur Semalam</span>
          <span class="metric-pill positive">94%</span>
        </div>
        <div class="metric-value-row">
          <span class="metric-num">${biometrics.sleepTotalHours}j ${biometrics.sleepTotalMinutes}m</span>
        </div>
        <div class="metric-footnote">Deep Sleep: 1j 42m (23%)</div>
      </div>
    </div>

    <!-- Pelacak Hidrasi Cepat 1-Ketuk (FR-03.1) -->
    <section class="selaras-card">
      <div class="card-header-row">
        <span class="card-label">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/>
          </svg>
          Hidrasi Terukur (1-Ketuk)
        </span>
        <span class="card-badge river">${hydrationPct}% Target</span>
      </div>

      <div class="hydration-strip">
        <div class="hydration-info">
          <div style="display:flex; justify-content:space-between; align-items:baseline;">
            <span style="font-size:13px; font-weight:600; color:var(--color-ink);">
              <strong class="font-mono" style="font-size:18px;">${hydration.currentMl.toLocaleString('id-ID')}</strong> ml
            </span>
            <span style="font-size:11.5px; color:var(--color-ink-secondary);">
              Target: ${hydration.targetMl.toLocaleString('id-ID')} ml
            </span>
          </div>

          <div class="hydration-progress-track">
            <div class="hydration-progress-bar" style="width: ${hydrationPct}%;"></div>
          </div>
        </div>

        <div class="quick-tap-actions">
          <button 
            class="quick-action-btn river" 
            onclick="window.SelarasStore.addHydration(250, 'Gelas'); window.SelarasAudio.playWaterDrop();"
            title="Tambah 250 ml air (1 gelas)">
            +250ml
          </button>
          <button 
            class="quick-action-btn river" 
            onclick="window.SelarasStore.addHydration(500, 'Botol'); window.SelarasAudio.playWaterDrop();"
            title="Tambah 500 ml air (1 botol)">
            +500ml
          </button>
        </div>
      </div>
    </section>

    <!-- Sedentary Alert Bar jika terpicu (FR-01.3) -->
    ${sedentary.isTriggered ? `
      <div class="sedentary-alert-banner" role="alert">
        <div class="sedentary-text">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 8v4M12 16h.01M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z"/>
          </svg>
          <span>Duduk berkelanjutan <strong>${sedentary.currentMinutes}m</strong>. Waktunya peregangan santai.</span>
        </div>
        <button class="sedentary-btn" onclick="window.SelarasApp.switchTab('guidance')">
          Peregangan Meja
        </button>
      </div>
    ` : ''}

    <!-- Quick Entry ke Menu Nusantara -->
    <div style="display:flex; gap:10px; margin-top:6px;">
      <button 
        class="selaras-card" 
        style="flex:1; display:flex; align-items:center; gap:10px; padding:12px; margin-bottom:0; cursor:pointer; text-align:left;"
        onclick="window.SelarasApp.switchTab('nutrition')">
        <div style="width:36px; height:36px; border-radius:50%; background:var(--color-ochre-light); color:var(--color-ochre); display:flex; align-items:center; justify-content:center; flex-shrink:0;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3"/>
          </svg>
        </div>
        <div>
          <div style="font-size:13px; font-weight:700; color:var(--color-ink);">Preset Gizi Nusantara</div>
          <div style="font-size:11.5px; color:var(--color-ink-secondary);">Catat makan siang lokal tanpa timbang gram</div>
        </div>
      </button>

      <button 
        class="selaras-card" 
        style="flex:1; display:flex; align-items:center; gap:10px; padding:12px; margin-bottom:0; cursor:pointer; text-align:left;"
        onclick="window.SelarasBreathing.start()">
        <div style="width:36px; height:36px; border-radius:50%; background:var(--color-river-light); color:var(--color-river); display:flex; align-items:center; justify-content:center; flex-shrink:0;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l4 2"/>
          </svg>
        </div>
        <div>
          <div style="font-size:13px; font-weight:700; color:var(--color-ink);">Pernapasan Kotak</div>
          <div style="font-size:11.5px; color:var(--color-ink-secondary);">2 menit panduan regulasi detak jantung</div>
        </div>
      </button>
    </div>
  `;
};
