import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from 'remotion';
import { theme } from '../theme';
import { EmailPreview } from '../components/EmailPreview';
import { WhatsAppChat } from '../components/WhatsAppChat';

const BULLET_POINTS = [
  'Personalized email sequences from your domain',
  'WhatsApp messages that feel warm and conversational',
  'Trained on your real communication style',
  'Open, click, read-receipt, and reply tracking',
];

const BULLET_DELAYS = [30, 37, 44, 51];

interface CadenceRow {
  label: string;
  color: string;
  email: string;
  whatsapp: string;
}

const CADENCE_ROWS: CadenceRow[] = [
  {
    label: 'Critical',
    color: theme.rose,
    email: 'Day 1,3,7,14',
    whatsapp: 'Day 1,5,10',
  },
  {
    label: 'High',
    color: theme.amber,
    email: 'Day 1,5,14,30',
    whatsapp: 'Day 2,10',
  },
  {
    label: 'Medium',
    color: theme.blue,
    email: 'Day 3,14,30',
    whatsapp: 'Day 7',
  },
  {
    label: 'Low',
    color: theme.muted,
    email: 'Day 7,30',
    whatsapp: '\u2014',
  },
];

export const FollowUpScene: React.FC = () => {
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
        {/* Left column — Text */}
        <div
          style={{
            flex: 1,
            paddingRight: 40,
            transform: `translateX(${-60 * (1 - leftEntrance)}px)`,
            opacity: leftEntrance,
          }}
        >
          {/* Step number */}
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: theme.green,
              color: '#ffffff',
              fontSize: 16,
              fontWeight: 700,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 16,
            }}
          >
            3
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
              backgroundColor: theme.greenSoft,
              color: 'rgb(110,220,156)',
              display: 'inline-block',
              marginBottom: 16,
            }}
          >
            OUTREACH
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
            Automated Follow-Up
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: 16,
              color: theme.muted,
              lineHeight: 1.7,
              marginBottom: 24,
            }}
          >
            AI-generated personalized messages across email and WhatsApp.
            Trained on your real follow-up examples.
          </div>

          {/* Cadence table */}
          <div
            style={{
              backgroundColor: theme.card,
              borderRadius: 10,
              padding: 16,
              border: `1px solid ${theme.border}`,
              marginBottom: 24,
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr 1fr',
                gap: 6,
                fontSize: 10,
                color: theme.mutedAlpha,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.06em',
                marginBottom: 8,
              }}
            >
              <div />
              <div>EMAIL</div>
              <div>WHATSAPP</div>
            </div>

            {/* Rows */}
            {CADENCE_ROWS.map((row) => (
              <div
                key={row.label}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr 1fr',
                  gap: 6,
                  fontSize: 13,
                  padding: '4px 0',
                }}
              >
                <div style={{ color: row.color, fontWeight: 600 }}>
                  {row.label}
                </div>
                <div style={{ color: theme.muted }}>{row.email}</div>
                <div style={{ color: theme.muted }}>{row.whatsapp}</div>
              </div>
            ))}
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
                      backgroundColor: theme.green,
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

        {/* Right column — Mockups */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            transform: `translateX(${60 * (1 - rightEntrance)}px)`,
            opacity: rightEntrance,
          }}
        >
          <EmailPreview delay={0} />
          <WhatsAppChat delay={20} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
