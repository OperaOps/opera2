/**
 * ElevenLabs text-to-speech for patient-education narration.
 *
 * POST { text } -> audio/mpeg. Requires ELEVENLABS_API_KEY. Generated audio is cached
 * to /public/audio/tts-cache/<hash>.mp3 so repeat plays are instant and never re-billed.
 * If no key is configured, returns 503 and the player falls back to browser speech.
 */

import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';

export const runtime = 'nodejs';

const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || '21m00Tcm4TlvDq8ikWAM'; // calm female (Rachel)
const MODEL_ID = process.env.ELEVENLABS_MODEL_ID || 'eleven_turbo_v2_5';

const AUDIO_HEADERS = {
  'Content-Type': 'audio/mpeg',
  'Cache-Control': 'public, max-age=31536000, immutable',
};

export async function POST(req: Request) {
  const key = process.env.ELEVENLABS_API_KEY;
  if (!key) return new Response('TTS not configured', { status: 503 });

  let text = '';
  try {
    ({ text } = await req.json());
  } catch {
    return new Response('bad request', { status: 400 });
  }
  if (!text || typeof text !== 'string') return new Response('missing text', { status: 400 });

  const hash = crypto.createHash('sha1').update(`${VOICE_ID}|${MODEL_ID}|${text}`).digest('hex');
  const cacheDir = path.join(process.cwd(), 'public', 'audio', 'tts-cache');
  const file = path.join(cacheDir, `${hash}.mp3`);

  // Serve from cache when available.
  try {
    const cached = await fs.readFile(file);
    return new Response(new Uint8Array(cached), { headers: AUDIO_HEADERS });
  } catch {
    /* not cached yet */
  }

  const upstream = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
    method: 'POST',
    headers: {
      'xi-api-key': key,
      'Content-Type': 'application/json',
      Accept: 'audio/mpeg',
    },
    body: JSON.stringify({
      text,
      model_id: MODEL_ID,
      voice_settings: { stability: 0.45, similarity_boost: 0.8, style: 0.15, use_speaker_boost: true },
    }),
  });

  if (!upstream.ok) {
    const detail = await upstream.text().catch(() => '');
    return new Response(`tts upstream error: ${detail.slice(0, 200)}`, { status: 502 });
  }

  const buf = Buffer.from(await upstream.arrayBuffer());
  try {
    await fs.mkdir(cacheDir, { recursive: true });
    await fs.writeFile(file, buf);
  } catch {
    /* read-only fs (e.g. serverless) — still return the audio */
  }
  return new Response(new Uint8Array(buf), { headers: AUDIO_HEADERS });
}
