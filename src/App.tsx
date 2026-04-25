/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, 
  Video, 
  Scissors, 
  Calendar, 
  Settings as SettingsIcon, 
  ChevronRight, 
  Settings2, 
  Sparkles, 
  Monitor,
  Menu,
  X as CloseIcon,
  Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Dashboard } from './components/Dashboard';
import { AIGenerator } from './components/AIGenerator';
import { VideoEditor } from './components/VideoEditor';
import { Scheduler } from './components/Scheduler';
import { Settings } from './components/Settings';

// Types
type Tab = 'Dashboard' | 'AI Generator' | 'Video Editor' | 'Scheduler' | 'Settings';

interface MediaAsset {
  id: string;
  name: string;
  type: 'video' | 'audio' | 'image';
  size: string;
  date: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('Dashboard');
  const [statusMsg, setStatusMsg] = useState('System Ready | Intelligence Engine Online');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>([
    { id: '1', name: 'viral_short_01.mp4', type: 'video', size: '12.4 MB', date: '2024-03-20' },
    { id: '2', name: 'marketing_vlog.mp4', type: 'video', size: '45.1 MB', date: '2024-03-19' },
    { id: '3', name: 'audio_background_01.mp3', type: 'audio', size: '4.2 MB', date: '2024-03-20' },
    { id: '4', name: 'thumbnail_main.png', type: 'image', size: '1.1 MB', date: '2024-03-20' },
  ]);
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);

  const stats = [
    { label: 'Total Videos Generated', value: '1,204', color: 'text-sky-500', icon: <Video className="w-5 h-5" /> },
    { label: 'Average Engagement', value: '45.2%', color: 'text-emerald-500', icon: <Sparkles className="w-5 h-5" /> },
    { label: 'Cloud Space', value: '42%', color: 'text-indigo-500', icon: <Monitor className="w-5 h-5" /> },
  ];

  const updateStatus = (msg: string, type: 'info' | 'success' | 'error' = 'info') => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setStatusMsg(`System | ${timestamp} | ${msg}`);
  };

  const handleAssetCreated = (newAsset: MediaAsset) => {
    setMediaAssets(prev => [newAsset, ...prev]);
  };

  const selectedAsset = mediaAssets.find(a => a.id === selectedAssetId);

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Mobile Drawer Backdrop */}
      {!sidebarOpen && (
        <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(true)} />
      )}

      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white flex flex-col transition-transform duration-500 ease-in-out lg:relative lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/30">
              <Video className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight bg-gradient-to-tr from-white to-slate-400 bg-clip-text text-transparent">
                VIRALIN
              </h1>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest -mt-1">Automation Suite</p>
            </div>
          </div>
          <button className="lg:hidden p-2 text-slate-400" onClick={() => setSidebarOpen(false)}>
            <CloseIcon size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          {[
            { id: 'Dashboard', icon: <LayoutDashboard size={20} /> },
            { id: 'AI Generator', icon: <Sparkles size={20} /> },
            { id: 'Video Editor', icon: <Scissors size={20} /> },
            { id: 'Scheduler', icon: <Calendar size={20} /> },
            { id: 'Settings', icon: <SettingsIcon size={20} /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id as Tab);
                updateStatus(`Navigated to ${item.id}`);
                if (window.innerWidth < 1024) setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
                activeTab === item.id 
                ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-600/20' 
                : 'text-slate-400 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div className={`transition-transform duration-300 ${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                {item.icon}
              </div>
              <span className="font-bold text-sm tracking-tight">{item.id}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 m-4 bg-slate-800/30 border border-slate-700/30 rounded-3xl space-y-4">
           <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500 flex items-center justify-center text-white text-lg font-black shadow-lg">MZ</div>
              <div className="min-w-0">
                 <p className="text-sm font-bold truncate">Masykur Zuhri</p>
                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Enterprise Plan</p>
              </div>
           </div>
           <button className="w-full py-2 bg-slate-700/50 hover:bg-slate-700 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all">
             View Profile
           </button>
        </div>
      </aside>

      {/* Primary Workspace */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Workspace Header */}
        <header className="h-20 bg-white/70 backdrop-blur-xl border-b border-slate-200 flex items-center justify-between px-8 shrink-0 z-30">
          <div className="flex items-center gap-6">
            <button className="lg:hidden p-2 bg-slate-100 rounded-xl" onClick={() => setSidebarOpen(true)}>
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-3 text-sm text-slate-400 font-bold px-5 py-2 bg-slate-100/50 rounded-2xl border border-slate-100">
              <LayoutDashboard size={14} className="text-slate-300" />
              <span className="hover:text-indigo-600 cursor-pointer transition-colors">Workspace</span>
              <ChevronRight size={14} className="opacity-40" />
              <span className="text-slate-900 tracking-tight">{activeTab}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="hidden sm:flex items-center gap-2 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full border border-emerald-100">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[10px] font-black uppercase">Live System</span>
             </div>
             <div className="h-8 w-[1px] bg-slate-200 mx-2" />
             <button className="relative p-2.5 bg-slate-50 text-slate-400 hover:text-indigo-600 rounded-xl border border-slate-200 transition-all">
               <Bell size={20} />
               <div className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
             </button>
             <button className="p-2.5 bg-slate-50 text-slate-400 hover:text-indigo-600 rounded-xl border border-slate-200 transition-all">
               <Settings2 size={20} />
             </button>
          </div>
        </header>

        {/* Dynamic Content Viewport */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.02, y: -10 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="max-w-[1400px] mx-auto"
            >
              {activeTab === 'Dashboard' && <Dashboard stats={stats} />}
              {activeTab === 'AI Generator' && (
                <AIGenerator 
                  onStatusUpdate={updateStatus}
                  onAssetCreated={handleAssetCreated}
                  mediaAssets={mediaAssets}
                  selectedAssetId={selectedAssetId}
                  onAssetSelect={setSelectedAssetId}
                />
              )}
              {activeTab === 'Video Editor' && <VideoEditor selectedAsset={selectedAsset} />}
              {activeTab === 'Scheduler' && <Scheduler mediaAssets={mediaAssets} />}
              {activeTab === 'Settings' && <Settings />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Global Monitoring Bar */}
        <footer className="h-12 bg-white border-t border-slate-200 px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
              <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">{statusMsg}</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-[10px] font-black text-slate-300 uppercase tracking-widest">
            <div className="flex items-center gap-2 group cursor-help transition-colors hover:text-slate-600">
              <Cpu size={14} className="text-slate-200 group-hover:text-indigo-400" />
              <span>CORE_8_LOAD: <span className="text-slate-900">0.02%</span></span>
            </div>
            <div className="flex items-center gap-2 group cursor-help transition-colors hover:text-slate-600">
               <Database size={14} className="text-slate-200 group-hover:text-emerald-400" />
               <span>IO_CAP: <span className="text-slate-900">4.2 GB/S</span></span>
            </div>
            <div className="text-indigo-500/50">SECURE_TUNNEL_ESTABLISHED</div>
          </div>
        </footer>
      </main>
    </div>
  );
}

const Cpu = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M9 9h6v6H9z" />
    <path d="M15 2v2" /><path d="M9 2v2" /><path d="M20 15h2" /><path d="M20 9h2" /><path d="M9 20v2" /><path d="M15 20v2" /><path d="M2 9h2" /><path d="M2 15h2" />
  </svg>
);

const Database = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5V19A9 3 0 0 0 21 19V5" />
    <path d="M3 12A9 3 0 0 0 21 12" />
  </svg>
);
