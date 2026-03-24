import React from 'react';
import { AbsoluteFill } from 'remotion';
import { theme } from '../theme';

export const DashboardScene: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.bg,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ color: theme.text, fontSize: 48, fontWeight: 700 }}>
        Dashboard Scene
      </div>
    </AbsoluteFill>
  );
};
