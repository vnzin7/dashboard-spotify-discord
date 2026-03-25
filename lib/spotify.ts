import axios from 'axios';

const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_API_URL = 'https://api.spotify.com/v1';

let accessToken: string | null = null;
let tokenExpiry: number = 0;

async function getAccessToken() {
  if (accessToken && Date.now() < tokenExpiry) {
    return accessToken;
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('Missing Spotify credentials');
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  try {
    const response = await axios.post(
      SPOTIFY_TOKEN_URL,
      new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
      {
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    accessToken = response.data.access_token;
    tokenExpiry = Date.now() + response.data.expires_in * 1000;
    
    return accessToken;
  } catch (error) {
    console.error('Error getting Spotify token:', error);
    throw error;
  }
}

export async function getCurrentlyPlaying() {
  try {
    const token = await getAccessToken();
    
    const response = await axios.get(`${SPOTIFY_API_URL}/me/player/currently-playing`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 204 || !response.data) {
      return { isPlaying: false };
    }

    const data = response.data;
    return {
      isPlaying: true,
      title: data.item.name,
      artist: data.item.artists.map((a: any) => a.name).join(', '),
      album: data.item.album.name,
      albumImageUrl: data.item.album.images[0]?.url,
      songUrl: data.item.external_urls.spotify,
      progress: data.progress_ms,
      duration: data.item.duration_ms,
    };
  } catch (error) {
    console.error('Error fetching currently playing:', error);
    return { isPlaying: false, error: true };
  }
}

export async function getTopTracks(timeRange: string = 'short_term', limit: number = 10) {
  try {
    const token = await getAccessToken();
    
    const response = await axios.get(`${SPOTIFY_API_URL}/me/top/tracks`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { time_range: timeRange, limit },
    });

    return response.data.items.map((track: any) => ({
      id: track.id,
      name: track.name,
      artist: track.artists.map((a: any) => a.name).join(', '),
      albumImage: track.album.images[0]?.url,
      url: track.external_urls.spotify,
      popularity: track.popularity,
    }));
  } catch (error) {
    console.error('Error fetching top tracks:', error);
    return [];
  }
}

export async function getRecentTracks(limit: number = 10) {
  try {
    const token = await getAccessToken();
    
    const response = await axios.get(`${SPOTIFY_API_URL}/me/player/recently-played`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { limit },
    });

    return response.data.items.map((item: any) => ({
      name: item.track.name,
      artist: item.track.artists.map((a: any) => a.name).join(', '),
      playedAt: item.played_at,
      albumImage: item.track.album.images[0]?.url,
      url: item.track.external_urls.spotify,
    }));
  } catch (error) {
    console.error('Error fetching recent tracks:', error);
    return [];
  }
}

export async function getPlaylists(limit: number = 10) {
  try {
    const token = await getAccessToken();
    
    const response = await axios.get(`${SPOTIFY_API_URL}/me/playlists`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { limit },
    });

    return response.data.items.map((playlist: any) => ({
      id: playlist.id,
      name: playlist.name,
      image: playlist.images[0]?.url,
      tracks: playlist.tracks.total,
      url: playlist.external_urls.spotify,
    }));
  } catch (error) {
    console.error('Error fetching playlists:', error);
    return [];
  }
}
