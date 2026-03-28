/**
 * v3-phrases.ts
 *
 * Maps phrase strings from Video 3 ("The Edge") voiceover
 * to their corresponding visual components.
 */

import type { PhraseVisualConfig } from "../types";
import {
  ModelDrop,
  FrameworksProtocols,
  Speedometer,
  NewModelsWeekly,
  CantKeepUp,
  ThatsOurJob,
  TrackBreakthroughs,
  IntegrateInDays,
  BehindTheScenes,
  RunYourBusiness,
  BuildAndDisappear,
  WeeklyEvolution,
  Untouchable,
  CatchUpCost,
  VisitAgentiksV3,
  WhatsPossible,
} from "../components/phrase-visuals/v3";

/**
 * Video 3 phrase visual configurations.
 * Order matters -- phrases are matched sequentially in the transcript.
 */
export const V3_PHRASE_CONFIGS: PhraseVisualConfig[] = [
  // Scene 1: Avatar open
  {
    phrase: "three new AI models dropped",
    component: ModelDrop,
  },
  {
    phrase: "Two new frameworks. One new protocol",
    component: FrameworksProtocols,
  },

  // Scene 2: Headline cascade
  {
    phrase: "AI moves faster than any industry",
    component: Speedometer,
  },
  {
    phrase: "New models every week",
    component: NewModelsWeekly,
  },
  {
    phrase: "Most businesses can't keep up",
    component: CantKeepUp,
  },
  {
    phrase: "That's our job",
    component: ThatsOurJob,
  },

  // Scene 3: Value props
  {
    phrase: "We track every breakthrough",
    component: TrackBreakthroughs,
  },
  {
    phrase: "we integrate it in days",
    component: IntegrateInDays,
  },
  {
    phrase: "get smarter behind the scenes",
    component: BehindTheScenes,
  },
  {
    phrase: "Running your business",
    component: RunYourBusiness,
  },

  // Scene 4: Avatar return
  {
    phrase: "build you something and disappear",
    component: BuildAndDisappear,
  },
  {
    phrase: "make it better. Every single week",
    component: WeeklyEvolution,
  },

  // Scene 5: Stakes
  {
    phrase: "untouchable in two years",
    component: Untouchable,
  },
  {
    phrase: "spend twice as much trying to catch up",
    component: CatchUpCost,
  },

  // Scene 6: CTA
  {
    phrase: "Visit agentiks.dev",
    component: VisitAgentiksV3,
  },
  {
    phrase: "show you what's possible",
    component: WhatsPossible,
  },
];

/**
 * All phrase strings in order, for matching against timing data.
 */
export const V3_PHRASES = V3_PHRASE_CONFIGS.map((c) => c.phrase);
