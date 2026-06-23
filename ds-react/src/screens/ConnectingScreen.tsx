import { useEffect, useState } from 'react';
import { Button } from '../Button';
import { Icon } from '../Icon';
import type { ConnectMode } from './HomeScreen';

export interface ConnectingScreenProps {
  /** The peer being connected to. */
  target?: { name: string; id: string };
  /** Session kind — changes the final step label. */
  mode?: ConnectMode;
  /** Step to start on (0-based). Useful to show progress in a still frame. */
  initialStep?: number;
  /** Called once the final step completes. */
  onReady?: () => void;
  /** Called when the user cancels. */
  onCancel?: () => void;
}

/**
 * The full-bleed connecting overlay shown while a session is established. Pulse
 * rings ripple behind a mode icon, and a checklist walks the handshake: relay →
 * peer discovery & verification → direct P2P tunnel → ready (encrypted session
 * or encoder-up for game streams). Mirrors Pulsar's P2P-first, relay-fallback flow.
 */
export function ConnectingScreen({
  target = { name: 'Ev PC’si', id: '719 204 663' },
  mode = 'remote',
  initialStep = 2,
  onReady,
  onCancel,
}: ConnectingScreenProps) {
  const steps =
    mode === 'game'
      ? ['Relay’e bağlanılıyor', 'Eş bulunuyor & doğrulanıyor', 'Doğrudan P2P tüneli açılıyor', 'Kodlayıcı hazır · akış başlıyor']
      : ['Relay’e bağlanılıyor', 'Eş bulunuyor & doğrulanıyor', 'Doğrudan P2P tüneli açılıyor', 'Şifreli oturum hazır'];
  const [step, setStep] = useState(initialStep);

  useEffect(() => {
    if (step < steps.length - 1) {
      const t = setTimeout(() => setStep(step + 1), step === 0 ? 700 : 750);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => onReady?.(), 800);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', background: 'var(--bg)', zIndex: 5 }}>
      <div style={{ textAlign: 'center', width: 360, maxWidth: '90%' }}>
        <div style={{ position: 'relative', width: 140, height: 140, margin: '0 auto 28px', display: 'grid', placeItems: 'center' }}>
          <span className="cring" style={{ animationDelay: '0s' }} />
          <span className="cring" style={{ animationDelay: '0.9s' }} />
          <span className="cring" style={{ animationDelay: '1.8s' }} />
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: 'var(--accent-soft)',
              display: 'grid',
              placeItems: 'center',
              color: 'var(--accent)',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <Icon name={mode === 'game' ? 'gaming' : 'monitor'} size={30} />
          </div>
        </div>
        <h2 style={{ fontSize: 22, marginBottom: 6 }}>{target.name}</h2>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-faint)', marginBottom: 26 }}>{target.id}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'left', marginBottom: 28 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 11, opacity: i <= step ? 1 : 0.35, transition: 'opacity 0.3s' }}>
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  flex: 'none',
                  display: 'grid',
                  placeItems: 'center',
                  background: i < step ? 'var(--ok)' : i === step ? 'var(--accent)' : 'var(--surface-3)',
                  color: '#fff',
                  transition: 'background 0.3s',
                }}
              >
                {i < step ? (
                  <Icon name="check" size={13} stroke={2.6} />
                ) : i === step ? (
                  <span className="spin" style={{ width: 11, height: 11, border: '2px solid #fff', borderTopColor: 'transparent', borderRadius: '50%' }} />
                ) : (
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--text-faint)' }} />
                )}
              </div>
              <span style={{ fontSize: 14, fontWeight: i === step ? 600 : 500, color: i <= step ? 'var(--text)' : 'var(--text-faint)' }}>{s}</span>
              {i === step && i === 2 && (
                <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--text-faint)' }}>NAT geçişi…</span>
              )}
            </div>
          ))}
        </div>
        <Button variant="ghost" onClick={onCancel} style={{ margin: '0 auto' }}>
          Vazgeç
        </Button>
      </div>
    </div>
  );
}
