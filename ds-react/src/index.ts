// @pulsar/ds — public entry. Components ported from the design/ handoff
// prototype, styled with the canonical Pulsar tokens (./styles.css).

// Primitives
export { Icon, type IconName, type IconProps } from './Icon';
export { PulsarMark, type PulsarMarkProps } from './PulsarMark';
export { Badge, type BadgeProps, type BadgeTone } from './Badge';
export { Avatar, type AvatarProps, type AvatarTone } from './Avatar';
export { Toggle, type ToggleProps } from './Toggle';
export { Seg, type SegProps, type SegOption, type SegValue } from './Seg';
export { Button, type ButtonProps, type ButtonVariant } from './Button';
export { Card, type CardProps } from './Card';
export { IDDisplay, type IDDisplayProps } from './IDDisplay';

// Layout
export { WindowChrome, type WindowChromeProps } from './WindowChrome';
export { Sidebar, type SidebarProps } from './Sidebar';
export { ScreenHeader, type ScreenHeaderProps } from './ScreenHeader';
export { AppShell, type AppShellProps } from './AppShell';

// Composites
export { DeviceTile, type DeviceTileProps } from './DeviceTile';
export { RecentRow, type RecentRowProps } from './RecentRow';
export { SettingRow, type SettingRowProps } from './SettingRow';

// Screens
export { HomeScreen, type HomeScreenProps, type ConnectMode } from './screens/HomeScreen';
export { DevicesScreen, type DevicesScreenProps } from './screens/DevicesScreen';
export { ConnectingScreen, type ConnectingScreenProps } from './screens/ConnectingScreen';
export {
  SessionScreen,
  type SessionScreenProps,
  type SessionStats,
  FauxDesktop,
  type FauxDesktopProps,
  ToolButton,
  type ToolButtonProps,
} from './screens/SessionScreen';
export { GamingScreen, type GamingScreenProps } from './screens/GamingScreen';
export { SettingsScreen, type SettingsScreenProps, type SettingsTab } from './screens/SettingsScreen';

// Shared data types (handy for typing props the screens accept)
export type { Device, DeviceCategory, Recent, Game, NavId } from './data';
