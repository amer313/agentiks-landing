import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from 'remotion';
import { theme } from '../theme';
import { RankPipeline } from '../components/RankPipeline';

const BULLET_POINTS = [
  'Reads meeting notes and engagement signals',
  'Applies your existing criticality model',
  'Recommends follow-up type, timing, and channel',
  'Auto-upgrades rank on engagement detection',
];

const BULLET_DELAYS = [20, 27, 34, 41];

export const RankingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const leftEntrance = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  const rightEntrance = spring({
    frame: frame - 10,
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
      <div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
        {/* Left column — Mockup */}
        <div
          style={{
            flex: 1.2,
            display: 'flex',
            justifyContent: 'center',
            transform: `translateX(${-60 * (1 - leftEntrance)}px)`,
            opacity: leftEntrance,
          }}
        >
          <RankPipeline />
        </div>

        {/* Right column — Text */}
        <div
          style={{
            flex: 1,
            paddingLeft: 48,
            transform: `translateX(${60 * (1 - rightEntrance)}px)`,
            opacity: rightEntrance,
          }}
        >
          {/* Step number */}
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: theme.cyan,
              color: '#ffffff',
              fontSize: 16,
              fontWeight: 700,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 16,
            }}
          >
            2
          </div>

          {/* Tag */}
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.08em',
              padding: '4px 12px',
              borderRadius: 8,
              backgroundColor: theme.cyanSoft,
              color: 'rgb(103,215,236)',
              display: 'inline-block',
              marginBottom: 16,
            }}
          >
            INTELLIGENCE
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
            AI Lead Ranking
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
            The AI agent reads ambassador notes, company data, and engagement
            history. It applies your critical / high / medium / low ranking
            system automatically.
          </div>

          {/* Bullet points */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {BULLET_POINTS.map((text, i) => {
              const bulletEntrance = spring({
                frame: frame - BULLET_DELAYS[i],
                fps,
                config: { damping: 200 },
              });

              return (
                <div
                  key={text}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    opacity: bulletEntrance,
                    transform: `translateX(${-20 * (1 - bulletEntrance)}px)`,
                  }}
                >
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      backgroundColor: theme.cyan,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: 15,
                      color: theme.muted,
                    }}
                  >
                    {text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
