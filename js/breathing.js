/**
 * Selaras — Box Breathing (Pernapasan Kotak 4-4-4-4) Interaktif
 * PRD FR-02.2 & Desain Bagian 4.2: Critical Stress Recovery Journey
 */

class BoxBreathingController {
  constructor() {
    this.isActive = false;
    this.totalDurationSeconds = 120; // 2 Menit
    this.remainingSeconds = 120;
    this.phaseDuration = 4; // 4 detik tiap sisi kotak
    this.currentPhaseIndex = 0; // 0: Tarik, 1: Tahan Penuh, 2: Hembuskan, 3: Tahan Kosong
    this.phaseCountdown = 4;
    this.simulatedHR = 82;

    this.phases = [
      {
        id: 'inhale',
        title: 'Tarik Napas Melalui Hidung',
        hint: 'Biarkan rongga perut mengembang perlahan.',
        orbClass: 'inhale',
        bellFreq: 330
      },
      {
        id: 'hold-full',
        title: 'Tahan Napas Nyaman',
        hint: 'Lepaskan ketegangan pada rahang dan pundak.',
        orbClass: 'hold-full',
        bellFreq: 440
      },
      {
        id: 'exhale',
        title: 'Hembuskan Lewat Mulut',
        hint: 'Lepaskan beban napas secara halus tanpa tergesa.',
        orbClass: 'exhale',
        bellFreq: 290
      },
      {
        id: 'hold-empty',
        title: 'Tahan Hening',
        hint: 'Rasakan keheningan sebelum tarikan berikutnya.',
        orbClass: 'hold-empty',
        bellFreq: 220
      }
    ];

    this.timerInterval = null;
    this.phaseInterval = null;
  }

  start() {
    this.isActive = true;
    this.remainingSeconds = 120;
    this.currentPhaseIndex = 0;
    this.phaseCountdown = 4;
    this.simulatedHR = 82;

    const modal = document.getElementById('breathing-modal');
    if (modal) modal.classList.add('active');

    this.updateUI();
    this.runPhaseCycle();

    // Timer Utama 2 Menit
    this.timerInterval = setInterval(() => {
      this.remainingSeconds--;
      if (this.remainingSeconds <= 0) {
        this.finishSession();
      } else {
        this.updateTimeDisplay();
      }
    }, 1000);
  }

  runPhaseCycle() {
    const currentPhase = this.phases[this.currentPhaseIndex];
    if (window.SelarasAudio) {
      window.SelarasAudio.playBreathBell(currentPhase.bellFreq);
    }

    const orb = document.getElementById('breathing-orb');
    if (orb) {
      orb.className = 'breathing-orb ' + currentPhase.orbClass;
    }

    const phaseTitle = document.getElementById('breathing-phase-title');
    if (phaseTitle) phaseTitle.textContent = currentPhase.title;

    const hintText = document.getElementById('breathing-hint-text');
    if (hintText) hintText.textContent = currentPhase.hint;

    this.phaseCountdown = 4;
    this.updatePhaseCountdown();

    this.phaseInterval = setInterval(() => {
      this.phaseCountdown--;
      this.updatePhaseCountdown();

      if (this.phaseCountdown <= 0) {
        clearInterval(this.phaseInterval);
        // Pindah ke fase berikutnya (0 -> 1 -> 2 -> 3 -> 0)
        this.currentPhaseIndex = (this.currentPhaseIndex + 1) % this.phases.length;

        // Simulasi penurunan fisiologis detak jantung
        if (this.simulatedHR > 66 && Math.random() > 0.4) {
          this.simulatedHR -= 1;
          this.updateHRDisplay();
        }

        if (this.isActive) {
          this.runPhaseCycle();
        }
      }
    }, 1000);
  }

  updatePhaseCountdown() {
    const countEl = document.getElementById('breathing-phase-countdown');
    if (countEl) countEl.textContent = `00:0${this.phaseCountdown}`;

    // SVG Circular Progress
    const progressCircle = document.getElementById('breathing-progress-circle');
    if (progressCircle) {
      const circumference = 754; // 2 * PI * 120
      const fraction = (4 - this.phaseCountdown) / 4;
      const offset = circumference - (fraction * circumference);
      progressCircle.style.strokeDashoffset = offset;
    }
  }

  updateTimeDisplay() {
    const timerBadge = document.getElementById('breathing-timer-badge');
    if (timerBadge) {
      const mins = Math.floor(this.remainingSeconds / 60);
      const secs = this.remainingSeconds % 60;
      timerBadge.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
  }

  updateHRDisplay() {
    const hrEl = document.getElementById('breathing-hr-value');
    if (hrEl) hrEl.textContent = `${this.simulatedHR} bpm`;
  }

  updateUI() {
    this.updateTimeDisplay();
    this.updateHRDisplay();
  }

  stop() {
    this.isActive = false;
    clearInterval(this.timerInterval);
    clearInterval(this.phaseInterval);

    const modal = document.getElementById('breathing-modal');
    if (modal) modal.classList.remove('active');
  }

  finishSession() {
    this.stop();
    if (window.SelarasStore) {
      window.SelarasStore.completeBreathingSession();
    }
    if (window.SelarasApp) {
      window.SelarasApp.showToast('Jeda napas 2m selesai. Saraf parasimpatis kembali seimbang 🌿', '🍃');
    }
  }
}

window.SelarasBreathing = new BoxBreathingController();
