import type { CSSProperties, ReactNode } from 'react';
import { Icon, type IconName } from './Icon';

/** Visual weight of a {@link Button}. */
export type ButtonVariant = 'primary' | 'ghost' | 'quiet';

export interface ButtonProps {
  /** Visual weight: filled indigo (`primary`), outlined (`ghost`), or text-only (`quiet`). */
  variant?: ButtonVariant;
  /** Optional leading icon. */
  icon?: IconName;
  /** Label / content. */
  children?: ReactNode;
  /** Disabled state. */
  disabled?: boolean;
  /** Click handler. */
  onClick?: () => void;
  /** Extra inline styles (e.g. center, full width). */
  style?: CSSProperties;
}

/**
 * The primary action atom (the `.btn` family). `primary` is the filled indigo
 * call-to-action with an accent glow; `ghost` is a bordered neutral button;
 * `quiet` is a borderless low-emphasis action. Pass `icon` for a leading glyph.
 */
export function Button({ variant = 'primary', icon, children, disabled, onClick, style }: ButtonProps) {
  return (
    <button
      type="button"
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
      style={{ opacity: disabled ? 0.5 : 1, ...style }}
    >
      {icon && <Icon name={icon} size={17} />}
      {children}
    </button>
  );
}
