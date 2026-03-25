export interface SpotifyCurrentlyPlaying {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
  progress?: number;
  duration?: number;
}

export interface SpotifyTopTrack {
  id: string;
  name: string;
  artist: string;
  albumImage: string;
  url: string;
  popularity?: number;
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  image: string;
  tracks: number;
  url: string;
}

export interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
  banner?: string;
  status: 'online' | 'idle' | 'dnd' | 'offline';
}

export interface DiscordServerStats {
  name: string;
  icon: string;
  totalMembers: number;
  onlineMembers: number;
  textChannels: number;
  voiceChannels: number;
  boostCount: number;
  boostLevel: number;
}

export interface DiscordMember {
  id: string;
  username: string;
  avatar: string;
  status: string;
  activity?: string;
}
