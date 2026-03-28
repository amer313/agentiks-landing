import React from "react";
import { AbsoluteFill, Sequence, Audio, staticFile } from "remotion";
import { DarkBackground } from "../components/backgrounds/DarkBackground";
import { SentenceVisual } from "../components/sync/SentenceVisual";

import type { VideoTimingData } from "../types";

// Timing data from audio pipeline. Fallback for development.
let timingData: VideoTimingData;
try {
  timingData = require("../../public/audio/v2-timing.json");
} catch {
  timingData = {
    videoId: "video2",
    fps: 30,
    totalDurationFrames: 1050,
    sentences: [
      { key: "v2-s1", visual: "CounterOpen", startFrame: 0, durationFrames: 90, audioFile: null, displayText: "60%" },
      { key: "v2-s2", visual: "ThursdayBurnout", startFrame: 90, durationFrames: 150, audioFile: "v2-s2.mp3" },
      { key: "v2-s3", visual: "CostOfBusiness", startFrame: 240, durationFrames: 100, audioFile: "v2-s3.mp3" },
      { key: "v2-s4", visual: "AgentsReason", startFrame: 340, durationFrames: 130, audioFile: "v2-s4.mp3" },
      { key: "v2-s5", visual: "PerfectTeammate", startFrame: 470, durationFrames: 120, audioFile: "v2-s5.mp3" },
      { key: "v2-s6", visual: "WorkloadCounter", startFrame: 590, durationFrames: 100, audioFile: "v2-s6.mp3" },
      { key: "v2-s7", visual: "RevenueUpCostsDown", startFrame: 690, durationFrames: 120, audioFile: "v2-s7.mp3" },
      { key: "v2-s8", visual: "CTAEndCard", startFrame: 810, durationFrames: 140, audioFile: "v2-s8.mp3" },
    ],
  };
}

/**
 * Video 2 -- "The Transformation"
 *
 * Per-sentence architecture: each sentence = own Sequence = guaranteed sync.
 */
export const Video2TheTransformation: React.FC = () => {
  return (
    <AbsoluteFill>
      <DarkBackground showBrandGlow showCyanGlow />

      <Audio src={staticFile("audio/v2-mixed.wav")} />

      {timingData.sentences.map((sentence) => (
        <Sequence
          key={sentence.key}
          from={sentence.startFrame}
          durationInFrames={sentence.durationFrames}
        >
          <SentenceVisual
            visualName={sentence.visual}
            durationFrames={sentence.durationFrames}
            displayText={sentence.displayText}
          />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
