
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { MusicPlayer } from "@/components/MusicPlayer";
import { searchDeezer } from "@/lib/api";

const Playlists = () => {
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const data = await searchDeezer("playlist:popular");
        setPlaylists(data.data?.slice(0, 8) || []);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black/20 to-black/5">
      <Header />
      
      <main className="pt-20 px-4 pb-32">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Featured Playlists</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {loading ? (
              Array(8).fill(null).map((_, i) => (
                <div key={i} className="aspect-square bg-white/5 rounded-lg animate-pulse" />
              ))
            ) : (
              playlists.map((playlist) => (
                <div
                  key={playlist.id}
                  className="group glass rounded-lg overflow-hidden card-hover"
                >
                  <div className="aspect-square">
                    <img
                      src={playlist.picture_medium || "https://via.placeholder.com/300"}
                      alt={playlist.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-balance">{playlist.title}</h3>
                    <p className="text-sm text-gray-400">{playlist.nb_tracks} tracks</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      
      <MusicPlayer />
    </div>
  );
};

export default Playlists;
