
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { MusicPlayer } from "@/components/MusicPlayer";
import { searchDeezer } from "@/lib/api";

const Artists = () => {
  const [artists, setArtists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const data = await searchDeezer("artist:popular");
        setArtists(data.data?.slice(0, 8) || []);
      } catch (error) {
        console.error("Error fetching artists:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black/20 to-black/5">
      <Header />
      
      <main className="pt-20 px-4 pb-32">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Featured Artists</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {loading ? (
              Array(8).fill(null).map((_, i) => (
                <div key={i} className="aspect-square bg-white/5 rounded-lg animate-pulse" />
              ))
            ) : (
              artists.map((artist) => (
                <div
                  key={artist.id}
                  className="group glass rounded-lg overflow-hidden card-hover"
                >
                  <div className="aspect-square">
                    <img
                      src={artist.picture_medium || "https://via.placeholder.com/300"}
                      alt={artist.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-balance">{artist.name}</h3>
                    <p className="text-sm text-gray-400">{artist.nb_fan} fans</p>
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

export default Artists;
