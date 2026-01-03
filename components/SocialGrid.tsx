import React from 'react';
import { SOCIAL_LINKS } from '../constants';
import { ArrowUpRight } from 'lucide-react';
import githubIcon from '../icons/github.svg';
import modrinthIcon from '../icons/Modrinth.svg';
import youtubeIcon from '../icons/youtube-fill.svg';
import spotifyIcon from '../icons/spotify-fill.svg';

const iconMap: Record<string, string> = {
  'GitHub': githubIcon,
  'Modrinth': modrinthIcon,
  'YouTube': youtubeIcon,
  'Spotify': spotifyIcon,
};

interface SocialGridProps {
  hoveredBox: string | null;
}

export const SocialGrid: React.FC<SocialGridProps> = ({ hoveredBox }) => {
  return (
    <div className={`h-full flex flex-col gap-3 transition-all duration-300 ${hoveredBox && hoveredBox !== 'social' && hoveredBox !== 'profile' ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
      {SOCIAL_LINKS.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noreferrer"
          className="group relative flex items-center justify-between px-5 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl transition-all duration-300 overflow-hidden flex-1"
        >
            {/* Hover Gradient */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-r ${
                link.name === 'GitHub' ? 'from-white to-transparent' :
                link.name === 'Modrinth' ? 'from-green-400 to-transparent' :
                link.name === 'YouTube' ? 'from-red-500 to-transparent' :
                'from-emerald-400 to-transparent'
            }`} />

            <div className="flex items-center gap-4 relative z-10">
                <div className="text-zinc-400 group-hover:text-white transition-colors">
                    <img
                        src={iconMap[link.name]}
                        alt={link.name}
                        className="w-5 h-5"
                        style={{
                            filter: 'invert(0.6) sepia(0) saturate(0) brightness(0.9)',
                        }}
                    />
                </div>
                <span className="font-semibold text-zinc-300 group-hover:text-white transition-colors">
                    {link.name}
                </span>
            </div>

            <ArrowUpRight size={18} className="text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all relative z-10" />
        </a>
      ))}
    </div>
  );
};