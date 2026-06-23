import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { WindowChrome } from './WindowChrome';
import type { NavId } from './data';

export interface AppShellProps {
  /** Window title shown in the chrome (e.g. "Pulsar — Bağlan"). */
  title?: string;
  /** Active sidebar section. */
  active?: NavId;
  /** Called with the clicked nav id. */
  onNav?: (id: NavId) => void;
  /** This device's relay-issued id. */
  selfId?: string;
  /** Called when the window is closed. */
  onClose?: () => void;
  /** Screen content rendered in the main content area. */
  children?: ReactNode;
}

/**
 * The full desktop app frame: a frameless window with {@link WindowChrome} on
 * top and a {@link Sidebar} beside the scrollable main content. Drop a screen
 * (HomeScreen, DevicesScreen, …) in as children to assemble a complete app view.
 */
export function AppShell({ title = 'Pulsar — Bağlan', active = 'home', onNav, selfId, onClose, children }: AppShellProps) {
  return (
    <div className="window">
      <WindowChrome title={title} onClose={onClose} />
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <Sidebar active={active} onNav={onNav} selfId={selfId} />
        <main className="content">{children}</main>
      </div>
    </div>
  );
}
