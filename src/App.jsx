import React, { useEffect, useState } from 'react';
import { App as CapacitorApp } from '@capacitor/app';
import { supabase } from './services/supabase';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState(null);
  const [mods, setMods] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  useEffect(() => {
    // Hardware Back Button Handler for Native Android Feel
    const backListener = CapacitorApp.addListener('backButton', ({ canGoBack }) => {
      if (activeTab !== 'home') {
        setActiveTab('home');
      } else if (canGoBack) {
        window.history.back();
      } else {
        CapacitorApp.exitApp();
      }
    });

    // Check user session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => {
      backListener.then(h => h.remove());
    };
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#0f0d1a] text-slate-100 flex flex-col font-sans dir-rtl" dir="rtl">
      {/* Header */}
      <header className="p-4 bg-[#171326] border-b border-purple-900/40 flex justify-between items-center sticky top-0 z-50 shadow-lg shadow-purple-950/20">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔥</span>
          <h1 className="text-2xl font-black tracking-wider bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-500 bg-clip-text text-transparent">
            MODVERSE
          </h1>
        </div>
        <span className="text-xs px-2.5 py-1 bg-purple-950/80 text-purple-300 border border-purple-700/50 rounded-full font-mono">
          Android 15
        </span>
      </header>

      {/* Main Container */}
      <main className="flex-1 p-4 pb-24 max-w-lg mx-auto w-full">
        {/* Search & Categories */}
        <div className="mb-6 space-y-3">
          <div className="relative">
            <input
              type="text"
              placeholder="بحث عن مودات، سكنات، خرائط..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 pr-10 pl-4 bg-[#1c172e] border border-purple-800/40 rounded-xl text-sm focus:outline-none focus:border-purple-500 text-purple-100 placeholder-slate-500 transition"
            />
            <span className="absolute right-3 top-3.5 text-slate-400">🔍</span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {['الكل', 'Mods', 'Skins', 'Worlds', 'Textures'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'bg-[#1c172e] text-slate-400 border border-purple-900/30 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'home' && (
          <div className="space-y-4">
            <div className="p-5 bg-gradient-to-br from-purple-900/40 via-[#171326] to-[#0f0d1a] border border-purple-800/40 rounded-2xl shadow-xl">
              <div className="flex justify-between items-start mb-2">
                <span className="px-2.5 py-0.5 bg-purple-500/20 text-purple-300 text-[10px] font-bold rounded-md border border-purple-500/30">مميز</span>
                <span className="text-amber-400 text-xs font-bold">⭐ 4.9</span>
              </div>
              <h2 className="text-xl font-bold mb-1 text-white">Dragon Knights Addon v2.0</h2>
              <p className="text-slate-400 text-xs mb-4 leading-relaxed">أضف تنانين وسيوف خرافية لعالمك مع تأثيرات صوتية ثلاثية الأبعاد وصراعات ملحمية!</p>
              <button className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 font-bold rounded-xl text-sm transition shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2">
                <span>⚡ تحميل المود مباشر</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="p-8 text-center bg-[#171326] border border-purple-900/30 rounded-2xl">
            <span className="text-4xl block mb-2">❤️</span>
            <h3 className="text-lg font-bold text-slate-200">المفضلة فارغة</h3>
            <p className="text-xs text-slate-400 mt-1">اضغط على زر القلب عند أي مود لحفظه هنا.</p>
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="p-5 bg-[#171326] border border-purple-800/40 rounded-2xl space-y-4">
            <h3 className="text-lg font-bold text-purple-300 flex items-center gap-2">
              🛡️ لوحة التحكم (Admin Panel)
            </h3>
            <p className="text-xs text-slate-400">رفع مود جديد مباشرة لقاعدة بيانات Supabase Storage</p>
            
            <div className="space-y-3 pt-2">
              <input type="text" placeholder="عنوان المود" className="w-full p-2.5 bg-[#0f0d1a] border border-purple-900/50 rounded-lg text-xs" />
              <textarea placeholder="وصف المود..." className="w-full p-2.5 bg-[#0f0d1a] border border-purple-900/50 rounded-lg text-xs h-20"></textarea>
              
              <div className="border-2 border-dashed border-purple-800/50 rounded-xl p-4 text-center cursor-pointer hover:border-purple-500 transition">
                <span className="text-xs text-slate-400">اختر ملف المود (.mcaddon / .zip)</span>
              </div>

              <button className="w-full py-2.5 bg-purple-600 font-bold text-xs rounded-lg hover:bg-purple-500 transition">
                رفع إلى MODVERSE
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#171326]/95 backdrop-blur-md border-t border-purple-900/40 p-3 flex justify-around items-center z-50">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 text-xs font-semibold ${
            activeTab === 'home' ? 'text-purple-400' : 'text-slate-500'
          }`}
        >
          <span className="text-lg">🏠</span>
          <span>الرئيسية</span>
        </button>

        <button
          onClick={() => setActiveTab('favorites')}
          className={`flex flex-col items-center gap-1 text-xs font-semibold ${
            activeTab === 'favorites' ? 'text-purple-400' : 'text-slate-500'
          }`}
        >
          <span className="text-lg">❤️</span>
          <span>المفضلة</span>
        </button>

        <button
          onClick={() => setActiveTab('admin')}
          className={`flex flex-col items-center gap-1 text-xs font-semibold ${
            activeTab === 'admin' ? 'text-purple-400' : 'text-slate-500'
          }`}
        >
          <span className="text-lg">🛡️</span>
          <span>الأدمن</span>
        </button>
      </nav>
    </div>
  );
}
