import { generateSpeechWithTimestamps } from "./utils/elevenlabs-client.js";
import { VO_SCRIPTS, DEFAULT_VOICE_SETTINGS, FPS } from "../src/brand.js";
import { PATHS, ensureDir } from "./utils/file-helpers.js";
import { checkFfmpeg, getAudioDuration } from "./utils/ffmpeg.js";
import path from "path";
import { execSync } from "child_process";
import { writeFileSync, unlinkSync } from "fs";

import type { SentenceConfig, VideoSentences } from "../src/brand.js";
import type { SentenceTimingEntry, VideoTimingData } from "../src/types.js";

/**
 * Per-sentence audio generation pipeline.
 *
 * For each sentence in each video:
 *  1. Generate individual MP3 via ElevenLabs (skip text-only sentences)
 *  2. Probe each MP3 for its actual duration
 *  3. Build a timing JSON with { key, visual, startFrame, durationFrames, audioFile }
 *  4. Concatenate all sentence audio into a mixed WAV (with silence leader if needed)
 *
 * Output:
 *  - public/audio/{key}.mp3         (per-sentence audio)
 *  - public/audio/v{N}-timing.json  (per-video timing data)
 *  - public/audio/v{N}-mixed.wav    (concatenated full-video audio)
 */

const SILENCE_DURATION_SECONDS = 3; // 3s silence leader for V1/V2

/** Generate a silence WAV file */
function generateSilenceWav(outputPath: string, durationSeconds: number): void {
  execSync(
    `ffmpeg -y -f lavfi -i anullsrc=r=44100:cl=mono -t ${durationSeconds} "${outputPath}"`,
    { stdio: "pipe" }
  );
  console.log(`  Generated silence: ${outputPath} (${durationSeconds}s)`);
}

/** Convert MP3 to WAV for concatenation */
function mp3ToWav(mp3Path: string, wavPath: string): void {
  execSync(
    `ffmpeg -y -i "${mp3Path}" -ar 44100 -ac 1 "${wavPath}"`,
    { stdio: "pipe" }
  );
}

/** Concatenate WAV files into a single mixed WAV */
function concatenateToMixedWav(
  wavParts: string[],
  outputPath: string
): void {
  const listContent = wavParts.map((p) => `file '${p}'`).join("\n");
  const listPath = outputPath.replace(/\.wav$/, "-list.txt");
  writeFileSync(listPath, listContent);

  execSync(
    `ffmpeg -y -f concat -safe 0 -i "${listPath}" -c copy "${outputPath}"`,
    { stdio: "pipe" }
  );

  // Clean up
  unlinkSync(listPath);
  for (const tmpPath of wavParts) {
    try { unlinkSync(tmpPath); } catch { /* ignore */ }
  }

  console.log(`  Mixed WAV: ${outputPath}`);
}

interface VideoConfig {
  label: string;
  videoId: string;
  prefix: string;
  config: VideoSentences;
}

async function main() {
  console.log("=== Generating Per-Sentence Voiceover Audio ===\n");

  if (!checkFfmpeg()) {
    console.error("ERROR: FFmpeg is required for audio processing.");
    console.error("Install: brew install ffmpeg (macOS) or apt-get install ffmpeg (Linux)");
    process.exit(1);
  }

  await ensureDir(PATHS.audio);

  const videoConfigs: VideoConfig[] = [
    { label: "Video 1: The Problem", videoId: "video1", prefix: "v1", config: VO_SCRIPTS.video1 },
    { label: "Video 2: The Transformation", videoId: "video2", prefix: "v2", config: VO_SCRIPTS.video2 },
    { label: "Video 3: The Edge", videoId: "video3", prefix: "v3", config: VO_SCRIPTS.video3 },
  ];

  for (const vc of videoConfigs) {
    console.log(`\n--- ${vc.label} ---`);
    const sentences = vc.config.sentences;
    const timingEntries: SentenceTimingEntry[] = [];
    const audioPaths: { key: string; mp3Path: string }[] = [];

    // Step 1: Generate audio for each sentence with text
    for (const sentence of sentences) {
      if (sentence.text === null) {
        console.log(`  [${sentence.key}] Text-only visual (no audio) -- ${sentence.fixedDurationFrames} frames`);
        continue;
      }

      const mp3Path = path.join(PATHS.audio, `${sentence.key}.mp3`);
      const timingPath = path.join(PATHS.audio, `${sentence.key}-timing.json`);

      await generateSpeechWithTimestamps(
        sentence.text,
        mp3Path,
        timingPath,
        vc.videoId,
        sentence.key,
        DEFAULT_VOICE_SETTINGS,
      );

      audioPaths.push({ key: sentence.key, mp3Path });
    }

    // Step 2: Probe each audio file for duration and build timing
    let currentFrame = 0;

    // If silence leader, it occupies the first 3s = 90 frames
    // BUT the first sentence (text-only) already uses those 90 frames
    // So the silence leader IS the text-only sentence's duration

    for (const sentence of sentences) {
      if (sentence.text === null) {
        // Text-only: fixed duration
        const frames = sentence.fixedDurationFrames || 90;
        timingEntries.push({
          key: sentence.key,
          visual: sentence.visual,
          startFrame: currentFrame,
          durationFrames: frames,
          audioFile: null,
          displayText: sentence.displayText,
        });
        currentFrame += frames;
      } else {
        // Audio sentence: probe for actual duration
        const mp3Path = path.join(PATHS.audio, `${sentence.key}.mp3`);
        const durationSeconds = getAudioDuration(mp3Path);
        const durationFrames = Math.ceil(durationSeconds * FPS);

        timingEntries.push({
          key: sentence.key,
          visual: sentence.visual,
          startFrame: currentFrame,
          durationFrames,
          audioFile: `${sentence.key}.mp3`,
        });

        console.log(`  [${sentence.key}] ${durationSeconds.toFixed(2)}s = ${durationFrames} frames (starts at frame ${currentFrame})`);
        currentFrame += durationFrames;
      }
    }

    const totalFrames = currentFrame;

    // Step 3: Write timing JSON
    const timingData: VideoTimingData = {
      videoId: vc.videoId,
      fps: FPS,
      totalDurationFrames: totalFrames,
      sentences: timingEntries,
    };

    const timingJsonPath = path.join(PATHS.audio, `${vc.prefix}-timing.json`);
    writeFileSync(timingJsonPath, JSON.stringify(timingData, null, 2));
    console.log(`  Timing JSON: ${timingJsonPath} (${totalFrames} total frames, ${(totalFrames / FPS).toFixed(1)}s)`);

    // Step 4: Build mixed WAV
    // Convert each sentence MP3 to WAV, prepend silence if needed
    const wavParts: string[] = [];
    const tempDir = PATHS.audio;

    if (vc.config.addSilenceLeader) {
      const silencePath = path.join(tempDir, `_temp_${vc.prefix}_silence.wav`);
      generateSilenceWav(silencePath, SILENCE_DURATION_SECONDS);
      wavParts.push(silencePath);
    }

    for (const ap of audioPaths) {
      const tempWav = path.join(tempDir, `_temp_${ap.key}.wav`);
      mp3ToWav(ap.mp3Path, tempWav);
      wavParts.push(tempWav);
    }

    const mixedPath = path.join(PATHS.audio, `${vc.prefix}-mixed.wav`);
    console.log(`\n  Concatenating ${wavParts.length} parts into ${vc.prefix}-mixed.wav...`);
    concatenateToMixedWav(wavParts, mixedPath);
  }

  console.log("\n=== All per-sentence audio generated ===");
  console.log("Timing JSONs: v1-timing.json, v2-timing.json, v3-timing.json");
  console.log("Mixed WAVs: v1-mixed.wav, v2-mixed.wav, v3-mixed.wav");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
