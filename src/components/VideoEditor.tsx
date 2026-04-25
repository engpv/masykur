import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Scissors, Play, Pause, RotateCcw, Volume2, 
  Layers, Sliders, Type, Music, 
  ChevronLeft, ChevronRight, Save, Share2,
  Sun, Contrast, Droplets, Palette,
  Wand2
} from 'lucide-react';

export const VideoEditor = ({ selectedAsset }: { selectedAsset: any }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackPos, setPlaybackPos] = useState(0);
  const [duration] = useState(30); // 30 seconds default
  const [volume, setVolume] = useState(80);
  const [properties, setProperties] = useState({
    exposure: 0,
    contrast: 0,
    saturation: 0,
    tint: 0
  });

  const playbackRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPlaying) {
      playbackRef.current = window.setInterval(() => {
        setPlaybackPos((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + (100 / (duration * 10)); // Update every 100ms
        });
      }, 100);
    } else {
      if (playbackRef.current) clearInterval(playbackRef.current);
    }
    return () => {
      if (playbackRef.current) clearInterval(playbackRef.current);
    };
  }, [isPlaying, duration]);

  const handlePropertyChange = (key: keyof typeof properties, value: number) => {
    setProperties(prev => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setProperties({ exposure: 0, contrast: 0, saturation: 0, tint: 0 });
    setPlaybackPos(0);
    setIsPlaying(false);
  };

  if (!selectedAsset) {
    return (
      <div className="bg-white rounded-3xl p-12 border-2 border-dashed border-slate-200 text-center space-y-6 min-h-[600px] flex flex-col items-center justify-center">
        <div className="w-24 h-24 bg-slate-50 text-slate-300 rounded-3xl flex items-center justify-center mb-4 border border-slate-100 italic font-serif text-4xl">
          S
        </div>
        <h2 className="text-2xl font-bold text-slate-800">No Asset in Buffer</h2>
        <p className="text-slate-500 max-w-sm mx-auto">
          Please select a media file from the AI Generator library to begin the surgical editing process.
        </p>
      </div>
    );
  }

  // Calculate CSS filters based on properties
  const filterStyles = {
    filter: `brightness(${100 + properties.exposure}%) contrast(${100 + properties.contrast}%) saturate(${100 + properties.saturation}%) hue-rotate(${properties.tint * 3.6}deg)`
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors">
            <ChevronLeft size={20} />
          </button>
          <div>
            <h2 className="text-xl font-bold text-slate-900">{selectedAsset.name}</h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Surgical Editor v1.2 • {selectedAsset.size}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all active:scale-95">
            <Save size={18} />
            DRAFT
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-all active:scale-95">
            <Share2 size={18} />
            EXPORT
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-6">
          {/* Main Preview Container */}
          <div className="aspect-video bg-slate-900 rounded-3xl overflow-hidden relative shadow-2xl group border border-slate-800">
             {/* Simulated Video Content with Filters Applied */}
             <div 
               className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-slate-900 flex items-center justify-center transition-all duration-300"
               style={filterStyles}
             >
                <div className="text-white/10 select-none">
                  <Video size={160} />
                </div>
                {/* Visual Feedback of "Editing" */}
                {Object.values(properties).some(v => v !== 0) && (
                  <div className="absolute top-6 left-6 flex items-center gap-2 bg-indigo-500/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-indigo-500/30">
                    <Wand2 size={12} className="text-indigo-400" />
                    <span className="text-[10px] font-black text-indigo-100 uppercase tracking-widest">Live FX Active</span>
                  </div>
                )}
             </div>

             <div className="absolute inset-0 flex items-center justify-center">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 cursor-pointer hover:bg-white/20 transition-all"
                >
                  {isPlaying ? <Pause size={32} className="text-white fill-current" /> : <Play size={32} className="text-white fill-current ml-1" />}
                </button>
             </div>
             
             {/* Preview Overlays */}
             <div className="absolute top-6 right-6 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all">
                <button className="p-2 bg-black/40 backdrop-blur-md rounded-lg text-white border border-white/10 hover:bg-black/60">
                  <Type size={18} />
                </button>
                <button className="p-2 bg-black/40 backdrop-blur-md rounded-lg text-white border border-white/10 hover:bg-black/60">
                  <Music size={18} />
                </button>
             </div>

             {/* Progress Bar Overlay */}
             <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-800">
                <div className="h-full bg-indigo-500 transition-all duration-100" style={{width: `${playbackPos}%`}} />
             </div>
          </div>

          {/* Timeline Toolbar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="p-2 text-slate-400 hover:text-indigo-500 transition-all active:scale-90" title="Split"><Scissors size={18} /></button>
              <button 
                onClick={handleReset}
                className="p-2 text-slate-400 hover:text-indigo-500 transition-all active:scale-90" 
                title="Reset All"
              >
                <RotateCcw size={18} />
              </button>
              <div className="w-[1px] h-6 bg-slate-200 mx-2" />
              <div className="flex items-center gap-3">
                <button className="text-slate-400 hover:text-indigo-500 transition-colors">
                   <Volume2 size={16} />
                </button>
                <input 
                  type="range" 
                  min="0"
                  max="100"
                  value={volume} 
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-24 h-1 bg-slate-100 rounded-full appearance-none accent-indigo-500 cursor-pointer"
                />
              </div>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-xs font-mono font-bold text-slate-500">
                {Math.floor((playbackPos / 100) * duration).toString().padStart(2, '0')}:{(Math.floor(((playbackPos / 100) * duration) % 1 * 100)).toString().padStart(2, '0')} / 00:30
              </span>
              <button className="text-[10px] font-black bg-slate-100 px-3 py-1.5 rounded-lg text-slate-500 uppercase tracking-widest hover:bg-slate-200 transition-all">
                4K UHD
              </button>
            </div>
          </div>

          {/* Timeline View */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden h-48 relative">
             <div className="absolute top-0 left-0 right-0 h-10 bg-slate-50 border-b border-slate-100 flex items-center px-6">
                <div className="flex gap-12 w-full relative">
                   {[0, 5, 10, 15, 20, 25, 30].map(s => (
                     <div key={s} className="relative w-12 text-center">
                        <span className="text-[10px] font-mono text-slate-400">{s}s</span>
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-slate-300" />
                     </div>
                   ))}
                </div>
             </div>
             
             <div className="mt-10 p-5 space-y-3">
                <div className="h-10 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center px-4 overflow-hidden relative group cursor-pointer">
                   <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#6366f1_1px,transparent_0)] bg-[size:4px_4px]" />
                   <p className="text-[10px] font-black text-indigo-600 relative uppercase tracking-[0.2em]">{selectedAsset.name}</p>
                   <div className="absolute right-2 text-[8px] font-black text-indigo-400 group-hover:text-indigo-600 transition-colors">ACTIVE PATH</div>
                </div>
                <div className="h-10 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center px-4 overflow-hidden relative group cursor-pointer">
                   <p className="text-[10px] font-black text-emerald-600 relative uppercase tracking-[0.2em]">AUDIO_TRACK_OVERLAY</p>
                   <div className="absolute right-2 text-[8px] font-black text-emerald-400">80% MIX</div>
                </div>
             </div>

             {/* Playhead */}
             <div 
               className="absolute top-0 bottom-0 w-0.5 bg-rose-500 z-10 shadow-[0_0_15px_rgba(244,63,94,0.6)] cursor-ew-resize group"
               style={{left: `${playbackPos}%`}}
             >
                <div className="absolute -top-1 -left-1.5 w-3.5 h-3.5 bg-rose-500 rounded-full border-2 border-white shadow-md group-hover:scale-125 transition-transform" />
             </div>
          </div>
        </div>

        {/* Editor Controls Sidebar */}
        <div className="space-y-6">
           <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-8">
              <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Sliders size={14} className="text-indigo-500" />
                  Color Grading
                </h3>
                <div className="space-y-8">
                  {[
                    { key: 'exposure', label: 'Exposure', icon: <Sun size={12} /> },
                    { key: 'contrast', label: 'Contrast', icon: <Contrast size={12} /> },
                    { key: 'saturation', label: 'Saturation', icon: <Droplets size={12} /> },
                    { key: 'tint', label: 'Tint/Hue', icon: <Palette size={12} /> },
                  ].map((param) => (
                    <div key={param.key} className="space-y-3">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                        <span className="text-slate-400 flex items-center gap-2">
                          {param.icon}
                          {param.label}
                        </span>
                        <span className="text-indigo-600">{properties[param.key as keyof typeof properties] > 0 ? '+' : ''}{properties[param.key as keyof typeof properties]}</span>
                      </div>
                      <input 
                        type="range" 
                        min="-100"
                        max="100"
                        value={properties[param.key as keyof typeof properties]}
                        onChange={(e) => handlePropertyChange(param.key as keyof typeof properties, Number(e.target.value))}
                        className="w-full h-1 bg-slate-50 border border-slate-100 rounded-full appearance-none accent-indigo-500 cursor-pointer hover:bg-slate-100 transition-colors" 
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Layers size={14} className="text-emerald-500" />
                  AI Enhancement
                </h3>
                <div className="grid grid-cols-2 gap-3">
                   {[
                     { id: 'denoise', label: 'Denoise' },
                     { id: 'upscale', label: '4K Upscale' },
                     { id: 'colorize', label: 'Auto Color' },
                     { id: 'stabilize', label: 'Stabilize' }
                   ].map(tool => (
                      <button 
                        key={tool.id} 
                        className="py-3 px-2 rounded-xl bg-slate-50 border border-slate-100 text-[9px] font-black text-slate-500 hover:bg-indigo-50 hover:border-indigo-100 hover:text-indigo-600 transition-all uppercase tracking-widest"
                      >
                        {tool.label}
                      </button>
                   ))}
                </div>
              </div>
           </div>

           {/* Export Hint Card */}
           <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden group">
              <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                 <Video size={120} />
              </div>
              <h4 className="text-sm font-black uppercase tracking-widest mb-2 relative">Pro Tip</h4>
              <p className="text-xs text-indigo-100 leading-relaxed font-medium relative">Use AI Upscaling before exporting for TikTok for 40% better compression performance.</p>
           </div>
        </div>
      </div>
    </div>
  );
};
