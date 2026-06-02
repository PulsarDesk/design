// screens-main.jsx — HomeScreen (Bağlan) + DevicesScreen (Cihazlar). Exports to window.

const ScreenHeader = ({ title, sub, right }) => (
  <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 28 }}>
    <div>
      <h1 style={{ fontSize: 27, letterSpacing: '-0.03em' }}>{title}</h1>
      {sub && <p style={{ color: 'var(--text-muted)', fontSize: 14.5, marginTop: 7 }}>{sub}</p>}
    </div>
    {right}
  </div>
);

const Card = ({ children, style, pad = 24 }) => (
  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)',
    boxShadow: 'var(--shadow-sm)', padding: pad, ...style }}>{children}</div>
);

// ============================ HOME / CONNECT ============================
const HomeScreen = ({ selfId, onConnect, mode, setMode, recents }) => {
  const [target, setTarget] = React.useState('');
  const [copied, setCopied] = React.useState(false);
  const [pw] = React.useState('7yf2-qk');
  const fmt = (v) => v.replace(/\D/g, '').slice(0, 9).replace(/(\d{3})(?=\d)/g, '$1 ').trim();

  const copyId = () => { setCopied(true); setTimeout(() => setCopied(false), 1400); };
  const go = () => { if (target.replace(/\D/g, '').length >= 6) onConnect({ name: 'Uzak Cihaz', id: fmt(target), type: 'pc' }, mode); };

  return (
    <div>
      <ScreenHeader title="Bağlan" sub="Kimliğini paylaş ya da uzak bir cihaza bağlan."
        right={<Seg value={mode} onChange={setMode} options={[{value:'remote',label:'Uzaktan masaüstü'},{value:'game',label:'Oyun akışı'}]} />} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        {/* This device */}
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>Bu cihaza izin ver</span>
            <Badge tone="online">Hazır</Badge>
          </div>
          <div style={{ fontSize: 12.5, color: 'var(--text-muted)', fontWeight: 600, marginBottom: 7 }}>Cihaz kimliği</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 27, fontWeight: 500, letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{selfId}</span>
            <button className="icon-btn" onClick={copyId} title="Kopyala"
              style={{ marginLeft: 'auto' }}>
              <Icon name={copied ? 'check' : 'copy'} size={17} />
            </button>
          </div>
          <div style={{ height: 1, background: 'var(--border)', margin: '20px 0' }} />
          <div style={{ fontSize: 12.5, color: 'var(--text-muted)', fontWeight: 600, marginBottom: 7 }}>Tek seferlik şifre</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 500, letterSpacing: '0.12em' }}>{pw}</span>
            <button className="icon-btn" title="Yenile" style={{ marginLeft: 'auto' }}><Icon name="refresh" size={16} /></button>
          </div>
          <p style={{ fontSize: 12.5, color: 'var(--text-faint)', marginTop: 16, lineHeight: 1.5 }}>
            Bu kimlik relay sunucusundan atanır. Paylaşırsan başkaları cihazına bağlanabilir; bağlantı önce P2P, gerekirse relay üzerinden kurulur. Şifre her oturumdan sonra yenilenir.
          </p>
        </Card>

        {/* Connect to remote */}
        <Card style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 18 }}>
            {mode === 'game' ? 'Oyun oturumu başlat' : 'Uzak cihaza bağlan'}
          </span>
          <label style={{ fontSize: 12.5, color: 'var(--text-muted)', fontWeight: 600, marginBottom: 7 }}>Cihaz kimliği</label>
          <div className="field">
            <Icon name="connect" size={17} style={{ color: 'var(--text-faint)' }} />
            <input value={target} onChange={e => setTarget(fmt(e.target.value))} placeholder="000 000 000"
              onKeyDown={e => e.key === 'Enter' && go()}
              style={{ border: 'none', outline: 'none', background: 'transparent', fontFamily: 'var(--font-mono)',
                fontSize: 19, width: '100%', color: 'var(--text)', letterSpacing: '0.06em' }} />
          </div>
          <button className="btn btn-primary" onClick={go} disabled={target.replace(/\D/g,'').length < 6}
            style={{ justifyContent: 'center', marginTop: 12, opacity: target.replace(/\D/g,'').length < 6 ? 0.5 : 1 }}>
            <Icon name={mode === 'game' ? 'gaming' : 'connect'} size={17} />
            {mode === 'game' ? 'Oyun akışını başlat' : 'Bağlan'}
          </button>

          <div style={{ marginTop: 'auto', paddingTop: 20 }}>
            <div style={{ fontSize: 11.5, color: 'var(--text-faint)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Son bağlantılar</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {recents.slice(0, 3).map(r => (
                <button key={r.id} className="recent-row" onClick={() => onConnect(r, mode)}>
                  <Avatar name={r.name} tone={r.tone} size={30} />
                  <div style={{ textAlign: 'left', lineHeight: 1.25 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 600 }}>{r.name}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-faint)' }}>{r.id}</div>
                  </div>
                  <Icon name="arrowRight" size={15} style={{ marginLeft: 'auto', color: 'var(--text-faint)' }} />
                </button>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

// ============================ DEVICES ============================
const DevicesScreen = ({ devices, onConnect }) => {
  const [q, setQ] = React.useState('');
  const [filter, setFilter] = React.useState('all');
  const filtered = devices.filter(d =>
    (filter === 'all' || d.cat === filter) &&
    (d.name.toLowerCase().includes(q.toLowerCase()) || d.id.includes(q)));

  const catLabel = { pc: 'Bilgisayar', server: 'Sunucu', console: 'Oyun PC’si' };
  const catIcon = { pc: 'monitor', server: 'devices', console: 'gaming' };

  return (
    <div>
      <ScreenHeader title="Cihazlar" sub="Adres defterin — gözetimsiz erişim için kayıtlı eşler."
        right={<button className="btn btn-primary"><Icon name="plus" size={17} />Cihaz ekle</button>} />

      <div style={{ display: 'flex', gap: 12, marginBottom: 18, alignItems: 'center' }}>
        <div className="field" style={{ flex: 1, maxWidth: 340 }}>
          <Icon name="search" size={16} style={{ color: 'var(--text-faint)' }} />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Cihaz veya ID ara…"
            style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: 14, width: '100%', color: 'var(--text)' }} />
        </div>
        <Seg value={filter} onChange={setFilter} options={[
          {value:'all',label:'Tümü'},{value:'pc',label:'Bilgisayar'},{value:'server',label:'Sunucu'},{value:'console',label:'Oyun'}]} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
        {filtered.map(d => (
          <div key={d.id} className="device-tile">
            <div style={{ width: 44, height: 44, borderRadius: 11, flex: 'none', display: 'grid', placeItems: 'center',
              background: d.online ? 'var(--accent-soft)' : 'var(--surface-3)', color: d.online ? 'var(--accent)' : 'var(--text-faint)' }}>
              <Icon name={catIcon[d.cat]} size={22} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <span style={{ fontSize: 15, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.name}</span>
                {d.fav && <Icon name="star" size={13} style={{ color: 'var(--warn)', fill: 'var(--warn)', flex: 'none' }} />}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--text-faint)', marginTop: 3, whiteSpace: 'nowrap' }}>{d.id}</div>
              <div style={{ fontSize: 11.5, color: d.online ? 'var(--ok)' : 'var(--text-faint)', display: 'flex', alignItems: 'center', gap: 5, marginTop: 5 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', flex: 'none', background: d.online ? 'var(--ok)' : 'var(--border-strong)' }} />
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{(d.online ? 'Çevrimiçi' : d.lastSeen) + ' · ' + catLabel[d.cat]}</span>
              </div>
            </div>
            <button className="btn btn-ghost" disabled={!d.online} onClick={() => onConnect(d, d.cat === 'console' ? 'game' : 'remote')}
              style={{ alignSelf: 'center', flex: 'none', padding: '8px 14px', fontSize: 13.5, opacity: d.online ? 1 : 0.45 }}>
              {d.cat === 'console' ? 'Oyna' : 'Bağlan'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

Object.assign(window, { HomeScreen, DevicesScreen, ScreenHeader, Card });
