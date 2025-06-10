interface SpotifyCredentials {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  album: {
    name: string;
    images: Array<{ url: string; height: number; width: number }>;
  };
  external_urls: {
    spotify: string;
  };
  preview_url: string | null;
}

interface SpotifySearchResponse {
  tracks: {
    items: SpotifyTrack[];
    total: number;
  };
}

export class SpotifyService {
  private clientId: string;
  private clientSecret: string;
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  constructor() {
    this.clientId = process.env.SPOTIFY_CLIENT_ID!;
    this.clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
    
    if (!this.clientId || !this.clientSecret) {
      throw new Error('Spotify credentials not found. Please set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET environment variables.');
    }
  }

  private async getAccessToken(): Promise<string> {
    // Check if current token is still valid
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`
      },
      body: 'grant_type=client_credentials'
    });

    if (!response.ok) {
      throw new Error(`Failed to get Spotify access token: ${response.statusText}`);
    }

    const credentials: SpotifyCredentials = await response.json();
    this.accessToken = credentials.access_token;
    this.tokenExpiry = Date.now() + (credentials.expires_in * 1000) - 60000; // Refresh 1 minute early

    return this.accessToken;
  }

  async searchTracks(query: string, limit: number = 20): Promise<SpotifyTrack[]> {
    const accessToken = await this.getAccessToken();
    
    const searchParams = new URLSearchParams({
      q: query,
      type: 'track',
      limit: limit.toString(),
      market: 'US'
    });

    const response = await fetch(`https://api.spotify.com/v1/search?${searchParams}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error(`Spotify search failed: ${response.statusText}`);
    }

    const data: SpotifySearchResponse = await response.json();
    return data.tracks.items;
  }

  async getTrack(trackId: string): Promise<SpotifyTrack | null> {
    const accessToken = await this.getAccessToken();
    
    const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to get track: ${response.statusText}`);
    }

    return await response.json();
  }

  formatTrackForClient(track: SpotifyTrack) {
    return {
      id: track.id,
      title: track.name,
      artist: track.artists.map(artist => artist.name).join(', '),
      album: track.album.name,
      imageUrl: track.album.images[0]?.url || null,
      spotifyUrl: track.external_urls.spotify,
      previewUrl: track.preview_url
    };
  }
}

export const spotifyService = new SpotifyService();