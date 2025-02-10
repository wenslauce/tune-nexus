
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { MusicPlayer } from "@/components/MusicPlayer";

const Index = () => {
  const [featuredSongs, setFeaturedSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedSongs = async () => {
      try {
        const response = await fetch("https://jiosaavn-sand.vercel.app/api/songs");
        const data = await response.json();
        setFeaturedSongs(data.data || []);
      } catch (error) {
        console.error("Error fetching featured songs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedSongs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black/20 to-black/5">
      <Header />
      
      <main className="pt-20 px-4 pb-32">
        <div className="max-w-7xl mx-auto">
          <section className="mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold mb-6">Featured Songs</h2>
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array(8).fill(null).map((_, i) => (
                  <div key={i} className="aspect-square bg-white/5 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {featuredSongs.map((song: any) => (
                  <div
                    key={song.id}
                    className="group glass rounded-lg overflow-hidden card-hover"
                  >
                    <div className="aspect-square">
                      <img
                        src={song.image || "https://via.placeholder.com/300"}
                        alt={song.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-balance">{song.title}</h3>
                      <p className="text-sm text-gray-400">{song.artist}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      
      <MusicPlayer />
    </div>
  );
};

export default Index;
