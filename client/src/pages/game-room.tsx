import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
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
  Headphones,
  Radio,
  Trophy,
  Star,
  Heart,
  ThumbsUp,
  Zap,
  Crown,
  Gift,
  Sparkles,
  Download
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
    themes: ['Road Trip', 'Summer Vibes', 'Workout', 'Chill Night', 'Throwback'],
    isGuided: false,
    prompts: undefined
  },
  soundtrack: {
    title: 'Soundtrack Session',
    description: 'Build the perfect soundtrack for any occasion',
    icon: Headphones,
    color: 'from-blue-500 to-cyan-500',
    themes: ['Movie Night', 'Study Session', 'Party Playlist', 'Morning Motivation', 'Rain Day'],
    isGuided: false,
    prompts: undefined
  },
  'desert-island': {
    title: 'Desert Island Discs',
    description: 'Share 5 essential songs that represent different parts of who you are',
    icon: Radio,
    color: 'from-green-500 to-teal-500',
    themes: ['Musical Essentials'],
    isGuided: true,
    maxSongs: 5,
    prompts: [
      'A song for your head - something that makes you think',
      'A song for your heart - something that moves you emotionally',
      'A song for your feet - something that makes you want to move',
      'Your guilty pleasure - a song you love but might be embarrassed to admit',
      'A song from your current favorite album'
    ]
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
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [reactions, setReactions] = useState<Record<number, string[]>>({});
  const [celebrationTrigger, setCelebrationTrigger] = useState(0);

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
      
      // Check for achievements after state updates
      setTimeout(checkAchievements, 100);
      
      // Trigger celebration animation
      setCelebrationTrigger(prev => prev + 1);
      
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

  // Achievement detection system
  const checkAchievements = () => {
    const playerSongs = (songs as Song[]).filter(s => s.playerId === currentPlayer?.id);
    const newAchievements: string[] = [];

    // First Song Achievement
    if (playerSongs.length === 1 && !achievements.includes('first-song')) {
      newAchievements.push('first-song');
      toast({
        title: '🎵 First Note!',
        description: 'You added your first song to the playlist!'
      });
    }

    // Storyteller Achievement
    if (playerSongs.some(s => s.story && s.story.length > 50) && !achievements.includes('storyteller')) {
      newAchievements.push('storyteller');
      toast({
        title: '📖 Storyteller!',
        description: 'Your song stories bring music to life!'
      });
    }

    // Desert Island Master
    if (gameRoom?.gameType === 'desert-island' && playerSongs.length === 5 && !achievements.includes('desert-master')) {
      newAchievements.push('desert-master');
      toast({
        title: '🏝️ Desert Island Master!',
        description: 'You completed your musical survival kit!'
      });
    }

    // Playlist Pioneer (3+ songs)
    if (playerSongs.length >= 3 && !achievements.includes('pioneer')) {
      newAchievements.push('pioneer');
      toast({
        title: '🚀 Playlist Pioneer!',
        description: 'You are shaping this musical journey!'
      });
    }

    // Group Harmony (when playlist has 10+ songs from multiple people)
    if ((songs as Song[]).length >= 10 && 
        new Set((songs as Song[]).map(s => s.playerId)).size >= 2 && 
        !achievements.includes('harmony')) {
      newAchievements.push('harmony');
      toast({
        title: '🎼 Group Harmony!',
        description: 'Together you created something beautiful!'
      });
    }

    setAchievements(prev => [...prev, ...newAchievements]);
  };

  // Real-time reactions system
  const addReaction = (songId: number, emoji: string) => {
    setReactions(prev => ({
      ...prev,
      [songId]: [...(prev[songId] || []), emoji]
    }));
    
    // Show floating reaction animation
    toast({
      title: `${emoji} Reaction added!`,
      description: 'Your musical taste is appreciated!'
    });
  };

  // Enhanced sharing functionality
  const sharePlaylist = async () => {
    const playlistTitle = `${gameRoom?.theme} - ${gameRoom?.gameType}`;
    const songCount = (songs as Song[]).length;
    const playerCount = new Set((songs as Song[]).map(s => s.playerId)).size;
    
    const shareText = `🎵 Just created "${playlistTitle}" with ${playerCount} friends! ${songCount} amazing songs that tell our story. Join us on Uptune!`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: playlistTitle,
          text: shareText,
          url: shareUrl
        });
      } catch (error) {
        // Fallback to clipboard
        await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        toast({
          title: 'Copied to clipboard!',
          description: 'Share this playlist with your friends!'
        });
      }
    } else {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      toast({
        title: 'Copied to clipboard!',
        description: 'Share this playlist with your friends!'
      });
    }
  };

  // Generate shareable playlist card data
  const generatePlaylistCard = () => {
    const topSongs = (songs as Song[]).slice(0, 5);
    const playerIdSet = new Set<number>();
    (songs as Song[]).forEach(song => playerIdSet.add(song.playerId));
    const contributors = Array.from(playerIdSet).map(id => 
      (players as Player[]).find(p => p.id === id)?.nickname
    ).filter((name): name is string => !!name);

    return {
      title: gameRoom?.theme || 'Collaborative Playlist',
      gameType: gameRoom?.gameType,
      songCount: (songs as Song[]).length,
      contributors: contributors.slice(0, 3),
      topSongs,
      roomCode: gameRoom?.code,
      achievements: achievements.length
    };
  };

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

    const isDesertIsland = gameRoom.gameType === 'desert-island';
    const desertIslandConfig = gameConfig as typeof GAME_TYPES['desert-island'];
    const currentPrompt = isDesertIsland && desertIslandConfig.prompts ? 
      desertIslandConfig.prompts[currentPromptIndex] : '';

    const storyText = isDesertIsland ? 
      `${currentPrompt}: ${songStory}` : songStory;

    addSongMutation.mutate({
      gameRoomId: gameRoom.id,
      playerId: currentPlayer.id,
      title: selectedSong.title,
      artist: selectedSong.artist,
      album: selectedSong.album,
      spotifyId: selectedSong.id,
      imageUrl: selectedSong.imageUrl || undefined,
      previewUrl: selectedSong.previewUrl || undefined,
      story: storyText
    });

    // For Desert Island Discs, advance to next prompt
    if (isDesertIsland && desertIslandConfig.prompts && currentPromptIndex < 4) {
      setCurrentPromptIndex(prev => prev + 1);
    }
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
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
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
              <h1 className="text-xl sm:text-2xl font-bold text-white">{gameConfig.title}</h1>
              <p className="text-white/70 text-sm sm:text-base">Theme: {gameRoom.theme}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="secondary" className="text-sm sm:text-lg px-3 sm:px-4 py-1 sm:py-2 font-mono">
              {gameRoom.code}
            </Badge>
            <Button
              onClick={handleShare}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm px-3 sm:px-4 py-2"
              size="sm"
            >
              <Share2 className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Share Room</span>
              <span className="sm:hidden">Share</span>
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Players Panel */}
          <Card className="lg:order-1 order-2">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
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
          <div className="lg:col-span-2 space-y-6 lg:order-2 order-1">
            {/* Add Song Section */}
            <Card>
              <CardHeader>
                <div className="flex flex-col gap-3">
                  <CardTitle className="flex items-center text-lg">
                    <Music className="w-5 h-5 mr-2" />
                    Playlist ({(songs as Song[]).length} songs)
                  </CardTitle>
                  <div className="flex flex-col sm:flex-row gap-2 w-full">
                    {gameRoom?.gameType === 'desert-island' ? (
                      <Button
                        onClick={() => setShowAddSong(true)}
                        size="sm"
                        disabled={(songs as Song[]).filter(s => s.playerId === currentPlayer?.id).length >= 5}
                        className="gradient-bg text-white flex-1 sm:flex-none disabled:opacity-50 min-w-0"
                      >
                        <Radio className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="truncate">
                          {(songs as Song[]).filter(s => s.playerId === currentPlayer?.id).length >= 5 
                            ? 'All 5 Songs Added' 
                            : `Add Song ${Math.min((songs as Song[]).filter(s => s.playerId === currentPlayer?.id).length + 1, 5)}/5`}
                        </span>
                      </Button>
                    ) : (
                      <Button
                        onClick={() => setShowAddSong(true)}
                        size="sm"
                        className="gradient-bg text-white flex-1 sm:flex-none"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Song
                      </Button>
                    )}
                    {(songs as Song[]).some(song => song.spotifyId) && (
                      <Button
                        onClick={() => createPlaylistMutation.mutate()}
                        disabled={createPlaylistMutation.isPending}
                        size="sm"
                        variant="outline"
                        className="flex-1 sm:flex-none"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        <span className="hidden sm:inline">Export to Spotify</span>
                        <span className="sm:hidden">Export</span>
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {(songs as Song[]).length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    {gameRoom?.gameType === 'desert-island' ? (
                      <>
                        <Radio className="w-12 h-12 mx-auto mb-4 text-green-400" />
                        <h3 className="text-lg font-medium text-green-700 mb-2">Desert Island Discs</h3>
                        <p className="text-sm text-gray-600 max-w-md mx-auto">
                          Choose 5 essential songs that represent different parts of who you are. 
                          Each song represents your head, heart, feet, guilty pleasure, and current favorite.
                        </p>
                        <p className="text-xs text-green-600 mt-3 font-medium">
                          Start with a song for your head - something that makes you think.
                        </p>
                      </>
                    ) : (
                      <>
                        <Music className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No songs added yet. Be the first to add a song!</p>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {(songs as Song[]).map((song, index) => {
                      const player = (players as Player[]).find(p => p.id === song.playerId);
                      const songReactions = reactions[song.id] || [];
                      return (
                        <motion.div 
                          key={song.id} 
                          className="relative group"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-white to-purple-50 rounded-lg border border-purple-100 hover:shadow-lg transition-all duration-300">
                            {song.imageUrl && (
                              <div className="relative">
                                <img
                                  src={song.imageUrl}
                                  alt={`${song.title} cover`}
                                  className="w-16 h-16 rounded-lg object-cover shadow-md"
                                />
                                <motion.div
                                  key={celebrationTrigger}
                                  initial={{ scale: 0 }}
                                  animate={{ scale: [0, 1.2, 1] }}
                                  transition={{ duration: 0.6 }}
                                  className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
                                >
                                  <Sparkles className="w-3 h-3 text-white" />
                                </motion.div>
                              </div>
                            )}
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="font-semibold text-gray-900">{song.title}</h4>
                                {song.previewUrl && (
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="hover:bg-purple-100 text-purple-600"
                                    onClick={() => {
                                      const audio = new Audio(song.previewUrl!);
                                      audio.play();
                                    }}
                                  >
                                    <Headphones className="w-4 h-4" />
                                  </Button>
                                )}
                                {song.spotifyUrl && (
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="hover:bg-green-100 text-green-600"
                                    onClick={() => window.open(song.spotifyUrl, '_blank')}
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>
                              <p className="text-gray-600 font-medium">{song.artist}</p>
                              {song.album && <p className="text-gray-500 text-sm">{song.album}</p>}
                              {song.story && (
                                <div className="mt-2 p-3 bg-purple-50 rounded-lg border-l-4 border-purple-300">
                                  <p className="text-gray-700 italic text-sm">"{song.story}"</p>
                                </div>
                              )}
                              <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm text-gray-500">
                                    Added by <span className="font-medium text-purple-600">{player?.nickname}</span>
                                  </span>
                                  {player?.id === currentPlayer?.id && (
                                    <Badge className="bg-purple-100 text-purple-700 text-xs">You</Badge>
                                  )}
                                </div>
                                
                                {/* Quick Reactions */}
                                <div className="flex items-center space-x-1">
                                  {songReactions.length > 0 && (
                                    <div className="flex items-center space-x-1 mr-2">
                                      {songReactions.slice(0, 3).map((emoji, i) => (
                                        <span key={i} className="text-lg">{emoji}</span>
                                      ))}
                                      {songReactions.length > 3 && (
                                        <span className="text-xs text-gray-500">+{songReactions.length - 3}</span>
                                      )}
                                    </div>
                                  )}
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-red-500 hover:bg-red-50"
                                    onClick={() => addReaction(song.id, '❤️')}
                                  >
                                    <Heart className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-blue-500 hover:bg-blue-50"
                                    onClick={() => addReaction(song.id, '👍')}
                                  >
                                    <ThumbsUp className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-yellow-500 hover:bg-yellow-50"
                                    onClick={() => addReaction(song.id, '⭐')}
                                  >
                                    <Star className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
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
          <DialogContent className="max-w-2xl w-[95vw] max-h-[90vh] overflow-y-auto mx-4">
            <DialogHeader>
              {gameRoom?.gameType === 'desert-island' ? (
                <>
                  <DialogTitle className="flex items-center gap-2">
                    <Radio className="w-5 h-5 text-green-600" />
                    Song #{currentPromptIndex + 1}/5
                  </DialogTitle>
                  <DialogDescription className="text-left space-y-2">
                    <span className="block font-medium text-green-700">
                      {(gameConfig as typeof GAME_TYPES['desert-island']).prompts?.[currentPromptIndex]}
                    </span>
                    <span className="block text-sm text-gray-600">
                      Share the story behind this song and why it's essential to your musical DNA.
                    </span>
                  </DialogDescription>
                </>
              ) : (
                <>
                  <DialogTitle>Add a Song</DialogTitle>
                  <DialogDescription>
                    Search for a song and tell us why you chose it for this {gameConfig.title.toLowerCase()}.
                  </DialogDescription>
                </>
              )}
            </DialogHeader>
            <div className="space-y-4">
              <SongSearch
                onSongSelect={setSelectedSong}
                placeholder="Search for a song..."
              />
              
              {selectedSong && (
                <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center space-x-3 min-w-0">
                      {selectedSong.imageUrl && (
                        <img
                          src={selectedSong.imageUrl}
                          alt={`${selectedSong.title} cover`}
                          className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover flex-shrink-0"
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-green-800 truncate">{selectedSong.title}</h4>
                        <p className="text-green-700 truncate">{selectedSong.artist}</p>
                        <p className="text-green-600 text-sm truncate">{selectedSong.album}</p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <div className="bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-medium text-center">
                        ✓ Selected
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedSong(null)}
                        className="text-green-700 hover:text-green-900 border-green-300"
                      >
                        Change Song
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              <div>
                {gameRoom?.gameType === 'desert-island' ? (
                  <>
                    <label className="block text-sm font-medium mb-2 text-green-700">
                      Tell us your story - Why is this song essential to who you are?
                    </label>
                    <Textarea
                      placeholder="Share the memories, emotions, or experiences this song represents in your life..."
                      value={songStory}
                      onChange={(e) => setSongStory(e.target.value)}
                      maxLength={800}
                      rows={4}
                      className="border-green-200 focus:border-green-400"
                    />
                  </>
                ) : (
                  <>
                    <label className="block text-sm font-medium mb-2">
                      Why did you choose this song? (Optional)
                    </label>
                    <Textarea
                      placeholder="Share the story behind your choice..."
                      value={songStory}
                      onChange={(e) => setSongStory(e.target.value)}
                      maxLength={500}
                    />
                  </>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setShowAddSong(false)}
                  className="flex-1 sm:flex-none"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddSong}
                  disabled={!selectedSong || addSongMutation.isPending}
                  className="flex-1 sm:flex-none gradient-bg text-white"
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