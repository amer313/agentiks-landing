import React from 'react';
import { AbsoluteFill } from 'remotion';
import { theme } from '../theme';
import type { PitchVideoProps } from '../types';

export const CtaScene: React.FC<PitchVideoProps> = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.bg,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ color: theme.text, fontSize: 48, fontWeight: 700 }}>
        CTA Scene
      </div>
    </AbsoluteFill>
  );
};
