import { Icon } from './Icon';
import { Button } from './Button';
import { CAT_ICON, CAT_LABEL, type DeviceCategory } from './data';

export interface DeviceTileProps {
  /** Device display name. */
  name: string;
  /** Relay-issued device id, grouped in threes. */
  id: string;
  /** Device kind — drives the icon + label. */
  cat: DeviceCategory;
  /** Whether the device is currently reachable. */
  online: boolean;
  /** Show the favourite star. */
  fav?: boolean;
  /** "Last seen" text shown when offline. */
  lastSeen?: string;
  /** Called when the connect/play action is pressed. */
  onConnect?: () => void;
}

/**
 * One entry in the Cihazlar (Devices) address book: a category icon, the device
 * name with an optional favourite star, its mono id, an online/last-seen line,
 * and a Bağlan/Oyna action (disabled when offline). Consoles show "Oyna".
 */
export function DeviceTile({ name, id, cat, online, fav, lastSeen = '', onConnect }: DeviceTileProps) {
  return (
    <div className="device-tile">
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 11,
          flex: 'none',
          display: 'grid',
          placeItems: 'center',
          background: online ? 'var(--accent-soft)' : 'var(--surface-3)',
          color: online ? 'var(--accent)' : 'var(--text-faint)',
        }}
      >
        <Icon name={CAT_ICON[cat]} size={22} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <span style={{ fontSize: 15, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</span>
          {fav && <Icon name="star" size={13} style={{ color: 'var(--warn)', fill: 'var(--warn)', flex: 'none' }} />}
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--text-faint)', marginTop: 3, whiteSpace: 'nowrap' }}>{id}</div>
        <div
          style={{
            fontSize: 11.5,
            color: online ? 'var(--ok)' : 'var(--text-faint)',
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            marginTop: 5,
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', flex: 'none', background: online ? 'var(--ok)' : 'var(--border-strong)' }} />
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {(online ? 'Çevrimiçi' : lastSeen) + ' · ' + CAT_LABEL[cat]}
          </span>
        </div>
      </div>
      <Button
        variant="ghost"
        disabled={!online}
        onClick={onConnect}
        style={{ alignSelf: 'center', flex: 'none', padding: '8px 14px', fontSize: 13.5, opacity: online ? 1 : 0.45 }}
      >
        {cat === 'console' ? 'Oyna' : 'Bağlan'}
      </Button>
    </div>
  );
}
