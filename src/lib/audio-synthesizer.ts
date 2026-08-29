'use client';

class AudioSynthesizer {
  private ctx: AudioContext | null = null;
  private muted: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      const savedMute = localStorage.getItem('algo_vis_muted');
      this.muted = savedMute !== null ? savedMute === 'true' : true;
    }
  }

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public toggleMute(): boolean {
    this.muted = !this.muted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('algo_vis_muted', String(this.muted));
    }
    return this.muted;
  }

  public playTone(value: number, max: number = 100, isSwap: boolean = false) {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const minFreq = 180;
      const maxFreq = 950;
      const ratio = Math.max(0.05, Math.min(value / max, 1));
      const freq = minFreq + ratio * (maxFreq - minFreq);

      osc.type = isSwap ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // Audio autoplay policy fallback
    }
  }
}

export const soundEngine = new AudioSynthesizer();
