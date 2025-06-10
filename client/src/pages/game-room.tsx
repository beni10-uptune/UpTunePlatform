import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { SongSearch } from '@/components/song-search';
import { 
  Music, 
  ArrowLeft, 
  Share2, 
  Users, 
  Clock, 
  Plus,
  ExternalLink,
  Headphones
} from 'lucide-react';
import { getPlayerEmoji } from '@/lib/utils';
import type { GameRoom, Player, Song } from '@shared/schema';

interface SpotifyTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  imageUrl: string | null;
  spotifyUrl: string;
  previewUrl: string | null;
}

const GAME_TYPES = {
  mixtape: {
    title: 'The Mixtape',
    description: 'Create a collaborative mixtape with your friends',
    icon: Music,
    color: 'from-purple-500 to-pink-500',
    themes: ['Road Trip', 'Summer Vibes', 'Workout', 'Chill Night', 'Throwback']
  },
  soundtrack: {
    title: 'Soundtrack Session',
    description: 'Build the perfect soundtrack for any occasion',
    icon: Headphones,
    color: 'from-blue-500 to-cyan-500',
    themes: ['Movie Night', 'Study Session', 'Party Playlist', 'Morning Motivation', 'Rain Day']
  },
  'desert-island': {
    title: 'Desert Island Discs',
    description: 'Choose your essential songs for a desert island',
    icon: Music,
    color: 'from-green-500 to-teal-500',
    themes: ['Essential Classics', 'Guilty Pleasures', 'Life Soundtrack', 'Comfort Songs', 'Energy Boosters']
  }
} as const;

export default function GameRoom() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Get room code from URL
  const roomCode = window.location.pathname.split('/').pop();
  
  // State
  const [nickname, setNickname] = useState('');
  const [hasJoined, setHasJoined] = useState(false);
  const [selectedSong, setSelectedSong] = useState<SpotifyTrack | null>(null);
  const [songStory, setSongStory] = useState('');
  const [showAddSong, setShowAddSong] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  // Queries
  const { data: gameRoom, isLoading: roomLoading } = useQuery<GameRoom>({
    queryKey: [`/api/game-rooms/${roomCode}`],
    enabled: !!roomCode
  });

  const { data: players = [] } = useQuery<Player[]>({
    queryKey: [`/api/game-rooms/${gameRoom?.id}/players`],
    enabled: !!gameRoom?.id && hasJoined
  });

  const { data: songs = [] } = useQuery<Song[]>({
    queryKey: [`/api/game-rooms/${gameRoom?.id}/songs`],
    enabled: !!gameRoom?.id && hasJoined
  });

  // Mutations
  const joinRoomMutation = useMutation({
    mutationFn: async (data: { nickname: string; gameRoomId: number; isHost: boolean }) => {
      const response = await apiRequest('POST', '/api/players', data);
      return await response.json() as Player;
    },
    onSuccess: (player: Player) => {
      setCurrentPlayer(player);
      setHasJoined(true);
      queryClient.invalidateQueries({ queryKey: [`/api/game-rooms/${gameRoom?.id}/players`] });
      toast({
        title: 'Joined successfully!',
        description: `Welcome to the room, ${nickname}!`
      });
    }
  });

  const addSongMutation = useMutation({
    mutationFn: async (data: { 
      gameRoomId: number; 
      playerId: number; 
      title: string; 
      artist: string; 
      album?: string;
      spotifyId?: string;
      imageUrl?: string | null;
      previewUrl?: string | null;
      story: string; 
    }) => {
      const songData = {
        ...data,
        album: data.album || '',
        spotifyId: data.spotifyId || '',
        imageUrl: data.imageUrl || '',
        previewUrl: data.previewUrl || ''
      };
      const response = await apiRequest('POST', '/api/songs', songData);
      return await response.json() as Song;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/game-rooms/${gameRoom?.id}/songs`] });
      setShowAddSong(false);
      setSelectedSong(null);
      setSongStory('');
      toast({
        title: 'Song added!',
        description: 'Your song has been added to the playlist.'
      });
    }
  });

  const exportToSpotifyMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('GET', '/api/spotify/auth');
      const authData = await response.json() as { authUrl: string };
      window.location.href = authData.authUrl;
    },
    onError: () => {
      toast({
        title: 'Authentication Error',
        description: 'Could not connect to Spotify. Please try again.',
        variant: 'destructive'
      });
    }
  });

  const createPlaylistMutation = useMutation({
    mutationFn: async () => {
      const trackIds = (songs as Song[])
        .filter(song => song.spotifyId)
        .map(song => song.spotifyId)
        .filter(Boolean);
      
      const playlistData = {
        name: `${gameRoom?.theme} - ${gameRoom?.gameType}`,
        description: `Collaborative playlist created in Uptune`,
        trackIds
      };
      const response = await apiRequest('POST', '/api/spotify/create-playlist', playlistData);
      return await response.json() as { success: boolean; playlistUrl: string; message: string };
    },
    onSuccess: (response) => {
      toast({
        title: 'Playlist Created!',
        description: 'Your playlist has been exported to Spotify.',
      });
      if (response.playlistUrl) {
        window.open(response.playlistUrl, '_blank');
      }
    },
    onError: () => {
      // Try to authenticate first
      exportToSpotifyMutation.mutate();
    }
  });

  // Check for Spotify callback
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('spotify') === 'connected') {
      // Remove the parameter and try creating playlist
      window.history.replaceState({}, '', window.location.pathname);
      createPlaylistMutation.mutate();
    }
  }, []);

  const handleJoinRoom = () => {
    if (!nickname.trim() || !gameRoom) return;
    
    const playerExists = (players as Player[]).find(p => 
      p.nickname.toLowerCase() === nickname.toLowerCase()
    );
    
    if (playerExists) {
      setCurrentPlayer(playerExists);
      setHasJoined(true);
      setIsHost(playerExists.isHost);
      return;
    }

    const isFirstPlayer = (players as Player[]).length === 0;
    joinRoomMutation.mutate({
      nickname,
      gameRoomId: gameRoom.id,
      isHost: isFirstPlayer
    });
    setIsHost(isFirstPlayer);
  };

  const handleAddSong = () => {
    if (!selectedSong || !currentPlayer || !gameRoom) return;

    addSongMutation.mutate({
      gameRoomId: gameRoom.id,
      playerId: currentPlayer.id,
      title: selectedSong.title,
      artist: selectedSong.artist,
      album: selectedSong.album,
      spotifyId: selectedSong.id,
      imageUrl: selectedSong.imageUrl || undefined,
      previewUrl: selectedSong.previewUrl || undefined,
      story: songStory
    });
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: 'Link copied!',
        description: 'Share this link with your friends to join the room.'
      });
    } catch {
      toast({
        title: 'Share this link:',
        description: url
      });
    }
  };

  if (roomLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading room...</div>
      </div>
    );
  }

  if (!gameRoom) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <CardTitle className="text-red-600">Room Not Found</CardTitle>
            <CardDescription>
              The room code "{roomCode}" doesn't exist or has expired.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => setLocation('/')} 
              className="w-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const gameConfig = GAME_TYPES[gameRoom.gameType as keyof typeof GAME_TYPES];

  if (!hasJoined) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${gameConfig.color} flex items-center justify-center`}>
              <gameConfig.icon className="w-8 h-8 text-white" />
            </div>
            <CardTitle>{gameConfig.title}</CardTitle>
            <CardDescription>
              Theme: {gameRoom.theme}
            </CardDescription>
            <Badge variant="secondary" className="mt-2">
              Room: {gameRoom.code}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Input
                placeholder="Enter your nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleJoinRoom()}
                maxLength={20}
              />
            </div>
            <Button 
              onClick={handleJoinRoom}
              disabled={!nickname.trim() || joinRoomMutation.isPending}
              className="w-full"
            >
              {joinRoomMutation.isPending ? 'Joining...' : 'Join Room'}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setLocation('/')} 
              className="w-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation('/')}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Leave
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-white">{gameConfig.title}</h1>
              <p className="text-white/70">Theme: {gameRoom.theme}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="secondary" className="text-lg px-4 py-2 font-mono">
              {gameRoom.code}
            </Badge>
            <Button
              onClick={handleShare}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm px-4 py-2"
              size="sm"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Room
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Players Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Players ({(players as Player[]).length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {(players as Player[]).map((player, index) => (
                  <div
                    key={player.id}
                    className={`flex items-center justify-between p-2 rounded-lg ${
                      player.id === currentPlayer?.id ? 'bg-blue-50' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getPlayerEmoji(index)}</span>
                      <span className="font-medium">{player.nickname}</span>
                      {player.isHost && (
                        <Badge variant="secondary" className="text-xs">
                          Host
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Add Song Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Music className="w-5 h-5 mr-2" />
                    Playlist ({(songs as Song[]).length} songs)
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => setShowAddSong(true)}
                      size="sm"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Song
                    </Button>
                    {(songs as Song[]).some(song => song.spotifyId) && (
                      <Button
                        onClick={() => createPlaylistMutation.mutate()}
                        disabled={createPlaylistMutation.isPending}
                        size="sm"
                        variant="outline"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Export to Spotify
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {(songs as Song[]).length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Music className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No songs added yet. Be the first to add a song!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {(songs as Song[]).map((song) => {
                      const player = (players as Player[]).find(p => p.id === song.playerId);
                      return (
                        <div key={song.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                          {song.imageUrl && (
                            <img
                              src={song.imageUrl}
                              alt={`${song.title} cover`}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                          )}
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-semibold">{song.title}</h4>
                              {song.previewUrl && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => {
                                    const audio = new Audio(song.previewUrl!);
                                    audio.play();
                                  }}
                                >
                                  <Headphones className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                            <p className="text-gray-600">{song.artist}</p>
                            {song.album && <p className="text-gray-500 text-sm">{song.album}</p>}
                            {song.story && (
                              <p className="text-gray-700 mt-2 italic">"{song.story}"</p>
                            )}
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-sm text-gray-500">
                                Added by {player?.nickname}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Add Song Dialog */}
        <Dialog open={showAddSong} onOpenChange={setShowAddSong}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add a Song</DialogTitle>
              <DialogDescription>
                Search for a song and tell us why you chose it for this {gameConfig.title.toLowerCase()}.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <SongSearch
                onSongSelect={setSelectedSong}
                placeholder="Search for a song..."
              />
              
              {selectedSong && (
                <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {selectedSong.imageUrl && (
                        <img
                          src={selectedSong.imageUrl}
                          alt={`${selectedSong.title} cover`}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      )}
                      <div>
                        <h4 className="font-semibold text-green-800">{selectedSong.title}</h4>
                        <p className="text-green-700">{selectedSong.artist}</p>
                        <p className="text-green-600 text-sm">{selectedSong.album}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        ✓ Selected
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedSong(null)}
                        className="text-green-700 hover:text-green-900"
                      >
                        Change
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Why did you choose this song? (Optional)
                </label>
                <Textarea
                  placeholder="Share the story behind your choice..."
                  value={songStory}
                  onChange={(e) => setSongStory(e.target.value)}
                  maxLength={500}
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setShowAddSong(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddSong}
                  disabled={!selectedSong || addSongMutation.isPending}
                >
                  {addSongMutation.isPending ? 'Adding...' : 'Add Song'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}