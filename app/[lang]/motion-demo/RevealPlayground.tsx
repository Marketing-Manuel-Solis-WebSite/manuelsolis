'use client';

import { useState } from 'react';
import { Reveal } from '../../components/motion';
import type { RevealVariant } from '../../components/motion';

const VARIANTS: RevealVariant[] = ['up', 'down', 'left', 'right', 'fade', 'scale', 'blur'];

/**
 * Interactive control for the demo: pick a Reveal variant and replay it
 * (a `key` bump remounts the Reveal so the entrance animation re-runs).
 * Dev-only showcase.
 */
export default function RevealPlayground() {
  const [variant, setVariant] = useState<RevealVariant>('up');
  const [nonce, setNonce] = useState(0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {VARIANTS.map((v) => (
          <button
            key={v}
            onClick={() => { setVariant(v); setNonce((n) => n + 1); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
              variant === v
                ? 'bg-gold-500 text-navy-500 border-gold-500'
                : 'bg-white/5 text-white/80 border-white/15 hover:border-gold-500/50'
            }`}
          >
            {v}
          </button>
        ))}
        <button
          onClick={() => setNonce((n) => n + 1)}
          className="px-4 py-2 rounded-lg text-sm font-medium border border-white/15 bg-white/5 text-white/80 hover:border-white/40"
        >
          ↻ Replay
        </button>
      </div>

      <div className="min-h-[140px] grid place-items-center rounded-2xl border border-white/10 bg-white/5 p-8">
        <Reveal key={`${variant}-${nonce}`} variant={variant} once={false} className="text-center">
          <p className="text-gold-500 text-sm font-bold uppercase tracking-widest mb-2">variant=&quot;{variant}&quot;</p>
          <p className="text-2xl font-light text-white">Contenido revelado con profundidad</p>
        </Reveal>
      </div>
    </div>
  );
}
