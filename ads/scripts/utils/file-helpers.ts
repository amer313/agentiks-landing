import fs from "fs/promises";
import { readFileSync, existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ADS_ROOT = path.resolve(__dirname, "../..");

export const PATHS = {
  root: ADS_ROOT,
  public: path.join(ADS_ROOT, "public"),
  audio: path.join(ADS_ROOT, "public/audio"),
  avatars: path.join(ADS_ROOT, "public/avatars"),
  output: path.join(ADS_ROOT, "public/output"),
} as const;

export async function ensureDir(dirPath: string): Promise<void> {
  await fs.mkdir(dirPath, { recursive: true });
}

export async function writeBuffer(filePath: string, buffer: Buffer): Promise<void> {
  await ensureDir(path.dirname(filePath));
  await fs.writeFile(filePath, buffer);
  console.log(`  Written: ${filePath} (${(buffer.length / 1024).toFixed(1)} KB)`);
}

export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export function loadEnv(): { ELEVENLABS_API_KEY: string; HEYGEN_API_KEY: string } {
  // Load from ads/.env.local
  const envPath = path.join(ADS_ROOT, ".env.local");

  if (!existsSync(envPath)) {
    // Fall back to process.env
    const elevenLabsKey = process.env.ELEVENLABS_API_KEY;
    const heygenKey = process.env.HEYGEN_API_KEY;
    if (!elevenLabsKey) throw new Error("Missing ELEVENLABS_API_KEY (set in ads/.env.local or environment)");
    if (!heygenKey) throw new Error("Missing HEYGEN_API_KEY (set in ads/.env.local or environment)");
    return { ELEVENLABS_API_KEY: elevenLabsKey, HEYGEN_API_KEY: heygenKey };
  }

  // Simple .env parser (no dotenv dependency needed)
  const content = readFileSync(envPath, "utf-8");
  const vars: Record<string, string> = {};
  for (const line of content.split("\n")) {
    const match = line.match(/^([A-Z_]+)=(.*)$/);
    if (match) vars[match[1]] = match[2].trim().replace(/^["']|["']$/g, "");
  }
  if (!vars.ELEVENLABS_API_KEY) throw new Error("Missing ELEVENLABS_API_KEY in ads/.env.local");
  if (!vars.HEYGEN_API_KEY) throw new Error("Missing HEYGEN_API_KEY in ads/.env.local");
  return vars as { ELEVENLABS_API_KEY: string; HEYGEN_API_KEY: string };
}
