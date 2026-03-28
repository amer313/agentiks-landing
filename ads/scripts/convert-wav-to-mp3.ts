import { PATHS } from "./utils/file-helpers.js";
import path from "path";
import { existsSync, copyFileSync } from "fs";

async function main() {
  console.log("=== Preparing Audio for HeyGen ===\n");

  // Only prepare the avatar VO segments that HeyGen needs
  const avatarSegments = [
    "v1-scene2", // Video 1 avatar scene (0:10-0:16) -- but see VO_SCRIPTS: no avatar in v1 with finalized scripts
    "v3-scene1", // Video 3 avatar open (0:00-0:03)
    "v3-scene4", // Video 3 avatar return (0:24-0:34)
  ];

  for (const segment of avatarSegments) {
    const mp3Path = path.join(PATHS.audio, `${segment}.mp3`);
    const heygenPath = path.join(PATHS.audio, `${segment}-heygen.mp3`);

    if (!existsSync(mp3Path)) {
      console.warn(`  Skipping ${segment}: source file not found at ${mp3Path}`);
      continue;
    }

    // ElevenLabs already outputs MP3, so just copy for HeyGen
    copyFileSync(mp3Path, heygenPath);
    console.log(`  Prepared: ${heygenPath}`);
  }

  console.log("\n=== Audio preparation complete ===");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
