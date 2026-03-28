import React, { useEffect } from "react";
import { Composition } from "remotion";
import { FPS } from "./brand";
import { Video1TheProblem } from "./compositions/Video1TheProblem";
import { Video2TheTransformation } from "./compositions/Video2TheTransformation";
import { Video3TheEdge } from "./compositions/Video3TheEdge";
import { Still4Orchestrator } from "./compositions/Still4Orchestrator";
import { CarouselSlide } from "./compositions/Still5Carousel";
import { ensureFontsLoaded } from "./fonts";

export const RemotionRoot: React.FC = () => {
  useEffect(() => {
    ensureFontsLoaded();
  }, []);

  return (
    <>
      <Composition
        id="video-1-the-problem"
        component={Video1TheProblem}
        durationInFrames={1350}
        fps={FPS}
        width={1080}
        height={1920}
      />

      <Composition
        id="video-2-the-transformation"
        component={Video2TheTransformation}
        durationInFrames={1260}
        fps={FPS}
        width={1080}
        height={1920}
      />

      <Composition
        id="video-3-the-edge"
        component={Video3TheEdge}
        durationInFrames={1440}
        fps={FPS}
        width={1080}
        height={1920}
      />

      <Composition
        id="still-4-orchestrator"
        component={Still4Orchestrator}
        durationInFrames={1}
        fps={FPS}
        width={1080}
        height={1080}
      />

      {[0, 1, 2, 3, 4].map((i) => (
        <Composition
          key={`carousel-${i}`}
          id={`carousel-${i + 1}`}
          component={() => <CarouselSlide index={i} />}
          durationInFrames={1}
          fps={FPS}
          width={1080}
          height={1080}
        />
      ))}
    </>
  );
};
