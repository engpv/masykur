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
  Settings, 
  ChevronRight, 
  Settings2, 
  Sparkles, 
  Upload, 
  Smartphone, 
  Youtube, 
  Twitter, 
  ShoppingBag,
  ExternalLink,
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";

// Types
type Tab = 'Dashboard' | 'AI Generator' | 'Video Editor' | 'Scheduler' | 'Settings';

interface Stat {
  label: string;
  value: string;
  color: string;
  icon: React.ReactNode;
}

interface MediaAsset {
  id: string;
  name: string;
  type: 'video' | 'audio' | 'image';
  size: string;
  date: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('Dashboard');
  const [statusMsg, setStatusMsg] = useState('System Ready | All platform routes active');
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState('TikTok');
  const [autoEdit, setAutoEdit] = useState(true);
  const [scriptDetails, setScriptDetails] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>([
    { id: '1', name: 'viral_short_01.mp4', type: 'video', size: '12.4 MB', date: '2024-03-20' },
    { id: '2', name: 'marketing_vlog.mp4', type: 'video', size: '45.1 MB', date: '2024-03-19' },
    { id: '3', name: 'tiktok_dance_promo.mp4', type: 'video', size: '22.8 MB', date: '2024-03-18' },
    { id: '4', name: 'audio_background_01.mp3', type: 'audio', size: '4.2 MB', date: '2024-03-20' },
    { id: '5', name: 'thumbnail_main.png', type: 'image', size: '1.1 MB', date: '2024-03-20' },
  ]);
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const [platforms, setPlatforms] = useState({
    tiktok: true,
    youtube: true,
    shopee: false,
    twitter: true
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  const stats: Stat[] = [
    { label: 'Total Videos Generated', value: '1,204', color: 'text-sky-500', icon: <Video className="w-5 h-5" /> },
    { label: 'Average Engagement', value: '45.2%', color: 'text-emerald-500', icon: <Sparkles className="w-5 h-5" /> },
    { label: 'Pending Posts', value: '12', color: 'text-amber-500', icon: <Calendar className="w-5 h-5" /> },
  ];

  const handleGenerate = async () => {
    if (!topic) {
      updateStatus('Error: Please enter a video topic or keyword', 'error');
      return;
    }

    setIsGenerating(true);
    updateStatus(`Generating video for ${platform} on topic '${topic}'...`, 'info');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate a short video script for ${platform} about ${topic}. Keep it concise and catchy. Also suggest 5 relevant hashtags.`,
      });

      const newAsset: MediaAsset = {
        id: Date.now().toString(),
        name: `${topic.toLowerCase().replace(/\s+/g, '_')}_${platform.toLowerCase()}.mp4`,
        type: 'video',
        size: '15.2 MB',
        date: new Date().toISOString().split('T')[0]
      };

      setMediaAssets(prev => [newAsset, ...prev]);
      setScriptDetails(response.text || '');
      updateStatus(`Successfully generated assets for ${topic}`, 'success');
    } catch (error) {
      console.error(error);
      updateStatus('Failed to generate video script. Using mock data.', 'error');
      
      const mockAsset: MediaAsset = {
        id: Date.now().toString(),
        name: `${topic.toLowerCase().replace(/\s+/g, '_')}_${platform.toLowerCase()}.mp4`,
        type: 'video',
        size: '15.2 MB',
        date: new Date().toISOString().split('T')[0]
      };
      setMediaAssets(prev => [mockAsset, ...prev]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUpload = () => {
    if (!selectedAssetId) {
      updateStatus('Error: Please select an asset to upload', 'error');
      return;
    }

    const selectedPlatforms = Object.entries(platforms)
      .filter(([_, enabled]) => enabled)
      .map(([name, _]) => name.charAt(0).toUpperCase() + name.slice(1));

    if (selectedPlatforms.length === 0) {
      updateStatus('Error: Please select at least one platform', 'error');
      return;
    }

    const asset = mediaAssets.find(a => a.id === selectedAssetId);
    updateStatus(`Uploading '${asset?.name}' to ${selectedPlatforms.join(', ')}...`, 'info');

    setTimeout(() => {
      updateStatus(`Successfully uploaded ${asset?.name} to ${selectedPlatforms.length} platforms.`, 'success');
    }, 2000);
  };

  const updateStatus = (msg: string, type: 'info' | 'success' | 'error' = 'info') => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setStatusMsg(`System Ready | ${timestamp} | ${msg}`);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0">
        <div className="p-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-sky-400 to-sky-200 bg-clip-text text-transparent">
              VIRALIN v1.0
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">Video Automation</p>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {[
            { id: 'Dashboard', icon: <LayoutDashboard size={20} /> },
            { id: 'AI Generator', icon: <Sparkles size={20} /> },
            { id: 'Video Editor', icon: <Scissors size={20} /> },
            { id: 'Scheduler', icon: <Calendar size={20} /> },
            { id: 'Settings', icon: <Settings size={20} /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id as Tab);
                updateStatus(`Navigated to ${item.id}`);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === item.id 
                ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.id}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800/50 rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-400">
              <span className="font-bold text-sm">MZ</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">Masykur</p>
              <p className="text-xs text-slate-500 truncate">Pro Account</p>
            </div>
            <button className="text-slate-400 hover:text-white transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Header / Breadcrumbs */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-2 text-sm text-slate-500 px-4 py-1.5 bg-slate-50 rounded-full border border-slate-200">
            <span className="hover:text-sky-500 cursor-pointer">Home</span>
            <ChevronRight size={14} className="opacity-40" />
            <span className="hover:text-sky-500 cursor-pointer">Analytics</span>
            <ChevronRight size={14} className="opacity-40" />
            <span className="font-medium text-slate-900">{activeTab}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-8 w-[1px] bg-slate-200 mx-2" />
            <button className="p-2 text-slate-400 hover:text-sky-500 hover:bg-sky-50/50 rounded-lg transition-all">
              <Settings2 size={20} />
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-slate-50/50" ref={scrollRef}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-6xl mx-auto space-y-8"
            >
              {activeTab === 'Dashboard' ? (
                <>
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-sky-200 transition-colors group"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className={`p-3 rounded-xl bg-slate-50 group-hover:bg-sky-50 transition-colors ${stat.color}`}>
                            {stat.icon}
                          </div>
                          <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">+12.5%</span>
                        </div>
                        <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                        <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Two Column Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* AI Engine Container */}
                    <div className="lg:col-span-2 space-y-6">
                      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                              <Sparkles size={20} />
                            </div>
                            <h2 className="text-lg font-bold">AI ENGINE: Content Creation</h2>
                          </div>
                        </div>
                        <div className="p-6 space-y-6">
                          <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Video Topic / Keywords</label>
                            <input 
                              type="text" 
                              value={topic}
                              onChange={(e) => setTopic(e.target.value)}
                              placeholder="Enter video topic or keyword..."
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all placeholder:text-slate-400"
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Target Platform</label>
                              <div className="relative">
                                <select 
                                  value={platform}
                                  onChange={(e) => setPlatform(e.target.value)}
                                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 appearance-none cursor-pointer"
                                >
                                  <option>TikTok</option>
                                  <option>YouTube Shorts</option>
                                  <option>Instagram Reels</option>
                                  <option>X Video</option>
                                  <option>Threads</option>
                                </select>
                                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-slate-400 pointer-events-none" size={16} />
                              </div>
                            </div>
                            <div className="flex flex-col justify-end">
                              <label className="flex items-center gap-3 cursor-pointer group px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors">
                                <div className="flex items-center h-5">
                                  <input 
                                    type="checkbox" 
                                    checked={autoEdit}
                                    onChange={(e) => setAutoEdit(e.target.checked)}
                                    className="w-4 h-4 text-sky-500 border-slate-300 rounded focus:ring-sky-500"
                                  />
                                </div>
                                <span className="text-sm font-medium text-slate-700">Auto-Edit with Editor Engine</span>
                              </label>
                            </div>
                          </div>

                          <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Generated Script / Details</label>
                            <textarea 
                              value={scriptDetails}
                              onChange={(e) => setScriptDetails(e.target.value)}
                              placeholder="Refine generated script details here..."
                              className="w-full h-32 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 resize-none font-mono text-sm"
                            />
                          </div>

                          <button 
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                              isGenerating 
                              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                              : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/20'
                            }`}
                          >
                            {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
                            {isGenerating ? 'Synthesizing Assets...' : 'Generate Video Assets'}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Media Library */}
                    <div className="space-y-6">
                      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full min-h-[500px]">
                        <div className="p-6 border-b border-slate-100 shrink-0">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                              <LayoutDashboard size={20} />
                            </div>
                            <h2 className="text-lg font-bold">STORAGE: Media Library</h2>
                          </div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-2">
                          {mediaAssets.map((asset) => (
                            <button
                              key={asset.id}
                              onClick={() => setSelectedAssetId(asset.id)}
                              className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left group ${
                                selectedAssetId === asset.id
                                ? 'bg-sky-50 border-sky-200 shadow-sm'
                                : 'bg-transparent border-transparent hover:bg-slate-50 hover:border-slate-200'
                              }`}
                            >
                              <div className={`p-2 rounded-lg shrink-0 ${
                                selectedAssetId === asset.id ? 'bg-sky-100 text-sky-600' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                              }`}>
                                {asset.type === 'video' ? <Video size={18} /> : asset.type === 'audio' ? <Sparkles size={18} /> : <Settings size={18} />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className={`text-sm font-semibold truncate ${selectedAssetId === asset.id ? 'text-sky-900' : ''}`}>
                                  {asset.name}
                                </p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{asset.size} • {asset.date}</p>
                              </div>
                              {selectedAssetId === asset.id && (
                                <motion.div layoutId="check" className="text-sky-500">
                                  <CheckCircle2 size={18} />
                                </motion.div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Integration Status & Upload Section */}
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                    <div className="p-6">
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Platform Status</h3>
                      <div className="space-y-3">
                        {Object.entries(platforms).map(([key, val]) => (
                          <label key={key} className="flex items-center justify-between cursor-pointer group">
                            <div className="flex items-center gap-3">
                              {key === 'tiktok' ? <Smartphone size={16} className="text-slate-400" /> : 
                               key === 'youtube' ? <Youtube size={16} className="text-slate-400" /> : 
                               key === 'twitter' ? <Twitter size={16} className="text-slate-400" /> : 
                               <ShoppingBag size={16} className="text-slate-400" />}
                              <span className="text-sm font-medium text-slate-600 capitalize">{key}</span>
                            </div>
                            <input 
                              type="checkbox" 
                              checked={val}
                              onChange={(e) => setPlatforms(p => ({ ...p, [key]: e.target.checked }))}
                              className="w-4 h-4 text-emerald-500 rounded focus:ring-emerald-500 border-slate-300"
                            />
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 lg:col-span-2">
                       <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Asset Preview</h3>
                       <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden relative group">
                         {selectedAssetId ? (
                           <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50 space-y-2">
                             <Video size={48} className="opacity-20 translate-y-2" />
                             <p className="text-sm font-medium">Preview for {mediaAssets.find(a => a.id === selectedAssetId)?.name}</p>
                           </div>
                         ) : (
                           <div className="absolute inset-0 flex flex-col items-center justify-center text-white/30 space-y-2">
                             <AlertCircle size={48} className="opacity-10" />
                             <p className="text-sm font-medium">No asset selected for preview</p>
                           </div>
                         )}
                         <div className="absolute bottom-4 right-4 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                           <button className="bg-white/10 backdrop-blur-md hover:bg-white/20 p-2 rounded-lg text-white border border-white/20">
                             <ExternalLink size={18} />
                           </button>
                         </div>
                       </div>
                    </div>

                    <div className="p-6 flex flex-col justify-center gap-4">
                      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-emerald-800 text-sm">
                        <p className="flex items-center gap-2 font-bold mb-1">
                          <CheckCircle2 size={14} /> Ready for Deployment
                        </p>
                        <p className="opacity-80 text-xs">All API routes are healthy and assets are verified.</p>
                      </div>
                      <button 
                        onClick={handleUpload}
                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all active:scale-95"
                      >
                        <Upload size={18} />
                        Upload Selected
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-6">
                  <div className="w-20 h-20 bg-slate-50 text-slate-400 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-slate-100">
                    {activeTab === 'Video Editor' ? <Scissors size={40} /> : activeTab === 'Scheduler' ? <Calendar size={40} /> : <Settings size={40} />}
                  </div>
                  <h2 className="text-2xl font-bold">{activeTab} Module</h2>
                  <p className="text-slate-500 max-w-sm mx-auto">
                    This module is currently in beta. Please use the AI Generator on the Dashboard to create your first viral video.
                  </p>
                  <button 
                    onClick={() => setActiveTab('Dashboard')}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all"
                  >
                    Back to Dashboard
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Status Bar */}
        <footer className="h-10 bg-slate-200/50 border-t border-slate-200 px-6 flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-widest overflow-hidden shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{statusMsg}</span>
            </div>
          </div>
          <div className="flex items-center gap-6 divide-x divide-slate-300">
            <div className="pl-6 group cursor-help">
              <span className="opacity-60">CPU USAGE:</span> <span className="text-slate-700">12%</span>
            </div>
            <div className="pl-6 group cursor-help">
              <span className="opacity-60">MEM USAGE:</span> <span className="text-slate-700">452MB</span>
            </div>
            <div className="pl-6">
              <span className="opacity-60">REGION:</span> <span className="text-slate-700">GCP-ASIA-1</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
