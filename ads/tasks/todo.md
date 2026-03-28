# Audio-Visual Sync Rebuild -- Per-Sentence Architecture

## Steps
- [x] 1. Update brand.ts: new sentence-based VO_SCRIPTS + voice settings (stability=0.25, speed=1.05)
- [x] 2. Add SentenceTiming type to types.ts
- [x] 3. Create SentenceVisual component (maps visual names to phrase-visual components)
- [x] 4. Rewrite generate-audio.ts for per-sentence generation + timing JSON output
- [x] 5. Rewrite Video1TheProblem.tsx for per-sentence Sequences
- [x] 6. Rewrite Video2TheTransformation.tsx for per-sentence Sequences
- [x] 7. Rewrite Video3TheEdge.tsx for per-sentence Sequences
- [x] 8. Update Root.tsx with new estimated durations (~1050 frames each)
- [x] 9. TypeScript check (npx tsc --noEmit) -- PASS, zero errors
- [x] 10. Generate audio -- V1: 1185fr/39.5s, V2: 999fr/33.3s, V3: 908fr/30.3s
- [x] 11. Update durations in Root.tsx, re-check TypeScript -- PASS
- [x] 12. Render videos, stills, assemble -- V1: 39.5s, V2: 33.3s, V3: 30.3s
- [ ] 13. Commit and push
