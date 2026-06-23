import { Avatar, type AvatarTone } from './Avatar';
import { Icon } from './Icon';

export interface RecentRowProps {
  /** Peer name. */
  name: string;
  /** Relay-issued device id. */
  id: string;
  /** Avatar color theme. */
  tone?: AvatarTone;
  /** Called when the row is activated. */
  onClick?: () => void;
}

/**
 * A compact "recent connection" shortcut row: monogram avatar, name + mono id,
 * and a trailing arrow. Listed under "Son bağlantılar" on the Connect screen;
 * the whole row is a button that reconnects to that peer.
 */
export function RecentRow({ name, id, tone = 'accent', onClick }: RecentRowProps) {
  return (
    <button type="button" className="recent-row" onClick={onClick}>
      <Avatar name={name} tone={tone} size={30} />
      <div style={{ textAlign: 'left', lineHeight: 1.25 }}>
        <div style={{ fontSize: 13.5, fontWeight: 600 }}>{name}</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-faint)' }}>{id}</div>
      </div>
      <Icon name="arrowRight" size={15} style={{ marginLeft: 'auto', color: 'var(--text-faint)' }} />
    </button>
  );
}
