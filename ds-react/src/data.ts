// Shared types + sample data ported from the prototype. The sample arrays back
// the default props on screens so every component renders standalone in a card.
// (Internal — not exported from the package entry.)
import type { AvatarTone } from './Avatar';
import type { IconName } from './Icon';

/** Device kind used across the address book and connect flows. */
export type DeviceCategory = 'pc' | 'server' | 'console';

/** A saved peer in the address book. */
export interface Device {
  name: string;
  id: string;
  cat: DeviceCategory;
  online: boolean;
  fav?: boolean;
  /** Human "last seen" string; empty when currently online. */
  lastSeen?: string;
}

/** A recent connection shortcut. */
export interface Recent {
  name: string;
  id: string;
  tone: AvatarTone;
  cat: DeviceCategory;
}

/** A streamable game (or the whole-desktop entry) in the host library. */
export interface Game {
  id: string;
  title: string;
  genre: string;
  /** Two-stop gradient for the cover art. */
  g: [string, string];
  hdr: boolean;
  /** True for the "stream the whole desktop" tile. */
  desktop?: boolean;
}

export const SELF_ID = '482 913 056';

export const RECENTS: Recent[] = [
  { name: 'Ev PC’si', id: '719 204 663', tone: 'accent', cat: 'pc' },
  { name: 'Ofis Sunucusu', id: '305 881 027', tone: 'cyan', cat: 'server' },
  { name: 'Oyun Rig’i', id: '640 117 992', tone: 'ok', cat: 'console' },
];

export const DEVICES: Device[] = [
  { name: 'Ev PC’si', id: '719 204 663', cat: 'pc', online: true, fav: true, lastSeen: '' },
  { name: 'Oyun Rig’i', id: '640 117 992', cat: 'console', online: true, fav: true, lastSeen: '' },
  { name: 'Ofis Sunucusu', id: '305 881 027', cat: 'server', online: true, fav: false, lastSeen: '' },
  { name: 'MacBook — Seyahat', id: '128 553 470', cat: 'pc', online: false, fav: false, lastSeen: '2 saat önce' },
  { name: 'NAS / Yedek', id: '904 226 815', cat: 'server', online: true, fav: false, lastSeen: '' },
  { name: 'Annemin Laptop’u', id: '551 309 744', cat: 'pc', online: false, fav: false, lastSeen: 'Dün 21:14' },
  { name: 'Stüdyo Workstation', id: '237 690 158', cat: 'pc', online: true, fav: false, lastSeen: '' },
  { name: 'Salon Konsolu', id: '418 072 365', cat: 'console', online: false, fav: false, lastSeen: '3 gün önce' },
];

export const GAMES: Game[] = [
  { id: 'g1', title: 'Stellar Drift', genre: 'Yarış · Sci-fi', g: ['oklch(0.5 0.2 280)', 'oklch(0.55 0.16 215)'], hdr: true },
  { id: 'g2', title: 'Ironwood', genre: 'Aksiyon RPG', g: ['oklch(0.45 0.13 145)', 'oklch(0.4 0.1 90)'], hdr: true },
  { id: 'g3', title: 'Neon Circuit', genre: 'Platform', g: ['oklch(0.55 0.2 330)', 'oklch(0.5 0.18 25)'], hdr: false },
  { id: 'g4', title: 'Deep Harbor', genre: 'Strateji', g: ['oklch(0.45 0.12 230)', 'oklch(0.4 0.08 260)'], hdr: false },
  { id: 'g5', title: 'Apex Rally', genre: 'Yarış', g: ['oklch(0.55 0.18 55)', 'oklch(0.5 0.16 30)'], hdr: true },
  { id: 'g6', title: 'Masaüstü', genre: 'Tüm ekranı yayınla', g: ['oklch(0.45 0.04 260)', 'oklch(0.38 0.03 255)'], hdr: false, desktop: true },
];

/** Category → human label / icon, shared by the device tiles. */
export const CAT_LABEL: Record<DeviceCategory, string> = { pc: 'Bilgisayar', server: 'Sunucu', console: 'Oyun PC’si' };
export const CAT_ICON: Record<DeviceCategory, IconName> = { pc: 'monitor', server: 'devices', console: 'gaming' };

/** Sidebar navigation model. */
export type NavId = 'home' | 'devices' | 'gaming' | 'settings';
export const NAV: { id: NavId; label: string; icon: IconName }[] = [
  { id: 'home', label: 'Bağlan', icon: 'connect' },
  { id: 'devices', label: 'Cihazlar', icon: 'devices' },
  { id: 'gaming', label: 'Gaming', icon: 'gaming' },
  { id: 'settings', label: 'Ayarlar', icon: 'settings' },
];
