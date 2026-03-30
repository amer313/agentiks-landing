import React from "react";
import { AbsoluteFill, Sequence, Audio, staticFile } from "remotion";
import { SCENE_TIMING } from "../brand";
import { DarkBackground } from "../components/backgrounds/DarkBackground";
import {
  HookScene,
  ProblemMontage,
  LogoRevealScene,
  DashboardDemo,
  ImpactStats,
  EndCard,
} from "../components/scenes";

export const TrailerComposition: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Base dark background */}
      <DarkBackground showBrandGlow={false} />

      {/* Act 1: Hook */}
      <Sequence
        from={SCENE_TIMING.hook.from}
        durationInFrames={SCENE_TIMING.hook.duration}
      >
        <HookScene />
      </Sequence>

      {/* Act 2: Problem */}
      <Sequence
        from={SCENE_TIMING.problem.from}
        durationInFrames={SCENE_TIMING.problem.duration}
      >
        <ProblemMontage />
      </Sequence>

      {/* Act 3a: Logo Reveal */}
      <Sequence
        from={SCENE_TIMING.reveal.from}
        durationInFrames={SCENE_TIMING.reveal.duration}
      >
        <LogoRevealScene />
      </Sequence>

      {/* Act 3b: Dashboard Demo (hero) */}
      <Sequence
        from={SCENE_TIMING.dashboard.from}
        durationInFrames={SCENE_TIMING.dashboard.duration}
      >
        <DashboardDemo />
      </Sequence>

      {/* Act 4: Impact Stats */}
      <Sequence
        from={SCENE_TIMING.impact.from}
        durationInFrames={SCENE_TIMING.impact.duration}
      >
        <ImpactStats />
      </Sequence>

      {/* Act 5: End Card */}
      <Sequence
        from={SCENE_TIMING.endCard.from}
        durationInFrames={SCENE_TIMING.endCard.duration}
      >
        <EndCard />
      </Sequence>

      {/* Background music */}
      <Audio src={staticFile("audio/music-trailer.wav")} volume={0.4} />
    </AbsoluteFill>
  );
};
