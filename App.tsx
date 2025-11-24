/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from 'react';
import { ParticleBackground } from './components/ParticleBackground';
import { ProfileCard } from './components/ProfileCard';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-black via-[#111111] to-[#1a1a1a] text-white overflow-hidden font-sans">
      <ParticleBackground />
      
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4 sm:p-8">
        <ProfileCard />
      </div>
    </div>
  );
};

export default App;