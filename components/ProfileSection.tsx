import React, { useState } from 'react';
import { LanyardData } from '../types';
import { DISCORD_USERNAME } from '../constants';
import { Copy, Check } from 'lucide-react';
import discordIcon from '../icons/discord-fill.svg';
import pfp from '../icons/pfp.png';
import { motion } from 'framer-motion';

interface ProfileSectionProps {
  lanyard: LanyardData | null;
  hoveredBox: string | null;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ lanyard, hoveredBox }) => {
  const [copied, setCopied] = useState(false);

  const statusColors = {
    online: 'border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.4)]',
    idle: 'border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.4)]',
    dnd: 'border-rose-500 shadow-[0_0_30px_rgba(244,63,94,0.4)]',
    offline: 'border-zinc-600'
  };

  const status = lanyard?.discord_status || 'offline';
  const avatarUrl = pfp;

  const handleCopy = () => {
    navigator.clipboard.writeText(DISCORD_USERNAME);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col md:flex-row items-center md:items-start gap-8 relative overflow-hidden transition-all duration-300"
    >
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-[80px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />

      {/* Avatar with Status Ring */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="relative shrink-0"
      >
        <div className={`w-32 h-32 rounded-full overflow-hidden border-[3px] p-1 bg-white/5 backdrop-blur-sm transition-all duration-500 ${statusColors[status]}`}>
            <img 
                src={avatarUrl} 
                alt="Profile" 
                className="w-full h-full object-cover rounded-full"
            />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex-1 text-center md:text-left space-y-4"
      >
        <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-400 text-transparent bg-clip-text drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] pb-2">
                Pheological
            </h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <span className="px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-mono font-medium tracking-wider">
                    MOD DEVELOPER
                </span>
                <span className="hidden md:inline text-zinc-600">•</span>
                <span className="text-zinc-400 text-sm">Java & Fabric Enthusiast</span>
            </div>
        </div>

        <p className="text-zinc-300 leading-relaxed max-w-lg">
            Hobbyist client-side Minecraft mod developer.<br />
            Currently learning about web development and using Fabric API.
        </p>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="pt-2"
        >
            <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all group"
            >
                <img src={discordIcon} alt="Discord" className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" style={{ filter: 'invert(0.6) sepia(1) saturate(3) hue-rotate(200deg)' }} />
                <span className="font-mono text-sm text-zinc-300">{DISCORD_USERNAME}</span>
                {copied ? (
                    <Check size={16} className="text-emerald-400 ml-2" />
                ) : (
                    <Copy size={16} className="text-zinc-500 ml-2 group-hover:text-white transition-colors" />
                )}
            </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};