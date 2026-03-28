/**
 * useWordTiming.ts
 *
 * React hook for Remotion compositions that reads timing JSON
 * and returns the current phrase/word state for the current frame.
 */

import { useCurrentFrame } from "remotion";
import { useMemo } from "react";
import type { PhraseTiming, PhraseVisualConfig } from "../../types";
import { frameToSeconds } from "../../timing/timing-utils";

export interface PhraseState {
  /** Index of the currently active phrase, or -1 if between phrases */
  activePhraseIndex: number;
  /** The currently active phrase timing, or null */
  activePhrase: PhraseTiming | null;
  /** Progress through the current phrase (0-1) */
  progress: number;
  /** The visual component config for the active phrase, or null */
  activeConfig: PhraseVisualConfig | null;
  /** Current time in seconds */
  currentTimeSeconds: number;
  /** Current frame number */
  currentFrame: number;
}

/**
 * Hook that determines which phrase is active at the current frame.
 *
 * @param phraseTimings - Array of matched phrase timings (from timing JSON)
 * @param phraseConfigs - Array of phrase-to-visual mappings
 * @param frameOffset - Frame offset if this is inside a <Sequence> (default 0)
 */
export function useWordTiming(
  phraseTimings: PhraseTiming[],
  phraseConfigs: PhraseVisualConfig[],
  frameOffset: number = 0
): PhraseState {
  const frame = useCurrentFrame();
  const absoluteFrame = frame + frameOffset;
  const currentTimeSeconds = frameToSeconds(absoluteFrame);

  // Build a lookup from phrase text to config (memoized)
  const configMap = useMemo(() => {
    const map = new Map<string, PhraseVisualConfig>();
    for (const config of phraseConfigs) {
      map.set(config.phrase, config);
    }
    return map;
  }, [phraseConfigs]);

  // Find which phrase is active at the current frame
  let activePhraseIndex = -1;
  let activePhrase: PhraseTiming | null = null;
  let progress = 0;

  for (let i = 0; i < phraseTimings.length; i++) {
    const pt = phraseTimings[i];
    if (pt.durationFrames === 0) continue; // Skip unmatched phrases

    if (absoluteFrame >= pt.startFrame && absoluteFrame <= pt.endFrame) {
      activePhraseIndex = i;
      activePhrase = pt;
      progress = pt.durationFrames > 0
        ? Math.min(1, Math.max(0, (absoluteFrame - pt.startFrame) / pt.durationFrames))
        : 0;
      break;
    }
  }

  const activeConfig = activePhrase
    ? configMap.get(activePhrase.phrase) ?? null
    : null;

  return {
    activePhraseIndex,
    activePhrase,
    progress,
    activeConfig,
    currentTimeSeconds,
    currentFrame: absoluteFrame,
  };
}
