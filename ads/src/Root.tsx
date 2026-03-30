import React, { useEffect } from "react";
import { Composition } from "remotion";
import { FPS, TRAILER_DURATION_FRAMES } from "./brand";
import { TrailerComposition } from "./compositions/TrailerComposition";
import { ensureFontsLoaded } from "./fonts";

export const RemotionRoot: React.FC = () => {
  useEffect(() => {
    ensureFontsLoaded();
  }, []);

  return (
    <>
      <Composition
        id="agentiks-trailer-16x9"
        component={TrailerComposition}
        durationInFrames={TRAILER_DURATION_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="agentiks-trailer-9x16"
        component={TrailerComposition}
        durationInFrames={TRAILER_DURATION_FRAMES}
        fps={FPS}
        width={1080}
        height={1920}
      />
    </>
  );
};
