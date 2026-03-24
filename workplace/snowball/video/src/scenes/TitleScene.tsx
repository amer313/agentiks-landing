import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from 'remotion';
import { theme } from '../theme';
import type { PitchVideoProps } from '../types';
import { GradientText } from '../components/GradientText';
import { AnimatedCounter } from '../components/AnimatedCounter';

export const TitleScene: React.FC<PitchVideoProps> = ({
  clientName,
  laborReduction,
  ambassadorCount,
  leadsPerMonth,
  channels,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badgeEntrance = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  const headlineEntrance = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: { damping: 200 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.bg,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Radial glow background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'radial-gradient(900px circle at 50% 0%, rgba(37,99,235,0.08), transparent)',
        }}
      />

      {/* Content container */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 1,
        }}
      >
        {/* Badge */}
        <div
          style={{
            opacity: badgeEntrance,
            transform: `translateY(${(1 - badgeEntrance) * 20}px)`,
            padding: '8px 24px',
            borderRadius: 100,
            backgroundColor: theme.blueSoft,
            border: `1px solid ${theme.borderAccent}`,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: theme.blue,
            }}
          />
          <span
            style={{
              fontSize: 18,
              fontWeight: 500,
              color: theme.blue,
            }}
          >
            Prepared for {clientName}
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            marginTop: 40,
            textAlign: 'center',
            opacity: headlineEntrance,
            transform: `translateY(${(1 - headlineEntrance) * 20}px)`,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: theme.text,
              letterSpacing: '-0.04em',
              lineHeight: 1.1,
            }}
          >
            Automated lead follow-up.
          </div>
          <div style={{ lineHeight: 1.1, marginTop: 4 }}>
            <GradientText
              colors={[theme.blue, theme.cyan, theme.blue]}
              fontSize={72}
              delay={10}
            >
              Intelligent. Autonomous.
            </GradientText>
          </div>
        </div>

        {/* Stat counters */}
        <div
          style={{
            display: 'flex',
            gap: 80,
            marginTop: 64,
          }}
        >
          <AnimatedCounter
            value={laborReduction}
            suffix="%"
            label="Labor reduction"
            delay={30}
          />
          <AnimatedCounter
            value={ambassadorCount}
            label="Ambassadors (VA)"
            delay={40}
          />
          <AnimatedCounter
            value={leadsPerMonth}
            label="Leads / month"
            delay={50}
          />
          <AnimatedCounter
            value={channels}
            label="Channels"
            delay={60}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
