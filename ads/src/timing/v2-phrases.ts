/**
 * v2-phrases.ts
 *
 * Maps phrase strings from Video 2 ("The Transformation") voiceover
 * to their corresponding visual components.
 */

import type { PhraseVisualConfig } from "../types";
import {
  ThursdayBurnout,
  BacklogPileup,
  LeadQualification,
  CostOfBusiness,
  AgentsReason,
  TwentyFourSeven,
  TaskChecklist,
  BrokenAutomation,
  PerfectTeammate,
  WorkloadCounter,
  StopFirefighting,
  RevenueUpCostsDown,
  NotAPitch,
  FreeStrategyCall,
  WorkflowMap,
  VisitAgentiks,
} from "../components/phrase-visuals/v2";

/**
 * Video 2 phrase visual configurations.
 * Order matters -- phrases are matched sequentially in the transcript.
 */
export const V2_PHRASE_CONFIGS: PhraseVisualConfig[] = [
  // Scene 1: Before state
  {
    phrase: "Thursday and your team's already fried",
    component: ThursdayBurnout,
  },
  {
    phrase: "pipeline's backed up, reports are due",
    component: BacklogPileup,
  },
  {
    phrase: "qualify those two hundred leads",
    component: LeadQualification,
  },
  {
    phrase: "the cost of doing business",
    component: CostOfBusiness,
  },

  // Scene 2: After state
  {
    phrase: "AI agents don't follow scripts -- they reason",
    component: AgentsReason,
  },
  {
    phrase: "Twenty-four seven",
    component: TwentyFourSeven,
  },
  {
    phrase: "Lead scoring, invoicing, customer intake, reporting",
    component: TaskChecklist,
  },
  {
    phrase: "half-baked automation that breaks",
    component: BrokenAutomation,
  },
  {
    phrase: "a teammate who never sleeps",
    component: PerfectTeammate,
  },

  // Scene 3: Results
  {
    phrase: "Forty, fifty, sixty percent of their workload",
    component: WorkloadCounter,
  },
  {
    phrase: "stop firefighting and start scaling",
    component: StopFirefighting,
  },
  {
    phrase: "Revenue goes up. Costs go down",
    component: RevenueUpCostsDown,
  },
  {
    phrase: "That's not a pitch",
    component: NotAPitch,
  },

  // Scene 4: CTA
  {
    phrase: "Book a free strategy call",
    component: FreeStrategyCall,
  },
  {
    phrase: "map your workflows and show you the ROI",
    component: WorkflowMap,
  },
  {
    phrase: "Visit agentiks.dev",
    component: VisitAgentiks,
  },
];

/**
 * All phrase strings in order, for matching against timing data.
 */
export const V2_PHRASES = V2_PHRASE_CONFIGS.map((c) => c.phrase);
