/**
 * v1-phrases.ts
 *
 * Maps phrase strings from Video 1 ("The Problem") voiceover
 * to their corresponding visual components.
 *
 * Phrases are matched in order against the word-level timing data.
 * Each phrase triggers a visual component that renders during that phrase.
 */

import type { PhraseVisualConfig } from "../types";
import {
  SalaryCounter,
  SpreadsheetCopyPaste,
  TicketRouting,
  EveryCompany,
  TheAlternative,
  SadChatbot,
  SinglePrompt,
  MissionAccomplished,
  ThatsAdorable,
  TransitionWipe,
  LogoRevealSync,
  EcosystemExpand,
  PillarCards,
  SystemConnections,
  DataFlowing,
  PercentCounter,
  TimeSaved,
  GrowthChart,
} from "../components/phrase-visuals/v1";

/**
 * Video 1 phrase visual configurations.
 * Order matters -- phrases are matched sequentially in the transcript.
 */
export const V1_PHRASE_CONFIGS: PhraseVisualConfig[] = [
  // Scene 1: Problem + sneak-diss
  {
    phrase: "the one you pay six figures",
    component: SalaryCounter,
  },
  {
    phrase: "copy-pasting between spreadsheets",
    component: SpreadsheetCopyPaste,
  },
  {
    phrase: "manually routing tickets at 11 PM",
    component: TicketRouting,
  },
  {
    phrase: "Every company has that",
    component: EveryCompany,
  },
  {
    phrase: "what's the alternative",
    component: TheAlternative,
  },
  {
    phrase: "one chatbot",
    component: SadChatbot,
  },
  {
    phrase: "one prompt template",
    component: SinglePrompt,
  },
  {
    phrase: "call it a day",
    component: MissionAccomplished,
  },
  {
    phrase: "That's... adorable",
    component: ThatsAdorable,
  },

  // Scene 2: Agentiks intro
  {
    phrase: "that's where we come in",
    component: TransitionWipe,
  },
  {
    phrase: "We're Agentiks",
    component: LogoRevealSync,
  },
  {
    phrase: "entire AI agent ecosystems",
    component: EcosystemExpand,
  },
  {
    phrase: "Strategy. Custom development. Multi-agent orchestration",
    component: PillarCards,
  },
  {
    phrase: "Your CRM, your ERP, your databases",
    component: SystemConnections,
  },
  {
    phrase: "talking to each other, running on autopilot",
    component: DataFlowing,
  },

  // Scene 3: Proof
  {
    phrase: "forty, fifty, sixty percent",
    component: PercentCounter,
  },
  {
    phrase: "given back",
    component: TimeSaved,
  },
  {
    phrase: "actually grows the business",
    component: GrowthChart,
  },
];

/**
 * All phrase strings in order, for matching against timing data.
 */
export const V1_PHRASES = V1_PHRASE_CONFIGS.map((c) => c.phrase);
