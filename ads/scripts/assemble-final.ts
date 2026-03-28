import { exportForMeta } from "./utils/ffmpeg.js";
import { PATHS, ensureDir } from "./utils/file-helpers.js";
import path from "path";

const ASPECT_RATIOS = [
  { name: "9x16", width: 1080, height: 1920 }, // Stories/Reels
  { name: "4x5", width: 1080, height: 1350 }, // Feed
  { name: "1x1", width: 1080, height: 1080 }, // Square
];

async function main() {
  console.log("=== Assembling Final Outputs ===\n");
  await ensureDir(PATHS.output);

  const videos = [
    { id: "v1", rawFile: "v1-the-problem-raw.mp4" },
    { id: "v2", rawFile: "v2-the-transformation-raw.mp4" },
    { id: "v3", rawFile: "v3-the-edge-raw.mp4" },
  ];

  for (const video of videos) {
    console.log(`\n--- Assembling ${video.id} ---`);
    const rawPath = path.join(PATHS.output, video.rawFile);

    for (const ratio of ASPECT_RATIOS) {
      const outputPath = path.join(PATHS.output, `${video.id}-${ratio.name}-final.mp4`);
      exportForMeta(rawPath, outputPath, { width: ratio.width, height: ratio.height });
    }
  }

  console.log("\n=== Assembly complete ===");
  console.log("\nFinal outputs in:", PATHS.output);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
