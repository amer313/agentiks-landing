import React from "react";
import { Sequence, Audio, staticFile } from "remotion";
import {
  AvatarScene,
  HeadlineCascadeScene,
  ValuePropsScene,
  StakesScene,
  CTAEndCardScene,
} from "../components/scenes";

export const Video3TheEdge: React.FC = () => {
  return (
    <>
      {/* 0:00-0:03 Avatar open */}
      <Sequence from={0} durationInFrames={90}>
        <AvatarScene avatarSrc="avatars/v3-open.mp4" durationFrames={90} />
      </Sequence>

      {/* 0:03-0:12 Headline cascade */}
      <Sequence from={90} durationInFrames={270}>
        <HeadlineCascadeScene />
      </Sequence>

      {/* 0:12-0:24 Value props */}
      <Sequence from={360} durationInFrames={360}>
        <ValuePropsScene />
      </Sequence>

      {/* 0:24-0:34 Avatar return */}
      <Sequence from={720} durationInFrames={300}>
        <AvatarScene avatarSrc="avatars/v3-return.mp4" durationFrames={300} />
      </Sequence>

      {/* 0:34-0:42 Stakes */}
      <Sequence from={1020} durationInFrames={240}>
        <StakesScene />
      </Sequence>

      {/* 0:42-0:48 CTA end card */}
      <Sequence from={1260} durationInFrames={180}>
        <CTAEndCardScene />
      </Sequence>

      {/* Full voiceover audio track */}
      <Audio src={staticFile("audio/v3-mixed.wav")} />
    </>
  );
};
