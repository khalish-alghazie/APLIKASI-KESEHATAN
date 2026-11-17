/**
 * Selaras — View: Ritme (Circadian & Recovery)
 * Sesuai Dokumen: PRD.MD (FR-01.2, FR-02.3), ARCHITECHTURE.MD (Section 3.1)
 * Analisis Tren HRV 7 Hari, Arsitektur Tidur & Transisi Malam (Wind-Down)
 */

window.renderRhythmView = function(state) {
  const { biometrics, sleepArchitecture, hrvHistory7Days } = state;

  // Render SVG Chart Tren HRV 7-Hari dengan Baseline Personal (EMA)
  const maxHRV = 80;
  const chartHeight = 130;
  const chartWidth = 320;
  const barWidth = 26;
  const gap = 16;
  const baselineY = chartHeight - ((state.biometrics.hrvBaseline / maxHRV) * chartHeight);

  const barsSVG = hrvHistory7Days.map((item, index) => {
    const x = index * (barWidth + gap) + 12;
    const barHeight = Math.round((item.hrv / maxHRV) * chartHeight);
    const y = chartHeight - barHeight;
    const isToday = index === hrvHistory7Days.length - 1;
    const isAboveBaseline = item.hrv >= item.baseline;
    const barColor = isToday 
      ? (item.hrv < item.baseline ? 'var(--color-clay)' : 'var(--color-pine)')
      : (isAboveBaseline ? 'var(--color-pine)' : '#879990');

    return `
      <g>
        <rect 
          x="${x}" 
          y="${y}" 
          width="${barWidth}" 
          height="${barHeight}" 
          rx="5" 
          fill="${barColor}" 
          opacity="${isToday ? '1' : '0.85'}"
        />
        <text 
          x="${x + barWidth / 2}" 
          y="${chartHeight + 16}" 
          font-family="var(--font-sans)" 
          font-size="11" 
          font-weight="${isToday ? '700' : '500'}" 
          fill="var(--color-ink-secondary)" 
          text-anchor="middle">
          ${item.day}
        </text>
        <text 
          x="${x + barWidth / 2}" 
          y="${y - 6}" 
          font-family="var(--font-mono)" 
          font-size="10.5" 
          font-weight="600" 
          fill="var(--color-ink)" 
          text-anchor="middle">
          ${item.hrv}
        </text>
      </g>
    `;
  }).join('');

  return `
    <!-- Header Ritme -->
    <header class="app-header">
      <div class="header-top-row">
        <span class="card-badge pine">Pemulihan Sirkadian</span>
        <span class="wearable-sync-badge">
          <span class="sync-pulse-dot"></span>
          <span>Apple Health / Garmin Passive</span>
        </span>
      </div>
      <div>
        <h1 class="headline-editorial">Arsitektur Ritme & Istirahat</h1>
        <p class="subheadline-warm">Membaca sinyal fisiologis tanpa istilah medis yang rumit</p>
      </div>
    </header>

    <!-- Skor Kesiapan Tubuh (Readiness Score 84) -->
    <section class="selaras-card">
      <div class="card-header-row">
        <span class="card-label">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l4 2"/>
          </svg>
          Skor Kesiapan Harian (FR-01.2)
        </span>
        <span class="card-badge pine">Kondisi Prima</span>
      </div>

      <div style="display:flex; align-items:center; gap:18px; margin:8px 0 14px 0;">
        <div style="width:72px; height:72px; border-radius:50%; background:var(--color-pine-light); border:2px solid var(--color-pine); display:flex; flex-direction:column; align-items:center; justify-content:center; flex-shrink:0;">
          <span class="font-mono" style="font-size:26px; font-weight:800; color:var(--color-pine); line-height:1;">
            ${biometrics.readinessScore}
          </span>
          <span style="font-size:10px; font-weight:700; color:var(--color-pine); text-transform:uppercase;">/ 100</span>
        </div>

        <div>
          <h2 style="font-size:15px; font-weight:700; color:var(--color-ink); margin-bottom:4px;">
            Kapasitas Pemulihan Sangat Baik
          </h2>
          <p style="font-size:12.5px; color:var(--color-ink-secondary); line-height:1.45;">
            Kombinasi tidur dalam 1j 42m dan detak istirahat stabil memberikan kesiapan saraf parasimpatis optimal untuk aktivitas fokus.
          </p>
        </div>
      </div>

      <!-- Komponen Penilai Skor -->
      <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:8px; padding-top:10px; border-top:1px solid var(--color-border);">
        <div style="text-align:center;">
          <div style="font-size:11px; color:var(--color-ink-secondary);">Deep Sleep</div>
          <div class="font-mono" style="font-size:13px; font-weight:700; color:var(--color-river);">23% (Optimal)</div>
        </div>
        <div style="text-align:center;">
          <div style="font-size:11px; color:var(--color-ink-secondary);">HRV Semalam</div>
          <div class="font-mono" style="font-size:13px; font-weight:700; color:var(--color-pine);">68 ms</div>
        </div>
        <div style="text-align:center;">
          <div style="font-size:11px; color:var(--color-ink-secondary);">RHR Bangun</div>
          <div class="font-mono" style="font-size:13px; font-weight:700; color:var(--color-ink);">58 bpm</div>
        </div>
      </div>
    </section>

    <!-- Grafik Tren HRV 7 Hari dengan Baseline EMA -->
    <section class="selaras-card">
      <div class="card-header-row">
        <div>
          <span class="card-label">Tren HRV 7 Hari</span>
          <div style="font-size:11.5px; color:var(--color-ink-secondary); margin-top:2px;">
            Garis putus-putus: Baseline Pribadi (${biometrics.hrvBaseline} ms, EMA α=0.15)
          </div>
        </div>
        <span class="card-badge ${biometrics.hrvCurrent >= biometrics.hrvBaseline ? 'pine' : 'clay'}">
          ${biometrics.hrvCurrent >= biometrics.hrvBaseline ? 'Terkendali' : 'Perlu Jeda'}
        </span>
      </div>

      <!-- SVG Chart Container -->
      <div style="width:100%; overflow-x:auto; padding:10px 0;">
        <svg viewBox="0 0 320 160" style="width:100%; height:auto; display:block;">
          <!-- Grid Lines -->
          <line x1="0" y1="20" x2="320" y2="20" stroke="var(--color-border-subtle)" stroke-dasharray="3,3" />
          <line x1="0" y1="65" x2="320" y2="65" stroke="var(--color-border-subtle)" stroke-dasharray="3,3" />
          <line x1="0" y1="110" x2="320" y2="110" stroke="var(--color-border-subtle)" stroke-dasharray="3,3" />

          <!-- Garis Baseline EMA Personal (64 ms) -->
          <line 
            x1="0" 
            y1="${baselineY}" 
            x2="320" 
            y2="${baselineY}" 
            stroke="#B8833A" 
            stroke-width="1.8" 
            stroke-dasharray="5,4" 
          />
          <text 
            x="315" 
            y="${baselineY - 4}" 
            font-family="var(--font-mono)" 
            font-size="9" 
            font-weight="700" 
            fill="#B8833A" 
            text-anchor="end">
            Baseline 64ms
          </text>

          <!-- SVG Bars -->
          ${barsSVG}
        </svg>
      </div>

      <div style="font-size:12px; color:var(--color-ink-secondary); background:var(--color-paper-subtle); padding:10px 12px; border-radius:var(--radius-sm); margin-top:6px;">
        💡 <strong>Catatan Non-Menghakimi:</strong> Penurunan HRV hari ini adalah reaksi alami tubuh terhadap rapat intensif. Sesi pernapasan 2 menit sudah cukup untuk memulihkan stabilitas saraf.
      </div>
    </section>

    <!-- Arsitektur Kualitas Tidur (FR-02.3) -->
    <section class="selaras-card">
      <div class="card-header-row">
        <span class="card-label">Arsitektur Tidur Semalam</span>
        <span class="card-badge river">Efisiensi ${sleepArchitecture.efficiencyPercent}%</span>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:10px;">
        <div>
          <span class="font-mono" style="font-size:24px; font-weight:700; color:var(--color-ink);">
            ${biometrics.sleepTotalHours}j ${biometrics.sleepTotalMinutes}m
          </span>
          <span style="font-size:12px; color:var(--color-ink-secondary); margin-left:6px;">Durasi Total</span>
        </div>
        <div style="font-size:12px; color:var(--color-ink-secondary);">
          Terjaga: <strong class="font-mono">${sleepArchitecture.awakeMinutes}m</strong>
        </div>
      </div>

      <!-- Visual Stacked Bar Tidur -->
      <div style="width:100%; height:14px; border-radius:var(--radius-pill); overflow:hidden; display:flex; margin-bottom:14px;">
        <div style="width:23%; background:var(--color-river); height:100%;" title="Deep Sleep (23%)"></div>
        <div style="width:26%; background:var(--color-pine); height:100%;" title="REM Sleep (26%)"></div>
        <div style="width:48%; background:#9DBAC2; height:100%;" title="Light Sleep (48%)"></div>
        <div style="width:3%; background:#C46548; height:100%;" title="Awake (3%)"></div>
      </div>

      <!-- Keterangan Fase Tidur -->
      <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:10px;">
        <div style="display:flex; align-items:center; gap:8px;">
          <div style="width:10px; height:10px; border-radius:2px; background:var(--color-river);"></div>
          <div>
            <div style="font-size:12px; font-weight:600; color:var(--color-ink);">Deep Sleep (23%)</div>
            <div style="font-size:11px; color:var(--color-ink-secondary);">1j 42m • Pemulihan Fisik</div>
          </div>
        </div>

        <div style="display:flex; align-items:center; gap:8px;">
          <div style="width:10px; height:10px; border-radius:2px; background:var(--color-pine);"></div>
          <div>
            <div style="font-size:12px; font-weight:600; color:var(--color-ink);">REM Sleep (26%)</div>
            <div style="font-size:11px; color:var(--color-ink-secondary);">1j 55m • Regulasi Emosi</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Transisi Malam (Wind-Down Mode) -->
    <section class="selaras-card" style="background:#FAF8F4; border-color:#DCD6C8;">
      <div class="card-header-row">
        <span class="card-label" style="color:var(--color-river);">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
          </svg>
          Mode Transisi Malam (Wind-Down)
        </span>
        <span class="card-badge river">Mulai 21:45</span>
      </div>

      <p style="font-size:13px; color:var(--color-ink-secondary); line-height:1.45; margin-bottom:12px;">
        Layar akan otomatis meredup ke palet kanvas malam 45 menit sebelum target tidur Anda (${sleepArchitecture.idealBedtime}) untuk merangsang produksi melatonin alami.
      </p>

      <button 
        class="quick-action-btn" 
        style="width:100%; justify-content:center; padding:10px;"
        onclick="window.SelarasStore.toggleNightMode(); window.SelarasAudio.playTap();">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="5"/>
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
        </svg>
        Pratinjau Tampilan Redup Malam (Canvas Arang Hangat)
      </button>
    </section>
  `;
};
