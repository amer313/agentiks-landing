import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';
import { theme } from '../theme';

interface WhatsAppChatProps {
  delay?: number;
}

interface MessageData {
  text: string;
  sent: boolean;
  time: string;
  delay: number;
}

const MESSAGES: MessageData[] = [
  {
    text: "Hey Michael! Great meeting you at the Arlington event. Really enjoyed hearing about Apex's projects in the DMV area.",
    sent: true,
    time: '2:14 PM',
    delay: 15,
  },
  {
    text: 'Would you be open to a quick lunch next week to chat about how we could help with your marketing?',
    sent: true,
    time: '2:14 PM',
    delay: 40,
  },
  {
    text: 'Hey! Absolutely, that sounds great. How about Wednesday?',
    sent: false,
    time: '2:31 PM',
    delay: 70,
  },
];

const MessageBubble: React.FC<{
  message: MessageData;
  parentDelay: number;
}> = ({ message, parentDelay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - parentDelay - message.delay,
    fps,
    config: { damping: 200 },
  });

  const isSent = message.sent;

  return (
    <div
      style={{
        alignSelf: isSent ? 'flex-end' : 'flex-start',
        backgroundColor: isSent ? '#005c4b' : '#1f2c34',
        color: '#e9edef',
        maxWidth: '80%',
        padding: '8px 12px',
        borderRadius: 8,
        borderBottomRightRadius: isSent ? 2 : 8,
        borderBottomLeftRadius: isSent ? 8 : 2,
        fontSize: 13,
        lineHeight: 1.5,
        opacity: entrance,
        transform: `translateY(${20 * (1 - entrance)}px)`,
      }}
    >
      {message.text}
      <div
        style={{
          fontSize: 10,
          color: 'rgba(255,255,255,0.4)',
          textAlign: 'right',
          marginTop: 4,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        {message.time}
        {isSent && (
          <span
            style={{ color: '#53bdeb', fontSize: 11, marginLeft: 4 }}
          >
            {'✓✓'}
          </span>
        )}
      </div>
    </div>
  );
};

const TypingIndicator: React.FC<{ parentDelay: number }> = ({
  parentDelay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - parentDelay - 90,
    fps,
    config: { damping: 200 },
  });

  return (
    <div
      style={{
        alignSelf: 'flex-start',
        backgroundColor: '#1f2c34',
        padding: '10px 16px',
        borderRadius: 8,
        display: 'flex',
        gap: 4,
        alignItems: 'center',
        opacity: entrance,
        transform: `translateY(${20 * (1 - entrance)}px)`,
      }}
    >
      {[0, 1, 2].map((i) => {
        const dotOpacity = interpolate(
          (frame + i * 6) % 24,
          [0, 12, 24],
          [0.3, 1, 0.3],
        );
        return (
          <div
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.3)',
              opacity: dotOpacity,
            }}
          />
        );
      })}
    </div>
  );
};

export const WhatsAppChat: React.FC<WhatsAppChatProps> = ({ delay = 0 }) => {
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
        backgroundColor: '#0b141a',
        borderRadius: 16,
        overflow: 'hidden',
        border: `1px solid ${theme.border}`,
        opacity: entrance,
        transform: `translateY(${30 * (1 - entrance)}px)`,
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: '#1f2c34',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${theme.blue}, ${theme.cyan})`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 13,
            color: '#ffffff',
            fontWeight: 700,
          }}
        >
          MR
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#e9edef' }}>
            Michael Rivera
          </div>
          <div style={{ fontSize: 11, color: theme.green }}>online</div>
        </div>
      </div>

      {/* Chat area */}
      <div
        style={{
          padding: 16,
          minHeight: 200,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          justifyContent: 'flex-end',
        }}
      >
        {MESSAGES.map((msg, i) => (
          <MessageBubble key={i} message={msg} parentDelay={delay} />
        ))}
        <TypingIndicator parentDelay={delay} />
      </div>
    </div>
  );
};
