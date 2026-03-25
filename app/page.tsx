import SpotifyWidget from '@/components/SpotifyWidget';
import DiscordWidget from '@/components/DiscordProfile';
import TopTracks from '@/components/TopTracks';
import { Activity, Music, Users } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Meu Dashboard
          </h1>
          <p className="text-gray-400 text-lg">
            Integração com Spotify e Discord
          </p>
        </header>

        {/* Grid de Widgets */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Spotify Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Music className="text-green-500" size={28} />
              <h2 className="text-2xl font-bold text-white">Spotify</h2>
            </div>
            <SpotifyWidget />
            <TopTracks />
          </div>

          {/* Discord Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Users className="text-purple-500" size={28} />
              <h2 className="text-2xl font-bold text-white">Discord</h2>
            </div>
            <DiscordWidget />
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 pt-8 border-t border-gray-700">
          <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
            <Activity size={14} />
            <span>Atualizado em tempo real</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
