import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { theme } from '../theme';

interface AnimatedCounterProps {
  value: number | string;
  label: string;
  suffix?: string;
  delay?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  label,
  suffix = '',
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 200 },
  });

  const opacity = entrance;
  const translateY = (1 - entrance) * 30;

  const displayValue =
    typeof value === 'number'
      ? `${Math.round(entrance * value)}${suffix}`
      : value;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          fontSize: 56,
          fontWeight: 800,
          color: theme.text,
          lineHeight: 1,
        }}
      >
        {displayValue}
      </div>
      <div
        style={{
          fontSize: 18,
          color: theme.muted,
          marginTop: 8,
        }}
      >
        {label}
      </div>
    </div>
  );
};
