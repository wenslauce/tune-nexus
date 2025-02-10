
import { Play } from "lucide-react";
import { DeezerTrack } from "../types/api";

interface TrackListProps {
  tracks: DeezerTrack[];
  onTrackSelect: (track: DeezerTrack) => void;
}

export const TrackList = ({ tracks, onTrackSelect }: TrackListProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {tracks.map((track) => (
        <div
          key={track.id}
          className="group glass rounded-lg overflow-hidden card-hover cursor-pointer"
          onClick={() => onTrackSelect(track)}
        >
          <div className="aspect-square relative">
            <img
              src={track.album.cover_medium || "https://via.placeholder.com/300"}
              alt={track.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <button className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                <Play className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-medium text-balance truncate">{track.title}</h3>
            <p className="text-sm text-gray-400 truncate">{track.artist.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
