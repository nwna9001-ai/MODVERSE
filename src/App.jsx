cat << 'EOF' > src/App.jsx
import React, { useEffect, useState } from 'react';
import { App as CapacitorApp } from '@capacitor/app';
import { supabase } from './services/supabase';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  useEffect(() => {
    const backListener = CapacitorApp.addListener('backButton', ({ canGoBack }) => {
      if (activeTab !== 'home') {
        setActiveTab('home');
      } else if (canGoBack) {
        window.history.back();
      } else {
        CapacitorApp.exitApp();
      }
    });

    return () => {
      backListener.then(h => h.remove());
    };
  }, [activeTab]);

  return (
    <div style={{ backgroundColor: '#0f0d1a', color: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif', direction: 'rtl', paddingBottom: '80px' }}>
      
      {/* Header */}
      <header style={{ backgroundColor: '#171326', padding: '16px', borderBottom: '1px solid rgba(147, 51, 234, 0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '22px' }}>🔥</span>
          <h1 style={{ fontSize: '20px', fontWeight: '900', background: 'linear-gradient(to right, #c084fc, #e879f9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>
            MODVERSE
          </h1>
        </div>
        <span style={{ fontSize: '11px', padding: '3px 10px', backgroundColor: '#2e1065', color: '#d8b4fe', border: '1px solid #7e22ce', borderRadius: '12px', fontWeight: 'bold' }}>
          Android 15
        </span>
      </header>

      {/* Main Container */}
      <main style={{ padding: '16px', maxWidth: '500px', margin: '0 auto' }}>
        
        {/* Search */}
        <div style={{ marginBottom: '16px' }}>
          <input
            type="text"
            placeholder="بحث عن مودات، سكنات، خرائط..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '12px 16px', backgroundColor: '#1c172e', border: '1px solid rgba(147, 51, 234, 0.4)', borderRadius: '12px', color: '#fff', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }}
          />
        </div>

        {/* Categories */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '16px' }}>
          {['الكل', 'Mods', 'Skins', 'Worlds', 'Textures'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '8px 16px',
                borderRadius: '10px',
                fontSize: '12px',
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: selectedCategory === cat ? '#9333ea' : '#1c172e',
                color: selectedCategory === cat ? '#ffffff' : '#94a3b8',
                boxShadow: selectedCategory === cat ? '0 0 12px rgba(147, 51, 234, 0.5)' : 'none'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'home' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ backgroundColor: '#171326', border: '1px solid rgba(147, 51, 234, 0.3)', borderRadius: '16px', padding: '18px', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ backgroundColor: 'rgba(147, 51, 234, 0.2)', color: '#d8b4fe', fontSize: '10px', fontWeight: 'bold', padding: '2px 8px', borderRadius: '6px', border: '1px solid rgba(147, 51, 234, 0.4)' }}>مميز</span>
                <span style={{ color: '#fbbf24', fontSize: '12px', fontWeight: 'bold' }}>⭐ 4.9</span>
              </div>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>Dragon Knights Addon v2.0</h2>
              <p style={{ color: '#94a3b8', fontSize: '12px', lineHeight: '1.6', margin: '0 0 16px 0' }}>أضف تنانين وسيوف خرافية لعالمك مع تأثيرات صوتية ثلاثية الأبعاد وصراعات ملحمية!</p>
              <button style={{ width: '100%', padding: '12px', background: 'linear-gradient(to right, #9333ea, #c084fc)', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 15px rgba(147, 51, 234, 0.4)' }}>
                ⚡ تحميل المود مباشر
              </button>
            </div>
          </div>
        )}

        {activeTab === 'favorites' && (
          <div style={{ padding: '32px', textAlign: 'center', backgroundColor: '#171326', border: '1px solid rgba(147, 51, 234, 0.2)', borderRadius: '16px' }}>
            <span style={{ fontSize: '36px', display: 'block', marginBottom: '8px' }}>❤️</span>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#f8fafc', margin: 0 }}>المفضلة فارغة</h3>
            <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>اضغط على زر القلب عند أي مود لحفظه هنا.</p>
          </div>
        )}

        {activeTab === 'admin' && (
          <div style={{ padding: '20px', backgroundColor: '#171326', border: '1px solid rgba(147, 51, 234, 0.3)', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#d8b4fe', margin: 0 }}>🛡️ لوحة التحكم (Admin Panel)</h3>
            <input type="text" placeholder="عنوان المود" style={{ width: '100%', padding: '10px', backgroundColor: '#0f0d1a', border: '1px solid rgba(147, 51, 234, 0.3)', borderRadius: '8px', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }} />
            <textarea placeholder="وصف المود..." style={{ width: '100%', padding: '10px', backgroundColor: '#0f0d1a', border: '1px solid rgba(147, 51, 234, 0.3)', borderRadius: '8px', color: '#fff', fontSize: '12px', height: '70px', boxSizing: 'border-box' }}></textarea>
            <button style={{ width: '100%', padding: '10px', backgroundColor: '#9333ea', border: 'none', borderRadius: '8px', color: '#fff', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>
              رفع إلى MODVERSE
            </button>
          </div>
        )}
      </main>

      {/* Bottom Nav */}
      <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#171326', borderTop: '1px solid rgba(147, 51, 234, 0.3)', padding: '10px', display: 'flex', justifyContent: 'space-around', zIndex: 50 }}>
        <button onClick={() => setActiveTab('home')} style={{ background: 'none', border: 'none', color: activeTab === 'home' ? '#c084fc' : '#64748b', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}>
          <span style={{ fontSize: '18px' }}>🏠</span>
          <span>الرئيسية</span>
        </button>

        <button onClick={() => setActiveTab('favorites')} style={{ background: 'none', border: 'none', color: activeTab === 'favorites' ? '#c084fc' : '#64748b', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}>
          <span style={{ fontSize: '18px' }}>❤️</span>
          <span>المفضلة</span>
        </button>

        <button onClick={() => setActiveTab('admin')} style={{ background: 'none', border: 'none', color: activeTab === 'admin' ? '#c084fc' : '#64748b', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}>
          <span style={{ fontSize: '18px' }}>🛡️</span>
          <span>الأدمن</span>
        </button>
      </nav>
    </div>
  );
}
EOF

