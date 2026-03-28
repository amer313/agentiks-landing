import { staticFile } from "remotion";
import { loadFont } from "@remotion/fonts";
import { delayRender, continueRender } from "remotion";

let fontLoadHandle: ReturnType<typeof delayRender> | null = null;

export const FONT_FAMILY_SANS = "Geist Sans, -apple-system, system-ui, sans-serif";
export const FONT_FAMILY_MONO = "Geist Mono, SF Mono, ui-monospace, monospace";

export async function ensureFontsLoaded() {
  if (fontLoadHandle !== null) return;
  fontLoadHandle = delayRender("Loading Geist fonts");

  try {
    // Load Geist Sans from local public directory (correct filename: Geist-Variable.woff2)
    await loadFont({
      family: "Geist Sans",
      url: staticFile("fonts/Geist-Variable.woff2"),
      weight: "100 900",
    });

    // Load Geist Mono from local public directory (correct filename: GeistMono-Variable.woff2)
    await loadFont({
      family: "Geist Mono",
      url: staticFile("fonts/GeistMono-Variable.woff2"),
      weight: "100 900",
    });
  } catch (e) {
    console.warn("Font loading failed, falling back to system fonts:", e);
  }

  continueRender(fontLoadHandle);
}
