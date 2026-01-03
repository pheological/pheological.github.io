import React, { useState, useEffect } from 'react';

export const Background: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const xOffset = typeof window !== 'undefined' ? (mousePosition.x / window.innerWidth - 0.5) * 200 : 0;
  const yOffset = typeof window !== 'undefined' ? (mousePosition.y / window.innerHeight - 0.5) * 200 : 0;

  return (
    <div className="fixed inset-0 -z-10 bg-[#030005] overflow-hidden">
      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      {/* Rich Background Gradients */}
      <div
        className="absolute top-[-10%] left-[20%] w-[60%] h-[60%] bg-violet-900/30 rounded-full blur-[120px] animate-[pulse_8s_ease-in-out_infinite] transition-transform duration-150 ease-out"
        style={{ transform: `translate(${xOffset * 2.5}px, ${yOffset * 2.5}px) scale(1.1)` }}
      />
      <div
        className="absolute bottom-[-10%] right-[10%] w-[50%] h-[50%] bg-indigo-900/30 rounded-full blur-[100px] animate-[pulse_10s_ease-in-out_infinite_reverse] transition-transform duration-150 ease-out"
        style={{ transform: `translate(${-xOffset * 2}px, ${-yOffset * 2}px) scale(1.1)` }}
      />
      <div
        className="absolute top-[40%] left-[-10%] w-[40%] h-[40%] bg-fuchsia-900/20 rounded-full blur-[120px] transition-transform duration-150 ease-out"
        style={{ transform: `translate(${xOffset * 1.5}px, ${yOffset * 1.5}px) scale(1.1)` }}
      />

      {/* Perspective Grid Floor - Animated */}
      <div 
        className="absolute bottom-0 left-[-50%] right-[-50%] h-[60%] origin-bottom transform-gpu"
        style={{ 
            background: 'linear-gradient(transparent 0%, rgba(99, 102, 241, 0.1) 100%)',
            maskImage: 'linear-gradient(to top, black, transparent)',
            perspective: '500px',
            transform: 'rotateX(60deg)'
        }}
      >
        <div 
            className="absolute inset-0" 
            style={{
                backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                animation: 'moveGrid 15s linear infinite'
            }} 
        />
      </div>

      {/* Floating Particles / Stars */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
            <div 
                key={i}
                className="absolute bg-white rounded-full opacity-0 animate-[ping_3s_ease-in-out_infinite]"
                style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    width: `${Math.random() * 2}px`,
                    height: `${Math.random() * 2}px`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${Math.random() * 3 + 2}s`
                }}
            />
        ))}
      </div>

      <style>{`
        @keyframes moveGrid {
            0% { transform: translateY(0); }
            100% { transform: translateY(40px); }
        }
      `}</style>
    </div>
  );
};