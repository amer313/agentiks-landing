/**
 * PhraseTimeline.tsx
 *
 * The main visual-audio sync component. Given timing data and phrase-to-visual
 * mappings, it renders the correct visual component at the correct time,
 * passing progress (0-1) to each.
 *
 * Usage in a composition:
 *   <PhraseTimeline
 *     phraseTimings={timings}
 *     phraseConfigs={configs}
 *     frameOffset={sequenceStartFrame}
 *   />
 */

import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import type { PhraseTiming, PhraseVisualConfig } from "../../types";
import { useWordTiming } from "./useWordTiming";
import { DarkBackground } from "../backgrounds/DarkBackground";

interface PhraseTimelineProps {
  /** Matched phrase timings from the timing JSON */
  phraseTimings: PhraseTiming[];
  /** Mapping of phrases to visual components */
  phraseConfigs: PhraseVisualConfig[];
  /** Frame offset if embedded in a Sequence (default 0) */
  frameOffset?: number;
  /** Whether to render DarkBackground (default true) */
  showBackground?: boolean;
  /** Background glow settings */
  backgroundGlow?: { brand?: boolean; cyan?: boolean };
}

/**
 * Crossfade duration in frames between phrase transitions.
 */
const CROSSFADE_FRAMES = 6;

export const PhraseTimeline: React.FC<PhraseTimelineProps> = ({
  phraseTimings,
  phraseConfigs,
  frameOffset = 0,
  showBackground = true,
  backgroundGlow = { brand: true, cyan: false },
}) => {
  const frame = useCurrentFrame();
  const absoluteFrame = frame + frameOffset;

  const { activePhraseIndex, activePhrase, progress, activeConfig } =
    useWordTiming(phraseTimings, phraseConfigs, frameOffset);

  // Calculate crossfade opacity for smooth transitions
  let opacity = 1;
  if (activePhrase) {
    const framesIntoPhrase = absoluteFrame - activePhrase.startFrame;
    const framesUntilEnd = activePhrase.endFrame - absoluteFrame;

    // Fade in at start
    if (framesIntoPhrase < CROSSFADE_FRAMES) {
      opacity = interpolate(
        framesIntoPhrase,
        [0, CROSSFADE_FRAMES],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      );
    }

    // Fade out at end
    if (framesUntilEnd < CROSSFADE_FRAMES) {
      opacity = Math.min(
        opacity,
        interpolate(
          framesUntilEnd,
          [0, CROSSFADE_FRAMES],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        )
      );
    }
  }

  // Also check if the NEXT phrase is about to start and render it fading in
  // for smoother transitions
  let nextPhraseElement: React.ReactNode = null;
  if (activePhraseIndex >= 0 && activePhraseIndex < phraseTimings.length - 1) {
    const nextTiming = phraseTimings[activePhraseIndex + 1];
    if (nextTiming.durationFrames > 0) {
      const framesUntilNext = nextTiming.startFrame - absoluteFrame;
      if (framesUntilNext >= 0 && framesUntilNext < CROSSFADE_FRAMES) {
        const nextConfig = phraseConfigs.find((c) => c.phrase === nextTiming.phrase);
        if (nextConfig) {
          const nextOpacity = interpolate(
            framesUntilNext,
            [CROSSFADE_FRAMES, 0],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const NextComponent = nextConfig.component;
          const nextProgress = 0;
          nextPhraseElement = (
            <AbsoluteFill style={{ opacity: nextOpacity }}>
              <NextComponent
                progress={nextProgress}
                durationFrames={nextTiming.durationFrames}
              />
            </AbsoluteFill>
          );
        }
      }
    }
  }

  const ActiveComponent = activeConfig?.component;

  return (
    <AbsoluteFill>
      {showBackground && (
        <DarkBackground
          showBrandGlow={backgroundGlow.brand}
          showCyanGlow={backgroundGlow.cyan}
        />
      )}

      {/* Current phrase visual */}
      {ActiveComponent && activePhrase && (
        <AbsoluteFill style={{ opacity }}>
          <ActiveComponent
            progress={progress}
            durationFrames={activePhrase.durationFrames}
          />
        </AbsoluteFill>
      )}

      {/* Next phrase crossfading in */}
      {nextPhraseElement}
    </AbsoluteFill>
  );
};
