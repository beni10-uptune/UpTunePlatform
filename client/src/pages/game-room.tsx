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
  },

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
  const [playlistAnalysis, setPlaylistAnalysis] = useState<any>(null);
  const [aiRecommendations, setAiRecommendations] = useState<string[]>([]);
  const [showAiInsights, setShowAiInsights] = useState(false);
  


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
      
      // For Desert Island Discs, advance to next prompt automatically
      if (gameRoom?.gameType === 'desert-island') {
        const userSongs = (songs as Song[]).filter(s => s.playerId === currentPlayer?.id);
        const nextPromptIndex = userSongs.length;
        setCurrentPromptIndex(nextPromptIndex);
        
        // If user hasn't completed all 5 songs, show the next prompt immediately
        if (nextPromptIndex < 5) {
          setTimeout(() => setShowAddSong(true), 1000);
        }
      }
      
      // Check for achievements after state updates
      setTimeout(checkAchievements, 100);
      
      // Trigger celebration animation
      setCelebrationTrigger(prev => prev + 1);
      
      toast({
        title: 'Song added!',
        description: gameRoom?.gameType === 'desert-island' && (songs as Song[]).filter(s => s.playerId === currentPlayer?.id).length < 4
          ? 'Next song category coming up...'
          : 'Your song has been added to the playlist.'
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

  // AI-powered mutations
  const analyzePlaylistMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('POST', '/api/ai/analyze-playlist', {
        gameRoomId: gameRoom?.id
      });
      return await response.json();
    },
    onSuccess: (analysis) => {
      setPlaylistAnalysis(analysis);
      setShowAiInsights(true);
    }
  });

  const getRecommendationsMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('POST', '/api/ai/song-recommendations', {
        gameRoomId: gameRoom?.id,
        gameType: gameRoom?.gameType
      });
      return await response.json();
    },
    onSuccess: (data) => {
      setAiRecommendations(data.recommendations);
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
        <div className="flex flex-col gap-4 mb-6 sm:mb-8">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation('/')}
              className="text-white hover:bg-white/10 flex-shrink-0"
            >
              <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden xs:inline">Leave</span>
            </Button>
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
              <Badge variant="secondary" className="text-sm px-2 sm:px-3 py-1 font-mono flex-shrink-0">
                {gameRoom.code}
              </Badge>
              <Button
                onClick={handleShare}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm px-2 sm:px-3 py-1.5 sm:py-2 text-sm"
                size="sm"
              >
                <Share2 className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Share Room</span>
              </Button>
            </div>
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1">{gameConfig.title}</h1>
            <p className="text-white/70 text-sm sm:text-base">Theme: {gameRoom.theme}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Players & Achievements Panel */}
          <div className="lg:order-1 order-2 space-y-6">
            {/* Players */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Users className="w-5 h-5 mr-2" />
                  Players ({(players as Player[]).length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {(players as Player[]).map((player, index) => {
                    const playerSongs = (songs as Song[]).filter(s => s.playerId === player.id);
                    return (
                      <motion.div
                        key={player.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                          player.id === currentPlayer?.id 
                            ? 'bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200' 
                            : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <motion.span 
                            className="text-2xl"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            {getPlayerEmoji(index)}
                          </motion.span>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{player.nickname}</span>
                              {player.isHost && (
                                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                                  <Crown className="w-3 h-3 mr-1" />
                                  Host
                                </Badge>
                              )}
                              {player.id === currentPlayer?.id && (
                                <Badge className="bg-blue-500 text-white text-xs">You</Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-1 mt-1">
                              <Music className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-500">
                                {playerSongs.length} song{playerSongs.length !== 1 ? 's' : ''}
                              </span>
                            </div>
                          </div>
                        </div>
                        {playerSongs.length > 0 && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center"
                          >
                            <Trophy className="w-4 h-4 text-white" />
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            {achievements.length > 0 && (
              <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg text-orange-700">
                    <Trophy className="w-5 h-5 mr-2" />
                    Your Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <AnimatePresence>
                      {achievements.map((achievement, index) => (
                        <motion.div
                          key={achievement}
                          initial={{ opacity: 0, x: -20, scale: 0.9 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          transition={{ delay: index * 0.2 }}
                          className="flex items-center space-x-3 p-2 bg-white/70 rounded-lg"
                        >
                          <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                            <Trophy className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-orange-800">
                              {achievement === 'first-song' && 'First Note'}
                              {achievement === 'storyteller' && 'Storyteller'}
                              {achievement === 'desert-master' && 'Desert Island Master'}
                              {achievement === 'pioneer' && 'Playlist Pioneer'}
                              {achievement === 'harmony' && 'Group Harmony'}
                            </p>
                            <p className="text-xs text-orange-600">
                              {achievement === 'first-song' && 'Added your first song'}
                              {achievement === 'storyteller' && 'Shared meaningful stories'}
                              {achievement === 'desert-master' && 'Completed your 5 essential songs'}
                              {achievement === 'pioneer' && 'Leading the musical journey'}
                              {achievement === 'harmony' && 'Created beautiful collaboration'}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Playlist Stats */}
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center text-lg text-purple-700">
                  <Zap className="w-5 h-5 mr-2" />
                  Playlist Magic
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Songs</span>
                    <Badge className="bg-purple-100 text-purple-700">{(songs as Song[]).length}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Contributors</span>
                    <Badge className="bg-pink-100 text-pink-700">
                      {new Set((songs as Song[]).map(s => s.playerId)).size}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Your Progress</span>
                    <div className="flex items-center space-x-2">
                      <Progress 
                        value={gameRoom?.gameType === 'desert-island' 
                          ? ((songs as Song[]).filter(s => s.playerId === currentPlayer?.id).length / 5) * 100
                          : Math.min(((songs as Song[]).filter(s => s.playerId === currentPlayer?.id).length / 3) * 100, 100)
                        } 
                        className="w-16 h-2" 
                      />
                      <span className="text-xs text-gray-500">
                        {gameRoom?.gameType === 'desert-island' 
                          ? `${(songs as Song[]).filter(s => s.playerId === currentPlayer?.id).length}/5`
                          : `${(songs as Song[]).filter(s => s.playerId === currentPlayer?.id).length}`
                        }
                      </span>
                    </div>
                  </div>
                  {(songs as Song[]).length > 0 && (
                    <Button
                      onClick={sharePlaylist}
                      className="w-full mt-3 viral-button text-white"
                      size="sm"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Your Creation
                    </Button>
                  )}
                  
                  {(songs as Song[]).length >= 2 && (
                    <Button
                      onClick={() => analyzePlaylistMutation.mutate()}
                      disabled={analyzePlaylistMutation.isPending}
                      className="w-full mt-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90"
                      size="sm"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      {analyzePlaylistMutation.isPending ? 'Analyzing...' : 'AI Playlist Insights'}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

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
                  <div className="flex flex-col sm:flex-row gap-3 w-full">
                    {gameRoom?.gameType === 'desert-island' ? (
                      <Button
                        onClick={() => {
                          const userSongs = (songs as Song[]).filter(s => s.playerId === currentPlayer?.id);
                          setCurrentPromptIndex(userSongs.length);
                          setShowAddSong(true);
                        }}
                        size="lg"
                        disabled={(songs as Song[]).filter(s => s.playerId === currentPlayer?.id).length >= 5}
                        className="gradient-bg text-white w-full sm:flex-1 py-4 sm:py-3 text-base sm:text-sm font-semibold disabled:opacity-50 shadow-lg hover:shadow-xl transition-all animate-pulse"
                      >
                        <Radio className="w-5 h-5 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                        <span className="truncate">
                          {(songs as Song[]).filter(s => s.playerId === currentPlayer?.id).length >= 5 
                            ? 'All 5 Songs Added' 
                            : `Add Song ${Math.min((songs as Song[]).filter(s => s.playerId === currentPlayer?.id).length + 1, 5)}/5`}
                        </span>
                      </Button>
                    ) : (
                      <Button
                        onClick={() => setShowAddSong(true)}
                        size="lg"
                        className="gradient-bg text-white w-full sm:flex-1 py-4 sm:py-3 text-base sm:text-sm font-semibold shadow-lg hover:shadow-xl transition-all animate-pulse"
                      >
                        <Plus className="w-5 h-5 sm:w-4 sm:h-4 mr-2" />
                        Add Your Song
                      </Button>
                    )}
                    {(songs as Song[]).some(song => song.spotifyId) && (
                      <Button
                        onClick={() => createPlaylistMutation.mutate()}
                        disabled={createPlaylistMutation.isPending}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white flex-1 sm:flex-none min-w-0 px-3 py-2"
                      >
                        <svg className="w-4 h-4 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.84-.66 0-.36.24-.66.54-.779 4.56-1.021 8.52-.6 11.64 1.32.36.18.479.66.241 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.32 11.28-1.08 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                        </svg>
                        <span className="truncate">
                          {createPlaylistMutation.isPending ? 'Creating...' : 'Create Playlist in Spotify'}
                        </span>
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
                        <p className="mb-4">No songs added yet. Be the first to add a song!</p>
                        <Button
                          onClick={() => setShowAddSong(true)}
                          size="lg"
                          className="gradient-bg text-white shadow-lg hover:shadow-xl transition-all animate-pulse"
                        >
                          <Plus className="w-5 h-5 mr-2" />
                          Add First Song
                        </Button>
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
                          <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 p-3 sm:p-4 bg-gradient-to-r from-white to-purple-50 rounded-lg border border-purple-100 hover:shadow-lg transition-all duration-300">
                            {song.imageUrl && (
                              <div className="relative mx-auto sm:mx-0 flex-shrink-0">
                                <img
                                  src={song.imageUrl}
                                  alt={`${song.title} cover`}
                                  className="w-16 h-16 sm:w-16 sm:h-16 rounded-lg object-cover shadow-md"
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
                            <div className="flex-1 min-w-0 text-center sm:text-left">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-2 mb-1">
                                <h4 className="font-semibold text-gray-900 text-base sm:text-lg leading-tight break-words">{song.title}</h4>
                                <div className="flex items-center justify-center sm:justify-start gap-1 flex-shrink-0">
                                  {song.previewUrl && (
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="hover:bg-purple-100 text-purple-600 p-2"
                                      onClick={() => {
                                        const audio = new Audio(song.previewUrl!);
                                        audio.play();
                                      }}
                                    >
                                      <Headphones className="w-4 h-4" />
                                    </Button>
                                  )}
                                  {song.spotifyId && (
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="hover:bg-green-100 text-green-600 p-2"
                                      onClick={() => window.open(`https://open.spotify.com/track/${song.spotifyId}`, '_blank')}
                                    >
                                      <ExternalLink className="w-4 h-4" />
                                    </Button>
                                  )}
                                </div>
                              </div>
                              <p className="text-gray-600 font-medium text-sm sm:text-base break-words">{song.artist}</p>
                              {song.album && <p className="text-gray-500 text-xs sm:text-sm break-words">{song.album}</p>}
                              {song.story && (
                                <div className="mt-2 p-3 bg-purple-50 rounded-lg border-l-4 border-purple-300">
                                  <p className="text-gray-700 italic text-sm break-words">"{song.story}"</p>
                                </div>
                              )}
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-3">
                                <div className="flex items-center justify-center sm:justify-start space-x-2">
                                  <span className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
                                    Added by <span className="font-medium text-purple-600">{player?.nickname}</span>
                                  </span>
                                  {player?.id === currentPlayer?.id && (
                                    <Badge className="bg-purple-100 text-purple-700 text-xs">You</Badge>
                                  )}
                                </div>
                                
                                {/* Quick Reactions */}
                                <div className="flex items-center justify-center sm:justify-end space-x-1">
                                  {songReactions.length > 0 && (
                                    <div className="flex items-center space-x-1 mr-2">
                                      {songReactions.slice(0, 3).map((emoji, i) => (
                                        <span key={i} className="text-base sm:text-lg">{emoji}</span>
                                      ))}
                                      {songReactions.length > 3 && (
                                        <span className="text-xs text-gray-500">+{songReactions.length - 3}</span>
                                      )}
                                    </div>
                                  )}
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-red-500 hover:bg-red-50 p-1.5 sm:p-2"
                                    onClick={() => addReaction(song.id, '❤️')}
                                  >
                                    <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-blue-500 hover:bg-blue-50 p-1.5 sm:p-2"
                                    onClick={() => addReaction(song.id, '👍')}
                                  >
                                    <ThumbsUp className="w-3 h-3 sm:w-4 sm:h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-yellow-500 hover:bg-yellow-50 p-1.5 sm:p-2"
                                    onClick={() => addReaction(song.id, '⭐')}
                                  >
                                    <Star className="w-3 h-3 sm:w-4 sm:h-4" />
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
          <DialogContent className="max-w-2xl w-[100vw] sm:w-[90vw] max-h-[95vh] sm:max-h-[90vh] flex flex-col p-0 m-0 sm:mx-auto rounded-t-xl sm:rounded-lg border-0 sm:border inset-x-0 bottom-0 sm:inset-auto sm:top-[50%] sm:left-[50%] sm:translate-x-[-50%] sm:translate-y-[-50%] data-[state=open]:slide-in-from-bottom sm:data-[state=open]:slide-in-from-bottom-0">
            <div className="p-4 sm:p-6 border-b bg-white">
              <DialogHeader>
                {gameRoom?.gameType === 'desert-island' ? (
                  <>
                    <DialogTitle className="flex items-center gap-2">
                      <Radio className="w-5 h-5 text-green-600" />
                      Song #{currentPromptIndex + 1}/5
                    </DialogTitle>
                    <DialogDescription className="text-left space-y-3">
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <span className="block font-semibold text-green-800 mb-1">
                          {(gameConfig as typeof GAME_TYPES['desert-island']).prompts?.[currentPromptIndex]}
                        </span>
                        <span className="block text-sm text-green-700">
                          Share the story behind this song and why it's essential to your musical DNA.
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 space-y-1">
                        <div>Progress: {(songs as Song[]).filter(s => s.playerId === currentPlayer?.id).length}/5 songs added</div>
                        <div className="flex gap-1">
                          {[0,1,2,3,4].map(i => (
                            <div 
                              key={i} 
                              className={`w-3 h-3 rounded-full ${
                                i < (songs as Song[]).filter(s => s.playerId === currentPlayer?.id).length 
                                  ? 'bg-green-500' 
                                  : i === currentPromptIndex 
                                    ? 'bg-green-300 animate-pulse' 
                                    : 'bg-gray-200'
                              }`} 
                            />
                          ))}
                        </div>
                      </div>
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
            </div>
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
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
              
            </div>
            <div className="p-4 sm:p-6 border-t bg-white">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowAddSong(false)}
                  className="w-full sm:flex-1 py-3 text-base sm:text-sm"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddSong}
                  disabled={!selectedSong || addSongMutation.isPending}
                  className="w-full sm:flex-1 gradient-bg text-white py-3 text-base sm:text-sm font-semibold"
                >
                  {addSongMutation.isPending ? 'Adding...' : 'Add Song'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* AI Insights Dialog */}
        <Dialog open={showAiInsights} onOpenChange={setShowAiInsights}>
          <DialogContent className="max-w-2xl w-[90vw] max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-600" />
                AI Playlist Insights
              </DialogTitle>
              <DialogDescription>
                Discover the musical DNA of your collaborative playlist
              </DialogDescription>
            </DialogHeader>
            
            {playlistAnalysis && (
              <div className="space-y-6">
                {/* Mood & Energy */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card className="p-4">
                    <h3 className="font-semibold text-sm mb-2 text-blue-700">Playlist Mood</h3>
                    <p className="text-lg font-medium">{playlistAnalysis.mood}</p>
                    <div className="mt-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Energy:</span>
                        <Badge className={
                          playlistAnalysis.energy === 'high' ? 'bg-red-100 text-red-700' :
                          playlistAnalysis.energy === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-blue-100 text-blue-700'
                        }>
                          {playlistAnalysis.energy}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-4">
                    <h3 className="font-semibold text-sm mb-2 text-purple-700">Genres</h3>
                    <div className="flex flex-wrap gap-1">
                      {playlistAnalysis.genres?.map((genre: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* Description */}
                <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50">
                  <h3 className="font-semibold text-sm mb-2 text-gray-700">Playlist Vibe</h3>
                  <p className="text-sm text-gray-600">{playlistAnalysis.description}</p>
                </Card>

                {/* Themes */}
                {playlistAnalysis.themes && playlistAnalysis.themes.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-sm mb-3 text-gray-700">Common Themes</h3>
                    <div className="flex flex-wrap gap-2">
                      {playlistAnalysis.themes.map((theme: string, index: number) => (
                        <Badge key={index} className="bg-purple-100 text-purple-700">
                          {theme}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* AI Recommendations */}
                {playlistAnalysis.recommendations && playlistAnalysis.recommendations.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-sm mb-3 text-gray-700">AI Song Recommendations</h3>
                    <div className="space-y-2">
                      {playlistAnalysis.recommendations.slice(0, 5).map((rec: string, index: number) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm font-medium">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Get More Recommendations */}
                <div className="flex gap-3">
                  <Button
                    onClick={() => getRecommendationsMutation.mutate()}
                    disabled={getRecommendationsMutation.isPending}
                    variant="outline"
                    className="flex-1"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    {getRecommendationsMutation.isPending ? 'Finding...' : 'Get More Suggestions'}
                  </Button>
                  <Button
                    onClick={() => setShowAiInsights(false)}
                    className="flex-1 gradient-bg text-white"
                  >
                    Close
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>


      </div>
    </div>
  );
}