export interface PulsarMarkProps {
  /** Square size in px. */
  size?: number;
  /** Stroke/fill color for the rings. Defaults to the indigo accent token. */
  color?: string;
}

/**
 * The Pulsar brand mark: four concentric "pulse rings" (pure circles only),
 * fading outward from a solid core. Use it as the app/wordmark logo. Never
 * redraw the rings as anything other than circles.
 */
export function PulsarMark({ size = 28, color = 'var(--accent)' }: PulsarMarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 52 52" fill="none" style={{ flex: 'none' }}>
      <circle cx="26" cy="26" r="24" stroke={color} strokeWidth="1.5" opacity="0.18" />
      <circle cx="26" cy="26" r="16" stroke={color} strokeWidth="1.75" opacity="0.42" />
      <circle cx="26" cy="26" r="8.5" stroke={color} strokeWidth="2" />
      <circle cx="26" cy="26" r="3.5" fill={color} />
    </svg>
  );
}
