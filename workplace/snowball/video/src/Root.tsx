import React from 'react';
import { Composition } from 'remotion';
import { PitchVideo } from './PitchVideo';
import { pitchVideoSchema } from './types';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="SnowballPitch"
      component={PitchVideo}
      durationInFrames={2160}
      fps={30}
      width={1920}
      height={1080}
      schema={pitchVideoSchema}
      defaultProps={{
        clientName: 'Snowball Ventures',
        projectName: 'Renovation Marketing Pros',
        laborReduction: 40,
        ambassadorCount: 20,
        leadsPerMonth: '100+',
        channels: 2,
        mvpCostLow: 95,
        mvpCostHigh: 140,
      }}
    />
  );
};
