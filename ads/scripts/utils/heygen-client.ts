import { loadEnv } from "./file-helpers.js";
import fs from "fs/promises";
import path from "path";

const HEYGEN_BASE = "https://api.heygen.com";
const UPLOAD_BASE = "https://upload.heygen.com";

function getApiKey(): string {
  return loadEnv().HEYGEN_API_KEY;
}

function headers(): Record<string, string> {
  return {
    "X-Api-Key": getApiKey(),
    "Content-Type": "application/json",
  };
}

/** Upload an MP3 file to HeyGen and get an asset ID */
export async function uploadAudio(mp3Path: string): Promise<string> {
  const buffer = await fs.readFile(mp3Path);

  console.log(`  Uploading audio: ${mp3Path}`);
  const res = await fetch(`${UPLOAD_BASE}/v1/asset`, {
    method: "POST",
    headers: {
      "X-Api-Key": getApiKey(),
      "Content-Type": "audio/mpeg",
    },
    body: buffer,
  });

  if (!res.ok) throw new Error(`HeyGen upload failed: ${res.status} ${await res.text()}`);
  const data = (await res.json()) as { data: { id: string } };
  console.log(`  Uploaded asset ID: ${data.data.id}`);
  return data.data.id;
}

/** Generate an avatar video with audio */
export async function generateAvatarVideo(opts: {
  audioAssetId: string;
  avatarId: string;
  test?: boolean;
}): Promise<string> {
  console.log(`  Generating avatar video (avatar: ${opts.avatarId})...`);

  const res = await fetch(`${HEYGEN_BASE}/v2/video/generate`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      test: opts.test ?? false,
      video_inputs: [
        {
          character: {
            type: "avatar",
            avatar_id: opts.avatarId,
            avatar_style: "normal",
          },
          voice: {
            type: "audio",
            audio_asset_id: opts.audioAssetId,
          },
          background: {
            type: "color",
            value: "#0A0B10",
          },
        },
      ],
      dimension: {
        width: 1080,
        height: 1920,
      },
    }),
  });

  if (!res.ok) throw new Error(`HeyGen generate failed: ${res.status} ${await res.text()}`);
  const data = (await res.json()) as { data: { video_id: string } };
  console.log(`  Video generation started: ${data.data.video_id}`);
  return data.data.video_id;
}

/** Poll for video completion and return download URL */
export async function pollVideoStatus(videoId: string, maxWaitMs = 600_000): Promise<string> {
  const start = Date.now();
  console.log(`  Polling video ${videoId}...`);

  while (Date.now() - start < maxWaitMs) {
    const res = await fetch(`${HEYGEN_BASE}/v1/video_status.get?video_id=${videoId}`, {
      headers: { "X-Api-Key": getApiKey() },
    });

    if (!res.ok) throw new Error(`HeyGen status failed: ${res.status}`);
    const data = (await res.json()) as {
      data: { status: string; video_url?: string; error?: string };
    };

    if (data.data.status === "completed" && data.data.video_url) {
      console.log(`  Video ready: ${data.data.video_url}`);
      return data.data.video_url;
    }

    if (data.data.status === "failed") {
      throw new Error(`HeyGen video failed: ${data.data.error}`);
    }

    console.log(`  Status: ${data.data.status}, waiting 10s...`);
    await new Promise((r) => setTimeout(r, 10_000));
  }

  throw new Error(`HeyGen video timed out after ${maxWaitMs / 1000}s`);
}

/** Download a video from URL to local path */
export async function downloadVideo(url: string, outputPath: string): Promise<void> {
  await fs.mkdir(path.dirname(outputPath), { recursive: true });

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed: ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(outputPath, buffer);
  console.log(`  Downloaded: ${outputPath} (${(buffer.length / 1024 / 1024).toFixed(1)} MB)`);
}
