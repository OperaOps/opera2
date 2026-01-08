export function safeJson<T>(s: string): { ok: true; value: T } | { ok: false; error: string } {
  try {
    const parsed = JSON.parse(s);
    return { ok: true, value: parsed };
  } catch (error: any) {
    return { ok: false, error: error.message };
  }
}
