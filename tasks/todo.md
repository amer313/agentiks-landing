# Trailer Fixes Round 2

## Fix 1: Update SCENE_TIMING in brand.ts
- [x] Update reveal duration from 90 to 60
- [x] Shift dashboard from 420 to 390
- [x] Update impact from 720/150 to 690/195
- [x] Update endCard from 870/180 to 885/165

## Fix 2: Logo Reveal faster (60 frames)
- [x] Spring scale-pop from 0 to 1 in ~15 frames
- [x] Flash/bloom effect on appearance
- [x] Text fades in after ~10 frame delay
- [x] Works within 60-frame scene

## Fix 3: Dashboard overhaul - orchestrator + more sections
- [x] Add orchestrator visualization (central core + agent nodes + lines)
- [x] Add integration health panel
- [x] Add workflow progress bars
- [x] Add cost savings metric ($284k)
- [x] Add terminal/log view
- [x] 6 pan-zoom phases with new captions
- [x] Fix caption timing to match pan-zoom phases

## Fix 4: ImpactStats timing for 195 frames
- [x] Extend stat timing to fill 195 frames
- [x] Ensure "Strategy. Development. Orchestration." line gets +1.5s (50 frames)

## Fix 5: Tron Legacy music
- [x] Create generateTronTrack function
- [x] BPM 125, A minor
- [x] Pulsing bass (110Hz sine + octave harmonic)
- [x] Arpeggiated sawtooth synth (16th note patterns)
- [x] Triangle pad layers for atmosphere
- [x] Kick + hi-hat for drive
- [x] Cinematic risers at transitions
- [x] Build structure matching trailer scenes

## After fixes:
- [x] npx tsc --noEmit (clean)
- [x] Regenerate music
- [x] Render trailers (both 16x9 and 9x16)
- [x] Assemble trailers
- [x] Commit and push
