/** A scalar value used by {@link Seg}. */
export type SegValue = string | number;

/** One option in a {@link Seg} — a bare value, or a value + display label. */
export type SegOption = SegValue | { value: SegValue; label: string };

export interface SegProps {
  /** Options to choose from. */
  options: SegOption[];
  /** Currently selected value. */
  value: SegValue;
  /** Called with the chosen value. */
  onChange?: (value: SegValue) => void;
}

/**
 * A segmented control (single-select pill group) on a recessed track. The
 * active segment lifts onto a raised surface. Used for mode switches like
 * "Uzaktan masaüstü / Oyun akışı", resolution, framerate and quality.
 */
export function Seg({ options, value, onChange }: SegProps) {
  return (
    <div
      style={{
        display: 'inline-flex',
        background: 'var(--surface-3)',
        borderRadius: 'var(--r-sm)',
        padding: 3,
        gap: 2,
      }}
    >
      {options.map((o) => {
        const val = typeof o === 'object' ? o.value : o;
        const lab = typeof o === 'object' ? o.label : o;
        const active = val === value;
        return (
          <button
            type="button"
            key={String(val)}
            onClick={() => onChange?.(val)}
            style={{
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              fontSize: 13,
              padding: '6px 13px',
              borderRadius: 7,
              background: active ? 'var(--surface)' : 'transparent',
              color: active ? 'var(--text)' : 'var(--text-muted)',
              boxShadow: active ? 'var(--shadow-xs)' : 'none',
              transition: 'all var(--dur) var(--ease)',
            }}
          >
            {lab}
          </button>
        );
      })}
    </div>
  );
}
