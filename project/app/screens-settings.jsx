// screens-settings.jsx — SettingsScreen: Görüntü / Ağ / Güvenlik / Genel. Exports to window.

const SettingRow = ({ title, desc, children }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '16px 0', borderBottom: '1px solid var(--border)' }}>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 14, fontWeight: 600 }}>{title}</div>
      {desc && <div style={{ fontSize: 12.5, color: 'var(--text-faint)', marginTop: 3, lineHeight: 1.45, maxWidth: '46ch' }}>{desc}</div>}
    </div>
    <div style={{ flex: 'none' }}>{children}</div>
  </div>
);

const SettingsScreen = () => {
  const [tab, setTab] = React.useState('display');
  const [s, setS] = React.useState({
    quality: 'auto', res: '1440p', fps: 60, hwenc: true, hdr: false,
    conn: 'auto', relay: 'relay.pulsar.local:21116', bwlimit: false,
    unattended: true, control: true, clipboard: true, files: true, audio: false, twofa: true, record: false,
    startup: true, tray: true,
  });
  const set = (k, v) => setS(p => ({ ...p, [k]: v }));

  const tabs = [
    { id: 'display', label: 'Görüntü', icon: 'monitor' },
    { id: 'network', label: 'Ağ', icon: 'wifi' },
    { id: 'security', label: 'Güvenlik', icon: 'shield' },
    { id: 'general', label: 'Genel', icon: 'settings' },
  ];

  return (
    <div>
      <ScreenHeader title="Ayarlar" sub="Görüntü, ağ ve güvenlik tercihlerini yönet." />
      <div style={{ display: 'grid', gridTemplateColumns: '186px 1fr', gap: 24, alignItems: 'start' }}>
        {/* tab rail */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {tabs.map(t => {
            const on = tab === t.id;
            return (
              <button key={t.id} onClick={() => setTab(t.id)} style={{ display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px', border: 'none', borderRadius: 'var(--r-sm)', cursor: 'pointer', textAlign: 'left',
                fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: on ? 600 : 500,
                color: on ? 'var(--accent-press)' : 'var(--text-muted)', background: on ? 'var(--accent-soft)' : 'transparent',
                transition: 'all var(--dur)' }}>
                <Icon name={t.icon} size={17} />{t.label}
              </button>
            );
          })}
        </div>

        <Card pad={26}>
          {tab === 'display' && <>
            <SettingRow title="Varsayılan kalite" desc="Yeni oturumlar bu profille başlar."><Seg value={s.quality} onChange={v=>set('quality',v)} options={[{value:'auto',label:'Oto'},{value:'hq',label:'Kalite'},{value:'fast',label:'Hız'}]} /></SettingRow>
            <SettingRow title="Çözünürlük" desc="Uzak ekranı bu çözünürlüğe ölçekle."><Seg value={s.res} onChange={v=>set('res',v)} options={['1080p','1440p','4K']} /></SettingRow>
            <SettingRow title="Kare hızı sınırı"><Seg value={s.fps} onChange={v=>set('fps',v)} options={[{value:60,label:'60'},{value:120,label:'120'},{value:144,label:'144'}]} /></SettingRow>
            <SettingRow title="Donanımsal kodlama" desc="GPU encoder (NVENC / QuickSync / VideoToolbox)."><Toggle on={s.hwenc} onChange={v=>set('hwenc',v)} /></SettingRow>
            <SettingRow title="HDR aktar" desc="Destekleyen ekranlarda 10-bit HDR akışı."><Toggle on={s.hdr} onChange={v=>set('hdr',v)} /></SettingRow>
          </>}

          {tab === 'network' && <>
            <SettingRow title="Bağlantı yöntemi" desc="Önerilen: Otomatik. Pulsar önce doğrudan P2P dener, başarısız olursa relay’e düşer.">
              <Seg value={s.conn} onChange={v=>set('conn',v)} options={[{value:'auto',label:'Otomatik'},{value:'p2p',label:'Yalnız P2P'},{value:'relay',label:'Yalnız relay'}]} /></SettingRow>
            <SettingRow title="Relay (rendezvous) sunucusu" desc="Cihaz kimliğin buradan alınır ve P2P kurulamazsa trafik buradan geçer.">
              <div className="field" style={{ width: 250 }}><Icon name="plug" size={15} style={{color:'var(--text-faint)'}} /><input value={s.relay} onChange={e=>set('relay',e.target.value)} style={{border:'none',outline:'none',background:'transparent',fontFamily:'var(--font-mono)',fontSize:12.5,width:'100%',color:'var(--text)'}} /></div></SettingRow>
            <SettingRow title="Bant genişliği sınırı" desc="Yükleme hızını kısıtla (oyun için kapalı tut)."><Toggle on={s.bwlimit} onChange={v=>set('bwlimit',v)} /></SettingRow>
            <SettingRow title="Aktif bağlantı" desc="Şu anki oturum doğrudan P2P üzerinden kurulu.">
              <div style={{ display:'flex', gap:8 }}><Badge tone="accent">Doğrudan P2P</Badge><Badge tone="stream">7 ms</Badge></div></SettingRow>
          </>}

          {tab === 'security' && <>
            <SettingRow title="Gözetimsiz erişim" desc="Kalıcı şifre ile, onay olmadan bağlanmaya izin ver."><Toggle on={s.unattended} onChange={v=>set('unattended',v)} /></SettingRow>
            <div style={{ padding: '16px 0', borderBottom: '1px solid var(--border)' }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Varsayılan izinler</div>
              <div style={{ fontSize: 12.5, color: 'var(--text-faint)', marginBottom: 14 }}>Yeni bağlantıların neye erişebileceği.</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[['control','Klavye & fare'],['clipboard','Pano paylaşımı'],['files','Dosya transferi'],['audio','Ses aktarımı']].map(([k,l])=>(
                  <div key={k} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'11px 13px', border:'1px solid var(--border)', borderRadius:'var(--r-sm)' }}>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{l}</span><Toggle on={s[k]} onChange={v=>set(k,v)} />
                  </div>
                ))}
              </div>
            </div>
            <SettingRow title="İki adımlı doğrulama" desc="Gelen bağlantılar için ek onay kodu iste."><Toggle on={s.twofa} onChange={v=>set('twofa',v)} /></SettingRow>
            <SettingRow title="Oturum kaydı" desc="Uzaktan erişim oturumlarını yerel diske kaydet."><Toggle on={s.record} onChange={v=>set('record',v)} /></SettingRow>
          </>}

          {tab === 'general' && <>
            <SettingRow title="Açılışta başlat" desc="Pulsar sistem açıldığında otomatik çalışsın."><Toggle on={s.startup} onChange={v=>set('startup',v)} /></SettingRow>
            <SettingRow title="Sistem tepsisinde çalış" desc="Kapatınca tepside arka planda kalsın."><Toggle on={s.tray} onChange={v=>set('tray',v)} /></SettingRow>
            <SettingRow title="Cihaz adı"><div className="field" style={{ width: 220 }}><input defaultValue="MacBook Pro — Ofis" style={{border:'none',outline:'none',background:'transparent',fontSize:13,width:'100%',color:'var(--text)'}} /></div></SettingRow>
            <SettingRow title="Sürüm" desc="GPLv3 lisansı · açık kaynak."><span style={{ fontFamily:'var(--font-mono)', fontSize:13, color:'var(--text-muted)' }}>Pulsar v1.0.0</span></SettingRow>
            <div style={{ marginTop: 8, fontSize: 12, color: 'var(--text-faint)' }}>İpucu: Sağ üstteki <b>Tweaks</b> ile vurgu rengini ve fontu canlı değiştir.</div>
          </>}
        </Card>
      </div>
    </div>
  );
};

Object.assign(window, { SettingsScreen });
