import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, Loader2, ChevronRight, Video, 
  Image as ImageIcon, Wand2, Type, Hash, 
  CheckCircle2, AlertCircle, LayoutDashboard
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface MediaAsset {
  id: string;
  name: string;
  type: 'video' | 'audio' | 'image';
  size: string;
  date: string;
}

interface AIGeneratorProps {
  onStatusUpdate: (msg: string, type?: 'info' | 'success' | 'error') => void;
  onAssetCreated: (asset: MediaAsset) => void;
  mediaAssets: MediaAsset[];
  selectedAssetId: string | null;
  onAssetSelect: (id: string) => void;
}

export const AIGenerator = ({ onStatusUpdate, onAssetCreated, mediaAssets, selectedAssetId, onAssetSelect }: AIGeneratorProps) => {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState('TikTok');
  const [autoEdit, setAutoEdit] = useState(true);
  const [generateVisuals, setGenerateVisuals] = useState(false);
  const [scriptDetails, setScriptDetails] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!topic) {
      onStatusUpdate('Error: Please enter a video topic or keyword', 'error');
      return;
    }

    setIsGenerating(true);
    onStatusUpdate(`Generating comprehensive resources for ${platform}...`, 'info');

    try {
      const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY || '');
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const result = await model.generateContent(`Create a professional 30-second video script for ${platform} about: "${topic}". 
        Include:
        1. A hook line
        2. Body content
        3. Call to action
        4. 10 trending hashtags
        5. Visual description for background visuals.`);

      const response = await result.response;
      const text = response.text();

      const newAsset: MediaAsset = {
        id: Date.now().toString(),
        name: `${topic.toLowerCase().replace(/\s+/g, '_')}_${Date.now().toString().slice(-4)}.mp4`,
        type: 'video',
        size: '18.4 MB',
        date: new Date().toISOString().split('T')[0]
      };

      onAssetCreated(newAsset);
      setScriptDetails(text || '');
      onStatusUpdate(`Synthesized script & assets for "${topic}"`, 'success');
    } catch (error) {
      console.error(error);
      onStatusUpdate('AI Synthesis failed. Using fallback simulation.', 'error');
      
      const mockAsset: MediaAsset = {
        id: Date.now().toString(),
        name: `simulated_asset_${Date.now().toString().slice(-4)}.mp4`,
        type: 'video',
        size: '12.0 MB',
        date: new Date().toISOString().split('T')[0]
      };
      onAssetCreated(mockAsset);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-500/20">
                <Sparkles size={18} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">Viral AI Engine</h2>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">v2.4 Powered by Gemini</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-slate-400 uppercase">Engine Online</span>
            </div>
          </div>
          
          <div className="p-8 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Type size={14} className="text-indigo-500" />
                  Primary Topic or Brand Hook
                </label>
                <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold">REQUIRED</span>
              </div>
              <input 
                type="text" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. 5 Morning Habits for Productivity, New Product Launch..."
                className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/20 transition-all text-lg font-medium placeholder:text-slate-300"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <LayoutDashboard size={14} className="text-sky-500" />
                   Format & Ecosystem
                </label>
                <div className="relative">
                  <select 
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-sky-500/10 appearance-none cursor-pointer font-bold text-slate-700"
                  >
                    <option>TikTok (9:16)</option>
                    <option>YouTube Shorts (9:16)</option>
                    <option>Instagram Reels (9:16)</option>
                    <option>X / Twitter (16:9)</option>
                    <option>LinkedIn Feed (1:1)</option>
                  </select>
                  <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-slate-300 pointer-events-none" size={20} />
                </div>
              </div>

              <div className="flex flex-col justify-end space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl hover:bg-slate-100 transition-all">
                  <div className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${autoEdit ? 'bg-indigo-500' : 'bg-slate-300'}`}>
                    <input 
                      type="checkbox" 
                      className="hidden"
                      checked={autoEdit}
                      onChange={(e) => setAutoEdit(e.target.checked)}
                    />
                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-300 ${autoEdit ? 'left-6' : 'left-1'}`} />
                  </div>
                  <span className="text-sm font-bold text-slate-600">Smart Auto-Edit</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl hover:bg-slate-100 transition-all">
                  <div className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${generateVisuals ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                    <input 
                      type="checkbox" 
                      className="hidden"
                      checked={generateVisuals}
                      onChange={(e) => setGenerateVisuals(e.target.checked)}
                    />
                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-300 ${generateVisuals ? 'left-6' : 'left-1'}`} />
                  </div>
                  <span className="text-sm font-bold text-slate-600">AI Narrative Visuals</span>
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Hash size={14} className="text-rose-500" />
                  Synthesis Workspace
                </label>
                <div className="flex gap-2">
                   <button className="text-[10px] font-bold text-indigo-600 hover:bg-indigo-50 px-2 py-1 rounded transition-colors">CLEAR</button>
                   <button className="text-[10px] font-bold text-indigo-600 hover:bg-indigo-50 px-2 py-1 rounded transition-colors">COPY SCRIPT</button>
                </div>
              </div>
              <textarea 
                value={scriptDetails}
                onChange={(e) => setScriptDetails(e.target.value)}
                placeholder="The AI will populate the viral script here..."
                className="w-full h-48 px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 resize-none font-mono text-sm leading-relaxed text-slate-600"
              />
            </div>

            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className={`w-full py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] ${
                isGenerating 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed border-2 border-slate-200'
                : 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-2xl shadow-indigo-500/40 hover:shadow-indigo-500/60 hover:-translate-y-1 active:shadow-lg'
              }`}
            >
              {isGenerating ? <Loader2 className="animate-spin" size={24} /> : <Wand2 size={24} />}
              {isGenerating ? 'Synthesizing Multiverse...' : 'CONSTRUCT VIRAL ASSETS'}
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full min-h-[600px]">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500 text-white rounded-xl">
                <LayoutDashboard size={18} />
              </div>
              <h2 className="text-lg font-bold text-slate-800">Media Library</h2>
            </div>
            <span className="text-[10px] font-bold text-slate-400 bg-white border border-slate-200 px-2 py-1 rounded-full">{mediaAssets.length} ITEMS</span>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {mediaAssets.map((asset) => (
              <motion.button
                layout
                key={asset.id}
                onClick={() => onAssetSelect(asset.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left relative group ${
                  selectedAssetId === asset.id
                  ? 'bg-indigo-50 border-indigo-200 shadow-sm'
                  : 'bg-white border-slate-100 hover:border-slate-200 shadow-sm'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  selectedAssetId === asset.id ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                }`}>
                  {asset.type === 'video' ? <Video size={20} /> : asset.type === 'audio' ? <Sparkles size={20} /> : <ImageIcon size={20} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-bold truncate ${selectedAssetId === asset.id ? 'text-indigo-900' : 'text-slate-700'}`}>
                    {asset.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{asset.size}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{asset.date}</span>
                  </div>
                </div>
                {selectedAssetId === asset.id && (
                  <motion.div initial={{scale:0}} animate={{scale:1}} className="text-indigo-500 bg-white rounded-full p-1 shadow-sm absolute -right-2 -top-2 border border-indigo-100">
                    <CheckCircle2 size={16} fill="currentColor" className="text-white" />
                    <CheckCircle2 size={16} className="absolute inset-0 text-indigo-500" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
          
          <div className="p-6 bg-slate-50 border-t border-slate-100 m-2 rounded-2xl">
             <div className="flex items-center gap-3 mb-4">
                <AlertCircle size={14} className="text-indigo-400" />
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Cloud storage 42% full</p>
             </div>
             <div className="w-full bg-slate-200 rounded-full h-1.5">
                <div className="bg-indigo-500 h-1.5 rounded-full" style={{width: '42%'}} />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
