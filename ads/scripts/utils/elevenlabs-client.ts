import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { loadEnv } from "./file-helpers.js";
import fs from "fs/promises";
import path from "path";

import type { TimingAlignment, VoiceSettings, TimingData } from "../../src/types.js";
import type { AudioWithTimestampsResponse } from "@elevenlabs/elevenlabs-js/api/types/AudioWithTimestampsResponse";

const VOICE_ID = "sB7vwSCyX0tQmU24cW2C";

/** Default voice settings for the ad voiceovers */
const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  stability: 0.38,
  similarityBoost: 0.75,
  style: 0.0,
  speed: 1.0,
};

let client: ElevenLabsClient | null = null;

function getClient(): ElevenLabsClient {
  if (!client) {
    const env = loadEnv();
    client = new ElevenLabsClient({ apiKey: env.ELEVENLABS_API_KEY });
  }
  return client;
}

export async function generateSpeech(text: string, outputPath: string): Promise<void> {
  const c = getClient();
  console.log(`  Generating speech: "${text.slice(0, 60)}..."`);

  // v2 SDK uses camelCase: modelId, similarityBoost
  const audioStream = await c.textToSpeech.convert(VOICE_ID, {
    text,
    modelId: "eleven_multilingual_v2",
    voiceSettings: {
      stability: 0.55,
      similarityBoost: 0.75,
      style: 0.25,
      speed: 0.92,
    },
  });

  // Collect stream into buffer
  const chunks: Uint8Array[] = [];
  const reader = (audioStream as ReadableStream<Uint8Array>).getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) chunks.push(value);
  }

  const buffer = Buffer.concat(chunks);
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, buffer);
  console.log(`  Written: ${outputPath} (${(buffer.length / 1024).toFixed(1)} KB)`);
}

/**
 * Generate speech with word-level timestamps using ElevenLabs convertWithTimestamps.
 * Returns both audio (as mp3 buffer) and timing alignment data.
 *
 * @param text - The voiceover text
 * @param audioOutputPath - Where to save the audio file (mp3)
 * @param timingOutputPath - Where to save the timing JSON
 * @param videoId - Video identifier (e.g., "video1")
 * @param sceneKey - Scene key (e.g., "scene1")
 * @param voiceSettings - Optional voice settings override
 */
export async function generateSpeechWithTimestamps(
  text: string,
  audioOutputPath: string,
  timingOutputPath: string,
  videoId: string,
  sceneKey: string,
  voiceSettings: VoiceSettings = DEFAULT_VOICE_SETTINGS,
): Promise<TimingData> {
  const c = getClient();
  console.log(`  Generating speech with timestamps: "${text.slice(0, 60)}..."`);

  const response: AudioWithTimestampsResponse = await c.textToSpeech.convertWithTimestamps(VOICE_ID, {
    text,
    modelId: "eleven_multilingual_v2",
    voiceSettings: {
      stability: voiceSettings.stability,
      similarityBoost: voiceSettings.similarityBoost,
      style: voiceSettings.style,
      speed: voiceSettings.speed,
    },
  });

  // Decode audio from base64 and write to file
  const audioBuffer = Buffer.from(response.audioBase64, "base64");
  await fs.mkdir(path.dirname(audioOutputPath), { recursive: true });
  await fs.writeFile(audioOutputPath, audioBuffer);
  console.log(`  Audio written: ${audioOutputPath} (${(audioBuffer.length / 1024).toFixed(1)} KB)`);

  // Build timing data from SDK response
  const sdkAlignment = response.alignment;
  if (!sdkAlignment) {
    throw new Error("No alignment data returned from ElevenLabs convertWithTimestamps");
  }

  const alignment: TimingAlignment = {
    characters: sdkAlignment.characters,
    characterStartTimesSeconds: sdkAlignment.characterStartTimesSeconds,
    characterEndTimesSeconds: sdkAlignment.characterEndTimesSeconds,
  };

  const lastEndTime = alignment.characterEndTimesSeconds.length > 0
    ? alignment.characterEndTimesSeconds[alignment.characterEndTimesSeconds.length - 1]
    : 0;

  const FPS = 30;
  const timingData: TimingData = {
    videoId,
    sceneKey,
    text,
    alignment,
    totalDurationSeconds: lastEndTime,
    totalDurationFrames: Math.round(lastEndTime * FPS),
  };

  // Write timing JSON
  await fs.mkdir(path.dirname(timingOutputPath), { recursive: true });
  await fs.writeFile(timingOutputPath, JSON.stringify(timingData, null, 2));
  console.log(`  Timing written: ${timingOutputPath}`);

  return timingData;
}
