import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, Shield, Bell, Zap, 
  Smartphone, Share2, Palette, Globe,
  CheckCircle2, AlertCircle, ChevronRight,
  LogOut, Key, Cpu, Database
} from 'lucide-react';

export const Settings = () => {
  const [theme, setTheme] = useState('System');
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Preferences & Config</h2>
        <button className="flex items-center gap-2 text-sm font-bold text-rose-500 hover:bg-rose-50 px-4 py-2 rounded-xl transition-all">
          <LogOut size={18} />
          SIGNOUT
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Navigation Sidebar */}
        <div className="space-y-2">
           {[
             { id: 'Profile', icon: <User size={18} /> },
             { id: 'Security', icon: <Shield size={18} /> },
             { id: 'Notifications', icon: <Bell size={18} /> },
             { id: 'Integrations', icon: <Zap size={18} /> },
             { id: 'Appearance', icon: <Palette size={18} /> },
             { id: 'Billing', icon: <Database size={18} /> },
           ].map((item) => (
             <button
               key={item.id}
               className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                 item.id === 'Profile' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-500 hover:bg-slate-100'
               }`}
             >
               <div className="flex items-center gap-3">
                 {item.icon}
                 {item.id}
               </div>
               <ChevronRight size={14} className={item.id === 'Profile' ? 'opacity-100' : 'opacity-0'} />
             </button>
           ))}
        </div>

        {/* Settings Form Content */}
        <div className="md:col-span-3 space-y-8">
           {/* Section 1: User Identity */}
           <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm space-y-8">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <User size={14} className="text-indigo-500" />
                Identity & Access
              </h3>
              
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-3xl bg-indigo-500 flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-indigo-500/30">
                  MZ
                </div>
                <div>
                   <h4 className="text-xl font-black text-slate-800">Masykur Zuhri</h4>
                   <p className="text-sm text-slate-400 font-medium">Professional Account • Member since 2024</p>
                   <button className="text-xs font-bold text-indigo-600 mt-2 hover:underline tracking-tight">Upload New Avatar</button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase pl-1">Display Name</label>
                  <input type="text" defaultValue="Masykur Zuhri" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl font-medium focus:ring-4 focus:ring-indigo-500/10 focus:outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase pl-1">Primary Email</label>
                  <input type="email" defaultValue="masykur@viralin.io" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl font-medium focus:ring-4 focus:ring-indigo-500/10 focus:outline-none" />
                </div>
              </div>
           </div>

           {/* Section 2: Platform Connections */}
           <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm space-y-8">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Globe size={14} className="text-emerald-500" />
                Connected Ecosystem
              </h3>
              <div className="space-y-4">
                {[
                  { name: 'TikTok Creator Hub', status: 'Connected', icon: <Smartphone size={18} />, color: 'bg-black' },
                  { name: 'YouTube Content API', status: 'Verification Required', icon: <Share2 size={18} />, color: 'bg-rose-600' },
                  { name: 'X Developer Portal', status: 'Connected', icon: <Cpu size={18} />, color: 'bg-slate-900' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-4">
                       <div className={`w-10 h-10 ${item.color} text-white rounded-xl flex items-center justify-center shadow-lg`}>
                         {item.icon}
                       </div>
                       <div>
                         <p className="text-sm font-bold text-slate-800">{item.name}</p>
                         <p className={`text-[10px] font-bold uppercase ${item.status === 'Connected' ? 'text-emerald-500' : 'text-amber-500'}`}>
                           {item.status}
                         </p>
                       </div>
                    </div>
                    <button className="text-[10px] font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest border border-slate-200 px-3 py-1 rounded-lg bg-white">Manage</button>
                  </div>
                ))}
              </div>
           </div>

           {/* Section 3: API & Engine */}
           <div className="bg-slate-900 rounded-[32px] p-8 text-white space-y-8 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Key size={140} />
              </div>
              <div className="flex justify-between items-start">
                 <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 relative">
                   <Zap size={14} className="text-indigo-400" />
                   AI Intelligence Engine
                 </h3>
                 <span className="text-[10px] font-black bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-lg border border-indigo-500/20">VITE_ENV_LIVE</span>
              </div>
              <div className="space-y-4 relative">
                <p className="text-sm text-slate-300 leading-relaxed font-medium">Your Gemini API connection is managed securely via Cloud Secrets. The current quota permits 10,000 requests per month.</p>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3">
                   <CheckCircle2 size={18} className="text-emerald-400" />
                   <code className="text-xs font-mono text-slate-400">GEMINI_API_KEY_ENABLED • VALIDATED</code>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
