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

/** Generate dark ambient pad music */
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

  // Generate music tracks for each video duration
  const tracks = [
    { name: "music-v1.wav", duration: 45 },
    { name: "music-v2.wav", duration: 42 },
    { name: "music-v3.wav", duration: 48 },
    { name: "music-trailer.wav", duration: 38 },
  ];

  for (const track of tracks) {
    const samples = generateAmbientPad(track.duration);
    writeWav(path.join(PATHS.audio, track.name), samples, SAMPLE_RATE);
  }

  console.log("\n=== Music generation complete ===");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
