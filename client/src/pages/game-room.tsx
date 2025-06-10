import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams, useLocation } from 'wouter';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { 
  Music, 
  ArrowLeft, 
  Share2, 
  Copy, 
  Users, 
  Play, 
  Plus,
  Sparkles,
  Headphones,
  Radio
} from 'lucide-react';

const GameRoom = () => {
  const params = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [nickname, setNickname] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [showSongDialog, setShowSongDialog] = useState(false);
  const [newSong, setNewSong] = useState({ title: '', artist: '', story: '' });
  const [gameRoom, setGameRoom] = useState(null);

  // Get game type and room code from URL
  const gameType = params.gameType || 'mixtape';
  const roomCode = params.code;

  // Game configurations
  const gameConfigs = {
    mixtape: {
      title: 'The Mixtape',
      description: 'Create a collaborative playlist with a fun theme',
      icon: Music,
      color: 'purple',
      themes: ['Road Trip Anthems', 'Guilty Pleasures', '90s Hits', 'Feel Good Friday']
    },
    soundtrack: {
      title: 'Soundtrack Session',
      description: 'Build the perfect playlist for a real-life event',
      icon: Headphones,
      color: 'pink',
      themes: ['Dinner Party Vibes', 'Focus Flow', 'Workout Energy', 'Celebration Time']
    },
    'desert-island': {
      title: 'Desert Island Discs',
      description: 'Share the songs that define your story',
      icon: Radio,
      color: 'indigo',
      themes: ['Life Defining Moments', 'Childhood Memories', 'First Love Songs', 'Songs of Strength']
    }
  };

  const config = gameConfigs[gameType] || gameConfigs.mixtape;

  // Create game room mutation
  const createRoomMutation = useMutation({
    mutationFn: async (data) => {
      const response = await apiRequest('POST', '/api/game-rooms', data);
      return response.json();
    },
    onSuccess: (room) => {
      setGameRoom(room);
      setLocation(`/room/${room.code}`);
      
      // Add host as player
      addPlayerMutation.mutate({
        nickname,
        gameRoomId: room.id,
        isHost: true
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create game room. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Add player mutation
  const addPlayerMutation = useMutation({
    mutationFn: async (data) => {
      const response = await apiRequest('POST', '/api/players', data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/game-rooms/${gameRoom?.id}/players`] });
    }
  });

  // Get existing room if room code provided
  const { data: existingRoom } = useQuery({
    queryKey: [`/api/game-rooms/${roomCode}`],
    enabled: !!roomCode,
  });

  // Get players for the room
  const { data: players = [] } = useQuery({
    queryKey: [`/api/game-rooms/${gameRoom?.id || existingRoom?.id}/players`],
    enabled: !!(gameRoom?.id || existingRoom?.id),
  });

  // Get songs for the room
  const { data: songs = [] } = useQuery({
    queryKey: [`/api/game-rooms/${gameRoom?.id || existingRoom?.id}/songs`],
    enabled: gameStarted && !!(gameRoom?.id || existingRoom?.id),
  });

  // Add song mutation
  const addSongMutation = useMutation({
    mutationFn: async (data) => {
      const response = await apiRequest('POST', '/api/songs', data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/game-rooms/${gameRoom?.id || existingRoom?.id}/songs`] });
      setShowSongDialog(false);
      setNewSong({ title: '', artist: '', story: '' });
      toast({
        title: "Song Added!",
        description: "Your song has been added to the playlist.",
      });
    }
  });

  useEffect(() => {
    if (existingRoom) {
      setGameRoom(existingRoom);
    }
  }, [existingRoom]);

  useEffect(() => {
    // Get nickname from URL params or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const urlNickname = urlParams.get('nickname');
    if (urlNickname) {
      setNickname(urlNickname);
    } else {
      const savedNickname = localStorage.getItem('uptune-nickname');
      if (savedNickname) {
        setNickname(savedNickname);
      }
    }
  }, []);

  const handleCreateRoom = () => {
    if (!nickname.trim()) {
      toast({
        title: "Nickname Required",
        description: "Please enter a nickname to create a game room.",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem('uptune-nickname', nickname);
    
    const themes = config.themes;
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    
    createRoomMutation.mutate({
      gameType,
      theme: randomTheme,
      hostNickname: nickname,
      isActive: true
    });
  };

  const handleJoinRoom = () => {
    if (!nickname.trim()) {
      toast({
        title: "Nickname Required",
        description: "Please enter a nickname to join the game.",
        variant: "destructive",
      });
      return;
    }

    if (existingRoom) {
      localStorage.setItem('uptune-nickname', nickname);
      addPlayerMutation.mutate({
        nickname,
        gameRoomId: existingRoom.id,
        isHost: false
      });
    }
  };

  const handleStartGame = () => {
    setGameStarted(true);
    toast({
      title: "Game Started!",
      description: "Players can now start adding songs to the playlist.",
    });
  };

  const handleAddSong = () => {
    if (!newSong.title.trim() || !newSong.artist.trim()) {
      toast({
        title: "Song Details Required",
        description: "Please enter both song title and artist.",
        variant: "destructive",
      });
      return;
    }

    const currentPlayer = players.find(p => p.nickname === nickname);
    if (currentPlayer) {
      addSongMutation.mutate({
        ...newSong,
        gameRoomId: gameRoom?.id || existingRoom?.id,
        playerId: currentPlayer.id
      });
    }
  };

  const copyRoomLink = () => {
    const roomLink = `${window.location.origin}/room/${gameRoom?.code || existingRoom?.code}`;
    navigator.clipboard.writeText(roomLink);
    toast({
      title: "Link Copied!",
      description: "Room link has been copied to your clipboard.",
    });
  };

  const currentRoom = gameRoom || existingRoom;
  const isHost = players.find(p => p.nickname === nickname)?.isHost || false;
  const isPlayerInRoom = players.some(p => p.nickname === nickname);

  // Show nickname entry if not in room yet
  if (currentRoom && !isPlayerInRoom && nickname) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <Card className="game-card p-8 text-center">
            <CardHeader>
              <div className={`w-16 h-16 bg-${config.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <config.icon className={`w-8 h-8 text-${config.color}-600`} />
              </div>
              <CardTitle className="text-2xl">{config.title}</CardTitle>
              <CardDescription>
                Theme: {currentRoom.theme}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div>
                <Input
                  type="text"
                  placeholder="Enter your nickname..."
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleJoinRoom()}
                />
              </div>
              
              <Button 
                onClick={handleJoinRoom}
                disabled={!nickname.trim() || addPlayerMutation.isPending}
                className="w-full gradient-bg text-white"
              >
                <Users className="w-4 h-4 mr-2" />
                Join Game
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <header className="px-6 py-4">
        <nav className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/games">
            <Button
              variant="ghost"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Games</span>
            </Button>
          </Link>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">Uptune</span>
          </div>

          <div></div>
        </nav>
      </header>

      <div className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {!currentRoom ? (
            // Create room form
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className={`w-20 h-20 bg-${config.color}-100 rounded-full flex items-center justify-center mx-auto mb-6`}>
                <config.icon className={`w-10 h-10 text-${config.color}-600`} />
              </div>
              <h1 className="text-4xl font-bold mb-4">{config.title}</h1>
              <p className="text-xl text-gray-600 mb-8">{config.description}</p>
              
              <Card className="game-card max-w-md mx-auto p-8">
                <CardContent className="space-y-6">
                  <div>
                    <Input
                      type="text"
                      placeholder="Enter your nickname..."
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleCreateRoom()}
                    />
                  </div>
                  
                  <Button 
                    onClick={handleCreateRoom}
                    disabled={!nickname.trim() || createRoomMutation.isPending}
                    className="w-full gradient-bg text-white"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Create Game Room
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            // Game room interface
            <>
              {/* Game Header */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <div className={`w-20 h-20 bg-${config.color}-100 rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <config.icon className={`w-10 h-10 text-${config.color}-600`} />
                </div>
                <h1 className="text-4xl font-bold mb-4">{config.title}</h1>
                <p className="text-xl text-gray-600 mb-6">{config.description}</p>
                <Badge className="gradient-bg text-white px-6 py-2">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Theme: "{currentRoom.theme}"
                </Badge>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Share Game */}
                <Card className="game-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Share2 className="w-5 h-5" />
                      <span>Invite Friends</span>
                    </CardTitle>
                    <CardDescription>
                      Share this link to let others join your game
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex space-x-2">
                      <Input
                        value={`uptune.app/room/${currentRoom.code}`}
                        readOnly
                        className="font-mono text-sm bg-gray-50"
                      />
                      <Button onClick={copyRoomLink} variant="outline" size="icon">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <Button onClick={copyRoomLink} className="w-full gradient-bg text-white">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Game Link
                    </Button>
                    
                    <p className="text-sm text-gray-600 text-center">
                      Send via WhatsApp, iMessage, or any messaging app
                    </p>
                  </CardContent>
                </Card>

                {/* Players */}
                <Card className="game-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="w-5 h-5" />
                      <span>Players ({players.length})</span>
                    </CardTitle>
                    <CardDescription>
                      {gameStarted ? 'Players in the game' : 'Waiting for friends to join...'}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-3 max-h-48 overflow-y-auto">
                      {players.map((player, index) => (
                        <div key={player.id} className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg">
                          <div className={`w-10 h-10 bg-${config.color}-100 rounded-full flex items-center justify-center text-lg`}>
                            {player.nickname.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{player.nickname}</span>
                              {player.isHost && (
                                <Badge variant="secondary" className="text-xs">Host</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Waiting placeholder */}
                      {players.length < 8 && (
                        <div className="flex items-center space-x-3 p-3 border-2 border-dashed border-gray-200 rounded-lg">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-gray-400" />
                          </div>
                          <span className="text-gray-400">Waiting for player...</span>
                        </div>
                      )}
                    </div>
                    
                    {isHost && !gameStarted && players.length >= 2 && (
                      <Button onClick={handleStartGame} className="w-full gradient-bg text-white">
                        <Play className="w-4 h-4 mr-2" />
                        Start Game
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Game Content */}
              {gameStarted && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="mt-12"
                >
                  <Card className="game-card">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Playlist ({songs.length} songs)</span>
                        <Button 
                          onClick={() => setShowSongDialog(true)}
                          size="sm"
                          className="gradient-bg text-white"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Song
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent>
                      {songs.length === 0 ? (
                        <div className="text-center py-12">
                          <Music className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600">No songs added yet. Be the first to add a song!</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {songs.map((song) => {
                            const player = players.find(p => p.id === song.playerId);
                            return (
                              <div key={song.id} className="p-4 bg-white/50 rounded-lg">
                                <div className="flex items-start space-x-3">
                                  <div className={`w-10 h-10 bg-${config.color}-100 rounded-full flex items-center justify-center flex-shrink-0`}>
                                    {player?.nickname.charAt(0).toUpperCase()}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-lg">{song.title}</div>
                                    <div className="text-gray-600">{song.artist}</div>
                                    <div className="text-sm text-gray-500 mt-1">Added by {player?.nickname}</div>
                                    {song.story && (
                                      <div className="text-sm text-gray-700 mt-2 italic">"{song.story}"</div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Game Instructions */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mt-12"
              >
                <Card className="game-card">
                  <CardHeader>
                    <CardTitle>How to Play</CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
                          1
                        </div>
                        <h4 className="font-semibold mb-2">Add Songs</h4>
                        <p className="text-sm text-gray-600">
                          Each player adds songs that fit the theme "{currentRoom.theme}"
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
                          2
                        </div>
                        <h4 className="font-semibold mb-2">Share Stories</h4>
                        <p className="text-sm text-gray-600">
                          Tell everyone why you picked each song and what it means to you
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
                          3
                        </div>
                        <h4 className="font-semibold mb-2">Export & Enjoy</h4>
                        <p className="text-sm text-gray-600">
                          Save your collaborative playlist to Spotify and keep the memories
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </>
          )}
        </div>
      </div>

      {/* Add Song Dialog */}
      <Dialog open={showSongDialog} onOpenChange={setShowSongDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a Song</DialogTitle>
            <DialogDescription>
              Add a song that fits the theme "{currentRoom?.theme}"
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Song Title</label>
              <Input
                placeholder="Enter song title..."
                value={newSong.title}
                onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Artist</label>
              <Input
                placeholder="Enter artist name..."
                value={newSong.artist}
                onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Why this song? (Optional)</label>
              <Textarea
                placeholder="Share why you chose this song..."
                value={newSong.story}
                onChange={(e) => setNewSong({ ...newSong, story: e.target.value })}
                rows={3}
              />
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button
                onClick={() => setShowSongDialog(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddSong}
                disabled={addSongMutation.isPending}
                className="flex-1 gradient-bg text-white"
              >
                Add Song
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GameRoom;
