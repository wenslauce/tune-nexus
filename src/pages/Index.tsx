
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { MusicPlayer } from "@/components/MusicPlayer";
import { TrackList } from "@/components/TrackList";
import { searchDeezer, getDeezerPlaylist } from "@/lib/api";
import { DeezerTrack } from "@/types/api";

const Index = () => {
  const [featuredTracks, setFeaturedTracks] = useState<DeezerTrack[]>([]);
  const [trendingTracks, setTrendingTracks] = useState<DeezerTrack[]>([]);
  const [currentTrack, setCurrentTrack] = useState<DeezerTrack | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [popResponse, rockResponse] = await Promise.all([
          searchDeezer("pop"),
          searchDeezer("rock")
        ]);
        
        setFeaturedTracks(popResponse.data?.slice(0, 8) || []);
        setTrendingTracks(rockResponse.data?.slice(0, 8) || []);
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const handleTrackSelect = (track: DeezerTrack) => {
    setCurrentTrack(track);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black/20 to-black/5">
      <Header />
      
      <main className="pt-20 px-4 pb-32">
        <div className="max-w-7xl mx-auto">
          <section className="mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold mb-6">Featured Tracks</h2>
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array(8).fill(null).map((_, i) => (
                  <div key={i} className="aspect-square bg-white/5 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : (
              <TrackList tracks={featuredTracks} onTrackSelect={handleTrackSelect} />
            )}
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Trending Now</h2>
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array(8).fill(null).map((_, i) => (
                  <div key={i} className="aspect-square bg-white/5 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : (
              <TrackList tracks={trendingTracks} onTrackSelect={handleTrackSelect} />
            )}
          </section>
        </div>
      </main>
      
      <MusicPlayer currentTrack={currentTrack} />
    </div>
  );
};

export default Index;
