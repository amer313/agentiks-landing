import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { theme } from '../theme';
import { PainCard } from '../components/PainCard';

export const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelEntrance = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  const headingEntrance = spring({
    frame: frame - 8,
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
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          fontSize: 14,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: theme.blue,
          opacity: labelEntrance,
          transform: `translateY(${40 * (1 - labelEntrance)}px)`,
          marginBottom: 16,
        }}
      >
        CURRENT STATE
      </div>

      <div
        style={{
          fontSize: 52,
          fontWeight: 700,
          color: theme.text,
          letterSpacing: '-0.03em',
          marginBottom: 48,
          opacity: headingEntrance,
          transform: `translateY(${40 * (1 - headingEntrance)}px)`,
        }}
      >
        What we're solving
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 20,
        }}
      >
        <PainCard
          number="01"
          title="Manual card entry"
          description="800+ business cards in a binder. Manual CRM entry is slow and error-prone."
          accentColor={theme.rose}
          accentBg={theme.roseSoft}
          delay={20}
        />
        <PainCard
          number="02"
          title="Follow-up bottleneck"
          description="Ambassadors manually send follow-ups. 80% of closing success — but it gets dropped."
          accentColor={theme.amber}
          accentBg={theme.amberSoft}
          delay={30}
        />
        <PainCard
          number="03"
          title="No lead intelligence"
          description="Prioritization is gut-feel. No automated ranking for highest-value opportunities."
          accentColor={theme.purple}
          accentBg={theme.purpleSoft}
          delay={40}
        />
        <PainCard
          number="04"
          title="Can't scale"
          description="Growing from 60 to 150 ambassadors. Manual process breaks at this scale."
          accentColor={theme.blue}
          accentBg={theme.blueSoft}
          delay={50}
        />
      </div>
    </AbsoluteFill>
  );
};
