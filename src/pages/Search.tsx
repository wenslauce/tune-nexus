
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { MusicPlayer } from "@/components/MusicPlayer";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      setLoading(true);
      
      try {
        const response = await fetch(
          `https://jiosaavn-sand.vercel.app/api/search?query=${encodeURIComponent(query)}`
        );
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black/20 to-black/5">
      <Header />
      
      <main className="pt-20 px-4 pb-32">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">
            Search Results for "{query}"
          </h1>
          
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array(8).fill(null).map((_, i) => (
                <div key={i} className="aspect-square bg-white/5 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              {results.songs && results.songs.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold mb-4">Songs</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {results.songs.map((song: any) => (
                      <div
                        key={song.id}
                        className="glass rounded-lg overflow-hidden card-hover"
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
                </section>
              )}
              
              {/* Add similar sections for artists, albums, and playlists */}
            </div>
          )}
        </div>
      </main>
      
      <MusicPlayer />
    </div>
  );
};

export default Search;
