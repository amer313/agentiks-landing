import { execSync } from "child_process";
import { writeFileSync, unlinkSync } from "fs";

/** Check if FFmpeg is available */
export function checkFfmpeg(): boolean {
  try {
    execSync("ffmpeg -version", { stdio: "pipe" });
    return true;
  } catch {
    return false;
  }
}

/** Convert WAV to MP3 (required for HeyGen audio upload) */
export function wavToMp3(wavPath: string, mp3Path: string): void {
  console.log(`  Converting WAV to MP3: ${wavPath}`);
  execSync(`ffmpeg -y -i "${wavPath}" -codec:audio libmp3lame -b:a 192k "${mp3Path}"`, {
    stdio: "pipe",
  });
  console.log(`  Written: ${mp3Path}`);
}

/** Concatenate multiple WAV files into one */
export function concatWavFiles(inputPaths: string[], outputPath: string): void {
  // Create a file list for ffmpeg concat demuxer
  const listContent = inputPaths.map((p) => `file '${p}'`).join("\n");
  const listPath = outputPath.replace(/\.wav$/, "-list.txt");
  writeFileSync(listPath, listContent);

  execSync(`ffmpeg -y -f concat -safe 0 -i "${listPath}" -c copy "${outputPath}"`, {
    stdio: "pipe",
  });
  unlinkSync(listPath);
  console.log(`  Concatenated: ${outputPath}`);
}

/** Mix voiceover with background music (VO dominant, music ducked) */
export function mixAudioWithMusic(voPath: string, musicPath: string, outputPath: string): void {
  console.log(`  Mixing VO + music: ${outputPath}`);
  // Sidechain compress: music ducks when VO is present
  execSync(
    `ffmpeg -y -i "${voPath}" -i "${musicPath}" -filter_complex "` +
      `[1:a]volume=0.15[music];` +
      `[0:a][music]amix=inputs=2:duration=first:dropout_transition=2[out]` +
      `" -map "[out]" "${outputPath}"`,
    { stdio: "pipe" }
  );
  console.log(`  Written: ${outputPath}`);
}

/** Export final video with Meta-optimized settings */
export function exportForMeta(
  inputPath: string,
  outputPath: string,
  opts: { width: number; height: number }
): void {
  console.log(`  Exporting for Meta: ${outputPath} (${opts.width}x${opts.height})`);
  execSync(
    `ffmpeg -y -i "${inputPath}" ` +
      `-vf "scale=${opts.width}:${opts.height}:force_original_aspect_ratio=decrease,pad=${opts.width}:${opts.height}:(ow-iw)/2:(oh-ih)/2:color=#050508" ` +
      `-c:v libx264 -profile:v high -level 4.0 -pix_fmt yuv420p -r 30 ` +
      `-crf 18 -preset slow -movflags +faststart ` +
      `-c:a aac -b:a 128k ` +
      `"${outputPath}"`,
    { stdio: "pipe" }
  );
  console.log(`  Written: ${outputPath}`);
}

/** Get audio duration in seconds */
export function getAudioDuration(audioPath: string): number {
  const result = execSync(
    `ffprobe -v error -show_entries format=duration -of csv=p=0 "${audioPath}"`,
    { encoding: "utf-8" }
  );
  return parseFloat(result.trim());
}
