'use client';

import { useRef, useState } from 'react';

type Edition = {
  slug: string;
  titleEs: string;
  titleEn: string;
  date: string;
};

type ProgressEvent = {
  type: 'progress' | 'summary' | 'error' | 'started';
  processed: number;
  total: number;
  withCta: number;
  withoutCta: number;
  errors: number;
  currentEmail?: string;
  message?: string;
};

export default function AdminClient({ editions }: { editions: Edition[] }) {
  const [slug, setSlug] = useState(editions[0]?.slug ?? '');
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const [token, setToken] = useState('');
  const [dryRun, setDryRun] = useState(true);
  const [testMode, setTestMode] = useState(false);
  const [testEmailsText, setTestEmailsText] = useState('');
  const [confirmStep, setConfirmStep] = useState(false);
  const [running, setRunning] = useState(false);
  const [events, setEvents] = useState<ProgressEvent[]>([]);
  const [summary, setSummary] = useState<ProgressEvent | null>(null);
  const [fatalError, setFatalError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  const latest = events.at(-1);
  const progressPct =
    latest && latest.total > 0 ? Math.round((latest.processed / latest.total) * 100) : 0;

  async function startBlast() {
    setEvents([]);
    setSummary(null);
    setFatalError(null);
    setRunning(true);
    setConfirmStep(false);

    const controller = new AbortController();
    abortRef.current = controller;

    const testEmails = testMode
      ? testEmailsText
          .split(/[\n,]/)
          .map((e) => e.trim())
          .filter(Boolean)
      : null;

    try {
      const response = await fetch('/api/newsletter/blast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          slug,
          language,
          dryRun,
          testEmails: testEmails && testEmails.length > 0 ? testEmails : undefined,
        }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        const text = await response.text().catch(() => '');
        setFatalError(
          `Request failed (${response.status}): ${text || response.statusText}`,
        );
        setRunning(false);
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const parts = buffer.split('\n\n');
        buffer = parts.pop() || '';

        for (const part of parts) {
          const line = part.split('\n').find((l) => l.startsWith('data: '));
          if (!line) continue;
          const payload = line.slice(6).trim();
          if (!payload) continue;
          try {
            const evt = JSON.parse(payload) as ProgressEvent;
            setEvents((prev) => [...prev, evt]);
            if (evt.type === 'summary') setSummary(evt);
            if (evt.type === 'error') setFatalError(evt.message ?? 'Unknown error');
          } catch {
            // ignore malformed event
          }
        }
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        setFatalError((err as Error).message);
      }
    } finally {
      setRunning(false);
    }
  }

  function cancel() {
    abortRef.current?.abort();
    setRunning(false);
  }

  const selectedEdition = editions.find((e) => e.slug === slug);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <header style={styles.header}>
          <h1 style={styles.h1}>Newsletter Blast</h1>
          <p style={styles.sub}>
            Panel interno · Uso autorizado exclusivamente por el equipo de
            Marketing Digital.
          </p>
        </header>

        <section style={styles.section}>
          <label style={styles.label}>Edición</label>
          <select
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            disabled={running}
            style={styles.input}
          >
            {editions.map((ed) => (
              <option key={ed.slug} value={ed.slug}>
                {ed.date} · {ed.titleEs}
              </option>
            ))}
          </select>
          {selectedEdition && (
            <div style={styles.hint}>
              ES: {selectedEdition.titleEs}
              <br />
              EN: {selectedEdition.titleEn}
            </div>
          )}
        </section>

        <section style={styles.section}>
          <label style={styles.label}>Idioma</label>
          <div style={styles.row}>
            <label style={styles.radio}>
              <input
                type="radio"
                name="lang"
                value="es"
                checked={language === 'es'}
                onChange={() => setLanguage('es')}
                disabled={running}
              />{' '}
              Español
            </label>
            <label style={styles.radio}>
              <input
                type="radio"
                name="lang"
                value="en"
                checked={language === 'en'}
                onChange={() => setLanguage('en')}
                disabled={running}
              />{' '}
              English
            </label>
          </div>
        </section>

        <section style={styles.section}>
          <label style={styles.label}>Token de autorización</label>
          <input
            type="password"
            autoComplete="off"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="NEWSLETTER_BLAST_SECRET"
            disabled={running}
            style={styles.input}
          />
          <div style={styles.hint}>
            Se envía como <code>Authorization: Bearer …</code>. No se guarda en
            el navegador.
          </div>
        </section>

        <section style={styles.section}>
          <label style={styles.checkbox}>
            <input
              type="checkbox"
              checked={dryRun}
              onChange={(e) => setDryRun(e.target.checked)}
              disabled={running}
            />{' '}
            <strong>Dry run</strong> — clasifica suscriptores contra BOS pero{' '}
            <em>no envía</em> ningún correo.
          </label>
          <label style={styles.checkbox}>
            <input
              type="checkbox"
              checked={testMode}
              onChange={(e) => setTestMode(e.target.checked)}
              disabled={running}
            />{' '}
            <strong>Modo prueba</strong> — usa una lista manual de emails en
            lugar de la audiencia de Resend.
          </label>
          {testMode && (
            <textarea
              value={testEmailsText}
              onChange={(e) => setTestEmailsText(e.target.value)}
              placeholder={'email1@ejemplo.com\nemail2@ejemplo.com'}
              disabled={running}
              rows={4}
              style={{ ...styles.input, fontFamily: 'monospace' }}
            />
          )}
        </section>

        <section style={styles.section}>
          {!running && !confirmStep && (
            <button
              type="button"
              onClick={() => setConfirmStep(true)}
              disabled={!token || !slug}
              style={styles.primaryButton}
            >
              Preparar envío
            </button>
          )}
          {!running && confirmStep && (
            <div style={styles.confirmBox}>
              <p style={{ margin: 0, fontWeight: 600 }}>
                {dryRun
                  ? 'Ejecutarás un DRY RUN (sin enviar correos reales).'
                  : 'Se enviarán correos REALES a los suscriptores.'}
              </p>
              <div style={styles.row}>
                <button type="button" onClick={startBlast} style={styles.primaryButton}>
                  {dryRun ? 'Ejecutar dry run' : 'Confirmar y enviar'}
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmStep(false)}
                  style={styles.secondaryButton}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
          {running && (
            <button type="button" onClick={cancel} style={styles.secondaryButton}>
              Cancelar proceso
            </button>
          )}
        </section>

        {(running || events.length > 0) && (
          <section style={styles.progressSection}>
            <div style={styles.progressBarWrap}>
              <div
                style={{
                  ...styles.progressBarFill,
                  width: `${progressPct}%`,
                }}
              />
            </div>
            <div style={styles.metricsRow}>
              <Metric label="Procesados" value={latest?.processed ?? 0} />
              <Metric label="Total" value={latest?.total ?? 0} />
              <Metric label="Con CTA" value={latest?.withCta ?? 0} />
              <Metric label="Sin CTA" value={latest?.withoutCta ?? 0} />
              <Metric label="Errores" value={latest?.errors ?? 0} tone="error" />
            </div>
            {latest?.currentEmail && (
              <div style={styles.currentEmail}>→ {latest.currentEmail}</div>
            )}
          </section>
        )}

        {summary && (
          <section style={styles.summaryBox}>
            <h2 style={styles.h2}>Resumen</h2>
            <ul style={styles.summaryList}>
              <li>Procesados: {summary.processed} / {summary.total}</li>
              <li>Con CTA: {summary.withCta}</li>
              <li>Sin CTA: {summary.withoutCta}</li>
              <li>Errores: {summary.errors}</li>
            </ul>
            {summary.message && <p style={styles.hint}>{summary.message}</p>}
          </section>
        )}

        {fatalError && (
          <section style={styles.errorBox}>
            <strong>Error</strong>
            <div>{fatalError}</div>
          </section>
        )}
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone?: 'error';
}) {
  return (
    <div style={styles.metric}>
      <div style={styles.metricLabel}>{label}</div>
      <div
        style={{
          ...styles.metricValue,
          color: tone === 'error' && value > 0 ? '#b91c1c' : '#001540',
        }}
      >
        {value}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#f6f9fc',
    padding: '48px 16px',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, sans-serif',
    color: '#111827',
  },
  card: {
    maxWidth: 720,
    margin: '0 auto',
    background: '#fff',
    borderRadius: 12,
    boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
    padding: 32,
  },
  header: { borderBottom: '3px solid #B2904D', paddingBottom: 16, marginBottom: 24 },
  h1: { margin: 0, fontSize: 24, color: '#001540', fontWeight: 700 },
  h2: { margin: '0 0 12px 0', fontSize: 18, color: '#001540' },
  sub: { margin: '4px 0 0 0', color: '#6b7280', fontSize: 13 },
  section: { marginBottom: 20 },
  label: {
    display: 'block',
    fontSize: 13,
    fontWeight: 600,
    color: '#001540',
    marginBottom: 6,
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: 6,
    fontSize: 14,
    background: '#fff',
    color: '#111827',
    boxSizing: 'border-box' as const,
  },
  hint: { fontSize: 12, color: '#6b7280', marginTop: 6 },
  row: { display: 'flex', gap: 12, flexWrap: 'wrap' as const },
  radio: { fontSize: 14, cursor: 'pointer' },
  checkbox: { display: 'block', fontSize: 14, marginBottom: 8, cursor: 'pointer' },
  primaryButton: {
    background: '#001540',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    padding: '10px 20px',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
  },
  secondaryButton: {
    background: '#fff',
    color: '#001540',
    border: '1px solid #001540',
    borderRadius: 6,
    padding: '10px 20px',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
  },
  confirmBox: {
    background: '#fffbeb',
    border: '1px solid #fcd34d',
    borderRadius: 6,
    padding: 16,
  },
  progressSection: {
    background: '#f9fafb',
    borderRadius: 8,
    padding: 16,
    marginTop: 20,
  },
  progressBarWrap: {
    height: 10,
    background: '#e5e7eb',
    borderRadius: 999,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBarFill: {
    height: '100%',
    background: '#B2904D',
    transition: 'width 200ms ease',
  },
  metricsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: 8,
  },
  metric: {
    background: '#fff',
    padding: '8px 10px',
    borderRadius: 6,
    textAlign: 'center' as const,
  },
  metricLabel: { fontSize: 11, color: '#6b7280', textTransform: 'uppercase' as const },
  metricValue: { fontSize: 18, fontWeight: 700 },
  currentEmail: { fontSize: 12, color: '#6b7280', marginTop: 12, fontFamily: 'monospace' },
  summaryBox: {
    background: '#ecfdf5',
    border: '1px solid #6ee7b7',
    borderRadius: 6,
    padding: 16,
    marginTop: 20,
  },
  summaryList: { margin: 0, paddingLeft: 20, fontSize: 14, color: '#065f46' },
  errorBox: {
    background: '#fef2f2',
    border: '1px solid #fca5a5',
    borderRadius: 6,
    padding: 16,
    marginTop: 20,
    color: '#991b1b',
    fontSize: 14,
  },
};
