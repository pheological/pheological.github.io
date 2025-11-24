/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React, { useState } from 'react';
import { DiscordIcon } from './Icons';

export const DiscordTag: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const username = "pheological";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(username);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
      // Fallback not strictly necessary in modern React apps on modern browsers, 
      // but good to have if needed. Avoiding complex DOM manipulation for fallback here.
    }
  };

  return (
    <div 
      onClick={handleCopy}
      title="Click to copy"
      className={`
        relative flex items-center justify-center gap-2 
        bg-[#1e1e1ecc] border border-white/10 rounded-lg 
        px-3 py-2 text-sm text-white cursor-pointer 
        transition-all duration-200 select-none w-fit mx-auto md:mx-0
        hover:bg-[#323232e6] hover:border-white/20 hover:-translate-y-px
        ${copied ? 'pointer-events-none' : ''}
      `}
    >
      <DiscordIcon className="w-4 h-4 text-[#cccccc]" />
      
      <span className={`font-medium transition-opacity duration-300 ${copied ? 'opacity-0' : 'opacity-100'}`}>
        {username}
      </span>

      {/* Tooltip */}
      <div className={`
        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        text-white text-[0.9rem] font-medium pointer-events-none 
        transition-opacity duration-300 z-10
        ${copied ? 'opacity-100' : 'opacity-0'}
      `}>
        Copied!
      </div>
    </div>
  );
};