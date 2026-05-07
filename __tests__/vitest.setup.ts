import { vi } from 'vitest';

// 'server-only' is a marker package whose default entry throws on
// import (Next's bundler intercepts it and resolves to empty.js for
// server contexts). Vitest doesn't have that intercept, so we mock
// the module to a no-op for the entire test run.
vi.mock('server-only', () => ({}));

// 'next/cache' utilities (unstable_cache, revalidateTag) require
// the Next.js IncrementalCache infrastructure which doesn't exist
// during Vitest runs. We mock unstable_cache to a passthrough so
// callers behave as if no caching layer were present, and keep
// revalidateTag as a no-op.
vi.mock('next/cache', () => ({
  unstable_cache:
    <T extends (...args: unknown[]) => unknown>(fn: T): T => fn,
  revalidateTag: () => {},
  revalidatePath: () => {},
}));
