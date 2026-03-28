import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import { PATHS, ensureDir } from "./utils/file-helpers.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ADS_ROOT = path.resolve(__dirname, "..");

interface StillJob {
  compositionId: string;
  outputFile: string;
}

const STILL_JOBS: StillJob[] = [
  { compositionId: "still-4-orchestrator", outputFile: "v4-orchestrator.png" },
  { compositionId: "carousel-1", outputFile: "v5-carousel-1.png" },
  { compositionId: "carousel-2", outputFile: "v5-carousel-2.png" },
  { compositionId: "carousel-3", outputFile: "v5-carousel-3.png" },
  { compositionId: "carousel-4", outputFile: "v5-carousel-4.png" },
  { compositionId: "carousel-5", outputFile: "v5-carousel-5.png" },
];

async function main() {
  console.log("=== Rendering Stills ===\n");
  await ensureDir(PATHS.output);

  for (const job of STILL_JOBS) {
    const outputPath = path.join(PATHS.output, job.outputFile);
    console.log(`\nRendering: ${job.compositionId} -> ${job.outputFile}`);

    execSync(
      `npx remotion still ${job.compositionId} "${outputPath}" ` +
        `--scale=2 --log warn`,
      {
        cwd: ADS_ROOT,
        stdio: "inherit",
        timeout: 120_000, // 2 minute timeout per still
      }
    );

    console.log(`  Rendered: ${outputPath}`);
  }

  console.log("\n=== All stills rendered ===");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
