/**
 * Selaras — View: Nutrisi (Nusantara Mindful Fuel)
 * Sesuai Dokumen: PRD.MD (FR-03.1, FR-03.2), DESAIN.MD (Section 4.1)
 * Pencatatan Gizi Lokal Tanpa Beban Timbang Gramasi (Zero Tracking Fatigue)
 */

window.currentNutritionCategory = 'Semua';

window.nusantaraPresets = [
  {
    id: 'p1',
    name: 'Nasi Merah & Ayam Panggang Tempe',
    category: 'Makan Siang',
    calories: 480,
    protein: 38,
    carbs: 48,
    fiber: 6,
    desc: 'Dada ayam tanpa kulit, tempe bacem panggang, lalapan timun'
  },
  {
    id: 'p2',
    name: 'Gado-Gado Lontong Telur Rebus',
    category: 'Makan Siang',
    calories: 390,
    protein: 18,
    carbs: 44,
    fiber: 8,
    desc: 'Sayuran kukus kacang panjang, tauge, tahu, bumbu kacang tipis'
  },
  {
    id: 'p3',
    name: 'Soto Ayam Bening Bihun & Telur',
    category: 'Makan Malam',
    calories: 340,
    protein: 26,
    carbs: 32,
    fiber: 3,
    desc: 'Kuah kaldu kunyit bening tanpa santan, seledri, jeruk nipis'
  },
  {
    id: 'p4',
    name: 'Pecel Sayur Madiun & Tahu Panggang',
    category: 'Makan Siang',
    calories: 310,
    protein: 14,
    carbs: 36,
    fiber: 9,
    desc: 'Bayam, kangkung, daun singkong rebus dengan sambal pecel gurih'
  },
  {
    id: 'p5',
    name: 'Ikan Kembung Bakar & Sayur Bening Bayam',
    category: 'Makan Malam',
    calories: 420,
    protein: 34,
    carbs: 24,
    fiber: 5,
    desc: 'Kaya Omega-3, sambal dabu-dabu segar, kuah bayam jagung manis'
  },
  {
    id: 'p6',
    name: 'Overnight Oats Pisang & Madu Hutan',
    category: 'Sarapan',
    calories: 320,
    protein: 12,
    carbs: 52,
    fiber: 7,
    desc: 'Rolled oats, susu oat, irisan pisang ambon lokal, biji chia'
  },
  {
    id: 'p7',
    name: 'Pisang Rebus & Susu Kedelai Tawar',
    category: 'Camilan',
    calories: 190,
    protein: 9,
    carbs: 28,
    fiber: 4,
    desc: 'Camilan rendah indeks glikemik untuk jeda sore di kantor'
  }
];

window.setNutritionFilter = function(category) {
  window.currentNutritionCategory = category;
  if (window.SelarasApp) {
    window.SelarasApp.renderCurrentTab();
  }
};

window.renderNutritionView = function(state) {
  const { hydration, nutrition } = state;
  const hydrationPct = Math.min(100, Math.round((hydration.currentMl / hydration.targetMl) * 100));

  // Filter Presets
  const filteredPresets = window.currentNutritionCategory === 'Semua'
    ? window.nusantaraPresets
    : window.nusantaraPresets.filter(p => p.category === window.currentNutritionCategory);

  const categories = ['Semua', 'Sarapan', 'Makan Siang', 'Makan Malam', 'Camilan'];
  const filterChipsHTML = categories.map(cat => {
    const isActive = window.currentNutritionCategory === cat;
    return `
      <button 
        class="meal-filter-chip ${isActive ? 'active' : ''}" 
        onclick="window.setNutritionFilter('${cat}'); window.SelarasAudio.playTap();">
        ${cat}
      </button>
    `;
  }).join('');

  // Render Preset Cards
  const presetsHTML = filteredPresets.map(item => {
    return `
      <div class="meal-preset-card">
        <div class="meal-preset-info">
          <div class="meal-name">${item.name}</div>
          <div style="font-size:11.5px; color:var(--color-ink-secondary); margin-bottom:5px;">${item.desc}</div>
          <div class="meal-macros-row">
            <span style="font-weight:700; color:var(--color-ochre);">${item.calories} kkal</span>
            <span>•</span>
            <span>Prot: ${item.protein}g</span>
            <span>•</span>
            <span>Karbo: ${item.carbs}g</span>
            <span>•</span>
            <span>Serat: ${item.fiber}g</span>
          </div>
        </div>
        <button 
          class="meal-add-btn" 
          onclick="window.SelarasStore.addNusantaraMeal(window.nusantaraPresets.find(p => p.id === '${item.id}')); window.SelarasAudio.playTap(); window.SelarasApp.showToast('Tercatat: ${item.name} 🍲', '🌿');"
          title="Tambah ke catatan makan">
          +
        </button>
      </div>
    `;
  }).join('');

  // Render Recent Meals
  const recentMealsHTML = nutrition.loggedMeals.map(meal => {
    return `
      <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px solid var(--color-border-subtle);">
        <div>
          <div style="font-size:13px; font-weight:600; color:var(--color-ink);">${meal.name}</div>
          <div style="font-size:11px; color:var(--color-ink-secondary);">${meal.mealType} • ${meal.time}</div>
        </div>
        <div class="font-mono" style="font-size:13px; font-weight:700; color:var(--color-ochre);">
          +${meal.calories} kkal
        </div>
      </div>
    `;
  }).join('');

  return `
    <!-- Header Nutrisi -->
    <header class="app-header">
      <div class="header-top-row">
        <span class="card-badge ochre">Katalog Gizi Nusantara</span>
        <span class="wearable-sync-badge">
          <span>Target Adaptif: 2.200 ml</span>
        </span>
      </div>
      <div>
        <h1 class="headline-editorial">Nutrisi & Hidrasi Terukur</h1>
        <p class="subheadline-warm">Mencukupi energi tanpa rasa bersalah atau timbangan gram</p>
      </div>
    </header>

    <!-- Visual Water Jug & Hidrasi Terintegrasi (FR-03.1) -->
    <section class="selaras-card">
      <div class="card-header-row">
        <span class="card-label">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/>
          </svg>
          Kontainer Hidrasi Harian
        </span>
        <span class="card-badge river">${hydrationPct}% Tercapai</span>
      </div>

      <div style="display:flex; align-items:center; gap:18px; margin:10px 0 16px 0;">
        <!-- Visual Botol Minum Organik -->
        <div style="width:64px; height:90px; border-radius:18px; border:2px solid var(--color-river-border); background:var(--color-paper-subtle); position:relative; overflow:hidden; flex-shrink:0;">
          <div style="position:absolute; bottom:0; left:0; right:0; height:${hydrationPct}%; background:var(--color-river); transition:height 0.3s ease; border-top-left-radius:4px; border-top-right-radius:4px;"></div>
          <div style="position:absolute; top:4px; left:50%; transform:translateX(-50%); width:24px; height:4px; border-radius:4px; background:var(--color-border);"></div>
        </div>

        <div style="flex:1;">
          <div style="display:flex; align-items:baseline; gap:6px;">
            <span class="font-mono" style="font-size:26px; font-weight:800; color:var(--color-ink);">
              ${hydration.currentMl.toLocaleString('id-ID')}
            </span>
            <span style="font-size:13px; color:var(--color-ink-secondary);">
              / ${hydration.targetMl.toLocaleString('id-ID')} ml
            </span>
          </div>
          <p style="font-size:12px; color:var(--color-ink-secondary); line-height:1.4; margin-top:2px;">
            Target disesuaikan otomatis dengan aktivitas jalan kaki 5.420 langkah hari ini.
          </p>

          <div style="display:flex; gap:8px; margin-top:10px;">
            <button 
              class="quick-action-btn river" 
              onclick="window.SelarasStore.addHydration(250, 'Gelas'); window.SelarasAudio.playWaterDrop(); window.SelarasApp.showToast('+250ml Air dicatat 💧');">
              +250 ml (Gelas)
            </button>
            <button 
              class="quick-action-btn river" 
              onclick="window.SelarasStore.addHydration(500, 'Botol'); window.SelarasAudio.playWaterDrop(); window.SelarasApp.showToast('+500ml Air dicatat 💧');">
              +500 ml (Botol)
            </button>
            <button 
              class="quick-action-btn" 
              style="padding:8px;"
              onclick="window.SelarasStore.undoLastHydration(); window.SelarasAudio.playTap();"
              title="Batalkan entri terakhir">
              ↺
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Keseimbangan Makronutrien Harian (FR-03.2) -->
    <section class="selaras-card">
      <div class="card-header-row">
        <span class="card-label">Keseimbangan Makro Hari Ini</span>
        <span class="card-badge ochre">${nutrition.caloriesConsumed} / ${nutrition.calorieTarget} kkal</span>
      </div>

      <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:10px; margin-top:8px;">
        <!-- Protein -->
        <div style="background:var(--color-paper-subtle); padding:10px; border-radius:var(--radius-sm); text-align:center;">
          <div style="font-size:11px; font-weight:600; color:var(--color-ink-secondary);">Protein</div>
          <div class="font-mono" style="font-size:16px; font-weight:700; color:var(--color-pine); margin:3px 0;">
            ${nutrition.proteinGrams}g
          </div>
          <div style="font-size:10px; color:var(--color-ink-tertiary);">Target 95g</div>
        </div>

        <!-- Karbohidrat Kompleks -->
        <div style="background:var(--color-paper-subtle); padding:10px; border-radius:var(--radius-sm); text-align:center;">
          <div style="font-size:11px; font-weight:600; color:var(--color-ink-secondary);">Karbo Kompleks</div>
          <div class="font-mono" style="font-size:16px; font-weight:700; color:var(--color-ochre); margin:3px 0;">
            ${nutrition.carbsGrams}g
          </div>
          <div style="font-size:10px; color:var(--color-ink-tertiary);">Target 220g</div>
        </div>

        <!-- Serat Sayuran -->
        <div style="background:var(--color-paper-subtle); padding:10px; border-radius:var(--radius-sm); text-align:center;">
          <div style="font-size:11px; font-weight:600; color:var(--color-ink-secondary);">Serat Pangan</div>
          <div class="font-mono" style="font-size:16px; font-weight:700; color:var(--color-clay); margin:3px 0;">
            ${nutrition.fiberGrams}g
          </div>
          <div style="font-size:10px; color:var(--color-ink-tertiary);">Target 30g</div>
        </div>
      </div>
    </section>

    <!-- Preset Gizi Nusantara (1-Ketuk Log) -->
    <div class="section-title">
      <span>Katalog Porsi Visual Nusantara</span>
      <span style="font-size:11.5px; color:var(--color-ink-secondary);">1-Ketuk Tuntas</span>
    </div>

    <!-- Filter Tab Chips -->
    <div class="meal-filter-tabs">
      ${filterChipsHTML}
    </div>

    <!-- Presets List -->
    <div style="margin-bottom:16px;">
      ${presetsHTML}
    </div>

    <!-- Riwayat Makan Hari Ini -->
    <section class="selaras-card">
      <div class="card-header-row">
        <span class="card-label">Riwayat Makanan Hari Ini</span>
        <span class="card-badge pine">${nutrition.loggedMeals.length} Menu</span>
      </div>
      <div>
        ${recentMealsHTML}
      </div>
    </section>
  `;
};
