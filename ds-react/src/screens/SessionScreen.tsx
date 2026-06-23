import { useEffect, useState } from 'react';
import { Icon, type IconName } from '../Icon';
import type { ConnectMode } from './HomeScreen';

export interface FauxDesktopProps {
  /** Which scene to render behind the session chrome. */
  mode?: ConnectMode;
}

/**
 * The remote viewport backdrop — a stylised stand-in for the streamed screen.
 * `remote` paints an abstract desktop (menu bar, windows, dock); `game` paints a
 * dark neon game scene. Decorative only; never a real screen capture.
 */
export function FauxDesktop({ mode = 'remote' }: FauxDesktopProps) {
  const [clock, setClock] = useState('');
  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  if (mode === 'game') {
    return (
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: 'radial-gradient(120% 120% at 30% 20%, oklch(0.32 0.09 280), oklch(0.16 0.05 270) 70%)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, oklch(0.1 0.03 270 / 0.7), transparent 55%)' }} />
        <div style={{ position: 'absolute', bottom: '20%', left: '8%', width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, oklch(0.62 0.15 215 / 0.5), transparent 70%)', filter: 'blur(8px)' }} />
        <div style={{ position: 'absolute', top: '14%', right: '12%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, oklch(0.6 0.2 320 / 0.35), transparent 70%)', filter: 'blur(12px)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(115deg, transparent, transparent 34px, oklch(1 0 0 / 0.025) 34px, oklch(1 0 0 / 0.025) 35px)' }} />
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.14em', color: 'oklch(0.85 0.05 215)', textTransform: 'uppercase' }}>Canlı oyun akışı</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 600, color: '#fff', marginTop: 8, letterSpacing: '-0.02em' }}>Stellar Drift</div>
        </div>
      </div>
    );
  }
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: 'radial-gradient(130% 120% at 70% 0%, oklch(0.42 0.07 250), oklch(0.26 0.04 255) 70%)' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 28, background: 'oklch(0.18 0.02 255 / 0.55)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', padding: '0 14px', gap: 16, color: 'oklch(0.92 0.01 255)', fontSize: 11.5, fontWeight: 600 }}>
        <span style={{ fontWeight: 700 }}>●</span>
        <span>Dosya</span>
        <span>Düzen</span>
        <span>Görünüm</span>
        <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)' }}>{clock}</span>
      </div>
      <div style={{ position: 'absolute', top: 64, left: 48, width: '46%', height: '58%', borderRadius: 10, background: 'oklch(0.96 0.005 255 / 0.96)', boxShadow: '0 30px 60px -20px rgba(0,0,0,0.5)', overflow: 'hidden' }}>
        <div style={{ height: 30, background: 'oklch(0.9 0.005 255)', display: 'flex', alignItems: 'center', gap: 6, padding: '0 11px' }}>
          {['#ED6A5E', '#F4BF4F', '#61C554'].map((c, i) => (
            <span key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />
          ))}
        </div>
        <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[88, 66, 74, 52].map((w, i) => (
            <div key={i} style={{ height: 9, width: w + '%', borderRadius: 4, background: 'oklch(0.86 0.006 255)' }} />
          ))}
        </div>
      </div>
      <div style={{ position: 'absolute', top: 130, right: 60, width: '34%', height: '46%', borderRadius: 10, background: 'oklch(0.2 0.02 260 / 0.96)', boxShadow: '0 30px 60px -20px rgba(0,0,0,0.5)', overflow: 'hidden' }}>
        <div style={{ height: 28, background: 'oklch(0.26 0.02 260)' }} />
        <div style={{ padding: 14, fontFamily: 'var(--font-mono)', fontSize: 11, lineHeight: 1.8, color: 'oklch(0.7 0.13 158)' }}>
          <div><span style={{ color: 'oklch(0.6 0.02 260)' }}>$</span> systemctl status pulsar</div>
          <div style={{ color: 'oklch(0.75 0.02 260)' }}>● active (running)</div>
          <div><span style={{ color: 'oklch(0.6 0.02 260)' }}>$</span> _</div>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 9, padding: '8px 12px', borderRadius: 16, background: 'oklch(0.96 0.005 255 / 0.3)', backdropFilter: 'blur(10px)', border: '1px solid oklch(1 0 0 / 0.15)' }}>
        {['#5B7CFA', '#E0689B', '#3FB98C', '#F2B33D', '#8A6BF0'].map((c, i) => (
          <div key={i} style={{ width: 34, height: 34, borderRadius: 9, background: c, boxShadow: '0 4px 10px rgba(0,0,0,0.25)' }} />
        ))}
      </div>
    </div>
  );
}

export interface ToolButtonProps {
  /** Glyph for the button. */
  icon: IconName;
  /** Caption under the glyph. */
  label: string;
  /** Click handler. */
  onClick?: () => void;
  /** Highlighted/pressed state. */
  active?: boolean;
  /** Red destructive tint (e.g. "Bitir"). */
  danger?: boolean;
}

/**
 * A vertical icon+label button used inside the dark floating session toolbar.
 * Stacks a glyph over a tiny caption; `active` lifts it onto a translucent
 * surface and `danger` tints it red.
 */
export function ToolButton({ icon, label, onClick, active, danger }: ToolButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        border: 'none',
        background: active ? 'oklch(1 0 0 / 0.16)' : 'transparent',
        cursor: 'pointer',
        borderRadius: 9,
        padding: '7px 10px',
        color: danger ? 'oklch(0.8 0.13 25)' : 'oklch(0.95 0.01 260)',
        transition: 'background var(--dur)',
        minWidth: 52,
      }}
    >
      <Icon name={icon} size={18} />
      <span style={{ fontSize: 10, fontWeight: 600 }}>{label}</span>
    </button>
  );
}

/** Live transport statistics shown in the session toolbar. */
export interface SessionStats {
  fps: number;
  latency: number;
  bitrate: number;
}

export interface SessionScreenProps {
  /** The connected peer. */
  target?: { name: string; id: string };
  /** Session kind. */
  mode?: ConnectMode;
  /** Live transport stats. */
  stats?: SessionStats;
  /** Transport in use — P2P or relay fallback. */
  conn?: 'p2p' | 'relay';
  /** Called to end the session. */
  onEnd?: () => void;
}

/**
 * The active remote-desktop / game-stream session view: a full-bleed remote
 * viewport ({@link FauxDesktop}) with a dark glassy floating toolbar (peer name,
 * live fps/latency/bitrate, transport badge, and per-mode tools), a quality pill
 * bottom-right, and a slide-in files/chat side panel.
 */
export function SessionScreen({
  target = { name: 'Ev PC’si', id: '719 204 663' },
  mode = 'remote',
  stats = { fps: 60, latency: 7, bitrate: 24 },
  conn = 'p2p',
  onEnd,
}: SessionScreenProps) {
  const [panel, setPanel] = useState<'files' | 'chat' | null>(null);
  const [quality, setQuality] = useState('auto');
  const [fs, setFs] = useState(false);

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#000', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
        <FauxDesktop mode={mode} />

        {/* floating toolbar */}
        <div
          style={{
            position: 'absolute',
            top: 14,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 3,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            padding: '7px 9px',
            borderRadius: 14,
            background: 'oklch(0.18 0.02 262 / 0.82)',
            backdropFilter: 'blur(16px)',
            border: '1px solid oklch(1 0 0 / 0.12)',
            boxShadow: '0 10px 40px -8px rgba(0,0,0,0.5)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '0 10px 0 6px', borderRight: '1px solid oklch(1 0 0 / 0.12)', marginRight: 4 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--ok)', boxShadow: '0 0 8px var(--ok)' }} />
            <div style={{ lineHeight: 1.15 }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap' }}>{target.name}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'oklch(0.8 0.05 215)', whiteSpace: 'nowrap' }}>
                {stats.fps} fps · {stats.latency} ms · {stats.bitrate} Mbps
              </div>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 9.5,
                fontWeight: 700,
                letterSpacing: '0.04em',
                padding: '3px 7px',
                borderRadius: 6,
                whiteSpace: 'nowrap',
                background: conn === 'p2p' ? 'oklch(0.6 0.18 272 / 0.32)' : 'oklch(0.7 0.02 260 / 0.25)',
                color: conn === 'p2p' ? 'oklch(0.86 0.09 282)' : 'oklch(0.85 0.01 260)',
              }}
            >
              {conn === 'p2p' ? 'DOĞRUDAN P2P' : 'RELAY'}
            </span>
          </div>
          {mode === 'remote' && (
            <>
              <ToolButton icon="monitor" label="Ekran 1" active />
              <ToolButton icon="clipboard" label="Pano" />
              <ToolButton icon="file" label="Dosya" active={panel === 'files'} onClick={() => setPanel(panel === 'files' ? null : 'files')} />
              <ToolButton icon="keyboard" label="Klavye" />
              <ToolButton icon="power" label="Ctrl+Alt+Del" />
            </>
          )}
          {mode === 'game' && (
            <>
              <ToolButton icon="gaming" label="Kontrolcü" active />
              <ToolButton icon="speaker" label="Ses" />
              <ToolButton icon="bolt" label="Düşük gec." active />
            </>
          )}
          <ToolButton icon="chat" label="Sohbet" active={panel === 'chat'} onClick={() => setPanel(panel === 'chat' ? null : 'chat')} />
          <ToolButton icon="expand" label="Tam ekran" active={fs} onClick={() => setFs(!fs)} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 2, marginLeft: 4, paddingLeft: 4, borderLeft: '1px solid oklch(1 0 0 / 0.12)' }}>
            <ToolButton icon="x" label="Bitir" danger onClick={onEnd} />
          </div>
        </div>

        {/* quality pill bottom-right */}
        <div
          style={{
            position: 'absolute',
            bottom: 14,
            right: 14,
            zIndex: 3,
            display: 'flex',
            gap: 8,
            alignItems: 'center',
            padding: '6px 8px 6px 12px',
            borderRadius: 12,
            background: 'oklch(0.18 0.02 262 / 0.82)',
            backdropFilter: 'blur(16px)',
            border: '1px solid oklch(1 0 0 / 0.12)',
          }}
        >
          <span style={{ fontSize: 11.5, fontWeight: 600, color: 'oklch(0.85 0.01 260)' }}>Kalite</span>
          <div style={{ display: 'inline-flex', gap: 2, background: 'oklch(0.1 0.02 262 / 0.6)', borderRadius: 8, padding: 2 }}>
            {[{ v: 'auto', l: 'Oto' }, { v: 'hq', l: '4K' }, { v: 'fast', l: 'Hızlı' }].map((o) => (
              <button
                type="button"
                key={o.v}
                onClick={() => setQuality(o.v)}
                style={{
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: 6,
                  padding: '4px 10px',
                  fontSize: 11.5,
                  fontWeight: 600,
                  fontFamily: 'var(--font-sans)',
                  background: quality === o.v ? 'var(--accent)' : 'transparent',
                  color: quality === o.v ? '#fff' : 'oklch(0.7 0.01 260)',
                }}
              >
                {o.l}
              </button>
            ))}
          </div>
        </div>

        {/* side panel */}
        {panel && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              width: 300,
              zIndex: 4,
              background: 'var(--surface)',
              borderLeft: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-20px 0 50px -20px rgba(0,0,0,0.4)',
              animation: 'slideIn 0.25s var(--ease)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontWeight: 700, fontSize: 14 }}>{panel === 'files' ? 'Dosya transferi' : 'Oturum sohbeti'}</span>
              <button type="button" className="icon-btn" onClick={() => setPanel(null)}>
                <Icon name="x" size={16} />
              </button>
            </div>
            {panel === 'files' ? (
              <div style={{ padding: 16, flex: 1 }}>
                <div style={{ border: '1.5px dashed var(--border-strong)', borderRadius: 'var(--r)', padding: '28px 16px', textAlign: 'center', color: 'var(--text-faint)' }}>
                  <Icon name="file" size={26} style={{ color: 'var(--text-faint)' }} />
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', marginTop: 10 }}>Dosyaları buraya sürükle</div>
                  <div style={{ fontSize: 11.5, marginTop: 4 }}>İki yönlü, şifreli aktarım</div>
                </div>
                {[{ n: 'rapor-q3.pdf', s: '2.4 MB', d: '↓' }, { n: 'build.zip', s: '48 MB', d: '↑' }].map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 4px', borderBottom: '1px solid var(--border)' }}>
                    <Icon name="file" size={16} style={{ color: 'var(--accent)' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{f.n}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-faint)' }}>{f.s} · {f.d === '↓' ? 'İndirildi' : 'Gönderildi'}</div>
                    </div>
                    <Icon name="check" size={15} style={{ color: 'var(--ok)' }} />
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ background: 'var(--surface-2)', borderRadius: 'var(--r)', padding: '9px 12px', fontSize: 13, alignSelf: 'flex-start', maxWidth: '85%' }}>
                  Bağlantı kuruldu, ekranı görebiliyor musun?
                </div>
                <div style={{ background: 'var(--accent)', color: '#fff', borderRadius: 'var(--r)', padding: '9px 12px', fontSize: 13, alignSelf: 'flex-end', maxWidth: '85%' }}>
                  Evet, gayet net 👍
                </div>
              </div>
            )}
            <div style={{ padding: 12, borderTop: '1px solid var(--border)' }}>
              <div className="field">
                <input placeholder="Mesaj yaz…" style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: 13, width: '100%' }} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
