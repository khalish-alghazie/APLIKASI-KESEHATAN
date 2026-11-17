/**
 * Selaras — State Management & Offline-First Store
 * Sesuai Dokumen: ARCHITECHTURE.MD, PRD.MD, AIAGENT.MD
 * Kecepatan Tulis: < 15ms (Local-First), Bebas Latensi Jaringan
 */

class SelarasState {
  constructor() {
    this.STORAGE_KEY = 'selaras_state_v1';
    this.listeners = new Set();
    this.state = this.loadInitialState();
  }

  // Baseline EMA (Exponential Moving Average) Calculator
  // ARCHITECHTURE.MD: HRV_baseline,t = α * HRV_t + (1 - α) * HRV_baseline,t-1 (α = 0.15)
  calculateEMA(currentHRV, previousBaseline, alpha = 0.15) {
    return Math.round((alpha * currentHRV) + ((1 - alpha) * previousBaseline));
  }

  loadInitialState() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.warn('Gagal memuat state lokal, memulihkan data default:', e);
      }
    }

    // Default Persona Data: Rian (30-an, Profesional Urban)
    return {
      user: {
        name: 'Rian',
        role: 'Product Lead',
        wearable: 'Garmin Epix Gen 2',
        syncTime: '2 menit lalu',
        nightMode: false
      },
      // Skenario Quiet Intelligence yang sedang aktif
      // 'stress_detected' | 'morning_readiness' | 'sedentary_alert'
      activeScenario: 'stress_detected',

      // Biometrik Pasif Real-time
      biometrics: {
        hrvCurrent: 48,           // Mengalami penurunan sementara karena rapat
        hrvBaseline: 64,          // Baseline EMA 14 hari
        restingHeartRate: 78,     // Sedikit naik di sela jadwal padat
        targetSteps: 7500,
        currentSteps: 5420,
        sleepTotalHours: 7,
        sleepTotalMinutes: 15,
        readinessScore: 84
      },

      // Riwayat HRV 7 Hari (untuk grafik Ritme)
      hrvHistory7Days: [
        { day: 'Rab', hrv: 62, baseline: 64 },
        { day: 'Kam', hrv: 66, baseline: 64 },
        { day: 'Jum', hrv: 65, baseline: 64 },
        { day: 'Sab', hrv: 70, baseline: 65 },
        { day: 'Min', hrv: 68, baseline: 65 },
        { day: 'Sen', hrv: 61, baseline: 64 },
        { day: 'Hari Ini', hrv: 48, baseline: 64 }
      ],

      // Arsitektur Kualitas Tidur Semalam
      sleepArchitecture: {
        deepSleepMinutes: 102,    // 1j 42m (23%)
        remSleepMinutes: 115,     // 1j 55m (26%)
        lightSleepMinutes: 218,   // 3j 38m (51%)
        awakeMinutes: 12,
        efficiencyPercent: 94,
        idealBedtime: '22:30',
        windDownTriggerTime: '21:45'
      },

      // Check-In Emosi Terakhir
      currentEmotion: {
        state: 'Tegang',
        symbol: '⚡',
        timestamp: '11:15',
        note: 'Selesai rapat kuartal kedua dengan stakeholder'
      },

      // Hidrasi Harian
      hydration: {
        currentMl: 1250,
        targetMl: 2200,
        logs: [
          { time: '07:45', amount: 250, label: 'Gelas Air Hangat Pagi' },
          { time: '09:30', amount: 250, label: 'Gelas Sebelum Rapat 1' },
          { time: '11:15', amount: 500, label: 'Botol Meja Kerja' },
          { time: '13:00', amount: 250, label: 'Gelas Pasca Makan Siang' }
        ]
      },

      // Nutrisi & Menu Nusantara
      nutrition: {
        calorieTarget: 2100,
        caloriesConsumed: 1120,
        proteinGrams: 64,
        proteinTarget: 95,
        carbsGrams: 135,
        carbsTarget: 220,
        fiberGrams: 19,
        fiberTarget: 30,
        loggedMeals: [
          {
            id: 'm1',
            name: 'Nasi Merah & Ayam Bakar Tempe',
            mealType: 'Makan Siang',
            time: '12:40',
            calories: 480,
            protein: 38,
            carbs: 48,
            fiber: 6
          },
          {
            id: 'm2',
            name: 'Overnight Oats Pisang & Madu Hutan',
            mealType: 'Sarapan',
            time: '08:10',
            calories: 320,
            protein: 12,
            carbs: 52,
            fiber: 7
          }
        ]
      },

      // Sedentari Status (>90 menit)
      sedentary: {
        currentMinutes: 95,
        threshold: 90,
        isTriggered: true
      },

      // Lingkar Dekat (3-6 Rekan)
      circle: {
        name: 'Lingkar Tim Produk & Desain',
        members: [
          {
            id: 'u1',
            name: 'Rian (Anda)',
            avatar: 'R',
            role: 'Product Lead',
            status: 'Fokus & hidrasi terjaga',
            isOnline: true
          },
          {
            id: 'u2',
            name: 'Maya',
            avatar: 'M',
            role: 'Product Designer',
            status: 'Baru jeda jalan santai 12m 🌿',
            isOnline: true
          },
          {
            id: 'u3',
            name: 'Dimas',
            avatar: 'D',
            role: 'Engineer',
            status: 'Tidur sebelum 23:00 tadi malam 🌙',
            isOnline: false
          },
          {
            id: 'u4',
            name: 'Siti',
            avatar: 'S',
            role: 'Content Strategist',
            status: 'Target hidrasi 2L tercapai 💧',
            isOnline: true
          }
        ],
        cooperativeChallenge: {
          title: 'Konsisten Istirahat Sebelum 23:00',
          progressDays: 3,
          targetDays: 5,
          activeParticipants: 4
        },
        empathyActivities: [
          { from: 'Maya', to: 'Anda', action: 'Kirim Semangat 🌿', time: '10:45' },
          { from: 'Dimas', to: 'Maya', action: 'Ajak Jalan Sore 👟', time: '09:20' }
        ]
      },

      // Pengaturan Privasi UU PDP No. 27/2022
      privacy: {
        shareMoodInCircle: true,
        shareStepGoals: true,
        shareHeartRateData: false, // Data klinis tetap rahasia
        offlineSyncQueueCount: 0
      }
    };
  }

  saveState() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.error('Penyimpanan state lokal gagal:', e);
    }
    this.notify();
  }

  getState() {
    return this.state;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach(fn => {
      try {
        fn(this.state);
      } catch (err) {
        console.error('Listener notification error:', err);
      }
    });
  }

  // ==========================================
  // AKSI 1-KETUK CEPAT (ZERO-FRICTION ACTIONS)
  // ==========================================

  // 1-Ketuk Emosi Check-In (< 3s)
  setEmotion(state, symbol, note = '') {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    this.state.currentEmotion = {
      state,
      symbol,
      timestamp: timeStr,
      note
    };

    // Evaluasi Quiet Intelligence: Jika Tegang / Lelah dan HRV turun, picu skenario napas
    if (state === 'Tegang' || state === 'Penuh') {
      this.state.activeScenario = 'stress_detected';
    } else if (state === 'Tenang' || state === 'Fokus') {
      this.state.activeScenario = 'morning_readiness';
    }

    this.saveState();
  }

  // 1-Ketuk Tambah Minum Air (+250ml atau +500ml)
  addHydration(amountMl, label = '1-Ketuk Minum') {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    this.state.hydration.currentMl = Math.min(
      this.state.hydration.targetMl + 1000, 
      this.state.hydration.currentMl + amountMl
    );

    this.state.hydration.logs.unshift({
      time: timeStr,
      amount: amountMl,
      label
    });

    this.saveState();
  }

  // Batalkan Entri Hidrasi Terakhir
  undoLastHydration() {
    if (this.state.hydration.logs.length > 0) {
      const removed = this.state.hydration.logs.shift();
      this.state.hydration.currentMl = Math.max(0, this.state.hydration.currentMl - removed.amount);
      this.saveState();
    }
  }

  // Tambah Menu Makanan Nusantara Terkurasi
  addNusantaraMeal(preset) {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newMeal = {
      id: 'm_' + Date.now(),
      name: preset.name,
      mealType: preset.category || 'Makan',
      time: timeStr,
      calories: preset.calories,
      protein: preset.protein,
      carbs: preset.carbs,
      fiber: preset.fiber
    };

    this.state.nutrition.loggedMeals.unshift(newMeal);
    this.state.nutrition.caloriesConsumed += preset.calories;
    this.state.nutrition.proteinGrams += preset.protein;
    this.state.nutrition.carbsGrams += preset.carbs;
    this.state.nutrition.fiberGrams += preset.fiber;

    this.saveState();
  }

  // Selesai Box Breathing: Pemulihan Detak Jantung
  completeBreathingSession() {
    // Simulasi pemulihan fisiologis nyata: HRV meningkat, RHR turun
    this.state.biometrics.hrvCurrent = Math.min(68, this.state.biometrics.hrvCurrent + 14);
    this.state.biometrics.restingHeartRate = Math.max(62, this.state.biometrics.restingHeartRate - 10);
    this.state.currentEmotion.state = 'Tenang';
    this.state.currentEmotion.symbol = '🍃';
    this.state.activeScenario = 'morning_readiness';

    this.saveState();
  }

  // Kirim Dukungan Emosi ke Rekan Lingkar Dekat
  sendCircleEmpathy(toMemberName, actionText) {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    this.state.circle.empathyActivities.unshift({
      from: 'Anda',
      to: toMemberName,
      action: actionText,
      time: timeStr
    });

    this.saveState();
  }

  // Ganti Skenario Presentasi (Untuk Simulasi Pengujian TECHCOMFEST)
  setScenario(scenarioKey) {
    this.state.activeScenario = scenarioKey;
    if (scenarioKey === 'stress_detected') {
      this.state.biometrics.hrvCurrent = 48;
      this.state.biometrics.restingHeartRate = 82;
      this.state.currentEmotion.state = 'Tegang';
      this.state.currentEmotion.symbol = '⚡';
    } else if (scenarioKey === 'morning_readiness') {
      this.state.biometrics.hrvCurrent = 68;
      this.state.biometrics.restingHeartRate = 58;
      this.state.currentEmotion.state = 'Tenang';
      this.state.currentEmotion.symbol = '🍃';
    } else if (scenarioKey === 'sedentary_alert') {
      this.state.sedentary.currentMinutes = 98;
      this.state.sedentary.isTriggered = true;
    }
    this.saveState();
  }

  // Toggle Mode Malam / Transisi Redup (21:30+)
  toggleNightMode() {
    this.state.user.nightMode = !this.state.user.nightMode;
    this.saveState();
  }

  // UU PDP: Reset / Hapus Seluruh Data Pribadi (Right to Erasure)
  eraseAllData() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.state = this.loadInitialState();
    this.saveState();
  }
}

// Global Singleton Instance
window.SelarasStore = new SelarasState();
