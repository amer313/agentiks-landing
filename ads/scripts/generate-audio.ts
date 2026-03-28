import { generateSpeech } from "./utils/elevenlabs-client.js";
import { VO_SCRIPTS } from "../src/brand.js";
import { PATHS, ensureDir } from "./utils/file-helpers.js";
import path from "path";

async function main() {
  console.log("=== Generating Voiceover Audio ===\n");
  await ensureDir(PATHS.audio);

  // Video 1 scenes
  const v1Scenes = Object.entries(VO_SCRIPTS.video1);
  for (const [key, text] of v1Scenes) {
    const outPath = path.join(PATHS.audio, `v1-${key}.mp3`);
    await generateSpeech(text, outPath);
  }

  // Video 2 scenes
  const v2Scenes = Object.entries(VO_SCRIPTS.video2);
  for (const [key, text] of v2Scenes) {
    const outPath = path.join(PATHS.audio, `v2-${key}.mp3`);
    await generateSpeech(text, outPath);
  }

  // Video 3 scenes
  const v3Scenes = Object.entries(VO_SCRIPTS.video3);
  for (const [key, text] of v3Scenes) {
    const outPath = path.join(PATHS.audio, `v3-${key}.mp3`);
    await generateSpeech(text, outPath);
  }

  console.log("\n=== All VO tracks generated ===");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
