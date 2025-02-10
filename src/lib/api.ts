
import { DeezerSearchResponse, DeezerArtist, DeezerAlbum, DeezerPlaylist, DeezerTrack, JioSaavnSong, JioSaavnLyrics } from '../types/api';

const DEEZER_API_HOST = 'deezerdevs-deezer.p.rapidapi.com';
const DEEZER_API_KEY = 'b7c3a85e14mshc8d5f68ddd00616p12dafajsna72de86b3139';
const JIOSAAVN_API_BASE = 'https://jiosaavn-sand.vercel.app/api';

const deezerFetch = async (endpoint: string) => {
  const response = await fetch(`https://${DEEZER_API_HOST}${endpoint}`, {
    headers: {
      'x-rapidapi-host': DEEZER_API_HOST,
      'x-rapidapi-key': DEEZER_API_KEY,
    },
  });
  return response.json();
};

export const searchDeezer = async (query: string): Promise<DeezerSearchResponse> => {
  return deezerFetch(`/search?q=${encodeURIComponent(query)}`);
};

export const getDeezerArtist = async (id: string): Promise<DeezerArtist> => {
  return deezerFetch(`/artist/${id}`);
};

export const getDeezerAlbum = async (id: string): Promise<DeezerAlbum> => {
  return deezerFetch(`/album/${id}`);
};

export const getDeezerPlaylist = async (id: string): Promise<DeezerPlaylist> => {
  return deezerFetch(`/playlist/${id}`);
};

export const getDeezerTrack = async (id: string): Promise<DeezerTrack> => {
  return deezerFetch(`/track/${id}`);
};

// JioSaavn API functions for music playback
export const getJioSaavnSong = async (id: string): Promise<JioSaavnSong> => {
  const response = await fetch(`${JIOSAAVN_API_BASE}/songs/${id}`);
  return response.json();
};

export const getJioSaavnLyrics = async (id: string): Promise<JioSaavnLyrics> => {
  const response = await fetch(`${JIOSAAVN_API_BASE}/songs/${id}/lyrics`);
  return response.json();
};
