// app.jsx — Pulsar desktop prototype root: navigation, session state machine, tweaks. Mounts #root.

const SELF_ID = '482 913 056';

const RECENTS = [
  { name: 'Ev PC’si', id: '719 204 663', tone: 'accent', cat: 'pc' },
  { name: 'Ofis Sunucusu', id: '305 881 027', tone: 'cyan', cat: 'server' },
  { name: 'Oyun Rig’i', id: '640 117 992', tone: 'ok', cat: 'console' },
];

const DEVICES = [
  { name: 'Ev PC’si', id: '719 204 663', cat: 'pc', online: true, fav: true, lastSeen: '' },
  { name: 'Oyun Rig’i', id: '640 117 992', cat: 'console', online: true, fav: true, lastSeen: '' },
  { name: 'Ofis Sunucusu', id: '305 881 027', cat: 'server', online: true, fav: false, lastSeen: '' },
  { name: 'MacBook — Seyahat', id: '128 553 470', cat: 'pc', online: false, fav: false, lastSeen: '2 saat önce' },
  { name: 'NAS / Yedek', id: '904 226 815', cat: 'server', online: true, fav: false, lastSeen: '' },
  { name: 'Annemin Laptop’u', id: '551 309 744', cat: 'pc', online: false, fav: false, lastSeen: 'Dün 21:14' },
  { name: 'Stüdyo Workstation', id: '237 690 158', cat: 'pc', online: true, fav: false, lastSeen: '' },
  { name: 'Salon Konsolu', id: '418 072 365', cat: 'console', online: false, fav: false, lastSeen: '3 gün önce' },
];

const ACCENTS = {
  indigo: { h: 272, c: 0.205 },
  violet: { h: 305, c: 0.19 },
  blue:   { h: 245, c: 0.17 },
  green:  { h: 158, c: 0.15 },
  amber:  { h: 70,  c: 0.15 },
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "indigo",
  "displayFont": "Space Grotesk",
  "radius": 13,
  "density": "regular",
  "dark": false
}/*EDITMODE-END*/;

function applyAccent(key) {
  const a = ACCENTS[key] || ACCENTS.indigo;
  const r = document.documentElement.style;
  r.setProperty('--accent', `oklch(0.555 ${a.c} ${a.h})`);
  r.setProperty('--accent-hover', `oklch(0.505 ${a.c + 0.01} ${a.h})`);
  r.setProperty('--accent-press', `oklch(0.455 ${a.c} ${a.h})`);
  r.setProperty('--accent-soft', `oklch(0.955 0.035 ${a.h})`);
  r.setProperty('--accent-soft-2', `oklch(0.915 0.06 ${a.h})`);
  r.setProperty('--accent-ring', `oklch(0.555 ${a.c} ${a.h} / 0.35)`);
  r.setProperty('--shadow-accent', `0 8px 30px -8px oklch(0.555 ${a.c} ${a.h} / 0.45)`);
  if (document.documentElement.getAttribute('data-theme') === 'dark') {
    r.setProperty('--accent-soft', `oklch(0.32 0.07 ${a.h})`);
    r.setProperty('--accent-soft-2', `oklch(0.4 0.1 ${a.h})`);
  }
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [view, setView] = React.useState('home');     // home | devices | gaming | settings
  const [mode, setMode] = React.useState('remote');   // remote | game
  const [session, setSession] = React.useState(null); // null | {phase:'connecting'|'active', target, mode}
  const [stats, setStats] = React.useState({ fps: 60, latency: 7, bitrate: 38 });

  // live-ish stats during active session
  React.useEffect(() => {
    if (session?.phase !== 'active') return;
    const base = session.mode === 'game' ? { fps: 120, latency: 6, bitrate: 42 } : { fps: 60, latency: 7, bitrate: 24 };
    const id = setInterval(() => {
      setStats({
        fps: base.fps + (Math.random() < 0.3 ? -1 : 0),
        latency: base.latency + Math.round((Math.random() - 0.5) * 3),
        bitrate: base.bitrate + Math.round((Math.random() - 0.5) * 8),
      });
    }, 1400);
    return () => clearInterval(id);
  }, [session]);

  // apply tweaks
  React.useEffect(() => { applyAccent(t.accent); }, [t.accent, t.dark]);
  React.useEffect(() => { document.documentElement.style.setProperty('--r', t.radius + 'px'); document.documentElement.style.setProperty('--r-lg', (t.radius + 5) + 'px'); }, [t.radius]);
  React.useEffect(() => { document.documentElement.style.setProperty('--font-display', `'${t.displayFont}', sans-serif`); }, [t.displayFont]);
  React.useEffect(() => { document.documentElement.setAttribute('data-theme', t.dark ? 'dark' : 'light'); applyAccent(t.accent); }, [t.dark]);
  React.useEffect(() => { document.documentElement.setAttribute('data-density', t.density); }, [t.density]);

  const startConnect = (target, m) => setSession({ phase: 'connecting', target, mode: m || mode });
  const endSession = () => setSession(null);

  const titleMap = { home: 'Bağlan', devices: 'Cihazlar', gaming: 'Gaming', settings: 'Ayarlar' };

  return (
    <div className="desktop">
      <div className="window">
        <WindowChrome title={`Pulsar — ${titleMap[view]}`} onClose={endSession} />
        <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
          <Sidebar active={view} onNav={(v) => { setView(v); }} selfId={SELF_ID} />
          <main className="content">
            {view === 'home' && <HomeScreen selfId={SELF_ID} onConnect={startConnect} mode={mode} setMode={setMode} recents={RECENTS} />}
            {view === 'devices' && <DevicesScreen devices={DEVICES} onConnect={startConnect} />}
            {view === 'gaming' && <GamingScreen onStream={(g) => startConnect({ name: g.title, id: '640 117 992', type: 'game' }, 'game')} />}
            {view === 'settings' && <SettingsScreen />}

            {session?.phase === 'connecting' &&
              <ConnectingScreen target={session.target} mode={session.mode}
                onReady={() => setSession(s => ({ ...s, phase: 'active', conn: 'p2p' }))} onCancel={endSession} />}
            {session?.phase === 'active' &&
              <SessionScreen target={session.target} mode={session.mode} stats={stats} conn={session.conn} onEnd={endSession} />}
          </main>
        </div>
      </div>

      <TweaksPanel>
        <TweakSection label="Marka" />
        <AccentSwatches value={t.accent} onChange={(v) => setTweak('accent', v)} />
        <TweakRadio label="Başlık fontu" value={t.displayFont}
          options={['Space Grotesk','Sora','Hanken Grotesk']} onChange={(v) => setTweak('displayFont', v)} />
        <TweakSection label="Yüzey" />
        <TweakSlider label="Köşe yumuşaklığı" value={t.radius} min={6} max={22} unit="px" onChange={(v) => setTweak('radius', v)} />
        <TweakRadio label="Yoğunluk" value={t.density} options={['compact','regular','comfy']} onChange={(v) => setTweak('density', v)} />
        <TweakToggle label="Koyu tema" value={t.dark} onChange={(v) => setTweak('dark', v)} />
      </TweaksPanel>
    </div>
  );
}

// Custom accent swatch control for the Tweaks panel
function AccentSwatches({ value, onChange }) {
  const labels = { indigo: 'İndigo', violet: 'Mor', blue: 'Mavi', green: 'Yeşil', amber: 'Amber' };
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}>
      <span style={{ fontSize: 12.5, fontWeight: 500, opacity: 0.85 }}>Vurgu rengi</span>
      <div style={{ display: 'flex', gap: 8 }}>
        {Object.keys(ACCENTS).map(k => {
          const a = ACCENTS[k];
          const css = `oklch(0.555 ${a.c} ${a.h})`;
          const on = value === k;
          return (
            <button key={k} onClick={() => onChange(k)} title={labels[k]}
              style={{ width: 22, height: 22, borderRadius: '50%', background: css, cursor: 'pointer',
                border: 'none', outline: on ? '2px solid currentColor' : '2px solid transparent', outlineOffset: 2,
                boxShadow: on ? 'none' : 'inset 0 0 0 1px rgba(0,0,0,0.12)' }} />
          );
        })}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
