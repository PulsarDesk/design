/** Mac-style traffic-light dot colors (close / minimize / zoom). */
const DOTS = ['#ED6A5E', '#F4BF4F', '#61C554'];

export interface WindowChromeProps {
  /** Centered window title, e.g. "Pulsar — Bağlan". */
  title: string;
  /** Called when the red (close) dot is clicked. */
  onClose?: () => void;
}

/**
 * The frameless-window titlebar: three traffic-light dots on the left, a
 * centered title, and the app version on the right. Sits at the top of the
 * {@link AppShell}.
 */
export function WindowChrome({ title, onClose }: WindowChromeProps) {
  return (
    <div
      style={{
        height: 44,
        flex: 'none',
        display: 'flex',
        alignItems: 'center',
        padding: '0 14px',
        borderBottom: '1px solid var(--border)',
        background: 'var(--surface)',
        userSelect: 'none',
        position: 'relative',
      }}
    >
      <div style={{ display: 'flex', gap: 8 }}>
        {DOTS.map((c, i) => (
          <span
            key={i}
            onClick={i === 0 ? onClose : undefined}
            style={{ width: 12, height: 12, borderRadius: '50%', background: c, cursor: i === 0 ? 'pointer' : 'default' }}
          />
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          textAlign: 'center',
          fontSize: 13,
          fontWeight: 600,
          color: 'var(--text-muted)',
          pointerEvents: 'none',
        }}
      >
        {title}
      </div>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-faint)' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5 }}>Pulsar v1.0</span>
      </div>
    </div>
  );
}
