'use client';

import { useState, useEffect } from 'react';
import { Server, Users, Crown } from 'lucide-react';

interface ServerStats {
  name: string;
  icon?: string;  // ← Adicione esta linha (torna opcional)
  totalMembers: number;
  onlineMembers: number;
  textChannels: number;
  voiceChannels: number;
  boostCount: number;
  boostLevel: number;
}

export default function DiscordWidget() {
  const [serverStats, setServerStats] = useState<ServerStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDiscordData();
  }, []);

  const fetchDiscordData = async () => {
    try {
      const response = await fetch('/api/discord/server');
      const data = await response.json();
      setServerStats(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Discord:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl p-6 shadow-xl animate-pulse">
        <div className="h-64 bg-indigo-800/50 rounded-lg"></div>
      </div>
    );
  }

  if (!serverStats) {
    return (
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-xl">
        <p className="text-gray-400">Erro ao carregar dados do Discord</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-indigo-800 to-purple-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          {serverStats.icon && (
            <img
              src={`https://cdn.discordapp.com/icons/${serverStats.icon}.png`}
              alt={serverStats.name}
              className="w-12 h-12 rounded-full"
            />
          )}
          <h3 className="text-white font-bold text-xl">{serverStats.name}</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-white/10 rounded-lg p-3">
            <Users className="text-blue-400 mb-2" size={20} />
            <p className="text-gray-300 text-sm">Total Membros</p>
            <p className="text-white font-bold text-2xl">{serverStats.totalMembers}</p>
          </div>
          
          <div className="bg-white/10 rounded-lg p-3">
            <div className="flex items-center gap-1 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <Users className="text-green-400" size={18} />
            </div>
            <p className="text-gray-300 text-sm">Canais</p>
            <p className="text-white font-bold text-xl">
              {serverStats.textChannels} 📝 / {serverStats.voiceChannels} 🎤
            </p>
          </div>
        </div>
        
        {serverStats.boostCount > 0 && (
          <div className="mt-4 bg-purple-900/50 rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Crown className="text-purple-400" size={18} />
              <span className="text-purple-200">Server Boost</span>
            </div>
            <span className="text-white font-bold">
              Nível {serverStats.boostLevel} ({serverStats.boostCount} boosts)
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
