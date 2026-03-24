import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

interface GradientTextProps {
  children: React.ReactNode;
  colors: string[];
  fontSize: number;
  fontWeight?: number;
  delay?: number;
}

export const GradientText: React.FC<GradientTextProps> = ({
  children,
  colors,
  fontSize,
  fontWeight = 800,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delayedFrame = Math.max(0, frame - delay);

  const opacity = interpolate(delayedFrame, [0, 0.5 * fps], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const translateY = interpolate(delayedFrame, [0, 0.5 * fps], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const backgroundPosition = interpolate(frame, [0, 4 * fps], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <span
      style={{
        fontSize,
        fontWeight,
        background: `linear-gradient(135deg, ${colors.join(', ')})`,
        backgroundSize: '200% 200%',
        backgroundPosition: `${backgroundPosition}% ${backgroundPosition}%`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        opacity,
        transform: `translateY(${translateY}px)`,
        display: 'inline-block',
      }}
    >
      {children}
    </span>
  );
};
