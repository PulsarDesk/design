import { Avatar } from './Avatar';
import { Icon } from './Icon';
import { IDDisplay } from './IDDisplay';
import { PulsarMark } from './PulsarMark';
import { NAV, type NavId } from './data';

export interface SidebarProps {
  /** Currently active nav item. */
  active: NavId;
  /** Called with the clicked nav id. */
  onNav?: (id: NavId) => void;
  /** This device's relay-issued id, shown at the bottom. */
  selfId?: string;
}

/**
 * The app's left navigation rail: wordmark + pulse mark, the four primary
 * sections (Bağlan / Cihazlar / Gaming / Ayarlar), and a footer with this
 * device's relay-issued id and online status. The active item uses the soft
 * accent background.
 */
export function Sidebar({ active, onNav, selfId = '482 913 056' }: SidebarProps) {
  return (
    <aside
      style={{
        width: 224,
        flex: 'none',
        background: 'var(--surface-2)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        padding: '14px 12px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 8px 16px' }}>
        <PulsarMark size={26} />
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 18, letterSpacing: '-0.03em' }}>Pulsar</span>
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {NAV.map((n) => {
          const on = active === n.id;
          return (
            <button
              type="button"
              key={n.id}
              onClick={() => onNav?.(n.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 11,
                padding: '10px 11px',
                border: 'none',
                borderRadius: 'var(--r-sm)',
                cursor: 'pointer',
                textAlign: 'left',
                fontFamily: 'var(--font-sans)',
                fontSize: 14.5,
                fontWeight: on ? 600 : 500,
                color: on ? 'var(--accent-press)' : 'var(--text-muted)',
                background: on ? 'var(--accent-soft)' : 'transparent',
                transition: 'all var(--dur) var(--ease)',
              }}
            >
              <Icon name={n.icon} size={19} stroke={on ? 2.1 : 1.9} />
              {n.label}
            </button>
          );
        })}
      </nav>
      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <IDDisplay id={selfId} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '4px 6px' }}>
          <Avatar name="Sen" tone="accent" size={32} />
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Bu cihaz</div>
            <div style={{ fontSize: 11.5, color: 'var(--ok)', display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ok)' }} />
              Çevrimiçi · relay’e kayıtlı
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
