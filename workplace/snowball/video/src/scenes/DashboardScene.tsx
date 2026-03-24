import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { theme } from '../theme';
import { DashMockup } from '../components/DashMockup';

const bullets = [
  'Lead pipeline breakdown by rank',
  'Email + WhatsApp follow-up status',
  'Ambassador performance metrics',
  'Real-time activity feed',
];

export const DashboardScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const leftEntrance = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  const rightEntrance = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: { damping: 200 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.bg,
        padding: 80,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        {/* Left column — Dashboard mockup */}
        <div
          style={{
            flex: 1.3,
            transform: `translateX(${(1 - leftEntrance) * -60}px)`,
            opacity: leftEntrance,
          }}
        >
          <DashMockup />
        </div>

        {/* Right column — Text content */}
        <div
          style={{
            flex: 0.7,
            paddingLeft: 48,
            transform: `translateX(${(1 - rightEntrance) * 60}px)`,
            opacity: rightEntrance,
          }}
        >
          {/* Step number */}
          <div
            style={{
              width: 32,
              height: 32,
              backgroundColor: theme.purple,
              color: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 16,
              fontWeight: 700,
              marginBottom: 16,
            }}
          >
            4
          </div>

          {/* Tag */}
          <div
            style={{
              display: 'inline-block',
              backgroundColor: theme.purpleSoft,
              color: 'rgb(183,153,255)',
              fontSize: 11,
              fontWeight: 600,
              padding: '4px 10px',
              borderRadius: 4,
              letterSpacing: '0.08em',
              marginBottom: 12,
            }}
          >
            VISIBILITY
          </div>

          {/* Heading */}
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: theme.text,
              marginBottom: 12,
            }}
          >
            Dashboard &amp; Reporting
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: 16,
              color: theme.muted,
              lineHeight: 1.7,
              marginBottom: 28,
            }}
          >
            Real-time visibility into your entire pipeline. See which leads are
            hot, which follow-ups are working, and how each ambassador is
            performing.
          </div>

          {/* Bullet points */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {bullets.map((bullet) => (
              <div
                key={bullet}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    backgroundColor: theme.purple,
                    flexShrink: 0,
                  }}
                />
                <div style={{ fontSize: 14, color: theme.muted }}>
                  {bullet}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
