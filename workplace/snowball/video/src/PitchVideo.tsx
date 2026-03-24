import React from 'react';
import { AbsoluteFill } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { loadFont } from '@remotion/google-fonts/Inter';
import { theme } from './theme';
import type { PitchVideoProps } from './types';
import { TitleScene } from './scenes/TitleScene';
import { ProblemScene } from './scenes/ProblemScene';
import { CardCaptureScene } from './scenes/CardCaptureScene';
import { RankingScene } from './scenes/RankingScene';
import { FollowUpScene } from './scenes/FollowUpScene';
import { DashboardScene } from './scenes/DashboardScene';
import { CtaScene } from './scenes/CtaScene';

const { fontFamily } = loadFont('normal', {
  weights: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

const FADE_DURATION = 15;
const fadeTiming = linearTiming({ durationInFrames: FADE_DURATION });

export const PitchVideo: React.FC<PitchVideoProps> = (props) => {
  return (
    <AbsoluteFill style={{ backgroundColor: theme.bg, fontFamily }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={150}>
          <TitleScene {...props} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />
        <TransitionSeries.Sequence durationInFrames={240}>
          <ProblemScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />
        <TransitionSeries.Sequence durationInFrames={360}>
          <CardCaptureScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />
        <TransitionSeries.Sequence durationInFrames={300}>
          <RankingScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />
        <TransitionSeries.Sequence durationInFrames={360}>
          <FollowUpScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />
        <TransitionSeries.Sequence durationInFrames={300}>
          <DashboardScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />
        <TransitionSeries.Sequence durationInFrames={240}>
          <CtaScene {...props} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
