import type { CSSProperties, ReactNode } from 'react';

/** Semantic color of a {@link Badge}. */
export type BadgeTone = 'online' | 'stream' | 'accent' | 'warn' | 'danger' | 'neutral';

export interface BadgeProps {
  /** Semantic tone — drives background + foreground tokens. */
  tone?: BadgeTone;
  /** Label content. */
  children?: ReactNode;
  /** Extra inline styles. */
  style?: CSSProperties;
}

const TONES: Record<BadgeTone, { bg: string; fg: string }> = {
  online: { bg: 'var(--ok-soft)', fg: 'var(--ok)' },
  stream: { bg: 'var(--cyan-soft)', fg: 'var(--cyan)' },
  accent: { bg: 'var(--accent-soft)', fg: 'var(--accent-press)' },
  warn: { bg: 'var(--warn-soft)', fg: 'oklch(0.5 0.13 70)' },
  danger: { bg: 'var(--danger-soft)', fg: 'var(--danger)' },
  neutral: { bg: 'var(--surface-3)', fg: 'var(--text-muted)' },
};

/**
 * A small pill-shaped status label. Non-neutral tones show a leading dot in the
 * foreground color. Used for "Hazır", "Çevrimiçi", connection mode, latency, etc.
 */
export function Badge({ tone = 'neutral', children, style }: BadgeProps) {
  const c = TONES[tone] ?? TONES.neutral;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 12.5,
        fontWeight: 600,
        padding: '4px 10px',
        borderRadius: 'var(--r-pill)',
        background: c.bg,
        color: c.fg,
        ...style,
      }}
    >
      {tone !== 'neutral' && <span style={{ width: 6, height: 6, borderRadius: '50%', background: c.fg }} />}
      {children}
    </span>
  );
}
