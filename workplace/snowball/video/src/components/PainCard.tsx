import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { theme } from '../theme';

interface PainCardProps {
  number: string;
  title: string;
  description: string;
  accentColor: string;
  accentBg: string;
  delay: number;
}

export const PainCard: React.FC<PainCardProps> = ({
  number,
  title,
  description,
  accentColor,
  accentBg,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
  });

  return (
    <div
      style={{
        backgroundColor: theme.card,
        border: `1px solid ${theme.border}`,
        borderRadius: 16,
        padding: 32,
        flex: 1,
        opacity: entrance,
        transform: `translateY(${40 * (1 - entrance)}px)`,
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          backgroundColor: accentBg,
          color: accentColor,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 16,
          fontWeight: 700,
          marginBottom: 20,
        }}
      >
        {number}
      </div>
      <div
        style={{
          fontSize: 20,
          fontWeight: 600,
          color: theme.text,
          marginBottom: 10,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 15,
          color: theme.muted,
          lineHeight: 1.6,
        }}
      >
        {description}
      </div>
    </div>
  );
};
