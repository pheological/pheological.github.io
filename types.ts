import React from 'react';

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
  colorClass: string;
  hoverClass: string;
}

export interface Particle {
  id: number;
  left: string;
  animationDelay: string;
  animationDuration: string;
}