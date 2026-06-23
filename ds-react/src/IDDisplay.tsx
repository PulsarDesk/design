export interface IDDisplayProps {
  /** Uppercase mono caption above the id (e.g. "Senin kimliğin · relay'den"). */
  label?: string;
  /** The device id, typically a relay-issued 9-digit code like "482 913 056". */
  id: string;
}

/**
 * A boxed monospace device-identity readout: a small uppercased caption over the
 * relay-issued device id. Pulsar device ids are 9 digits issued by the relay
 * (rendezvous) server and grouped in threes.
 */
export function IDDisplay({ label = 'Senin kimliğin · relay’den', id }: IDDisplayProps) {
  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r)',
        padding: '11px 12px',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--text-faint)',
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 16,
          fontWeight: 500,
          letterSpacing: '0.04em',
          marginTop: 4,
        }}
      >
        {id}
      </div>
    </div>
  );
}
