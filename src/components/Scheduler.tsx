import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, 
  MapPin, Plus, ListFilter, Globe, 
  Instagram, Youtube, Twitter, Smartphone
} from 'lucide-react';
import { format, addDays, startOfWeek, eachDayOfInterval } from 'date-fns';

export const Scheduler = ({ mediaAssets }: { mediaAssets: any[] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const start = startOfWeek(currentDate);
  const days = eachDayOfInterval({
    start,
    end: addDays(start, 6)
  });

  const timeSlots = ['09:00', '12:00', '15:00', '18:00', '21:00'];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
             <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-sm">
                <CalendarIcon size={20} className="text-indigo-500" />
             </div>
             <h2 className="text-2xl font-bold text-slate-800">{format(currentDate, 'MMMM yyyy')}</h2>
          </div>
          <div className="flex bg-white border border-slate-200 rounded-xl overflow-hidden p-1">
             <button className="px-4 py-2 text-xs font-bold bg-slate-900 text-white rounded-lg">WEEK</button>
             <button className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-50 transition-colors rounded-lg">MONTH</button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm p-1">
             <button 
               onClick={() => setCurrentDate(addDays(currentDate, -7))}
               className="p-2 hover:bg-slate-50 transition-colors text-slate-400"
             >
               <ChevronLeft size={18} />
             </button>
             <button className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 border-x border-slate-100">TODAY</button>
             <button 
               onClick={() => setCurrentDate(addDays(currentDate, 7))}
               className="p-2 hover:bg-slate-50 transition-colors text-slate-400"
             >
               <ChevronRight size={18} />
             </button>
          </div>
          <button className="bg-indigo-600 text-white p-3 rounded-xl shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-all">
            <Plus size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content: Calendar Grid */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
            <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/50">
               {days.map(day => (
                 <div key={day.toString()} className="py-4 text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{format(day, 'EEE')}</p>
                    <p className={`text-lg font-bold mt-1 ${format(day, 'd') === format(new Date(), 'd') ? 'text-indigo-600' : 'text-slate-700'}`}>
                      {format(day, 'd')}
                    </p>
                 </div>
               ))}
            </div>

            <div className="grid grid-cols-7 divide-x divide-slate-50 h-[700px] overflow-y-auto">
               {days.map(day => (
                 <div key={day.toString()} className="flex flex-col">
                    {timeSlots.map(time => (
                      <div key={time} className="flex-1 border-b border-slate-50 p-2 group hover:bg-slate-50 transition-all relative">
                         <span className="text-[9px] font-bold text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity absolute top-1 right-2">{time}</span>
                         
                         {/* Mock Scheduled Post */}
                         {day.getDay() === 3 && time === '15:00' && (
                           <motion.div 
                             initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}}
                             className="bg-indigo-600 rounded-xl p-3 shadow-lg shadow-indigo-500/20 space-y-2 cursor-pointer hover:scale-[1.02] transition-all"
                           >
                             <div className="flex items-center gap-2">
                               <Instagram size={12} className="text-indigo-200" />
                               <p className="text-[9px] font-bold text-white uppercase tracking-tighter truncate">Viral Short 01</p>
                             </div>
                             <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                                <div className="bg-white w-full h-full" />
                             </div>
                           </motion.div>
                         )}

                         {day.getDay() === 5 && time === '18:00' && (
                           <motion.div 
                             initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}}
                             className="bg-emerald-500 rounded-xl p-3 shadow-lg shadow-emerald-500/20 space-y-2 cursor-pointer hover:scale-[1.02] transition-all"
                           >
                             <div className="flex items-center gap-2">
                               <Youtube size={12} className="text-emerald-200" />
                               <p className="text-[9px] font-bold text-white uppercase tracking-tighter truncate">Tech Vlog #42</p>
                             </div>
                             <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                                <div className="bg-white w-1/2 h-full" />
                             </div>
                           </motion.div>
                         )}
                      </div>
                    ))}
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Sidebar: Upcoming & Queue */}
        <div className="space-y-8">
           <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <ListFilter size={14} className="text-indigo-500" />
                Queue Pipeline
              </h3>
              <div className="space-y-4">
                 {[
                   { name: 'Marketing_v02.mp4', time: 'Today, 21:00', icon: <Smartphone size={14} /> },
                   { name: 'Thumbnail_Final.png', time: 'Tomorrow, 09:00', icon: <Globe size={14} /> },
                 ].map((item, i) => (
                   <div key={i} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-2">
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                           <div className="p-2 bg-white rounded-lg border border-slate-100 text-slate-400">
                             {item.icon}
                           </div>
                           <p className="text-xs font-bold text-slate-700 truncate max-w-[100px]">{item.name}</p>
                         </div>
                         <button className="text-[10px] font-bold text-indigo-500">EDIT</button>
                      </div>
                      <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase">
                         <Clock size={10} />
                         {item.time}
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-indigo-600 rounded-3xl p-8 text-white space-y-4 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <CalendarIcon size={120} />
              </div>
              <h3 className="text-lg font-bold relative">Smart Scheduler</h3>
              <p className="text-sm opacity-80 relative font-medium leading-relaxed">AI has optimized 4 posting times for your local audience today.</p>
              <button className="w-full py-3 bg-white text-indigo-600 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all relative">
                Apply Suggestions
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};
