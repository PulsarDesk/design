import type { CSSProperties, ReactNode } from 'react';

export interface CardProps {
  /** Card content. */
  children?: ReactNode;
  /** Inner padding in px. */
  pad?: number;
  /** Extra inline styles. */
  style?: CSSProperties;
}

/**
 * The surface container: white background, hairline border, large radius and a
 * soft shadow. The standard panel for grouping content across every screen.
 */
export function Card({ children, pad = 24, style }: CardProps) {
  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-lg)',
        boxShadow: 'var(--shadow-sm)',
        padding: pad,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
