import { generateSpeechWithTimestamps } from "./utils/elevenlabs-client.js";
import { VO_SCRIPTS, VIDEO_VOICE_SETTINGS } from "../src/brand.js";
import { PATHS, ensureDir } from "./utils/file-helpers.js";
import { checkFfmpeg, concatWavFiles } from "./utils/ffmpeg.js";
import path from "path";
import { execSync } from "child_process";
import { writeFileSync, unlinkSync } from "fs";

/**
 * Generate voiceover audio with word-level timestamps for all videos.
 *
 * For each scene in each video, this script:
 *  1. Calls ElevenLabs convertWithTimestamps to get audio + character alignment
 *  2. Saves the audio as MP3
 *  3. Saves the timing data as JSON (used by PhraseTimeline for visual sync)
 *  4. Concatenates scene audio into mixed WAV files with silence padding
 *
 * Output files:
 *  - public/audio/v{N}-{sceneKey}.mp3  (per-scene audio)
 *  - public/audio/v{N}-{sceneKey}-timing.json  (per-scene timing data)
 *  - public/audio/v{N}-mixed.wav  (concatenated full-video audio)
 */

const SILENCE_DURATION_SECONDS = 3; // 3s silence leader for V1/V2

/**
 * Generate a silence WAV file of the given duration.
 */
function generateSilenceWav(outputPath: string, durationSeconds: number): void {
  execSync(
    `ffmpeg -y -f lavfi -i anullsrc=r=44100:cl=mono -t ${durationSeconds} "${outputPath}"`,
    { stdio: "pipe" }
  );
  console.log(`  Generated silence: ${outputPath} (${durationSeconds}s)`);
}

/**
 * Convert MP3 to WAV for concatenation.
 */
function mp3ToWav(mp3Path: string, wavPath: string): void {
  execSync(
    `ffmpeg -y -i "${mp3Path}" -ar 44100 -ac 1 "${wavPath}"`,
    { stdio: "pipe" }
  );
}

/**
 * Concatenate audio files (silence + scenes) into a single mixed WAV.
 * Uses ffmpeg concat filter to handle mixed formats safely.
 */
function concatenateToMixedWav(
  sceneMp3Paths: string[],
  outputPath: string,
  addSilenceLeader: boolean
): void {
  const tempWavPaths: string[] = [];
  const tempDir = path.dirname(outputPath);

  // Convert each MP3 to WAV first for reliable concatenation
  for (let i = 0; i < sceneMp3Paths.length; i++) {
    const tempWav = path.join(tempDir, `_temp_scene_${i}.wav`);
    mp3ToWav(sceneMp3Paths[i], tempWav);
    tempWavPaths.push(tempWav);
  }

  // Build the list of files to concatenate
  const filesToConcat: string[] = [];

  if (addSilenceLeader) {
    const silencePath = path.join(tempDir, "_temp_silence.wav");
    generateSilenceWav(silencePath, SILENCE_DURATION_SECONDS);
    filesToConcat.push(silencePath);
  }

  filesToConcat.push(...tempWavPaths);

  // Use ffmpeg concat demuxer
  const listContent = filesToConcat.map((p) => `file '${p}'`).join("\n");
  const listPath = outputPath.replace(/\.wav$/, "-list.txt");
  writeFileSync(listPath, listContent);

  execSync(
    `ffmpeg -y -f concat -safe 0 -i "${listPath}" -c copy "${outputPath}"`,
    { stdio: "pipe" }
  );

  // Clean up temp files
  unlinkSync(listPath);
  for (const tmpPath of filesToConcat) {
    try { unlinkSync(tmpPath); } catch { /* ignore */ }
  }

  console.log(`  Mixed WAV: ${outputPath}`);
}

interface VideoConfig {
  label: string;
  prefix: string;
  scenes: Record<string, string>;
  voiceSettingsKey: string;
  addSilenceLeader: boolean;
}

async function main() {
  console.log("=== Generating Voiceover Audio with Timestamps ===\n");

  // Preflight: check FFmpeg availability (needed for concatenation)
  if (!checkFfmpeg()) {
    console.error("ERROR: FFmpeg is required for audio concatenation.");
    console.error("Install FFmpeg: brew install ffmpeg (macOS) or apt-get install ffmpeg (Linux)");
    process.exit(1);
  }

  await ensureDir(PATHS.audio);

  const videoConfigs: VideoConfig[] = [
    {
      label: "Video 1: The Problem",
      prefix: "v1",
      scenes: VO_SCRIPTS.video1,
      voiceSettingsKey: "video1",
      addSilenceLeader: true,
    },
    {
      label: "Video 2: The Transformation",
      prefix: "v2",
      scenes: VO_SCRIPTS.video2,
      voiceSettingsKey: "video2",
      addSilenceLeader: true,
    },
    {
      label: "Video 3: The Edge",
      prefix: "v3",
      scenes: VO_SCRIPTS.video3,
      voiceSettingsKey: "video3",
      addSilenceLeader: false, // V3 starts immediately
    },
  ];

  for (const config of videoConfigs) {
    console.log(`\n--- ${config.label} ---`);
    const sceneMp3Paths: string[] = [];
    const voiceSettings = VIDEO_VOICE_SETTINGS[config.voiceSettingsKey];
    const sceneEntries = Object.entries(config.scenes);

    for (const [key, text] of sceneEntries) {
      const audioPath = path.join(PATHS.audio, `${config.prefix}-${key}.mp3`);
      const timingPath = path.join(PATHS.audio, `${config.prefix}-${key}-timing.json`);
      await generateSpeechWithTimestamps(
        text,
        audioPath,
        timingPath,
        config.voiceSettingsKey,
        key,
        voiceSettings,
      );
      sceneMp3Paths.push(audioPath);
    }

    // Concatenate all scenes into a mixed WAV
    const mixedPath = path.join(PATHS.audio, `${config.prefix}-mixed.wav`);
    console.log(`\n  Concatenating ${sceneEntries.length} scenes into ${config.prefix}-mixed.wav...`);
    concatenateToMixedWav(sceneMp3Paths, mixedPath, config.addSilenceLeader);
  }

  console.log("\n=== All VO tracks, timing data, and mixed WAVs generated ===");
  console.log("Timing JSONs saved alongside audio files in public/audio/");
  console.log("Mixed WAVs ready for Remotion compositions: v1-mixed.wav, v2-mixed.wav, v3-mixed.wav");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
