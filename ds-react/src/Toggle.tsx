export interface ToggleProps {
  /** Whether the switch is on. */
  on: boolean;
  /** Called with the next value when toggled. */
  onChange?: (next: boolean) => void;
}

/**
 * A pill switch. Indigo accent track when on, neutral when off, with a white
 * knob that slides between the ends. Used for every boolean setting.
 */
export function Toggle({ on, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onChange?.(!on)}
      style={{
        width: 42,
        height: 25,
        borderRadius: 999,
        border: 'none',
        cursor: 'pointer',
        padding: 3,
        background: on ? 'var(--accent)' : 'var(--border-strong)',
        transition: 'background var(--dur) var(--ease)',
        display: 'flex',
        justifyContent: on ? 'flex-end' : 'flex-start',
      }}
    >
      <span
        style={{
          width: 19,
          height: 19,
          borderRadius: '50%',
          background: '#fff',
          display: 'block',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          transition: 'all var(--dur) var(--ease)',
        }}
      />
    </button>
  );
}
