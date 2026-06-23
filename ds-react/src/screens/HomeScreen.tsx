import { useState } from 'react';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card } from '../Card';
import { Icon } from '../Icon';
import { RecentRow } from '../RecentRow';
import { ScreenHeader } from '../ScreenHeader';
import { Seg } from '../Seg';
import { RECENTS, SELF_ID, type Recent } from '../data';

/** Session kind for the connect flow. */
export type ConnectMode = 'remote' | 'game';

export interface HomeScreenProps {
  /** This device's relay-issued id. */
  selfId?: string;
  /** Current mode (remote desktop vs game stream). */
  mode?: ConnectMode;
  /** Called when the mode segmented control changes. */
  setMode?: (mode: ConnectMode) => void;
  /** Recent connection shortcuts. */
  recents?: Recent[];
  /** Called to start a connection to a target. */
  onConnect?: (target: { name: string; id: string; type?: string }, mode: ConnectMode) => void;
}

/**
 * The Connect (Bağlan) home screen: two cards side by side. Left — "this device"
 * shows the relay-issued device id and a one-time password to share. Right —
 * connect to a remote id with a field, a primary action, and recent connections.
 * The header toggles between Uzaktan masaüstü and Oyun akışı.
 */
export function HomeScreen({ selfId = SELF_ID, mode = 'remote', setMode, recents = RECENTS, onConnect }: HomeScreenProps) {
  const [target, setTarget] = useState('');
  const [copied, setCopied] = useState(false);
  const pw = '7yf2-qk';
  const fmt = (v: string) =>
    v.replace(/\D/g, '').slice(0, 9).replace(/(\d{3})(?=\d)/g, '$1 ').trim();
  const enough = target.replace(/\D/g, '').length >= 6;
  const copyId = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };
  const go = () => {
    if (enough) onConnect?.({ name: 'Uzak Cihaz', id: fmt(target), type: 'pc' }, mode);
  };

  return (
    <div>
      <ScreenHeader
        title="Bağlan"
        sub="Kimliğini paylaş ya da uzak bir cihaza bağlan."
        right={
          <Seg
            value={mode}
            onChange={(v) => setMode?.(v as ConnectMode)}
            options={[
              { value: 'remote', label: 'Uzaktan masaüstü' },
              { value: 'game', label: 'Oyun akışı' },
            ]}
          />
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        {/* This device */}
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>
              Bu cihaza izin ver
            </span>
            <Badge tone="online">Hazır</Badge>
          </div>
          <div style={{ fontSize: 12.5, color: 'var(--text-muted)', fontWeight: 600, marginBottom: 7 }}>Cihaz kimliği</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 27, fontWeight: 500, letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{selfId}</span>
            <button type="button" className="icon-btn" onClick={copyId} title="Kopyala" style={{ marginLeft: 'auto' }}>
              <Icon name={copied ? 'check' : 'copy'} size={17} />
            </button>
          </div>
          <div style={{ height: 1, background: 'var(--border)', margin: '20px 0' }} />
          <div style={{ fontSize: 12.5, color: 'var(--text-muted)', fontWeight: 600, marginBottom: 7 }}>Tek seferlik şifre</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 500, letterSpacing: '0.12em' }}>{pw}</span>
            <button type="button" className="icon-btn" title="Yenile" style={{ marginLeft: 'auto' }}>
              <Icon name="refresh" size={16} />
            </button>
          </div>
          <p style={{ fontSize: 12.5, color: 'var(--text-faint)', marginTop: 16, lineHeight: 1.5 }}>
            Bu kimlik relay sunucusundan atanır. Paylaşırsan başkaları cihazına bağlanabilir; bağlantı önce P2P, gerekirse relay
            üzerinden kurulur. Şifre her oturumdan sonra yenilenir.
          </p>
        </Card>

        {/* Connect to remote */}
        <Card style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 18 }}>
            {mode === 'game' ? 'Oyun oturumu başlat' : 'Uzak cihaza bağlan'}
          </span>
          <label style={{ fontSize: 12.5, color: 'var(--text-muted)', fontWeight: 600, marginBottom: 7 }}>Cihaz kimliği</label>
          <div className="field">
            <Icon name="connect" size={17} style={{ color: 'var(--text-faint)' }} />
            <input
              value={target}
              onChange={(e) => setTarget(fmt(e.target.value))}
              placeholder="000 000 000"
              onKeyDown={(e) => e.key === 'Enter' && go()}
              style={{
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontFamily: 'var(--font-mono)',
                fontSize: 19,
                width: '100%',
                color: 'var(--text)',
                letterSpacing: '0.06em',
              }}
            />
          </div>
          <Button
            variant="primary"
            icon={mode === 'game' ? 'gaming' : 'connect'}
            onClick={go}
            disabled={!enough}
            style={{ justifyContent: 'center', marginTop: 12 }}
          >
            {mode === 'game' ? 'Oyun akışını başlat' : 'Bağlan'}
          </Button>

          <div style={{ marginTop: 'auto', paddingTop: 20 }}>
            <div style={{ fontSize: 11.5, color: 'var(--text-faint)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
              Son bağlantılar
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {recents.slice(0, 3).map((r) => (
                <RecentRow key={r.id} name={r.name} id={r.id} tone={r.tone} onClick={() => onConnect?.(r, mode)} />
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
