import React, { useEffect, useState } from 'react';
import { Clock, Globe } from 'lucide-react';

interface TimeCardProps {
  hoveredBox: string | null;
}

export const TimeCard: React.FC<TimeCardProps> = ({ hoveredBox }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimeParts = (date: Date) => {
    const timeString = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    const [time, period] = timeString.split(' ');
    const [hour, minute] = time.split(':');
    return { hour, minute, period };
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={`h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${hoveredBox && hoveredBox !== 'time' && hoveredBox !== 'profile' ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
      {/* Decorative Glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 blur-[40px] rounded-full" />
      
      <div className="flex items-start justify-between relative z-10">
        <div className="p-2.5 bg-cyan-500/10 text-cyan-400 rounded-xl">
            <Clock size={20} />
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] font-bold text-cyan-200 tracking-wider">LOCAL</span>
        </div>
      </div>

      <div className="space-y-1 relative z-10 mt-6">
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight tabular-nums">
            {formatTimeParts(time).hour}
            <span className="animate-pulse">:</span>
            {formatTimeParts(time).minute}
            <span className="text-3xl align-baseline"> {formatTimeParts(time).period}</span>
        </h2>
        <p className="text-zinc-400 font-medium">
            {formatDate(time)}
        </p>
      </div>

      <div className="mt-6 pt-6 border-t border-white/5 flex items-center gap-2 text-zinc-500 text-sm">
        <Globe size={14} />
        <span>United States, PST</span>
      </div>
    </div>
  );
};