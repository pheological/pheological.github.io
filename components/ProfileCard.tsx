/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React, { useRef, useState, useEffect } from 'react';
import { Avatar } from './Avatar';
import { DiscordTag } from './DiscordTag';
import { SkillBadge } from './SkillBadge';
import { SocialButton } from './SocialButton';
import { GitHubIcon, ModrinthIcon, SpotifyIcon, YouTubeIcon } from './Icons';
import { SocialLink } from '../types';

const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/pheological',
    icon: <GitHubIcon className="w-5 h-5" />,
    colorClass: '',
    hoverClass: 'hover:bg-white/5 hover:border-white/20'
  },
  {
    name: 'Modrinth',
    url: 'https://modrinth.com/user/pheological',
    icon: <ModrinthIcon className="w-5 h-5" />,
    colorClass: '',
    hoverClass: 'hover:bg-[#1ed66b]/10 hover:border-[#1ed66b]/30'
  },
  {
    name: 'Spotify',
    url: 'https://open.spotify.com/user/zknuty0k9dxh8hfe7nuh9xu43',
    icon: <SpotifyIcon className="w-5 h-5" />,
    colorClass: '',
    hoverClass: 'hover:bg-[#1ed760]/10 hover:border-[#1ed760]/30'
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@pheological',
    icon: <YouTubeIcon className="w-5 h-5" />,
    colorClass: '',
    hoverClass: 'hover:bg-[#ff0000]/10 hover:border-[#ff0000]/30'
  }
];

const SKILLS = ['Python', 'Java', 'Fabric API', 'Minecraft Modding'];

export const ProfileCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('translateY(0) rotateX(0) rotateY(0)');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      
      const card = cardRef.current;
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) / 50;
      const deltaY = (e.clientY - centerY) / 50;

      // Invert deltaY for natural tilt (mouse up -> tilt back)
      setTransform(`translateY(-5px) rotateX(${deltaY}deg) rotateY(${deltaX}deg)`);
    };

    const handleMouseLeave = () => {
      setTransform('translateY(0) rotateX(0) rotateY(0)');
    };

    // Add listener to window to track mouse relative to card center even when outside
    // or we can attach to document.body like the original script
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className="w-full max-w-[900px] bg-gradient-to-br from-[#1e1e1ecc] via-[#141414e6] to-[#0f0f0ff2] border border-white/5 rounded-[20px] p-8 md:p-12 lg:px-16 lg:py-12 flex flex-col md:flex-row items-center gap-12 shadow-[0_8px_40px_rgba(0,0,0,0.6)] transition-transform duration-100 ease-out animate-[slideUp_0.8s_ease-out]"
      style={{ 
        transform,
        transformStyle: 'preserve-3d', // Adds depth to the tilt
      }}
    >
      {/* Profile Info Section */}
      <div className="flex-1 text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-8 justify-center md:justify-start">
          <Avatar />
          <div>
            <h1 className="text-[2.5rem] font-bold mb-2 bg-gradient-to-br from-white to-[#cccccc] bg-clip-text text-transparent leading-tight">
              Pheological
            </h1>
            <div className="text-[1.1rem] text-[#cccccc] leading-relaxed mb-3">
              IGN: PHEOLOGICAL
            </div>
            <DiscordTag />
          </div>
        </div>

        <div className="text-[1.1rem] text-[#cccccc] leading-relaxed mb-3">
          Amateur Mod Developer for Minecraft<br />
          Currently learning to use Fabric API to write clientside mods
        </div>

        <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
          {SKILLS.map((skill) => (
            <SkillBadge key={skill} name={skill} />
          ))}
        </div>
      </div>

      {/* Social Links Section */}
      <div className="flex-none w-full md:w-[320px]">
        <div className="grid grid-cols-2 gap-4">
          {SOCIAL_LINKS.map((link) => (
            <SocialButton key={link.name} link={link} />
          ))}
        </div>
      </div>
    </div>
  );
};