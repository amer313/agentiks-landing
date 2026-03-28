# Phrase-Level Visual-Audio Sync Refactor

## Phase 1: Shared Infrastructure (self) -- COMPLETE
- [x] Create `src/timing/timing-utils.ts` -- character-to-word grouping, phrase matching, frame conversion
- [x] Create `src/components/sync/useWordTiming.ts` -- React hook for current word/phrase detection
- [x] Create `src/components/sync/PhraseTimeline.tsx` -- Main component mapping timing + config to visuals
- [x] Update `scripts/utils/elevenlabs-client.ts` -- Add `generateSpeechWithTimestamps()` function
- [x] Update `src/types.ts` -- Add timing and phrase config types
- [x] Update `src/brand.ts` -- Add voice settings overrides

## Phase 2: Phrase Visual Components (3 parallel sub-agents) -- COMPLETE
- [x] Agent A: Video 1 phrase visuals (~18 components in `src/components/phrase-visuals/v1/`)
- [x] Agent B: Video 2 phrase visuals (~16 components in `src/components/phrase-visuals/v2/`)
- [x] Agent C: Video 3 phrase visuals (~16 components in `src/components/phrase-visuals/v3/`)

## Phase 3: Phrase Map Configs (self) -- COMPLETE
- [x] Create `src/timing/v1-phrases.ts` -- Maps each phrase to its visual component
- [x] Create `src/timing/v2-phrases.ts`
- [x] Create `src/timing/v3-phrases.ts`

## Phase 4: Rewrite Compositions (self) -- COMPLETE
- [x] Rewrite `src/compositions/Video1TheProblem.tsx` -- Use PhraseTimeline with placeholder timings
- [x] Rewrite `src/compositions/Video2TheTransformation.tsx`
- [x] Rewrite `src/compositions/Video3TheEdge.tsx`
- [x] Update `src/Root.tsx` -- Composition registrations match rewritten compositions

## Phase 5: Audio Pipeline + Cleanup (self) -- COMPLETE
- [x] Rewrite `scripts/generate-audio.ts` -- Use `generateSpeechWithTimestamps()`, concat to mixed WAVs with FFmpeg
- [x] Delete `scripts/generate-avatars.ts` and `scripts/utils/heygen-client.ts`
- [x] Delete `scripts/convert-wav-to-mp3.ts` (no longer needed without HeyGen)
- [x] Update `scripts/utils/file-helpers.ts` -- Remove HEYGEN_API_KEY requirement
- [x] Remove AvatarScene import from `src/components/scenes/index.ts`
- [x] Update `scripts/build-all.ts` -- Remove avatar step, pipeline is: audio -> music -> render -> stills -> assemble
- [x] Verify `package.json` -- No stale HeyGen scripts
- [x] Clean unused imports from compositions (useCurrentFrame, buildPhraseTimingMap, etc.)

## Phase 6: Type-check -- COMPLETE
- [x] Run `npx tsc --noEmit` -- zero errors
