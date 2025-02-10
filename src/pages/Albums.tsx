
import { Header } from "@/components/Header";
import { MusicPlayer } from "@/components/MusicPlayer";

const Albums = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black/20 to-black/5">
      <Header />
      
      <main className="pt-20 px-4 pb-32">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Featured Albums</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Will implement album fetching and display in future updates */}
            <div className="aspect-square bg-white/5 rounded-lg animate-pulse" />
            <div className="aspect-square bg-white/5 rounded-lg animate-pulse" />
            <div className="aspect-square bg-white/5 rounded-lg animate-pulse" />
            <div className="aspect-square bg-white/5 rounded-lg animate-pulse" />
          </div>
        </div>
      </main>
      
      <MusicPlayer />
    </div>
  );
};

export default Albums;
