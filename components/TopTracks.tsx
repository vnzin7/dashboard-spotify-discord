'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, ExternalLink } from 'lucide-react';

interface Track {
  id: string;
  name: string;
  artist: string;
  albumImage: string;
  url: string;
  popularity?: number;
}

export default function TopTracks() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [timeRange, setTimeRange] = useState<'short_term' | 'medium_term' | 'long_term'>('short_term');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopTracks();
  }, [timeRange]);

  const fetchTopTracks = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/spotify/top-tracks?timeRange=${timeRange}&limit=5`);
      const data = await response.json();
      setTracks(data);
    } catch (error) {
      console.error('Error fetching top tracks:', error);
    } finally {
      setLoading(false);
    }
  };

  const timeRangeLabels = {
    short_term: 'Último mês',
    medium_term: 'Últimos 6 meses',
    long_term: 'Todo tempo',
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="text-green-500" size={24} />
          <h3 className="text-white font-bold text-lg">Top Músicas</h3>
        </div>
        
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value as any)}
          className="bg-gray-700 text-white rounded-lg px-3 py-1 text-sm"
        >
          {Object.entries(timeRangeLabels).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse flex gap-3">
              <div className="w-12 h-12 bg-gray-700 rounded-lg"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {tracks.map((track, index) => (
            <a
              key={track.id}
              href={track.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded-lg transition-colors group"
            >
              <span className="text-gray-400 font-bold w-6">{index + 1}</span>
              {track.albumImage && (
                <img src={track.albumImage} alt={track.name} className="w-10 h-10 rounded" />
              )}
              <div className="flex-1">
                <p className="text-white text-sm font-medium truncate">{track.name}</p>
                <p className="text-gray-400 text-xs truncate">{track.artist}</p>
              </div>
              <ExternalLink size={14} className="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
