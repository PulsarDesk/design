// screens-gaming.jsx — GamingScreen: host mode, game library + stream config. Exports to window.

const GAMES = [
  { id: 'g1', title: 'Stellar Drift', genre: 'Yarış · Sci-fi', g: ['oklch(0.5 0.2 280)','oklch(0.55 0.16 215)'], hdr: true },
  { id: 'g2', title: 'Ironwood', genre: 'Aksiyon RPG', g: ['oklch(0.45 0.13 145)','oklch(0.4 0.1 90)'], hdr: true },
  { id: 'g3', title: 'Neon Circuit', genre: 'Platform', g: ['oklch(0.55 0.2 330)','oklch(0.5 0.18 25)'], hdr: false },
  { id: 'g4', title: 'Deep Harbor', genre: 'Strateji', g: ['oklch(0.45 0.12 230)','oklch(0.4 0.08 260)'], hdr: false },
  { id: 'g5', title: 'Apex Rally', genre: 'Yarış', g: ['oklch(0.55 0.18 55)','oklch(0.5 0.16 30)'], hdr: true },
  { id: 'g6', title: 'Masaüstü', genre: 'Tüm ekranı yayınla', g: ['oklch(0.45 0.04 260)','oklch(0.38 0.03 255)'], hdr: false, desktop: true },
];

const GamingScreen = ({ onStream }) => {
  const [sel, setSel] = React.useState(GAMES[0]);
  const [res, setRes] = React.useState('1440p');
  const [fps, setFps] = React.useState(120);
  const [bitrate, setBitrate] = React.useState(40);
  const [codec, setCodec] = React.useState('av1');
  const [hdr, setHdr] = React.useState(true);

  return (
    <div>
      <ScreenHeader title="Gaming" sub="Bu bilgisayarı host yap ve oyunlarını her cihaza yayınla."
        right={<Badge tone="online">Host modu aktif</Badge>} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 332px', gap: 18, alignItems: 'start' }}>
        {/* library */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 13 }}>
            <span style={{ fontSize: 13, fontWeight: 700 }}>Kütüphane</span>
            <button className="btn btn-quiet" style={{ padding: '6px 10px', fontSize: 13 }}><Icon name="plus" size={15} />Oyun ekle</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 13 }}>
            {GAMES.map(g => {
              const active = sel.id === g.id;
              return (
                <button key={g.id} onClick={() => setSel(g)} style={{ border: active ? '2px solid var(--accent)' : '1px solid var(--border)',
                  borderRadius: 'var(--r)', overflow: 'hidden', cursor: 'pointer', padding: 0, background: 'var(--surface)',
                  boxShadow: active ? 'var(--shadow)' : 'var(--shadow-xs)', textAlign: 'left', transition: 'all var(--dur) var(--ease)' }}>
                  <div style={{ height: 96, position: 'relative', background: `linear-gradient(140deg, ${g.g[0]}, ${g.g[1]})` }}>
                    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(125deg, transparent, transparent 13px, oklch(1 0 0 / 0.05) 13px, oklch(1 0 0 / 0.05) 14px)' }} />
                    {g.desktop && <div style={{ position: 'absolute', top: 8, left: 8 }}><Icon name="monitor" size={18} style={{ color: '#fff', opacity: 0.9 }} /></div>}
                    {g.hdr && <span style={{ position: 'absolute', top: 8, right: 8, fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700, color: '#fff', background: 'oklch(0 0 0 / 0.3)', padding: '2px 6px', borderRadius: 5 }}>HDR</span>}
                  </div>
                  <div style={{ padding: '10px 12px' }}>
                    <div style={{ fontSize: 13.5, fontWeight: 600 }}>{g.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-faint)', marginTop: 2 }}>{g.genre}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* config panel */}
        <Card pad={22} style={{ position: 'sticky', top: 0 }}>
          <div style={{ height: 110, borderRadius: 'var(--r)', marginBottom: 16, position: 'relative', overflow: 'hidden',
            background: `linear-gradient(140deg, ${sel.g[0]}, ${sel.g[1]})` }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(125deg, transparent, transparent 16px, oklch(1 0 0 / 0.05) 16px, oklch(1 0 0 / 0.05) 17px)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, oklch(0 0 0 / 0.45), transparent 60%)' }} />
            <div style={{ position: 'absolute', bottom: 11, left: 14, right: 14 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{sel.title}</div>
              <div style={{ fontSize: 11.5, color: 'oklch(1 0 0 / 0.82)', marginTop: 1 }}>{sel.genre}</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
            <div>
              <div className="cfg-lab">Çözünürlük</div>
              <Seg value={res} onChange={setRes} options={['1080p','1440p','4K']} />
            </div>
            <div>
              <div className="cfg-lab">Kare hızı</div>
              <Seg value={fps} onChange={setFps} options={[{value:60,label:'60'},{value:120,label:'120'},{value:144,label:'144'}]} />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="cfg-lab">Bit hızı</div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent)', fontWeight: 600 }}>{bitrate} Mbps</span>
              </div>
              <input type="range" min="5" max="150" value={bitrate} onChange={e => setBitrate(+e.target.value)} className="prange" />
            </div>
            <div>
              <div className="cfg-lab">Kodek</div>
              <Seg value={codec} onChange={setCodec} options={[{value:'h265',label:'H.265'},{value:'av1',label:'AV1'}]} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 600 }}>HDR</div>
                <div style={{ fontSize: 11.5, color: 'var(--text-faint)' }}>{sel.hdr ? 'Bu oyun destekliyor' : 'Desteklenmiyor'}</div>
              </div>
              <Toggle on={hdr && sel.hdr} onChange={v => sel.hdr && setHdr(v)} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 13px', background: 'var(--ok-soft)', borderRadius: 'var(--r-sm)' }}>
              <Icon name="gaming" size={17} style={{ color: 'var(--ok)' }} />
              <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--ok)' }}>Xbox kontrolcü bağlı</span>
            </div>

            <button className="btn btn-primary" onClick={() => onStream(sel)} style={{ justifyContent: 'center', marginTop: 2 }}>
              <Icon name="bolt" size={17} />Akışı başlat
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

Object.assign(window, { GamingScreen, GAMES });
