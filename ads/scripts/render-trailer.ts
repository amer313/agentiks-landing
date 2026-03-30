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

const TRAILER_JOBS: RenderJob[] = [
  {
    compositionId: "agentiks-trailer-16x9",
    outputFile: "trailer-16x9-raw.mp4",
  },
  {
    compositionId: "agentiks-trailer-9x16",
    outputFile: "trailer-9x16-raw.mp4",
  },
];

async function main() {
  console.log("=== Rendering Trailer ===\n");
  await ensureDir(PATHS.output);

  for (const job of TRAILER_JOBS) {
    const outputPath = path.join(PATHS.output, job.outputFile);
    console.log(`\nRendering: ${job.compositionId} -> ${job.outputFile}`);

    execSync(
      `npx remotion render ${job.compositionId} "${outputPath}" ` +
        `--codec h264 --crf 18 --log warn`,
      {
        cwd: ADS_ROOT,
        stdio: "inherit",
        timeout: 600_000,
      }
    );

    console.log(`  Rendered: ${outputPath}`);
  }

  console.log("\n=== Trailer rendering complete ===");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
