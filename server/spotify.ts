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

interface SpotifyAlbum {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  images: Array<{ url: string; height: number; width: number }>;
  external_urls: {
    spotify: string;
  };
  release_date: string;
  total_tracks: number;
}

interface SpotifyAlbumSearchResponse {
  albums: {
    items: SpotifyAlbum[];
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

  async searchAlbums(query: string, limit: number = 20): Promise<SpotifyAlbum[]> {
    const accessToken = await this.getAccessToken();
    
    const searchParams = new URLSearchParams({
      q: query,
      type: 'album',
      limit: limit.toString(),
      market: 'US'
    });

    const response = await fetch(`https://api.spotify.com/v1/search?${searchParams}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error(`Spotify album search failed: ${response.statusText}`);
    }

    const data: SpotifyAlbumSearchResponse = await response.json();
    return data.albums.items;
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

  formatAlbumForClient(album: SpotifyAlbum) {
    return {
      id: album.id,
      title: album.name,
      artist: album.artists.map(artist => artist.name).join(', '),
      album: album.name,
      imageUrl: album.images[0]?.url || null,
      spotifyUrl: album.external_urls.spotify,
      previewUrl: null // Albums don't have preview URLs
    };
  }

  async createPlaylistFromTracks(userAccessToken: string, playlistName: string, trackIds: string[], description?: string): Promise<string> {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${userAccessToken}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to get user info');
    }

    const user = await response.json();

    // Create playlist
    const createPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${user.id}/playlists`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${userAccessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: playlistName,
        description: description || `Created with Uptune - ${new Date().toLocaleDateString()}`,
        public: false
      })
    });

    if (!createPlaylistResponse.ok) {
      throw new Error('Failed to create playlist');
    }

    const playlist = await createPlaylistResponse.json();

    // Add tracks to playlist
    if (trackIds.length > 0) {
      const trackUris = trackIds.map(id => `spotify:track:${id}`);
      
      await fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userAccessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uris: trackUris
        })
      });
    }

    return playlist.external_urls.spotify;
  }

  generateAuthUrl(redirectUri: string, state?: string): string {
    const scopes = [
      'playlist-modify-private',
      'playlist-modify-public',
      'user-read-private',
      'user-read-email'
    ].join(' ');

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.clientId,
      scope: scopes,
      redirect_uri: redirectUri,
      ...(state && { state })
    });

    return `https://accounts.spotify.com/authorize?${params}`;
  }

  async exchangeCodeForToken(code: string, redirectUri: string): Promise<{ access_token: string; refresh_token: string }> {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri
      })
    });

    if (!response.ok) {
      throw new Error('Failed to exchange code for token');
    }

    return await response.json();
  }
}

export const spotifyService = new SpotifyService();