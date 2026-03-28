import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import { checkFfmpeg } from "./utils/ffmpeg.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ADS_ROOT = path.resolve(__dirname, "..");
const SCRIPTS_DIR = __dirname;

function run(scriptName: string, description: string): void {
  console.log(`\n${"=".repeat(60)}`);
  console.log(`STEP: ${description}`);
  console.log(`${"=".repeat(60)}\n`);

  execSync(`npx tsx "${path.join(SCRIPTS_DIR, scriptName)}"`, {
    cwd: ADS_ROOT,
    stdio: "inherit",
    env: { ...process.env },
    timeout: 1200_000, // 20 minute timeout per step
  });
}

async function main() {
  const startTime = Date.now();
  console.log("=== AGENTIKS AD PRODUCTION PIPELINE ===\n");
  console.log(`Started at: ${new Date().toISOString()}`);

  // Preflight: check FFmpeg availability
  if (!checkFfmpeg()) {
    console.error("ERROR: FFmpeg is not available on this system.");
    console.error("Install FFmpeg: brew install ffmpeg (macOS) or apt-get install ffmpeg (Linux)");
    process.exit(1);
  }
  console.log("FFmpeg: OK");

  const skipTo = process.argv[2]; // Allow skipping to a step: e.g. "avatars"
  const steps = [
    { name: "audio", script: "generate-audio.ts", desc: "Generate ElevenLabs voiceover" },
    { name: "music", script: "generate-music.ts", desc: "Generate background music" },
    { name: "convert", script: "convert-wav-to-mp3.ts", desc: "Convert audio for HeyGen" },
    { name: "avatars", script: "generate-avatars.ts", desc: "Generate HeyGen avatar clips" },
    { name: "render-video", script: "render-videos.ts", desc: "Render Remotion video compositions" },
    { name: "render-stills", script: "render-stills.ts", desc: "Render Remotion still compositions" },
    { name: "assemble", script: "assemble-final.ts", desc: "FFmpeg assembly + Meta export" },
  ];

  let skipping = !!skipTo;
  for (const step of steps) {
    if (skipping) {
      if (step.name === skipTo) {
        skipping = false;
      } else {
        console.log(`\nSkipping: ${step.desc}`);
        continue;
      }
    }
    run(step.script, step.desc);
  }

  const elapsed = ((Date.now() - startTime) / 1000 / 60).toFixed(1);
  console.log(`\n${"=".repeat(60)}`);
  console.log(`PIPELINE COMPLETE in ${elapsed} minutes`);
  console.log(`${"=".repeat(60)}`);
  console.log(`\nOutputs in: ${path.join(ADS_ROOT, "public/output")}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
