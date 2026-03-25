'use client';

import { useState, useEffect } from 'react';
import { Music, ExternalLink } from 'lucide-react';

interface SpotifyData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
  progress?: number;
  duration?: number;
}

export default function SpotifyWidget() {
  const [spotifyData, setSpotifyData] = useState<SpotifyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSpotifyData();
    const interval = setInterval(fetchSpotifyData, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchSpotifyData = async () => {
    try {
      const response = await fetch('/api/spotify/currently-playing');
      const data = await response.json();
      setSpotifyData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Spotify:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-green-900 to-green-700 rounded-2xl p-6 shadow-xl animate-pulse">
        <div className="h-48 bg-green-800/50 rounded-lg"></div>
      </div>
    );
  }

  if (!spotifyData?.isPlaying) {
    return (
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3 text-gray-400">
          <Music size={24} />
          <p>Nada tocando no momento</p>
        </div>
      </div>
    );
  }

  const progressPercent = ((spotifyData.progress || 0) / (spotifyData.duration || 1)) * 100;

  return (
    <div className="bg-gradient-to-br from-green-800 to-green-900 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all">
      <div className="flex items-start gap-4">
        {spotifyData.albumImageUrl && (
          <img
            src={spotifyData.albumImageUrl}
            alt={spotifyData.album}
            className="w-20 h-20 rounded-lg shadow-lg"
          />
        )}
        <div className="flex-1">
          <h3 className="text-white font-bold text-lg truncate">{spotifyData.title}</h3>
          <p className="text-green-200 text-sm">{spotifyData.artist}</p>
          <p className="text-green-300 text-xs mt-1">{spotifyData.album}</p>
          
          <div className="mt-3">
            <div className="bg-green-950 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-green-400 h-full rounded-full transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          
          <a
            href={spotifyData.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-3 text-green-300 hover:text-white transition-colors text-sm"
          >
            Ouvir no Spotify <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
