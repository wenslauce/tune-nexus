
import { useState, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 glass px-4 py-3 animate-slide-up">
      <div className="max-w-7xl mx-auto flex items-center gap-4">
        <div className="flex items-center gap-4">
          <img
            src="https://via.placeholder.com/48"
            alt="Album art"
            className="w-12 h-12 rounded-md"
          />
          <div className="flex flex-col">
            <span className="font-medium">Song Title</span>
            <span className="text-sm text-gray-400">Artist Name</span>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col items-center gap-2">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
              <SkipBack className="w-5 h-5" />
            </button>
            <button
              onClick={togglePlay}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              )}
            </button>
            <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
              <SkipForward className="w-5 h-5" />
            </button>
          </div>
          
          <div className="w-full max-w-xl flex items-center gap-2">
            <span className="text-sm">0:00</span>
            <div className="flex-1 h-1 bg-white/10 rounded-full">
              <div className="h-full w-0 bg-white rounded-full" />
            </div>
            <span className="text-sm">0:00</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Volume2 className="w-5 h-5" />
          <div className="w-24 h-1 bg-white/10 rounded-full">
            <div className="h-full w-1/2 bg-white rounded-full" />
          </div>
        </div>
      </div>
      <audio ref={audioRef} />
    </div>
  );
};
