import React from "react";
import { Sequence, Audio, staticFile } from "remotion";
import { PhraseTimeline } from "../components/sync/PhraseTimeline";
import { CounterOpenScene, CTAEndCardScene } from "../components/scenes";
import { V2_PHRASE_CONFIGS } from "../timing/v2-phrases";

// Scene durations from original composition (30fps):
// Scene 1: 16.115s = 484fr, Scene 2: 23.824s = 715fr
// Scene 3: 16.625s = 499fr, Scene 4: 8.452s = 254fr
// Total: ~68s = 2042 frames

/**
 * Video 2 -- "The Transformation"
 *
 * Structure:
 *  - 0:00-0:03  Counter open (3s silence leader)
 *  - 0:03-end   PhraseTimeline drives all visuals synced to VO
 *  - Final ~8s   CTA end card overlaid
 *  - Single <Audio> plays the full mixed voiceover track
 */
export const Video2TheTransformation: React.FC = () => {
  const INTRO_SILENCE_FRAMES = 90;
  const SCENE1_FRAMES = 484;
  const SCENE2_FRAMES = 715;
  const SCENE3_FRAMES = 499;
  const SCENE4_FRAMES = 254;
  const VO_START = INTRO_SILENCE_FRAMES;
  const VO_TOTAL = SCENE1_FRAMES + SCENE2_FRAMES + SCENE3_FRAMES + SCENE4_FRAMES;
  const CTA_START = VO_START + SCENE1_FRAMES + SCENE2_FRAMES + SCENE3_FRAMES;

  const placeholderTimings = buildPlaceholderTimings(
    V2_PHRASE_CONFIGS.map((c) => c.phrase),
    VO_TOTAL,
    VO_START
  );

  return (
    <>
      {/* 0:00-0:03  Counter open (over 3s silence leader) */}
      <Sequence from={0} durationInFrames={INTRO_SILENCE_FRAMES}>
        <CounterOpenScene />
      </Sequence>

      {/* 0:03-end  Phrase-synced visuals for all VO */}
      <Sequence from={VO_START} durationInFrames={VO_TOTAL}>
        <PhraseTimeline
          phraseTimings={placeholderTimings}
          phraseConfigs={V2_PHRASE_CONFIGS}
          backgroundGlow={{ brand: true, cyan: false }}
        />
      </Sequence>

      {/* CTA end card overlay during scene 4 */}
      <Sequence from={CTA_START} durationInFrames={SCENE4_FRAMES}>
        <CTAEndCardScene />
      </Sequence>

      {/* Full voiceover audio track */}
      <Audio src={staticFile("audio/v2-mixed.wav")} />
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
