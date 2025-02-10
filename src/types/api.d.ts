
// Deezer API Types
export interface DeezerTrack {
  id: number;
  title: string;
  duration: number;
  preview: string;
  artist: DeezerArtist;
  album: DeezerAlbum;
}

export interface DeezerArtist {
  id: number;
  name: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  nb_fan?: number;
}

export interface DeezerAlbum {
  id: number;
  title: string;
  cover: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
}

export interface DeezerPlaylist {
  id: number;
  title: string;
  nb_tracks: number;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
}

export interface DeezerSearchResponse {
  data: DeezerTrack[];
  total: number;
  next?: string;
}

// JioSaavn API Types
export interface JioSaavnSong {
  id: string;
  name: string;
  album: string;
  year: string;
  duration: string;
  downloadUrl: string[];
  image: string[];
}

export interface JioSaavnLyrics {
  lyrics: string;
  snippet: string;
}
