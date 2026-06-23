import { useState } from 'react';
import { Button } from '../Button';
import { DeviceTile } from '../DeviceTile';
import { Icon } from '../Icon';
import { ScreenHeader } from '../ScreenHeader';
import { Seg } from '../Seg';
import { DEVICES, type Device, type DeviceCategory } from '../data';
import type { ConnectMode } from './HomeScreen';

export interface DevicesScreenProps {
  /** The saved address book. */
  devices?: Device[];
  /** Called to connect/play a device. */
  onConnect?: (device: Device, mode: ConnectMode) => void;
}

/**
 * The Cihazlar (Devices) screen: the saved address book for unattended access.
 * A search field + category segmented control filter a two-column grid of
 * {@link DeviceTile}s, with a "Cihaz ekle" action in the header.
 */
export function DevicesScreen({ devices = DEVICES, onConnect }: DevicesScreenProps) {
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState<'all' | DeviceCategory>('all');
  const filtered = devices.filter(
    (d) =>
      (filter === 'all' || d.cat === filter) &&
      (d.name.toLowerCase().includes(q.toLowerCase()) || d.id.includes(q)),
  );

  return (
    <div>
      <ScreenHeader
        title="Cihazlar"
        sub="Adres defterin — gözetimsiz erişim için kayıtlı eşler."
        right={
          <Button variant="primary" icon="plus">
            Cihaz ekle
          </Button>
        }
      />

      <div style={{ display: 'flex', gap: 12, marginBottom: 18, alignItems: 'center' }}>
        <div className="field" style={{ flex: 1, maxWidth: 340 }}>
          <Icon name="search" size={16} style={{ color: 'var(--text-faint)' }} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cihaz veya ID ara…"
            style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: 14, width: '100%', color: 'var(--text)' }}
          />
        </div>
        <Seg
          value={filter}
          onChange={(v) => setFilter(v as 'all' | DeviceCategory)}
          options={[
            { value: 'all', label: 'Tümü' },
            { value: 'pc', label: 'Bilgisayar' },
            { value: 'server', label: 'Sunucu' },
            { value: 'console', label: 'Oyun' },
          ]}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
        {filtered.map((d) => (
          <DeviceTile
            key={d.id}
            name={d.name}
            id={d.id}
            cat={d.cat}
            online={d.online}
            fav={d.fav}
            lastSeen={d.lastSeen}
            onConnect={() => onConnect?.(d, d.cat === 'console' ? 'game' : 'remote')}
          />
        ))}
      </div>
    </div>
  );
}
