import React from "react";
import { AbsoluteFill, Sequence, Audio, staticFile } from "remotion";
import { DarkBackground } from "../components/backgrounds/DarkBackground";
import { SentenceVisual } from "../components/sync/SentenceVisual";

import type { VideoTimingData } from "../types";

// Timing data from audio pipeline. Fallback for development.
let timingData: VideoTimingData;
try {
  timingData = require("../../public/audio/v3-timing.json");
} catch {
  timingData = {
    videoId: "video3",
    fps: 30,
    totalDurationFrames: 1050,
    sentences: [
      { key: "v3-s1", visual: "ModelDrop", startFrame: 0, durationFrames: 150, audioFile: "v3-s1.mp3" },
      { key: "v3-s2", visual: "NewModelsWeekly", startFrame: 150, durationFrames: 130, audioFile: "v3-s2.mp3" },
      { key: "v3-s3", visual: "ThatsOurJob", startFrame: 280, durationFrames: 50, audioFile: "v3-s3.mp3" },
      { key: "v3-s4", visual: "TrackBreakthroughs", startFrame: 330, durationFrames: 130, audioFile: "v3-s4.mp3" },
      { key: "v3-s5", visual: "BuildAndDisappear", startFrame: 460, durationFrames: 150, audioFile: "v3-s5.mp3" },
      { key: "v3-s6", visual: "Untouchable", startFrame: 610, durationFrames: 130, audioFile: "v3-s6.mp3" },
      { key: "v3-s7", visual: "CatchUpCost", startFrame: 740, durationFrames: 80, audioFile: "v3-s7.mp3" },
      { key: "v3-s8", visual: "CTAEndCard", startFrame: 820, durationFrames: 130, audioFile: "v3-s8.mp3" },
    ],
  };
}

/**
 * Video 3 -- "The Edge"
 *
 * Per-sentence architecture. No silence leader -- audio starts immediately.
 */
export const Video3TheEdge: React.FC = () => {
  return (
    <AbsoluteFill>
      <DarkBackground showBrandGlow showCyanGlow />

      <Audio src={staticFile("audio/v3-mixed.wav")} />

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
