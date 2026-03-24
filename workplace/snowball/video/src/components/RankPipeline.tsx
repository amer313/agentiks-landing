import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { theme } from '../theme';

const LEADS = [
  { rank: 'Critical', company: 'Apex Construction Group', score: 98, color: theme.rose },
  { rank: 'Critical', company: 'Metro Builders LLC', score: 94, color: theme.rose },
  { rank: 'High', company: 'BuildRight Industries', score: 81, color: theme.amber },
  { rank: 'High', company: 'Nova Renovations', score: 76, color: theme.amber },
  { rank: 'Medium', company: 'Cornerstone Homes', score: 54, color: theme.blue },
  { rank: 'Low', company: 'Sunrise Interiors', score: 29, color: 'rgba(255,255,255,0.3)' },
] as const;

const BADGE_STYLES: Record<string, { bg: string; color: string }> = {
  Critical: { bg: theme.roseSoft, color: theme.rose },
  High: { bg: theme.amberSoft, color: theme.amber },
  Medium: { bg: theme.blueSoft, color: theme.blue },
  Low: { bg: 'rgba(255,255,255,0.06)', color: theme.muted },
};

export const RankPipeline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        backgroundColor: theme.card,
        border: `1px solid ${theme.border}`,
        borderRadius: 16,
        overflow: 'hidden',
      }}
    >
      {/* Top bar */}
      <div
        style={{
          backgroundColor: theme.surface,
          padding: '12px 16px',
          borderBottom: `1px solid ${theme.border}`,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', gap: 6 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#ff5f57',
            }}
          />
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#febc2e',
            }}
          />
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#28c840',
            }}
          />
        </div>
        <span
          style={{
            fontSize: 12,
            color: theme.mutedAlpha,
            marginLeft: 10,
            fontWeight: 500,
          }}
        >
          Lead Pipeline — Virginia
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: 16 }}>
        {LEADS.map((lead, i) => {
          const rowEntrance = spring({
            frame: frame - i * 8,
            fps,
            config: { damping: 200 },
          });

          const barWidth = spring({
            frame: frame - i * 8,
            fps,
            config: { damping: 200 },
          });

          const badge = BADGE_STYLES[lead.rank];

          return (
            <div
              key={lead.company}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
                padding: '10px 14px',
                borderRadius: 8,
                backgroundColor: theme.surface,
                border: `1px solid ${theme.border}`,
                marginBottom: 6,
                opacity: rowEntrance,
                transform: `translateY(${20 * (1 - rowEntrance)}px)`,
              }}
            >
              {/* Rank badge */}
              <div
                style={{
                  padding: '3px 10px',
                  borderRadius: 5,
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.05em',
                  backgroundColor: badge.bg,
                  color: badge.color,
                  flexShrink: 0,
                }}
              >
                {lead.rank}
              </div>

              {/* Company name */}
              <div
                style={{
                  flex: 1,
                  fontSize: 14,
                  fontWeight: 500,
                  color: theme.text,
                }}
              >
                {lead.company}
              </div>

              {/* Score */}
              <div
                style={{
                  fontSize: 13,
                  color: theme.mutedAlpha,
                  fontVariantNumeric: 'tabular-nums',
                  flexShrink: 0,
                }}
              >
                {lead.score}
              </div>

              {/* Bar */}
              <div
                style={{
                  width: 70,
                  height: 5,
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  borderRadius: 3,
                  overflow: 'hidden',
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    height: '100%',
                    borderRadius: 3,
                    backgroundColor: lead.color,
                    width: barWidth * (lead.score / 100) * 70,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
