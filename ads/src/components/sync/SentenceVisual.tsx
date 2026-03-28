/**
 * SentenceVisual -- maps visual name strings to actual React components.
 *
 * Used by the per-sentence composition architecture. Each sentence in the
 * timing JSON specifies a visual name, and this component renders the
 * corresponding phrase-visual component with {progress, durationFrames}.
 */

import React from "react";
import { useCurrentFrame } from "remotion";

// Scene-level components (need thin wrappers for PhraseVisualProps interface)
import { TextSlamScene } from "../scenes/TextSlamScene";
import { CTAEndCardScene } from "../scenes/CTAEndCardScene";
import { CounterOpenScene } from "../scenes/CounterOpenScene";

// V1 phrase visuals
import {
  SpreadsheetCopyPaste,
  TicketRouting,
  EveryCompany,
  SadChatbot,
  ThatsAdorable,
  LogoRevealSync,
  PillarCards,
  PercentCounter,
} from "../phrase-visuals/v1";

// V2 phrase visuals
import {
  ThursdayBurnout,
  CostOfBusiness,
  AgentsReason,
  PerfectTeammate,
  WorkloadCounter,
  RevenueUpCostsDown,
} from "../phrase-visuals/v2";

// V3 phrase visuals
import {
  ModelDrop,
  NewModelsWeekly,
  ThatsOurJob,
  TrackBreakthroughs,
  BuildAndDisappear,
  Untouchable,
  CatchUpCost,
} from "../phrase-visuals/v3";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

/** Thin wrapper: TextSlamScene -> PhraseVisualProps */
const TextSlamVisual: React.FC<PhraseVisualProps & { displayText?: string }> = ({ displayText }) => (
  <TextSlamScene text={displayText || "Your team is drowning."} glitchColor="#06B6D4" />
);

/** Thin wrapper: CTAEndCardScene -> PhraseVisualProps */
const CTAEndCardVisual: React.FC<PhraseVisualProps> = () => <CTAEndCardScene />;

/** Thin wrapper: CounterOpenScene -> PhraseVisualProps */
const CounterOpenVisual: React.FC<PhraseVisualProps> = () => <CounterOpenScene />;

/**
 * Map of visual name -> component.
 * All components receive { progress, durationFrames }.
 */
const VISUAL_MAP: Record<string, React.ComponentType<PhraseVisualProps & { displayText?: string }>> = {
  // Scene wrappers
  TextSlam: TextSlamVisual,
  CTAEndCard: CTAEndCardVisual,
  CounterOpen: CounterOpenVisual,

  // V1
  SpreadsheetCopyPaste,
  TicketRouting,
  EveryCompany,
  SadChatbot,
  ThatsAdorable,
  LogoRevealSync,
  PillarCards,
  PercentCounter,

  // V2
  ThursdayBurnout,
  CostOfBusiness,
  AgentsReason,
  PerfectTeammate,
  WorkloadCounter,
  RevenueUpCostsDown,

  // V3
  ModelDrop,
  NewModelsWeekly,
  ThatsOurJob,
  TrackBreakthroughs,
  BuildAndDisappear,
  Untouchable,
  CatchUpCost,
};

interface SentenceVisualProps {
  visualName: string;
  durationFrames: number;
  displayText?: string;
}

/**
 * Renders the visual component for a given sentence.
 * Computes progress (0-1) from the current frame within the Sequence.
 */
export const SentenceVisual: React.FC<SentenceVisualProps> = ({
  visualName,
  durationFrames,
  displayText,
}) => {
  const frame = useCurrentFrame(); // relative to containing Sequence
  const progress = durationFrames > 0 ? Math.min(frame / durationFrames, 1) : 0;

  const Component = VISUAL_MAP[visualName];
  if (!Component) {
    console.warn(`SentenceVisual: unknown visual "${visualName}"`);
    return null;
  }

  return <Component progress={progress} durationFrames={durationFrames} displayText={displayText} />;
};
