import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { loadEnv } from "./file-helpers.js";
import fs from "fs/promises";
import path from "path";

const DANIEL_VOICE_ID = "onwK4e9ZLuTAKqWW03F9";

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
  const audioStream = await c.textToSpeech.convert(DANIEL_VOICE_ID, {
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
  for await (const chunk of audioStream) {
    chunks.push(chunk);
  }

  const buffer = Buffer.concat(chunks);
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, buffer);
  console.log(`  Written: ${outputPath} (${(buffer.length / 1024).toFixed(1)} KB)`);
}
