import React from "react";
import { Sequence, Audio, staticFile } from "remotion";
import {
  CounterOpenScene,
  BeforeStateScene,
  AfterStateScene,
  ResultsScene,
  CTAEndCardScene,
} from "../components/scenes";

export const Video2TheTransformation: React.FC = () => {
  return (
    <>
      {/* 0:00-0:03 Counter open */}
      <Sequence from={0} durationInFrames={90}>
        <CounterOpenScene />
      </Sequence>

      {/* 0:03-0:16 Before state */}
      <Sequence from={90} durationInFrames={390}>
        <BeforeStateScene />
      </Sequence>

      {/* 0:16-0:26 After state */}
      <Sequence from={480} durationInFrames={300}>
        <AfterStateScene />
      </Sequence>

      {/* 0:26-0:34 Results */}
      <Sequence from={780} durationInFrames={240}>
        <ResultsScene />
      </Sequence>

      {/* 0:34-0:42 CTA end card */}
      <Sequence from={1020} durationInFrames={240}>
        <CTAEndCardScene />
      </Sequence>

      {/* Full voiceover audio track */}
      <Audio src={staticFile("audio/v2-mixed.wav")} />
    </>
  );
};
