'use client';

import { useCallback, useEffect, useRef } from 'react';
import { withBasePath } from '@/lib/basePath';

/**
 * Narration controller for the patient-education player.
 *
 * speak(text, onEnd) plays one line, preferring premium ElevenLabs audio (via /api/tts)
 * and falling back to the browser's SpeechSynthesis when TTS isn't configured. onEnd fires
 * when the line finishes (or errors), so the player can advance in sync with the voice.
 *
 * A monotonic generation counter guarantees that a superseded line never fires a stale
 * onEnd or keeps audio playing after the scene has moved on.
 */

// Module-level memo: once we learn whether /api/tts is configured, stop re-probing it.
let elevenAvailable: boolean | null = null;

function pickVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  const prefs = [
    'Google US English',
    'Microsoft Aria Online (Natural) - English (United States)',
    'Microsoft Jenny Online (Natural) - English (United States)',
    'Samantha',
    'Allison',
    'Karen',
    'Moira',
  ];
  for (const name of prefs) {
    const match = voices.find((v) => v.name === name);
    if (match) return match;
  }
  return (
    voices.find((v) => /en[-_]US/i.test(v.lang)) ||
    voices.find((v) => v.lang?.toLowerCase().startsWith('en')) ||
    null
  );
}

export function useNarration() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const urlRef = useRef<string | null>(null);
  const genRef = useRef(0);

  const stop = useCallback(() => {
    genRef.current += 1;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current = null;
    }
    if (urlRef.current) {
      URL.revokeObjectURL(urlRef.current);
      urlRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const speakWithBrowser = useCallback((text: string, gen: number, onEnd: () => void) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      onEnd();
      return;
    }
    const utter = new SpeechSynthesisUtterance(text);
    const voice = pickVoice();
    if (voice) utter.voice = voice;
    utter.rate = 0.98;
    utter.pitch = 1.02;
    utter.onend = () => gen === genRef.current && onEnd();
    utter.onerror = () => gen === genRef.current && onEnd();
    window.speechSynthesis.speak(utter);
  }, []);

  const speak = useCallback(
    async (text: string, onEnd: () => void) => {
      stop();
      const gen = genRef.current;

      if (elevenAvailable !== false) {
        try {
          const res = await fetch(withBasePath('/api/tts'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text }),
          });
          if (gen !== genRef.current) return; // superseded while fetching
          if (res.ok) {
            elevenAvailable = true;
            const blob = await res.blob();
            if (gen !== genRef.current) return;
            const url = URL.createObjectURL(blob);
            urlRef.current = url;
            const audio = new Audio(url);
            audioRef.current = audio;
            audio.onended = () => gen === genRef.current && onEnd();
            audio.onerror = () => gen === genRef.current && speakWithBrowser(text, gen, onEnd);
            await audio.play().catch(() => {
              if (gen === genRef.current) speakWithBrowser(text, gen, onEnd);
            });
            return;
          }
          elevenAvailable = false;
        } catch {
          elevenAvailable = false;
          if (gen !== genRef.current) return;
        }
      }
      speakWithBrowser(text, gen, onEnd);
    },
    [stop, speakWithBrowser],
  );

  useEffect(() => stop, [stop]);

  return { speak, stop };
}
