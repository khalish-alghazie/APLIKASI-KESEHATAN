/**
 * Selaras — Main Application Controller & Router
 * Sesuai Dokumen: PRD.MD, DESAIN.MD, ARCHITECHTURE.MD
 * Estetika: Calm Biometrics & Tactile Humanity (Bebas Klise AI & Gradasi Ungu)
 */

class SelarasAppController {
  constructor() {
    this.currentTab = 'today';
    this.init();
  }

  init() {
    // Hubungkan store state ke render
    window.SelarasStore.subscribe((state) => {
      this.handleStateUpdate(state);
    });

    // Inisialisasi Jam Status Bar
    this.startStatusBarClock();

    // Render Tab Awal
    this.renderCurrentTab();

    // Terapkan Mode Malam Awal jika aktif di state
    const state = window.SelarasStore.getState();
    if (state.user.nightMode) {
      document.body.classList.add('night-mode');
    }
  }

  handleStateUpdate(state) {
    if (state.user.nightMode) {
      document.body.classList.add('night-mode');
    } else {
      document.body.classList.remove('night-mode');
    }

    this.renderCurrentTab();
  }

  switchTab(tabId) {
    if (this.currentTab === tabId) return;
    this.currentTab = tabId;

    if (window.SelarasAudio) {
      window.SelarasAudio.playTap();
    }

    // Perbarui Tombol Navigasi Bawah
    const navItems = document.querySelectorAll('.nav-tab-item');
    navItems.forEach(item => {
      if (item.getAttribute('data-tab') === tabId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    this.renderCurrentTab();

    // Scroll ke atas dengan halus
    const scrollContainer = document.getElementById('app-scroll-container');
    if (scrollContainer) {
      scrollContainer.scrollTop = 0;
    }
  }

  renderCurrentTab() {
    const state = window.SelarasStore.getState();
    const container = document.getElementById('app-tab-content');
    if (!container) return;

    switch (this.currentTab) {
      case 'today':
        container.innerHTML = window.renderTodayView(state);
        break;
      case 'rhythm':
        container.innerHTML = window.renderRhythmView(state);
        break;
      case 'nutrition':
        container.innerHTML = window.renderNutritionView(state);
        break;
      case 'guidance':
        container.innerHTML = window.renderGuidanceView(state);
        break;
      case 'circle':
        container.innerHTML = window.renderCircleView(state);
        break;
      default:
        container.innerHTML = window.renderTodayView(state);
    }
  }

  // Notifikasi Toast Halus (Empathic Micro-Feedback)
  showToast(message, icon = '🌿') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast-item';
    toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;
    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  closeModal() {
    const modal = document.getElementById('consultation-modal');
    if (modal) modal.classList.remove('active');
  }

  toggleDeviceView() {
    document.body.classList.toggle('fullscreen-mode');
    const isFullscreen = document.body.classList.contains('fullscreen-mode');
    const btn = document.getElementById('btn-toggle-view');
    if (btn) {
      btn.innerHTML = isFullscreen 
        ? `<span>📱 Bingkai Mobile</span>`
        : `<span>🖥️ Layar Penuh</span>`;
    }
  }

  toggleAudio() {
    const isMuted = window.SelarasAudio.toggleMute();
    const btn = document.getElementById('btn-toggle-audio');
    if (btn) {
      btn.innerHTML = isMuted 
        ? `<span>🔇 Audio Hening</span>`
        : `<span>🔔 Audio Organik</span>`;
    }
    this.showToast(isMuted ? 'Efek audio dimatikan' : 'Efek audio organik aktif', isMuted ? '🔇' : '🔔');
  }

  startStatusBarClock() {
    const updateTime = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const el = document.getElementById('status-time-display');
      if (el) el.textContent = `${hrs}:${mins}`;
    };
    updateTime();
    setInterval(updateTime, 10000);
  }
}

// Inisialisasi saat DOM siap
document.addEventListener('DOMContentLoaded', () => {
  window.SelarasApp = new SelarasAppController();

  // Daftarkan Service Worker untuk kapabilitas Offline-First
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch((err) => {
        console.log('PWA Service Worker offline fallback ready.');
      });
    });
  }
});
