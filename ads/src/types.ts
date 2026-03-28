export interface AgentCardData {
  label: string;
  status: string;
  color: string;
  px: number;
  py: number;
  subs: string[];
}

export interface TerminalLine {
  text: string;
}

export interface BrandColors {
  brand: string;
  brandLight: string;
  brandDark: string;
  cyan: string;
  magenta: string;
  purple: string;
  logoCyan: string;
  green: string;
  amber: string;
  red: string;
  background: string;
  surface: string;
  surface2: string;
  foreground: string;
  mutedForeground: string;
  line: string;
}

export interface ValueProp {
  title: string;
  desc: string;
  iconColor: string;
}

export interface CarouselCard {
  id: string;
  heading: string;
  subheading: string;
  body: string;
  phaseNumber?: number;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  override?: string;
}

// --- Timing & Phrase-Visual Sync Types ---

/**
 * Raw alignment data from ElevenLabs convertWithTimestamps.
 * Uses camelCase to match the ElevenLabs SDK (CharacterAlignmentResponseModel).
 */
export interface TimingAlignment {
  characters: string[];
  characterStartTimesSeconds: number[];
  characterEndTimesSeconds: number[];
}

/** Word-level timing derived from character alignment */
export interface WordTiming {
  word: string;
  startSeconds: number;
  endSeconds: number;
  startFrame: number;
  endFrame: number;
}

/** Timing for a matched phrase within the voiceover */
export interface PhraseTiming {
  phrase: string;
  startSeconds: number;
  endSeconds: number;
  startFrame: number;
  endFrame: number;
  durationFrames: number;
  wordTimings: WordTiming[];
}

/** Props that every phrase visual component receives */
export interface PhraseVisualProps {
  /** 0-1 progress through this phrase's duration */
  progress: number;
  /** Total frames this phrase lasts */
  durationFrames: number;
}

/** Configuration entry mapping a phrase to its visual component */
export interface PhraseVisualConfig {
  /** The phrase text to match in the voiceover transcript */
  phrase: string;
  /** React component to render during this phrase */
  component: React.ComponentType<PhraseVisualProps>;
}

/** Full timing JSON saved alongside audio files */
export interface TimingData {
  /** Which video/scene this timing belongs to */
  videoId: string;
  sceneKey: string;
  /** The full voiceover text */
  text: string;
  /** Raw ElevenLabs alignment */
  alignment: TimingAlignment;
  /** Total duration in seconds */
  totalDurationSeconds: number;
  /** Total duration in frames at 30fps */
  totalDurationFrames: number;
}

/**
 * Response shape from ElevenLabs convertWithTimestamps.
 * Matches AudioWithTimestampsResponse from @elevenlabs/elevenlabs-js SDK.
 */
export interface ElevenLabsTimestampResponse {
  audioBase64: string;
  alignment?: TimingAlignment;
  normalizedAlignment?: TimingAlignment;
}

/** Voice settings for ElevenLabs TTS */
export interface VoiceSettings {
  stability: number;
  similarityBoost: number;
  style: number;
  speed: number;
}
