import { writeFileSync } from "fs";
import path from "path";
import { PATHS, ensureDir } from "./utils/file-helpers.js";

const SAMPLE_RATE = 44100;

/** Write a WAV file from Float32 samples */
function writeWav(filePath: string, samples: Float32Array, sampleRate: number): void {
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = sampleRate * numChannels * (bitsPerSample / 8);
  const blockAlign = numChannels * (bitsPerSample / 8);
  const dataSize = samples.length * (bitsPerSample / 8);
  const buffer = Buffer.alloc(44 + dataSize);

  // WAV header
  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write("WAVE", 8);
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16); // chunk size
  buffer.writeUInt16LE(1, 20); // PCM
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bitsPerSample, 34);
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataSize, 40);

  // Audio data
  for (let i = 0; i < samples.length; i++) {
    const clamped = Math.max(-1, Math.min(1, samples[i]));
    buffer.writeInt16LE(Math.floor(clamped * 32767), 44 + i * 2);
  }

  writeFileSync(filePath, buffer);
  console.log(`  Written: ${filePath} (${(buffer.length / 1024).toFixed(1)} KB)`);
}

/** Oscillator waveforms */
function sine(phase: number): number {
  return Math.sin(2 * Math.PI * phase);
}

function sawtooth(phase: number): number {
  const p = phase % 1;
  return 2 * p - 1;
}

function triangle(phase: number): number {
  const p = phase % 1;
  return 4 * Math.abs(p - 0.5) - 1;
}

/** Simple low-pass filter (one-pole) */
function applyLowPass(samples: Float32Array, cutoffHz: number, sampleRate: number): Float32Array {
  const rc = 1.0 / (2.0 * Math.PI * cutoffHz);
  const dt = 1.0 / sampleRate;
  const alpha = dt / (rc + dt);
  const out = new Float32Array(samples.length);
  out[0] = samples[0];
  for (let i = 1; i < samples.length; i++) {
    out[i] = out[i - 1] + alpha * (samples[i] - out[i - 1]);
  }
  return out;
}

/** Generate Tron Legacy-inspired electronic soundtrack */
function generateTronTrack(durationSeconds: number): Float32Array {
  const numSamples = Math.floor(SAMPLE_RATE * durationSeconds);
  const samples = new Float32Array(numSamples);

  const BPM = 125;
  const beatDuration = 60 / BPM; // seconds per beat
  const sixteenthDuration = beatDuration / 4;

  // Key: A minor (A2=110Hz)
  // Scale: A B C D E F G
  const baseFreq = 110; // A2

  // Arpeggio pattern (A minor scale intervals in semitones from A)
  // Am: A C E A(octave) E C -- creates that Tron Legacy cycling feel
  const arpIntervals = [0, 3, 7, 12, 7, 3, 0, 3, 7, 12, 15, 12, 7, 3, 0, -5];
  const arpLength = arpIntervals.length;

  // Scene timing (in seconds) for dynamic builds
  // hook: 0-5, problem: 5-11, reveal: 11-13, dashboard: 13-23, impact: 23-29.5, endCard: 29.5-35
  const hookEnd = 5;
  const problemEnd = 11;
  const revealEnd = 13;
  const dashboardEnd = 23;
  const impactEnd = 29.5;

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    let sample = 0;

    // ---- Which section are we in? ----
    const isHook = t < hookEnd;
    const isProblem = t >= hookEnd && t < problemEnd;
    const isReveal = t >= problemEnd && t < revealEnd;
    const isDashboard = t >= revealEnd && t < dashboardEnd;
    const isImpact = t >= dashboardEnd && t < impactEnd;
    const isEnd = t >= impactEnd;

    // ---- Global envelope ----
    const fadeIn = Math.min(t / 2, 1);
    const fadeOut = Math.min((durationSeconds - t) / 2, 1);
    const globalEnv = fadeIn * fadeOut;

    // ---- Energy level (0-1) for dynamic build ----
    let energy = 0;
    if (isHook) {
      energy = 0.2 + 0.15 * (t / hookEnd); // Minimal, building
    } else if (isProblem) {
      energy = 0.35 + 0.25 * ((t - hookEnd) / (problemEnd - hookEnd)); // Rising tension
    } else if (isReveal) {
      energy = 0.7 + 0.15 * ((t - problemEnd) / (revealEnd - problemEnd)); // Burst
    } else if (isDashboard) {
      // Peak energy during dashboard hero section
      const dashProgress = (t - revealEnd) / (dashboardEnd - revealEnd);
      energy = 0.85 + 0.15 * Math.sin(dashProgress * Math.PI); // Peaks in middle
    } else if (isImpact) {
      energy = 0.7 + 0.2 * (1 - (t - dashboardEnd) / (impactEnd - dashboardEnd)); // Gradually resolving
    } else if (isEnd) {
      energy = 0.3 * (1 - (t - impactEnd) / (durationSeconds - impactEnd)); // Fade out
    }

    // ---- 1. Pulsing bass synth (sine wave, rhythmic) ----
    const bassFreq = baseFreq; // A2 = 110Hz
    const beatPhase = (t / beatDuration) % 1;
    // Rhythmic pulse: volume gates on 8th notes
    const eighthPhase = (t / (beatDuration / 2)) % 1;
    const bassGate = eighthPhase < 0.7 ? 1 : 0.15; // Short gap between pulses
    const bassEnv = bassGate * Math.pow(1 - eighthPhase * 0.4, 2);
    const bassAmp = 0.22 * energy * bassEnv;
    // Sub bass (sine) + slight overtone
    sample += bassAmp * sine(t * bassFreq);
    sample += bassAmp * 0.3 * sine(t * bassFreq * 2); // Octave harmonic for punch

    // ---- 2. Arpeggiated synth (sawtooth, 16th note patterns) ----
    if (energy > 0.3) {
      const arpEnergy = Math.max(0, (energy - 0.3) / 0.7); // 0-1 once arp kicks in
      const sixteenthIndex = Math.floor(t / sixteenthDuration);
      const sixteenthPhase = (t / sixteenthDuration) % 1;

      // Note from pattern
      const noteIndex = sixteenthIndex % arpLength;
      const semitones = arpIntervals[noteIndex];
      const arpFreq = baseFreq * Math.pow(2, semitones / 12);

      // Sharp attack, quick decay envelope per note
      const noteEnv = Math.pow(Math.max(0, 1 - sixteenthPhase * 2.5), 1.5);

      // Sawtooth oscillator (more electronic/Tron feel)
      const arpAmp = 0.12 * arpEnergy * noteEnv;
      sample += arpAmp * sawtooth(t * arpFreq);
      // Slight detuned copy for thickness
      sample += arpAmp * 0.4 * sawtooth(t * arpFreq * 1.005);
    }

    // ---- 3. Atmospheric pad (triangle wave, slow evolving) ----
    {
      // Chord: A minor (A, C, E) spread across octaves
      const padFreqs = [110, 130.81, 164.81, 220, 261.63];
      const padAmps = [0.06, 0.05, 0.04, 0.03, 0.025];

      let padSample = 0;
      for (let f = 0; f < padFreqs.length; f++) {
        // Slow LFO vibrato
        const lfo = 1 + 0.004 * sine(t * 0.08 + f * 0.5);
        padSample += padAmps[f] * triangle(t * padFreqs[f] * lfo);
      }

      // Pad fades in slowly, always present but subtle
      const padEnv = Math.min(t / 4, 1) * Math.min((durationSeconds - t) / 3, 1);
      sample += padSample * padEnv * (0.4 + energy * 0.4);
    }

    // ---- 4. Rhythmic kick pulse (on beat, adds drive) ----
    if (energy > 0.4) {
      const kickEnergy = Math.max(0, (energy - 0.4) / 0.6);
      const kickPhase = beatPhase;
      if (kickPhase < 0.15) {
        // Quick pitch-descending sine (classic electronic kick)
        const kickFreq = 160 * Math.pow(0.15, kickPhase / 0.15) + 40;
        const kickEnv = Math.pow(1 - kickPhase / 0.15, 3);
        sample += 0.18 * kickEnergy * kickEnv * sine(t * kickFreq);
      }
    }

    // ---- 5. Hi-hat shimmer (noise burst on offbeats) ----
    if (energy > 0.5) {
      const hatEnergy = Math.max(0, (energy - 0.5) / 0.5);
      const hatPhase = ((t + beatDuration / 2) / beatDuration) % 1; // Offbeat
      if (hatPhase < 0.05) {
        const hatEnv = Math.pow(1 - hatPhase / 0.05, 4);
        // Pseudo-noise from high-frequency sine mixing
        const noise = sine(t * 8731) * 0.3 + sine(t * 12419) * 0.3 + sine(t * 17293) * 0.2;
        sample += 0.06 * hatEnergy * hatEnv * noise;
      }
    }

    // ---- 6. Cinematic riser at section transitions ----
    // Brief rising sweep near reveal and dashboard entry
    const riserPoints = [problemEnd - 0.5, revealEnd - 0.3, dashboardEnd - 0.5];
    for (const rp of riserPoints) {
      const dist = t - rp;
      if (dist > -0.1 && dist < 0.8) {
        const riserPhase = Math.max(0, dist + 0.1) / 0.9;
        const riserFreq = 200 + riserPhase * 3000; // Sweep up
        const riserEnv = Math.sin(riserPhase * Math.PI) * 0.08;
        sample += riserEnv * sine(t * riserFreq);
      }
    }

    // Apply global envelope and master volume
    sample *= globalEnv * 0.55;

    samples[i] = sample;
  }

  // Apply gentle low-pass filter to smooth harshness
  const filtered = applyLowPass(samples, 8000, SAMPLE_RATE);

  return filtered;
}

/** Generate dark ambient pad music (legacy, kept for other tracks) */
function generateAmbientPad(durationSeconds: number): Float32Array {
  const numSamples = Math.floor(SAMPLE_RATE * durationSeconds);
  const samples = new Float32Array(numSamples);

  // Minor chord frequencies (Am: A2, C3, E3 + octave harmonics)
  const freqs = [110, 130.81, 164.81, 220, 261.63, 329.63];
  const amps = [0.15, 0.12, 0.10, 0.08, 0.06, 0.04];

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    let sample = 0;

    for (let f = 0; f < freqs.length; f++) {
      // Sine oscillator with slow LFO vibrato
      const lfo = 1 + 0.003 * Math.sin(2 * Math.PI * 0.1 * t + f);
      sample += amps[f] * Math.sin(2 * Math.PI * freqs[f] * lfo * t);
    }

    // Slow volume envelope (fade in 3s, sustain, fade out 3s)
    const fadeIn = Math.min(t / 3, 1);
    const fadeOut = Math.min((durationSeconds - t) / 3, 1);
    sample *= fadeIn * fadeOut * 0.4;

    samples[i] = sample;
  }

  return samples;
}

async function main() {
  console.log("=== Generating Background Music ===\n");
  await ensureDir(PATHS.audio);

  // Generate ambient pad tracks for other videos
  const ambientTracks = [
    { name: "music-v1.wav", duration: 45 },
    { name: "music-v2.wav", duration: 42 },
    { name: "music-v3.wav", duration: 48 },
  ];

  for (const track of ambientTracks) {
    const trackSamples = generateAmbientPad(track.duration);
    writeWav(path.join(PATHS.audio, track.name), trackSamples, SAMPLE_RATE);
  }

  // Generate Tron Legacy-style track for trailer
  console.log("\n  Generating Tron Legacy-style trailer track...");
  const trailerSamples = generateTronTrack(38);
  writeWav(path.join(PATHS.audio, "music-trailer.wav"), trailerSamples, SAMPLE_RATE);

  console.log("\n=== Music generation complete ===");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
