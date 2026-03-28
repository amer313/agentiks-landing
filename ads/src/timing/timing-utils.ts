/**
 * timing-utils.ts
 *
 * Converts ElevenLabs character-level alignment data into word-level timing,
 * matches phrases against the word sequence, and converts seconds to frames.
 */

import { FPS } from "../brand";
import type { TimingAlignment, WordTiming, PhraseTiming } from "../types";

/**
 * Group character-level alignment into word-level timing.
 * ElevenLabs returns parallel arrays of characters and their start/end times.
 * We group consecutive non-space characters into words.
 */
export function charactersToWords(alignment: TimingAlignment): WordTiming[] {
  const { characters, characterStartTimesSeconds, characterEndTimesSeconds } = alignment;
  const words: WordTiming[] = [];
  let currentWord = "";
  let wordStart = -1;
  let wordEnd = -1;

  for (let i = 0; i < characters.length; i++) {
    const char = characters[i];
    const startTime = characterStartTimesSeconds[i];
    const endTime = characterEndTimesSeconds[i];

    if (char === " " || char === "\n" || char === "\t") {
      // Whitespace: flush current word
      if (currentWord.length > 0) {
        words.push({
          word: currentWord,
          startSeconds: wordStart,
          endSeconds: wordEnd,
          startFrame: secondsToFrame(wordStart),
          endFrame: secondsToFrame(wordEnd),
        });
        currentWord = "";
        wordStart = -1;
        wordEnd = -1;
      }
    } else {
      if (currentWord.length === 0) {
        wordStart = startTime;
      }
      currentWord += char;
      wordEnd = endTime;
    }
  }

  // Flush final word
  if (currentWord.length > 0) {
    words.push({
      word: currentWord,
      startSeconds: wordStart,
      endSeconds: wordEnd,
      startFrame: secondsToFrame(wordStart),
      endFrame: secondsToFrame(wordEnd),
    });
  }

  return words;
}

/**
 * Convert seconds to frame number at the project FPS.
 */
export function secondsToFrame(seconds: number): number {
  return Math.round(seconds * FPS);
}

/**
 * Convert frame number to seconds.
 */
export function frameToSeconds(frame: number): number {
  return frame / FPS;
}

/**
 * Normalize text for matching: lowercase, strip punctuation, collapse whitespace.
 */
function normalizeForMatch(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Match a phrase string against a sequence of WordTiming objects.
 * Returns the start/end times for the matched phrase, or null if not found.
 *
 * Uses a sliding window approach: normalize the phrase, then try to match
 * consecutive words from the word list.
 */
export function matchPhrase(
  phrase: string,
  words: WordTiming[],
  searchStartIndex: number = 0
): { timing: PhraseTiming; nextIndex: number } | null {
  const normalizedPhrase = normalizeForMatch(phrase);
  const phraseWords = normalizedPhrase.split(" ").filter((w) => w.length > 0);

  if (phraseWords.length === 0) return null;

  for (let i = searchStartIndex; i <= words.length - phraseWords.length; i++) {
    let matched = true;
    for (let j = 0; j < phraseWords.length; j++) {
      const wordNormalized = normalizeForMatch(words[i + j].word);
      if (wordNormalized !== phraseWords[j]) {
        matched = false;
        break;
      }
    }

    if (matched) {
      const firstWord = words[i];
      const lastWord = words[i + phraseWords.length - 1];
      return {
        timing: {
          phrase,
          startSeconds: firstWord.startSeconds,
          endSeconds: lastWord.endSeconds,
          startFrame: firstWord.startFrame,
          endFrame: lastWord.endFrame,
          durationFrames: lastWord.endFrame - firstWord.startFrame,
          wordTimings: words.slice(i, i + phraseWords.length),
        },
        nextIndex: i + phraseWords.length,
      };
    }
  }

  return null;
}

/**
 * Match all phrases in order against the word list.
 * Phrases must appear in order in the transcript -- each subsequent phrase
 * search starts after the previous match.
 */
export function matchAllPhrases(
  phrases: string[],
  words: WordTiming[]
): PhraseTiming[] {
  const results: PhraseTiming[] = [];
  let searchIndex = 0;

  for (const phrase of phrases) {
    const result = matchPhrase(phrase, words, searchIndex);
    if (result) {
      results.push(result.timing);
      searchIndex = result.nextIndex;
    } else {
      console.warn(`[timing] Could not match phrase: "${phrase}" (searched from word index ${searchIndex})`);
      // Create a placeholder with zero duration so the pipeline doesn't break
      results.push({
        phrase,
        startSeconds: 0,
        endSeconds: 0,
        startFrame: 0,
        endFrame: 0,
        durationFrames: 0,
        wordTimings: [],
      });
    }
  }

  return results;
}

/**
 * Given raw ElevenLabs alignment data, produce a full timing map for a set of phrases.
 */
export function buildPhraseTimingMap(
  alignment: TimingAlignment,
  phrases: string[]
): PhraseTiming[] {
  const words = charactersToWords(alignment);
  return matchAllPhrases(phrases, words);
}

/**
 * Get total duration in frames from alignment data.
 */
export function getTotalDurationFrames(alignment: TimingAlignment): number {
  const { characterEndTimesSeconds } = alignment;
  if (characterEndTimesSeconds.length === 0) return 0;
  const lastEndTime = characterEndTimesSeconds[characterEndTimesSeconds.length - 1];
  return secondsToFrame(lastEndTime);
}
