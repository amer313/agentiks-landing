import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { theme } from '../theme';

const EXTRACTED_FIELDS = [
  { label: 'Name', value: 'Michael Rivera' },
  { label: 'Title', value: 'VP of Operations' },
  { label: 'Company', value: 'Apex Construction' },
  { label: 'Email', value: 'm.rivera@apexcg.com' },
  { label: 'Phone', value: '(571) 555-0182' },
];

export const PhoneMockup: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const floatY = Math.sin(frame / 30) * 5;
  const scanAreaHeight = 200;
  const scanLineY = interpolate(frame % 60, [0, 60], [0, scanAreaHeight]);

  return (
    <div
      style={{
        transform: `translateY(${floatY}px)`,
      }}
    >
      {/* Phone frame */}
      <div
        style={{
          width: 300,
          backgroundColor: theme.card,
          border: '2px solid rgba(255,255,255,0.1)',
          borderRadius: 40,
          padding: 14,
          boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
          position: 'relative',
        }}
      >
        {/* Notch */}
        <div
          style={{
            width: 100,
            height: 24,
            backgroundColor: theme.bg,
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
            margin: '0 auto',
            position: 'relative',
            zIndex: 2,
          }}
        />

        {/* Screen */}
        <div
          style={{
            backgroundColor: theme.surface,
            borderRadius: 24,
            overflow: 'hidden',
            minHeight: 440,
          }}
        >
          {/* Status bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '8px 16px',
              fontSize: 11,
              color: theme.mutedAlpha,
            }}
          >
            <span>9:41</span>
            <span>5G 87%</span>
          </div>

          {/* Header */}
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: theme.text,
              padding: '12px 16px',
            }}
          >
            Scan Business Card
          </div>

          {/* Scan area */}
          <div
            style={{
              margin: 16,
              padding: 24,
              border: '2px dashed rgba(37,99,235,0.3)',
              borderRadius: 12,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Camera icon */}
            <div
              style={{
                textAlign: 'center',
                fontSize: 24,
                marginBottom: 12,
              }}
            >
              {'\uD83D\uDCF7'}
            </div>

            {/* Scan line */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                height: 3,
                background: 'linear-gradient(90deg, transparent, #2563eb, transparent)',
                transform: `translateY(${scanLineY}px)`,
                top: 0,
                zIndex: 1,
              }}
            />

            {/* Mini business card */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: 8,
                padding: '14px 18px',
                maxWidth: 210,
                margin: '0 auto',
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#111',
                }}
              >
                Michael Rivera
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: '#666',
                }}
              >
                VP of Operations
              </div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#333',
                  marginTop: 6,
                }}
              >
                Apex Construction Group
              </div>
              <div style={{ fontSize: 9, color: '#888' }}>
                m.rivera@apexcg.com
              </div>
              <div style={{ fontSize: 9, color: '#888' }}>
                (571) 555-0182
              </div>
            </div>
          </div>

          {/* Extracted fields */}
          <div style={{ margin: 16 }}>
            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  backgroundColor: theme.green,
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: theme.green,
                }}
              >
                AI Extracted Fields
              </span>
            </div>

            {/* Field rows */}
            {EXTRACTED_FIELDS.map((field, i) => {
              const fieldEntrance = spring({
                frame: frame - (40 + i * 12),
                fps,
                config: { damping: 200 },
              });

              return (
                <div
                  key={field.label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '6px 0',
                    borderBottom:
                      i < EXTRACTED_FIELDS.length - 1
                        ? `1px solid ${theme.border}`
                        : 'none',
                    opacity: fieldEntrance,
                    transform: `translateY(${10 * (1 - fieldEntrance)}px)`,
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      color: theme.mutedAlpha,
                    }}
                  >
                    {field.label}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: theme.green,
                      fontFamily: 'monospace',
                    }}
                  >
                    {field.value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
