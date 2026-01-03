import React, { useEffect, useState } from 'react';
import { LanyardData } from '../types';
import { Music, Disc } from 'lucide-react';

interface SpotifyCardProps {
  lanyard: LanyardData | null;
  hoveredBox: string | null;
}

export const SpotifyCard: React.FC<SpotifyCardProps> = ({ lanyard, hoveredBox }) => {
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const spotify = lanyard?.spotify;
  const isListening = lanyard?.listening_to_spotify && spotify;

  // Generate random heights for visualizer bars
  const [barHeights, setBarHeights] = useState<number[]>(Array(5).fill(0).map(() => Math.random()));

  useEffect(() => {
    if (!isListening) return;

    // Animate visualizer bars
    const visualizerInterval = setInterval(() => {
      setBarHeights(Array(5).fill(0).map(() => Math.random() * 0.6 + 0.4));
    }, 200);

    return () => clearInterval(visualizerInterval);
  }, [isListening]);

  useEffect(() => {
    if (!isListening || !spotify) {
      setProgress(0);
      setCurrentTime(0);
      return;
    }

    const updateProgress = () => {
      const now = Date.now();
      const start = spotify.timestamps.start;
      const end = spotify.timestamps.end;
      const total = end - start;
      const current = now - start;
      const percent = Math.min((current / total) * 100, 100);
      setProgress(percent);
      setCurrentTime(current);
    };

    const interval = setInterval(updateProgress, 1000);
    updateProgress();
    return () => clearInterval(interval);
  }, [spotify, isListening]);

  const formatDuration = (ms: number) => {
    if (ms < 0) ms = 0;
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!isListening || !spotify) {
    return (
      <div className={`h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col justify-center items-center text-center gap-4 relative overflow-hidden group transition-all duration-300 ${hoveredBox && hoveredBox !== 'spotify' && hoveredBox !== 'profile' ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-zinc-500 group-hover:text-zinc-300 transition-colors">
            <Music size={24} />
        </div>
        <p className="text-zinc-500 font-medium text-sm">Spotify Offline</p>
      </div>
    );
  }

  return (
    <div className={`h-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 relative overflow-hidden group transition-all duration-300 ${hoveredBox && hoveredBox !== 'spotify' && hoveredBox !== 'profile' ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
      {/* Dynamic Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 blur-2xl scale-125 transition-transform duration-700 group-hover:scale-150"
        style={{ backgroundImage: `url(${spotify.album_art_url})` }}
      />
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-black/40 border border-white/10 backdrop-blur-md">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">Live</span>
            </div>
            <div className="flex items-end gap-0.5 h-5">
                {barHeights.map((height, i) => (
                    <div
                        key={i}
                        className="w-1 bg-white rounded-full transition-all duration-200 ease-out"
                        style={{ height: `${height * 100}%` }}
                    />
                ))}
            </div>
        </div>

        <div className="flex gap-4 items-center mt-4">
             <img 
                src={spotify.album_art_url} 
                alt="Album Art" 
                className="w-16 h-16 rounded-xl shadow-2xl border border-white/10"
             />
             <div className="min-w-0">
                <h3 className="text-white font-bold text-lg truncate leading-tight mb-1">
                    {spotify.song}
                </h3>
                <p className="text-white/70 text-sm truncate">
                    {spotify.artist}
                </p>
             </div>
        </div>

        <div className="mt-4">
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-white shadow-[0_0_10px_white] rounded-full transition-all duration-1000 ease-linear"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <div className="flex justify-between text-xs text-white/50 mt-1.5">
                <span>{formatDuration(currentTime)}</span>
                <span>{formatDuration(spotify.timestamps.end - spotify.timestamps.start)}</span>
            </div>
        </div>
      </div>
    </div>
  );
};