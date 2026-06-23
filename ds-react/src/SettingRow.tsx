import type { ReactNode } from 'react';

export interface SettingRowProps {
  /** Setting label. */
  title: string;
  /** Optional helper description below the label. */
  desc?: string;
  /** The control on the right (Toggle, Seg, field…). */
  children?: ReactNode;
}

/**
 * One row in a settings panel: a title with optional description on the left and
 * a control pinned to the right, separated by a hairline bottom border. Used
 * throughout the Ayarlar (Settings) screen.
 */
export function SettingRow({ title, desc, children }: SettingRowProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '16px 0', borderBottom: '1px solid var(--border)' }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600 }}>{title}</div>
        {desc && <div style={{ fontSize: 12.5, color: 'var(--text-faint)', marginTop: 3, lineHeight: 1.45, maxWidth: '46ch' }}>{desc}</div>}
      </div>
      <div style={{ flex: 'none' }}>{children}</div>
    </div>
  );
}
