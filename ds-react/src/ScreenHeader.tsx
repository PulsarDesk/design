import type { ReactNode } from 'react';

export interface ScreenHeaderProps {
  /** Page title (display font, large). */
  title: string;
  /** Optional muted subtitle below the title. */
  sub?: string;
  /** Optional right-aligned slot (a control, badge or button). */
  right?: ReactNode;
}

/**
 * The page header for each screen: a large display-font title with an optional
 * subtitle on the left and a free-form control slot pinned to the right
 * (segmented control, badge, "add" button…).
 */
export function ScreenHeader({ title, sub, right }: ScreenHeaderProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 28 }}>
      <div>
        <h1 style={{ fontSize: 27, letterSpacing: '-0.03em' }}>{title}</h1>
        {sub && <p style={{ color: 'var(--text-muted)', fontSize: 14.5, marginTop: 7 }}>{sub}</p>}
      </div>
      {right}
    </div>
  );
}
