import {
  uploadAudio,
  generateAvatarVideo,
  pollVideoStatus,
  downloadVideo,
} from "./utils/heygen-client.js";
import { PATHS, ensureDir, fileExists } from "./utils/file-helpers.js";
import path from "path";

// Avatar ID -- must be selected from HeyGen dashboard or API
// Run `GET /v2/avatars` to list available avatars and pick one
const AVATAR_ID = process.env.HEYGEN_AVATAR_ID || "SET_YOUR_AVATAR_ID";

// Set to true for free watermarked test renders
const TEST_MODE = process.env.HEYGEN_TEST === "true";

interface AvatarJob {
  name: string;
  audioFile: string;
  outputFile: string;
}

const AVATAR_JOBS: AvatarJob[] = [
  {
    name: "Video 1 - Sneak Diss (0:10-0:16)",
    audioFile: "v1-scene2-heygen.mp3",
    outputFile: "v1-sneak-diss.mp4",
  },
  {
    name: "Video 3 - Open (0:00-0:03)",
    audioFile: "v3-scene1-heygen.mp3",
    outputFile: "v3-open.mp4",
  },
  {
    name: "Video 3 - Return (0:24-0:34)",
    audioFile: "v3-scene4-heygen.mp3",
    outputFile: "v3-return.mp4",
  },
];

async function main() {
  console.log("=== Generating HeyGen Avatar Clips ===\n");

  if (AVATAR_ID === "SET_YOUR_AVATAR_ID") {
    console.error("ERROR: Set HEYGEN_AVATAR_ID environment variable.");
    console.log("To list available avatars, run:");
    console.log(
      '  curl -s -H "X-Api-Key: YOUR_KEY" https://api.heygen.com/v2/avatars | jq .data.avatars[:5]'
    );
    process.exit(1);
  }

  await ensureDir(PATHS.avatars);

  for (const job of AVATAR_JOBS) {
    console.log(`\n--- ${job.name} ---`);

    const outputPath = path.join(PATHS.avatars, job.outputFile);
    if (await fileExists(outputPath)) {
      console.log(`  Already exists: ${outputPath}, skipping.`);
      continue;
    }

    // 1. Upload audio
    const audioPath = path.join(PATHS.audio, job.audioFile);
    if (!(await fileExists(audioPath))) {
      console.error(`  Audio not found: ${audioPath}. Run generate-audio first.`);
      continue;
    }
    const audioAssetId = await uploadAudio(audioPath);

    // 2. Generate video
    const videoId = await generateAvatarVideo({
      audioAssetId,
      avatarId: AVATAR_ID,
      test: TEST_MODE,
    });

    // 3. Poll for completion
    const videoUrl = await pollVideoStatus(videoId);

    // 4. Download
    await downloadVideo(videoUrl, outputPath);
  }

  console.log("\n=== All avatar clips generated ===");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
