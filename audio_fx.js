/**
 * CHRONICLES OF BHARATAVARSHA: PROCEDURAL WEB AUDIO SYNTHESIZER
 * 100% standalone Web Audio API sound engine creating authentic historic Indian soundscapes:
 * Sacred Shankha (War Conch), Nagada (War Drums), Royal Palace Drone, Sword Clang & Cannon Blast.
 */

class HistoricalAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.isAmbiencePlaying = false;
    this.ambienceNodes = [];
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopAmbience();
    }
    return this.isMuted;
  }

  /**
   * SACRED SHANKHA (WAR CONCH)
   * The ceremonial conch blown to signal the start of righteous battle.
   */
  playShankha() {
    if (this.isMuted) return;
    this.init();
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = "sawtooth";
    osc2.type = "sine";

    // Conch frequency sweep from 220Hz (A3) swelling to 330Hz (E4) and stabilizing
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.6);
    osc.frequency.linearRampToValueAtTime(310, now + 2.4);

    osc2.frequency.setValueAtTime(400, now);
    osc2.frequency.exponentialRampToValueAtTime(640, now + 0.6);
    osc2.frequency.linearRampToValueAtTime(620, now + 2.4);

    // Warm resonant acoustic filter
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(600, now);
    filter.Q.setValueAtTime(4.0, now);

    // Envelope: slow swell and lingering breath release
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.35, now + 0.5);
    gain.gain.setValueAtTime(0.35, now + 1.8);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 2.8);

    osc.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc2.start(now);
    osc.stop(now + 2.8);
    osc2.stop(now + 2.8);
  }

  /**
   * NAGADA / DHOL (IMPERIAL WAR DRUMS)
   * Heavy percussive strike with low membrane resonance.
   */
  playWarDrum(pitch = 120) {
    if (this.isMuted) return;
    this.init();
    const ctx = this.ctx;
    const now = ctx.currentTime;

    // Membrane punch oscillator
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(pitch, now);
    osc.frequency.exponentialRampToValueAtTime(35, now + 0.35);

    gain.gain.setValueAtTime(0.6, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.6);

    // Drumhead slap noise
    const bufferSize = ctx.sampleRate * 0.08;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "lowpass";
    noiseFilter.frequency.value = 800;
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.3, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    noise.start(now);
  }

  /**
   * SWORD RESONANT CLANG / SLASH
   * Metallic high-frequency ringing of crucible Wootz steel.
   */
  playSwordClang() {
    if (this.isMuted) return;
    this.init();
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const freqs = [1820, 2460, 3740, 5200];
    freqs.forEach(f => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(f, now);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.9);
    });
  }

  /**
   * CANNON FIRE / GUNPOWDER EXPLOSION
   * Massive thunderous blast for Topkhana & Zamburak artillery.
   */
  playCannonBlast() {
    if (this.isMuted) return;
    this.init();
    const ctx = this.ctx;
    const now = ctx.currentTime;

    // Sub-bass thump
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = "triangle";
    subOsc.frequency.setValueAtTime(140, now);
    subOsc.frequency.exponentialRampToValueAtTime(25, now + 0.6);
    subGain.gain.setValueAtTime(0.8, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
    subOsc.connect(subGain);
    subGain.connect(ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 0.9);

    // Gunpowder explosion noise burst
    const bufferSize = ctx.sampleRate * 0.9;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(600, now);
    filter.frequency.exponentialRampToValueAtTime(150, now + 0.8);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.7, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    noise.start(now);
  }

  /**
   * PALACE MEDITATIVE TANPURA AMBIENCE
   * Continuous background drone in D (Pa-Sa-Sa-Sa: A2, D3, D3, D2).
   */
  startPalaceAmbience() {
    if (this.isMuted || this.isAmbiencePlaying) return;
    this.init();
    const ctx = this.ctx;
    const now = ctx.currentTime;

    this.stopAmbience();

    // Tanpura string pitches: Pa (110Hz), Sa (146.8Hz), Sa (146.8Hz), Sa low (73.4Hz)
    const pitches = [110.0, 146.83, 146.83, 73.41];
    this.ambienceNodes = [];

    pitches.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, now);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(450 + (i % 2) * 150, now);

      // Subtle LFO modulation for organic acoustic shimmering
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.2 + i * 0.08;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.03;

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 2.0);

      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      lfo.start(now);

      this.ambienceNodes.push({ osc, lfo, gain });
    });

    this.isAmbiencePlaying = true;
  }

  stopAmbience() {
    if (this.ambienceNodes && this.ambienceNodes.length > 0) {
      const now = this.ctx ? this.ctx.currentTime : 0;
      this.ambienceNodes.forEach(node => {
        try {
          node.gain.gain.linearRampToValueAtTime(0.001, now + 0.5);
          setTimeout(() => {
            node.osc.stop();
            node.lfo.stop();
          }, 600);
        } catch (e) {}
      });
      this.ambienceNodes = [];
    }
    this.isAmbiencePlaying = false;
  }

  toggleAmbience() {
    if (this.isAmbiencePlaying) {
      this.stopAmbience();
      return false;
    } else {
      this.startPalaceAmbience();
      return true;
    }
  }
}

if (typeof window !== "undefined") {
  window.HistoricalAudioEngine = HistoricalAudioEngine;
}
