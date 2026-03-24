import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { theme } from '../theme';

interface EmailPreviewProps {
  delay?: number;
}

export const EmailPreview: React.FC<EmailPreviewProps> = ({ delay = 0 }) => {
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
        backgroundColor: theme.surface,
        borderRadius: 16,
        overflow: 'hidden',
        border: `1px solid ${theme.border}`,
        opacity: entrance,
        transform: `translateY(${30 * (1 - entrance)}px)`,
      }}
    >
      {/* macOS top bar */}
      <div
        style={{
          backgroundColor: theme.surface,
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          borderBottom: `1px solid ${theme.border}`,
        }}
      >
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
        <div
          style={{
            flex: 1,
            textAlign: 'center',
            fontSize: 12,
            color: theme.mutedAlpha,
          }}
        >
          Follow-Up Email
        </div>
      </div>

      {/* Header rows */}
      <div
        style={{
          display: 'flex',
          padding: '8px 16px',
          fontSize: 13,
          borderBottom: `1px solid ${theme.border}`,
          alignItems: 'center',
        }}
      >
        <div style={{ color: theme.mutedAlpha, width: 50 }}>To:</div>
        <div style={{ color: theme.muted }}>m.rivera@apexcg.com</div>
      </div>
      <div
        style={{
          display: 'flex',
          padding: '8px 16px',
          fontSize: 13,
          borderBottom: `1px solid ${theme.border}`,
          alignItems: 'center',
        }}
      >
        <div style={{ color: theme.mutedAlpha, width: 50 }}>From:</div>
        <div style={{ color: theme.muted }}>team@renovationpros.com</div>
      </div>
      <div
        style={{
          display: 'flex',
          padding: '8px 16px',
          fontSize: 13,
          borderBottom: `1px solid ${theme.border}`,
          alignItems: 'center',
        }}
      >
        <div style={{ color: theme.mutedAlpha, width: 50 }}>Subj:</div>
        <div style={{ color: theme.text, fontWeight: 600 }}>
          Great meeting at the Arlington Expo, Michael
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          padding: 20,
          fontSize: 14,
          color: theme.muted,
          lineHeight: 1.8,
        }}
      >
        <div style={{ color: theme.text, fontWeight: 500, marginBottom: 8 }}>
          Hi Michael,
        </div>
        <div style={{ marginBottom: 8 }}>
          It was great connecting with you at the Arlington Construction Expo.
          I was really impressed by{' '}
          <span style={{ color: theme.blue, fontWeight: 500 }}>
            Apex Construction Group's
          </span>{' '}
          approach to commercial renovation in the DMV area.
        </div>
        <div style={{ marginBottom: 8 }}>
          I'd love to set up a quick lunch to explore how we might work
          together.
        </div>
        <div
          style={{
            fontSize: 11,
            color: theme.mutedAlpha,
            borderTop: `1px solid ${theme.border}`,
            marginTop: 16,
            paddingTop: 12,
          }}
        >
          Best regards,
          <br />
          Renovation Marketing Pros
        </div>
      </div>
    </div>
  );
};
