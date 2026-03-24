import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { theme } from '../theme';

const stats = [
  { label: 'TOTAL LEADS', value: 152, change: '+23 this week' },
  { label: 'EMAILS SENT', value: 340, change: '62% open rate' },
  { label: 'WA MESSAGES', value: 95, change: '86% read' },
  { label: 'APPTS BOOKED', value: 18, change: '+5 this week' },
];

const barHeights = [30, 50, 40, 65, 55, 20, 10];
const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const activityItems = [
  {
    dotColor: theme.green,
    text: 'New card scanned — Mike T. → ACME Corp',
    badge: 'Scan',
    badgeBg: theme.greenSoft,
    badgeColor: theme.green,
    time: '2m ago',
  },
  {
    dotColor: theme.blue,
    text: 'Follow-up email #2 sent to BuildRight LLC',
    badge: 'Email',
    badgeBg: theme.blueSoft,
    badgeColor: theme.blue,
    time: '1h ago',
  },
  {
    dotColor: theme.green,
    text: 'WhatsApp reply from Metro Construction',
    badge: 'WA',
    badgeBg: theme.greenSoft,
    badgeColor: theme.green,
    time: '2h ago',
  },
  {
    dotColor: theme.rose,
    text: 'Lead upgraded: Apex Builders → CRITICAL',
    badge: 'Rank',
    badgeBg: theme.roseSoft,
    badgeColor: theme.rose,
    time: '5h ago',
  },
];

export const DashMockup: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        backgroundColor: theme.surface,
        borderRadius: 16,
        overflow: 'hidden',
        border: `1px solid ${theme.border}`,
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '14px 20px',
          borderBottom: `1px solid ${theme.border}`,
        }}
      >
        <div style={{ fontSize: 15, fontWeight: 600, color: theme.text }}>
          Renovation Marketing Pros
        </div>
        <div
          style={{
            padding: '5px 12px',
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 500,
            backgroundColor: theme.blueSoft,
            color: theme.blue,
            border: `1px solid ${theme.borderAccent}`,
          }}
        >
          Virginia (DMV)
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: 20 }}>
        {/* Stats row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 12,
            marginBottom: 20,
          }}
        >
          {stats.map((stat, i) => {
            const entrance = spring({
              frame: Math.max(0, frame - i * 8),
              fps,
              config: { damping: 200 },
            });

            const displayValue = Math.round(entrance * stat.value);

            return (
              <div
                key={stat.label}
                style={{
                  backgroundColor: theme.card,
                  borderRadius: 10,
                  padding: 14,
                  border: `1px solid ${theme.border}`,
                  opacity: entrance,
                  transform: `translateY(${(1 - entrance) * 20}px)`,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    color: theme.mutedAlpha,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  {stat.label}
                </div>
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    color: theme.text,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {displayValue}
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, color: theme.green }}>
                  {stat.change}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bar chart */}
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 600, color: theme.text }}>
              Follow-Up Performance
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              {['7D', '30D', '90D'].map((tab) => (
                <div
                  key={tab}
                  style={{
                    fontSize: 11,
                    padding: '3px 8px',
                    borderRadius: 4,
                    ...(tab === '7D'
                      ? { backgroundColor: theme.blueSoft, color: theme.blue }
                      : { color: theme.mutedAlpha }),
                  }}
                >
                  {tab}
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-end',
              gap: 5,
              height: 80,
              paddingTop: 8,
            }}
          >
            {barHeights.map((h, i) => {
              const barEntrance = spring({
                frame: Math.max(0, frame - i * 5),
                fps,
                config: { damping: 200 },
              });

              let barColor: string;
              if (i === 3) {
                barColor = theme.cyan;
              } else if (i >= 5) {
                barColor = 'rgba(255,255,255,0.1)';
              } else {
                barColor = theme.blue;
              }

              return (
                <div
                  key={dayLabels[i]}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: h * barEntrance,
                      backgroundColor: barColor,
                      borderRadius: '3px 3px 0 0',
                    }}
                  />
                  <div
                    style={{
                      fontSize: 9,
                      color: theme.mutedAlpha,
                      textAlign: 'center',
                      marginTop: 4,
                    }}
                  >
                    {dayLabels[i]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Activity feed */}
        <div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: theme.text,
              marginBottom: 10,
            }}
          >
            Recent Activity
          </div>
          {activityItems.map((item, i) => {
            const entrance = spring({
              frame: Math.max(0, frame - (40 + i * 10)),
              fps,
              config: { damping: 200 },
            });

            return (
              <div
                key={item.badge + i}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 0',
                  borderBottom:
                    i < activityItems.length - 1
                      ? `1px solid ${theme.border}`
                      : 'none',
                  opacity: entrance,
                  transform: `translateY(${(1 - entrance) * 15}px)`,
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    backgroundColor: item.dotColor,
                    flexShrink: 0,
                  }}
                />
                <div
                  style={{
                    flex: 1,
                    fontSize: 13,
                    color: theme.muted,
                  }}
                >
                  {item.text}
                </div>
                <div
                  style={{
                    fontSize: 9,
                    padding: '2px 8px',
                    borderRadius: 4,
                    fontWeight: 600,
                    backgroundColor: item.badgeBg,
                    color: item.badgeColor,
                  }}
                >
                  {item.badge}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: theme.mutedAlpha,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.time}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
