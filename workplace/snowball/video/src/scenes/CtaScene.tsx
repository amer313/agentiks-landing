import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  AbsoluteFill,
} from 'remotion';
import { theme } from '../theme';
import { PainCard } from '../components/PainCard';
import type { PitchVideoProps } from '../types';

export const CtaScene: React.FC<PitchVideoProps> = ({
  mvpCostLow,
  mvpCostHigh,
  clientName,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Section 1: Cost summary entrance
  const costEntrance = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  // Animated price counting up
  const costLowAnimated = Math.round(
    interpolate(
      spring({ frame, fps, config: { damping: 200 } }),
      [0, 1],
      [0, mvpCostLow],
    ),
  );
  const costHighAnimated = Math.round(
    interpolate(
      spring({ frame, fps, config: { damping: 200 } }),
      [0, 1],
      [0, mvpCostHigh],
    ),
  );

  // Section 2: Next steps row entrance
  const stepsEntrance = spring({
    frame: frame - 25,
    fps,
    config: { damping: 200 },
  });

  // Section 3: Logo entrance
  const logoEntrance = spring({
    frame: frame - 70,
    fps,
    config: { damping: 200 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.bg,
        padding: 80,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Section 1: Cost summary */}
      <div
        style={{
          opacity: costEntrance,
          transform: `translateY(${40 * (1 - costEntrance)}px)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <span
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: theme.text,
              letterSpacing: '-0.03em',
            }}
          >
            ${costLowAnimated}&ndash;{costHighAnimated}
          </span>
          <span
            style={{
              fontSize: 22,
              fontWeight: 500,
              color: theme.muted,
            }}
          >
            /month
          </span>
        </div>
        <div
          style={{
            fontSize: 16,
            color: theme.muted,
            marginTop: 8,
          }}
        >
          Virginia pilot &mdash; 100 leads/month
        </div>
      </div>

      {/* Section 2: Next steps cards */}
      <div
        style={{
          opacity: stepsEntrance,
          transform: `translateY(${40 * (1 - stepsEntrance)}px)`,
          display: 'flex',
          flexDirection: 'row',
          gap: 16,
          marginTop: 48,
          width: '100%',
        }}
      >
        <PainCard
          number="1"
          title="Requirements document"
          description="Fill out the shared doc with your DMV area processes."
          accentColor={theme.blue}
          accentBg={theme.blueSoft}
          delay={30}
        />
        <PainCard
          number="2"
          title="Example emails + WhatsApp"
          description="Provide 5\u201310 real follow-up messages to train AI."
          accentColor={theme.blue}
          accentBg={theme.blueSoft}
          delay={38}
        />
        <PainCard
          number="3"
          title="Monday CRM access"
          description="Admin access so we can integrate the lead pipeline."
          accentColor={theme.blue}
          accentBg={theme.blueSoft}
          delay={46}
        />
        <PainCard
          number="4"
          title="Signed NDA"
          description="Review and sign so we can proceed with full access."
          accentColor={theme.blue}
          accentBg={theme.blueSoft}
          delay={54}
        />
      </div>

      {/* Section 3: Agentiks logo */}
      <div
        style={{
          opacity: logoEntrance,
          transform: `translateY(${40 * (1 - logoEntrance)}px)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 56,
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 700 }}>
          <span style={{ color: theme.text }}>agentiks</span>
          <span style={{ color: theme.blue }}>.</span>
          <span style={{ color: theme.text }}>dev</span>
        </div>
        <div
          style={{
            fontSize: 14,
            color: theme.muted,
            marginTop: 8,
          }}
        >
          AI-Powered Automation &mdash; Built for {clientName}
        </div>
        <div
          style={{
            fontSize: 12,
            color: theme.mutedAlpha,
            marginTop: 20,
          }}
        >
          Prepared March 2026 &bull; Confidential &bull; Valid for 30 days
        </div>
      </div>
    </AbsoluteFill>
  );
};
