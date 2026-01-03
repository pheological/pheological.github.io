import React from 'react';
import { SKILLS } from '../constants';
import { Cpu, Terminal, Zap } from 'lucide-react';

export const SkillsCard: React.FC = () => {
  return (
    <div className="h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 flex flex-col relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[50px] rounded-full pointer-events-none" />

      <div className="flex items-center justify-between mb-5 relative z-10">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/20 text-indigo-300 rounded-xl">
                <Cpu size={18} />
            </div>
            <h3 className="font-bold text-white text-lg">Arsenal</h3>
        </div>
        <div className="px-2 py-1 rounded-md bg-white/5 border border-white/10">
            <span className="text-xs font-mono text-zinc-400">{SKILLS.length} MODULES</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 h-full relative z-10">
        {SKILLS.map((skill, index) => (
            <div 
                key={skill}
                className="group flex items-center gap-3 p-3 rounded-xl bg-black/20 border border-white/5 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all duration-300"
            >
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-indigo-400 group-hover:shadow-[0_0_8px_rgba(129,140,248,0.6)] transition-all" />
                <span className="font-medium text-zinc-300 group-hover:text-white text-sm">
                    {skill}
                </span>
            </div>
        ))}
      </div>
    </div>
  );
};