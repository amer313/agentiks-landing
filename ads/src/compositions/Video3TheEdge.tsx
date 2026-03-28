import React from "react";
import { Sequence, Audio, staticFile } from "remotion";
import { PhraseTimeline } from "../components/sync/PhraseTimeline";
import { CTAEndCardScene } from "../components/scenes";
import { V3_PHRASE_CONFIGS } from "../timing/v3-phrases";

// Scene durations from original composition (30fps):
// Scene 1: 8.034s = 242fr, Scene 2: 11.749s = 353fr
// Scene 3: 15.279s = 459fr, Scene 4: 12.91s = 388fr
// Scene 5: 14.629s = 439fr, Scene 6: 4.598s = 138fr
// Total: ~67s = 2019 frames
// No silence leader -- V3 starts immediately

/**
 * Video 3 -- "The Edge"
 *
 * Structure:
 *  - 0:00-end   PhraseTimeline drives all visuals synced to VO
 *  - Final ~5s   CTA end card overlaid
 *  - Single <Audio> plays the full mixed voiceover track
 *
 * Unlike V1/V2, Video 3 has no silence leader. Audio starts immediately.
 */
export const Video3TheEdge: React.FC = () => {
  const SCENE1_FRAMES = 242;
  const SCENE2_FRAMES = 353;
  const SCENE3_FRAMES = 459;
  const SCENE4_FRAMES = 388;
  const SCENE5_FRAMES = 439;
  const SCENE6_FRAMES = 138;
  const TOTAL_FRAMES = SCENE1_FRAMES + SCENE2_FRAMES + SCENE3_FRAMES +
    SCENE4_FRAMES + SCENE5_FRAMES + SCENE6_FRAMES;
  const CTA_START = TOTAL_FRAMES - SCENE6_FRAMES;

  const placeholderTimings = buildPlaceholderTimings(
    V3_PHRASE_CONFIGS.map((c) => c.phrase),
    TOTAL_FRAMES,
    0
  );

  return (
    <>
      {/* Full-duration phrase-synced visuals */}
      <Sequence from={0} durationInFrames={TOTAL_FRAMES}>
        <PhraseTimeline
          phraseTimings={placeholderTimings}
          phraseConfigs={V3_PHRASE_CONFIGS}
          backgroundGlow={{ brand: true, cyan: true }}
        />
      </Sequence>

      {/* CTA end card overlay during scene 6 */}
      <Sequence from={CTA_START} durationInFrames={SCENE6_FRAMES}>
        <CTAEndCardScene />
      </Sequence>

      {/* Full voiceover audio track */}
      <Audio src={staticFile("audio/v3-mixed.wav")} />
    </>
  );
};

function buildPlaceholderTimings(
  phrases: string[],
  totalFrames: number,
  frameOffset: number
) {
  const perPhrase = Math.floor(totalFrames / phrases.length);
  return phrases.map((phrase, i) => ({
    phrase,
    startSeconds: (frameOffset + i * perPhrase) / 30,
    endSeconds: (frameOffset + (i + 1) * perPhrase) / 30,
    startFrame: i * perPhrase,
    endFrame: (i + 1) * perPhrase,
    durationFrames: perPhrase,
    wordTimings: [],
  }));
}
