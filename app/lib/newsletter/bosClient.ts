import type { BosPerson, BosSearchResponse } from './types';
import { emailsMatchCaseInsensitive } from './classify';

const BOS_SEARCH_URL = 'https://bos.manuelsolis.com/api/persons/search';
const DEFAULT_TIMEOUT_MS = 10000;

export interface BosLookupResult {
  person: BosPerson | null;
  failed: boolean;
  status?: number;
  errorMessage?: string;
}

export async function lookupPersonByEmail(email: string): Promise<BosLookupResult> {
  const token = process.env.BOS_API_TOKEN;
  if (!token) {
    return { person: null, failed: true, errorMessage: 'BOS_API_TOKEN not configured' };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  try {
    const response = await fetch(BOS_SEARCH_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return {
        person: null,
        failed: true,
        status: response.status,
        errorMessage: `BOS returned ${response.status}`,
      };
    }

    const json = (await response.json()) as BosSearchResponse;

    if (!json.ok || !Array.isArray(json.data)) {
      return { person: null, failed: true, errorMessage: 'Unexpected BOS response shape' };
    }

    const match = json.data.find((p) => emailsMatchCaseInsensitive(p.email, email)) ?? null;
    return { person: match, failed: false };
  } catch (error) {
    clearTimeout(timeoutId);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return { person: null, failed: true, errorMessage: message };
  }
}

export class BosRateLimiter {
  private readonly maxPerWindow: number;
  private readonly windowMs: number;
  private timestamps: number[] = [];

  constructor(maxPerWindow = 55, windowMs = 60_000) {
    this.maxPerWindow = maxPerWindow;
    this.windowMs = windowMs;
  }

  async acquire(): Promise<void> {
    const now = Date.now();
    this.timestamps = this.timestamps.filter((t) => now - t < this.windowMs);

    if (this.timestamps.length < this.maxPerWindow) {
      this.timestamps.push(now);
      return;
    }

    const oldest = this.timestamps[0];
    const waitMs = this.windowMs - (now - oldest) + 50;
    await sleep(waitMs);
    return this.acquire();
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
