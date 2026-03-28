import React from "react";
import { Sequence, Audio, staticFile } from "remotion";
import {
  TextSlamScene,
  ProblemMontageScene,
  AvatarScene,
  AgentiksIntroScene,
  ProofScene,
  CTAEndCardScene,
} from "../components/scenes";

export const Video1TheProblem: React.FC = () => {
  return (
    <>
      {/* 0:00-0:03 Text slam */}
      <Sequence from={0} durationInFrames={90}>
        <TextSlamScene text="Your team is drowning." glitchColor="#06B6D4" />
      </Sequence>

      {/* 0:03-0:10 Problem montage + VO */}
      <Sequence from={90} durationInFrames={210}>
        <ProblemMontageScene />
      </Sequence>

      {/* 0:10-0:16 HeyGen avatar */}
      <Sequence from={300} durationInFrames={180}>
        <AvatarScene avatarSrc="avatars/v1-sneak-diss.mp4" durationFrames={180} />
      </Sequence>

      {/* 0:16-0:28 Agentiks intro */}
      <Sequence from={480} durationInFrames={360}>
        <AgentiksIntroScene />
      </Sequence>

      {/* 0:28-0:38 Proof */}
      <Sequence from={840} durationInFrames={300}>
        <ProofScene />
      </Sequence>

      {/* 0:38-0:45 CTA end card */}
      <Sequence from={1140} durationInFrames={210}>
        <CTAEndCardScene />
      </Sequence>

      {/* Full voiceover audio track */}
      <Audio src={staticFile("audio/v1-mixed.wav")} />
    </>
  );
};
