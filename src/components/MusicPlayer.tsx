
import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { DeezerTrack } from "../types/api";
import { getJioSaavnSong } from "../lib/api";

interface MusicPlayerProps {
  currentTrack?: DeezerTrack;
}

export const MusicPlayer = ({ currentTrack }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackUrl, setPlaybackUrl] = useState<string>("");
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (currentTrack) {
      const fetchPlaybackUrl = async () => {
        try {
          // Using JioSaavn API to get playback URL
          const saavnSong = await getJioSaavnSong(currentTrack.title);
          if (saavnSong.downloadUrl && saavnSong.downloadUrl.length > 0) {
            setPlaybackUrl(saavnSong.downloadUrl[0]);
          }
        } catch (error) {
          console.error("Error fetching playback URL:", error);
          // Fallback to Deezer preview if JioSaavn fails
          setPlaybackUrl(currentTrack.preview);
        }
      };

      fetchPlaybackUrl();
    }
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

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

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const percentage = (e.clientX - rect.left) / rect.width;
      const newTime = percentage * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newVolume = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setVolume(newVolume);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 glass px-4 py-3 animate-slide-up">
      <div className="max-w-7xl mx-auto flex items-center gap-4">
        <div className="flex items-center gap-4">
          <img
            src={currentTrack?.album.cover_medium || "https://via.placeholder.com/48"}
            alt="Album art"
            className="w-12 h-12 rounded-md"
          />
          <div className="flex flex-col">
            <span className="font-medium">{currentTrack?.title || "No track selected"}</span>
            <span className="text-sm text-gray-400">{currentTrack?.artist.name || "Artist"}</span>
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
            <span className="text-sm">{formatTime(currentTime)}</span>
            <div 
              className="flex-1 h-1 bg-white/10 rounded-full cursor-pointer"
              onClick={handleSeek}
            >
              <div 
                className="h-full bg-white rounded-full"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            <span className="text-sm">{formatTime(duration)}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Volume2 className="w-5 h-5" />
          <div 
            className="w-24 h-1 bg-white/10 rounded-full cursor-pointer"
            onClick={handleVolumeChange}
          >
            <div 
              className="h-full bg-white rounded-full"
              style={{ width: `${volume * 100}%` }}
            />
          </div>
        </div>
      </div>
      <audio
        ref={audioRef}
        src={playbackUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
};
