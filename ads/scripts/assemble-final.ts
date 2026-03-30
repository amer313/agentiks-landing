import { exportForMeta, mixAudioWithMusic } from "./utils/ffmpeg.js";
import { PATHS, ensureDir } from "./utils/file-helpers.js";
import path from "path";
import { execSync } from "child_process";

const ASPECT_RATIOS = [
  { name: "9x16", width: 1080, height: 1920 }, // Stories/Reels
  { name: "4x5", width: 1080, height: 1350 }, // Feed
  { name: "1x1", width: 1080, height: 1080 }, // Square
];

async function main() {
  console.log("=== Assembling Final Outputs ===\n");
  await ensureDir(PATHS.output);

  const videos = [
    { id: "v1", rawFile: "v1-the-problem-raw.mp4", musicFile: "music-v1.wav" },
    { id: "v2", rawFile: "v2-the-transformation-raw.mp4", musicFile: "music-v2.wav" },
    { id: "v3", rawFile: "v3-the-edge-raw.mp4", musicFile: "music-v3.wav" },
  ];

  for (const video of videos) {
    console.log(`\n--- Assembling ${video.id} ---`);
    const rawPath = path.join(PATHS.output, video.rawFile);
    const musicPath = path.join(PATHS.audio, video.musicFile);
    const withMusicPath = path.join(PATHS.output, `${video.id}-with-music.mp4`);

    // Step 1: Mix background music into the raw render
    console.log(`  Mixing background music...`);
    execSync(
      `ffmpeg -y -i "${rawPath}" -i "${musicPath}" -filter_complex "` +
        `[1:a]volume=0.35,afade=t=in:d=1,afade=t=out:st=${getVideoDuration(rawPath) - 2}:d=2[music];` +
        `[0:a][music]amix=inputs=2:duration=first:dropout_transition=2[out]` +
        `" -map 0:v -map "[out]" -c:v copy -c:a aac -b:a 192k "${withMusicPath}"`,
      { stdio: "pipe" }
    );
    console.log(`  Music mixed: ${withMusicPath}`);

    // Step 2: Export in each aspect ratio from the music-mixed version
    for (const ratio of ASPECT_RATIOS) {
      const outputPath = path.join(PATHS.output, `${video.id}-${ratio.name}-final.mp4`);
      exportForMeta(withMusicPath, outputPath, { width: ratio.width, height: ratio.height });
    }
  }

  console.log("\n=== Assembly complete ===");
  console.log("\nFinal outputs in:", PATHS.output);
}

function getVideoDuration(filePath: string): number {
  const result = execSync(
    `ffprobe -v error -show_entries format=duration -of csv=p=0 "${filePath}"`,
    { encoding: "utf-8" }
  );
  return parseFloat(result.trim());
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
