
import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="/" className="text-2xl font-bold">
          Musiq
        </a>
        <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="search"
              placeholder="Search for songs, artists, or albums..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
        <nav className="hidden md:flex items-center gap-6">
          <a href="/playlists" className="hover:text-white/80 transition-colors">Playlists</a>
          <a href="/artists" className="hover:text-white/80 transition-colors">Artists</a>
          <a href="/albums" className="hover:text-white/80 transition-colors">Albums</a>
        </nav>
      </div>
    </header>
  );
};
