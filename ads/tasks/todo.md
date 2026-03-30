# Trailer Visual Fixes

## Steps
- [x] 1. Update SCENE_TIMING in brand.ts (new timing: hook 150, problem 180, reveal 90, dashboard 300, impact 150, endCard 180)
- [x] 2. Fix LogoReveal.tsx centering -- use flex centering with SVG viewBox directly
- [x] 3. Fix LogoRevealScene.tsx -- logo centered
- [x] 4. Fix EndCard.tsx -- center logo, make it larger (220px wide)
- [x] 5. Rebuild DashboardDemo.tsx -- pan-zoom approach with large dashboard, 5 phases with captions
- [x] 6. Update ProblemMontage.tsx -- bigger icons/text, fit in 180-frame duration
- [x] 7. Update ImpactStats.tsx -- massive numbers (220px), fit in 150 frames
- [x] 8. TrailerComposition.tsx already uses SCENE_TIMING dynamically -- no changes needed
- [x] 9. TypeScript check (npx tsc --noEmit) -- PASS, zero errors
- [ ] 10. Generate music, render, assemble
- [ ] 11. Commit and push
