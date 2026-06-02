// shell.jsx — Pulsar desktop app chrome: frameless window, sidebar, shared atoms + icons.
// Exports to window: Icon, PulsarMark, Badge, IDDisplay, Sidebar, WindowChrome, Avatar, Toggle, Seg.

const Icon = ({ name, size = 20, stroke = 2, style }) => {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
    stroke: 'currentColor', strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round', style };
  const paths = {
    connect: <><path d="M12 3v12"/><path d="M8 7l4-4 4 4"/><path d="M4 14v5a2 2 0 002 2h12a2 2 0 002-2v-5"/></>,
    devices: <><rect x="3" y="4" width="13" height="9" rx="1.5"/><rect x="13" y="9" width="8" height="11" rx="1.5"/><path d="M6 17h5M8 13v4"/></>,
    gaming: <><rect x="2" y="6" width="20" height="12" rx="4"/><path d="M7 10v4M5 12h4"/><circle cx="15.5" cy="11" r="1"/><circle cx="18" cy="14" r="1"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 00-.1-1.3l2-1.5-2-3.4-2.3 1a7 7 0 00-2.2-1.3L14 2h-4l-.4 2.2a7 7 0 00-2.2 1.3l-2.3-1-2 3.4 2 1.5A7 7 0 005 12c0 .4 0 .9.1 1.3l-2 1.5 2 3.4 2.3-1a7 7 0 002.2 1.3L10 22h4l.4-2.2a7 7 0 002.2-1.3l2.3 1 2-3.4-2-1.5c.1-.4.1-.9.1-1.3z"/></>,
    monitor: <><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></>,
    lock: <><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    minus: <><path d="M5 12h14"/></>,
    dots: <><circle cx="5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="19" cy="12" r="1.4"/></>,
    chevron: <><path d="M9 6l6 6-6 6"/></>,
    chevronDown: <><path d="M6 9l6 6 6-6"/></>,
    refresh: <><path d="M3 12a9 9 0 0115.5-6.3L21 8M21 4v4h-4"/><path d="M21 12a9 9 0 01-15.5 6.3L3 16M3 20v-4h4"/></>,
    expand: <><path d="M8 3H5a2 2 0 00-2 2v3M16 3h3a2 2 0 012 2v3M8 21H5a2 2 0 01-2-2v-3M16 21h3a2 2 0 002-2v-3"/></>,
    keyboard: <><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10"/></>,
    clipboard: <><rect x="8" y="3" width="8" height="4" rx="1"/><path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-2"/></>,
    power: <><path d="M12 4v8M7.5 7a7 7 0 109 0"/></>,
    file: <><path d="M14 3v4a1 1 0 001 1h4"/><path d="M5 3h9l5 5v11a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"/></>,
    chat: <><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></>,
    mic: <><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3"/></>,
    shield: <><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/></>,
    bolt: <><path d="M13 2L4 14h7l-1 8 9-12h-7z"/></>,
    plug: <><path d="M9 2v6M15 2v6M7 8h10v3a5 5 0 01-10 0zM12 16v6"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0116 0"/></>,
    star: <><path d="M12 3l2.6 5.3 5.9.8-4.3 4.1 1 5.8L12 16.3 6.8 19l1-5.8L3.5 9.1l5.9-.8z"/></>,
    x: <><path d="M6 6l12 12M18 6L6 18"/></>,
    check: <><path d="M4 12l5 5L20 6"/></>,
    copy: <><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 012-2h10"/></>,
    arrowRight: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
    wifi: <><path d="M5 12.5a10 10 0 0114 0M8.5 16a5 5 0 017 0M12 19.5h.01"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19"/></>,
    speaker: <><path d="M11 5L6 9H3v6h3l5 4z"/><path d="M16 9a4 4 0 010 6M19 6a8 8 0 010 12"/></>,
  };
  return <svg {...p}>{paths[name] || null}</svg>;
};

const PulsarMark = ({ size = 28, color = 'var(--accent)' }) => (
  <svg width={size} height={size} viewBox="0 0 52 52" fill="none" style={{ flex: 'none' }}>
    <circle cx="26" cy="26" r="24" stroke={color} strokeWidth="1.5" opacity="0.18"/>
    <circle cx="26" cy="26" r="16" stroke={color} strokeWidth="1.75" opacity="0.42"/>
    <circle cx="26" cy="26" r="8.5" stroke={color} strokeWidth="2"/>
    <circle cx="26" cy="26" r="3.5" fill={color}/>
  </svg>
);

const Badge = ({ tone = 'neutral', children, style }) => {
  const tones = {
    online: { bg: 'var(--ok-soft)', fg: 'var(--ok)' },
    stream: { bg: 'var(--cyan-soft)', fg: 'var(--cyan)' },
    accent: { bg: 'var(--accent-soft)', fg: 'var(--accent-press)' },
    warn:   { bg: 'var(--warn-soft)', fg: 'oklch(0.5 0.13 70)' },
    danger: { bg: 'var(--danger-soft)', fg: 'var(--danger)' },
    neutral:{ bg: 'var(--surface-3)', fg: 'var(--text-muted)' },
  };
  const c = tones[tone] || tones.neutral;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12.5, fontWeight: 600,
      padding: '4px 10px', borderRadius: 'var(--r-pill)', background: c.bg, color: c.fg, ...style }}>
      {tone !== 'neutral' && <span style={{ width: 6, height: 6, borderRadius: '50%', background: c.fg }} />}
      {children}
    </span>
  );
};

const Avatar = ({ name, tone = 'accent', size = 38 }) => {
  const initials = name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  const bg = { accent: 'var(--accent-soft)', cyan: 'var(--cyan-soft)', ok: 'var(--ok-soft)', warn: 'var(--warn-soft)' }[tone];
  const fg = { accent: 'var(--accent)', cyan: 'var(--cyan)', ok: 'var(--ok)', warn: 'oklch(0.5 0.13 70)' }[tone];
  return <div style={{ width: size, height: size, borderRadius: size > 30 ? 11 : 8, background: bg, color: fg,
    display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: size * 0.36, flex: 'none',
    fontFamily: 'var(--font-display)' }}>{initials}</div>;
};

const Toggle = ({ on, onChange }) => (
  <button onClick={() => onChange(!on)} style={{ width: 42, height: 25, borderRadius: 999, border: 'none',
    cursor: 'pointer', padding: 3, background: on ? 'var(--accent)' : 'var(--border-strong)',
    transition: 'background var(--dur) var(--ease)', display: 'flex', justifyContent: on ? 'flex-end' : 'flex-start' }}>
    <span style={{ width: 19, height: 19, borderRadius: '50%', background: '#fff', display: 'block',
      boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transition: 'all var(--dur) var(--ease)' }} />
  </button>
);

const Seg = ({ options, value, onChange }) => (
  <div style={{ display: 'inline-flex', background: 'var(--surface-3)', borderRadius: 'var(--r-sm)', padding: 3, gap: 2 }}>
    {options.map(o => {
      const val = typeof o === 'object' ? o.value : o;
      const lab = typeof o === 'object' ? o.label : o;
      const active = val === value;
      return <button key={val} onClick={() => onChange(val)} style={{ border: 'none', cursor: 'pointer',
        fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 13, padding: '6px 13px', borderRadius: 7,
        background: active ? 'var(--surface)' : 'transparent', color: active ? 'var(--text)' : 'var(--text-muted)',
        boxShadow: active ? 'var(--shadow-xs)' : 'none', transition: 'all var(--dur) var(--ease)' }}>{lab}</button>;
    })}
  </div>
);

// ---- Sidebar ----
const NAV = [
  { id: 'home', label: 'Bağlan', icon: 'connect' },
  { id: 'devices', label: 'Cihazlar', icon: 'devices' },
  { id: 'gaming', label: 'Gaming', icon: 'gaming' },
  { id: 'settings', label: 'Ayarlar', icon: 'settings' },
];

const Sidebar = ({ active, onNav, selfId }) => (
  <aside style={{ width: 224, flex: 'none', background: 'var(--surface-2)', borderRight: '1px solid var(--border)',
    display: 'flex', flexDirection: 'column', padding: '14px 12px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 8px 16px' }}>
      <PulsarMark size={26} />
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 18, letterSpacing: '-0.03em' }}>Pulsar</span>
    </div>
    <nav style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {NAV.map(n => {
        const on = active === n.id;
        return (
          <button key={n.id} onClick={() => onNav(n.id)} style={{ display: 'flex', alignItems: 'center', gap: 11,
            padding: '10px 11px', border: 'none', borderRadius: 'var(--r-sm)', cursor: 'pointer', textAlign: 'left',
            fontFamily: 'var(--font-sans)', fontSize: 14.5, fontWeight: on ? 600 : 500,
            color: on ? 'var(--accent-press)' : 'var(--text-muted)',
            background: on ? 'var(--accent-soft)' : 'transparent', transition: 'all var(--dur) var(--ease)' }}
            onMouseEnter={e => { if (!on) e.currentTarget.style.background = 'var(--surface-3)'; }}
            onMouseLeave={e => { if (!on) e.currentTarget.style.background = 'transparent'; }}>
            <Icon name={n.icon} size={19} stroke={on ? 2.1 : 1.9} />
            {n.label}
          </button>
        );
      })}
    </nav>
    <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: '11px 12px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>Senin kimliğin · relay’den</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 500, letterSpacing: '0.04em', marginTop: 4 }}>{selfId}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '4px 6px' }}>
        <Avatar name="Sen" tone="accent" size={32} />
        <div style={{ lineHeight: 1.2 }}>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Bu cihaz</div>
          <div style={{ fontSize: 11.5, color: 'var(--ok)', display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ok)' }} />Çevrimiçi · relay’e kayıtlı
          </div>
        </div>
      </div>
    </div>
  </aside>
);

// ---- Frameless window titlebar ----
const WindowChrome = ({ title, onClose }) => (
  <div style={{ height: 44, flex: 'none', display: 'flex', alignItems: 'center', padding: '0 14px',
    borderBottom: '1px solid var(--border)', background: 'var(--surface)', userSelect: 'none' }}>
    <div style={{ display: 'flex', gap: 8 }}>
      {['#ED6A5E', '#F4BF4F', '#61C554'].map((c, i) => (
        <span key={i} onClick={i === 0 ? onClose : undefined}
          style={{ width: 12, height: 12, borderRadius: '50%', background: c, cursor: i === 0 ? 'pointer' : 'default' }} />
      ))}
    </div>
    <div style={{ position: 'absolute', left: 0, right: 0, textAlign: 'center', fontSize: 13, fontWeight: 600,
      color: 'var(--text-muted)', pointerEvents: 'none' }}>{title}</div>
    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-faint)' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5 }}>Pulsar v1.0</span>
    </div>
  </div>
);

Object.assign(window, { Icon, PulsarMark, Badge, Avatar, Toggle, Seg, Sidebar, WindowChrome, NAV });
