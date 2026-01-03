import React, { useState } from 'react';
import { useLanyard } from './hooks/useLanyard';
import { Background } from './components/Background';
import { ProfileSection } from './components/ProfileSection';
import { SpotifyCard } from './components/SpotifyCard';
import { SocialGrid } from './components/SocialGrid';
import { TimeCard } from './components/TimeCard';

const App: React.FC = () => {
  const { data: lanyard } = useLanyard();
  const [hoveredBox, setHoveredBox] = useState<string | null>(null);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8">
      <Background />
      
      <main className="w-full max-w-5xl mx-auto space-y-4">

        {/* Top Section: Profile */}
        <div
          className="w-full"
          onMouseEnter={() => setHoveredBox('profile')}
          onMouseLeave={() => setHoveredBox(null)}
        >
            <ProfileSection lanyard={lanyard} hoveredBox={hoveredBox} />
        </div>

        {/* Bottom Section: 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Column 1: Spotify */}
            <div
              className="h-full min-h-[250px]"
              onMouseEnter={() => setHoveredBox('spotify')}
              onMouseLeave={() => setHoveredBox(null)}
            >
                <SpotifyCard lanyard={lanyard} hoveredBox={hoveredBox} />
            </div>

            {/* Column 2: Social Links */}
            <div
              className="h-full"
              onMouseEnter={() => setHoveredBox('social')}
              onMouseLeave={() => setHoveredBox(null)}
            >
                <SocialGrid hoveredBox={hoveredBox} />
            </div>

            {/* Column 3: Time/Status */}
            <div
              className="h-full min-h-[250px]"
              onMouseEnter={() => setHoveredBox('time')}
              onMouseLeave={() => setHoveredBox(null)}
            >
                <TimeCard hoveredBox={hoveredBox} />
            </div>

        </div>

        <footer className="text-center pt-8 text-zinc-600 text-xs font-mono uppercase tracking-widest animate-fade-in">
            System Online • {new Date().getFullYear()}
        </footer>

      </main>
    </div>
  );
};

export default App;