import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import { PATHS, ensureDir } from "./utils/file-helpers.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ADS_ROOT = path.resolve(__dirname, "..");

interface RenderJob {
  compositionId: string;
  outputFile: string;
}

const VIDEO_JOBS: RenderJob[] = [
  { compositionId: "video-1-the-problem", outputFile: "v1-the-problem-raw.mp4" },
  { compositionId: "video-2-the-transformation", outputFile: "v2-the-transformation-raw.mp4" },
  { compositionId: "video-3-the-edge", outputFile: "v3-the-edge-raw.mp4" },
];

async function main() {
  console.log("=== Rendering Videos ===\n");
  await ensureDir(PATHS.output);

  for (const job of VIDEO_JOBS) {
    const outputPath = path.join(PATHS.output, job.outputFile);
    console.log(`\nRendering: ${job.compositionId} -> ${job.outputFile}`);

    execSync(
      `npx remotion render ${job.compositionId} "${outputPath}" ` +
        `--codec h264 --crf 18 --log warn`,
      {
        cwd: ADS_ROOT,
        stdio: "inherit",
        timeout: 600_000, // 10 minute timeout per video
      }
    );

    console.log(`  Rendered: ${outputPath}`);
  }

  console.log("\n=== All videos rendered ===");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
