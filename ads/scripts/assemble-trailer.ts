import { exportForMeta } from "./utils/ffmpeg.js";
import { PATHS, ensureDir } from "./utils/file-helpers.js";
import path from "path";

const TRAILERS = [
  {
    id: "trailer-16x9",
    rawFile: "trailer-16x9-raw.mp4",
    width: 1920,
    height: 1080,
  },
  {
    id: "trailer-9x16",
    rawFile: "trailer-9x16-raw.mp4",
    width: 1080,
    height: 1920,
  },
];

async function main() {
  console.log("=== Assembling Trailer Finals ===\n");
  await ensureDir(PATHS.output);

  for (const trailer of TRAILERS) {
    const rawPath = path.join(PATHS.output, trailer.rawFile);
    const finalPath = path.join(PATHS.output, `${trailer.id}-final.mp4`);

    console.log(`\nExporting Meta-optimized: ${trailer.id}`);
    exportForMeta(rawPath, finalPath, {
      width: trailer.width,
      height: trailer.height,
    });
  }

  console.log("\n=== Trailer assembly complete ===");
  console.log("\nFinal outputs in:", PATHS.output);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
