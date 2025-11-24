/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React, { useEffect, useState } from 'react';
import { Particle } from '../types';

export const ParticleBackground: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particles on client side to avoid hydration mismatch
    const particleCount = 50;
    const newParticles: Particle[] = Array.from({ length: particleCount }).map((_, index) => ({
      id: index,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 15}s`,
      animationDuration: `${Math.random() * 10 + 10}s`,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[1]">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-[1px] h-[1px] bg-white/30 rounded-full"
          style={{
            left: particle.left,
            animation: `float ${particle.animationDuration} infinite linear`,
            animationDelay: particle.animationDelay,
          }}
        />
      ))}
    </div>
  );
};