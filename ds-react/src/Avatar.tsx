/** Color theme of an {@link Avatar}. */
export type AvatarTone = 'accent' | 'cyan' | 'ok' | 'warn';

export interface AvatarProps {
  /** Display name — initials are derived from the first two words. */
  name: string;
  /** Color theme. */
  tone?: AvatarTone;
  /** Square size in px (>30 uses a slightly larger corner radius). */
  size?: number;
}

const BG: Record<AvatarTone, string> = {
  accent: 'var(--accent-soft)',
  cyan: 'var(--cyan-soft)',
  ok: 'var(--ok-soft)',
  warn: 'var(--warn-soft)',
};
const FG: Record<AvatarTone, string> = {
  accent: 'var(--accent)',
  cyan: 'var(--cyan)',
  ok: 'var(--ok)',
  warn: 'oklch(0.5 0.13 70)',
};

/**
 * A square monogram avatar. Renders up to two uppercase initials from `name`
 * in the display font over a soft tinted background. Used for devices and
 * "this device" in the sidebar / recent-connection rows.
 */
export function Avatar({ name, tone = 'accent', size = 38 }: AvatarProps) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size > 30 ? 11 : 8,
        background: BG[tone],
        color: FG[tone],
        display: 'grid',
        placeItems: 'center',
        fontWeight: 700,
        fontSize: size * 0.36,
        flex: 'none',
        fontFamily: 'var(--font-display)',
      }}
    >
      {initials}
    </div>
  );
}
