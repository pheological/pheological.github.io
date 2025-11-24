/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from 'react';
import { SocialLink } from '../types';

interface SocialButtonProps {
  link: SocialLink;
}

export const SocialButton: React.FC<SocialButtonProps> = ({ link }) => {
  return (
    <a 
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        relative flex items-center justify-center gap-2 
        px-4 py-[0.875rem] bg-[#1e1e1ecc] border border-white/10 
        rounded-[10px] text-white no-underline font-medium text-[0.9rem]
        transition-all duration-300 cursor-pointer overflow-hidden group
        hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(0,0,0,0.4)]
        ${link.hoverClass}
      `}
    >
      {/* Shine Effect */}
      <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-all duration-500 group-hover:left-full pointer-events-none" />
      
      <div className="relative z-10 flex items-center gap-2">
        {link.icon}
        {link.name}
      </div>
    </a>
  );
};