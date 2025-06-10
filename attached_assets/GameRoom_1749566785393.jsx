import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  Music, 
  Users, 
  Share2, 
  Copy,
  Check,
  Play,
  ArrowLeft,
  Sparkles,
  Clock,
  ExternalLink
} from 'lucide-react';

const GameRoom = () => {
  const navigate = useNavigate();
  const { gameType } = useParams();
  const location = useLocation();
  
  const [gameState, setGameState] = useState('waiting'); // waiting, playing, completed
  const [players, setPlayers] = useState([]);
  const [gameLink, setGameLink] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);
  const [nickname, setNickname] = useState('');
  const [isHost, setIsHost] = useState(false);
  const [gameTheme, setGameTheme] = useState('');
  const [submissions, setSubmissions] = useState([]);

  // Game configurations
  const gameConfigs = {
    'mixtape': {
      title: 'The Mixtape',
      description: 'Create a collaborative playlist with a fun theme',
      icon: Music,
      color: 'purple',
      themes: [
        'Guilty Pleasures',
        'Road Trip Anthems', 
        'Songs from the 90s',
        'Perfect Workout Mix',
        'Rainy Day Vibes',
        'Feel-Good Friday'
      ]
    },
    'soundtrack': {
      title: 'Soundtrack Session',
      description: 'Build the perfect playlist for a real-life event',
      icon: Music,
      color: 'pink',
      themes: [
        'Dinner Party Vibes',
        'Focus Session',
        'Festival Campsite',
        'After Dinner Chill',
        'Morning Coffee',
        'Weekend Cleanup'
      ]
    },
    'desert-island': {
      title: 'Desert Island Discs',
      description: 'Share the songs that define your story',
      icon: Music,
      color: 'indigo',
      themes: [
        'Childhood Memories',
        'Life-Changing Moments',
        'Songs That Saved Me',
        'Musical Journey',
        'First Love Songs',
        'Songs That Make You Cry'
      ]
    }
  };

  const currentGame = gameConfigs[gameType] || gameConfigs['mixtape'];

  useEffect(() => {
    // Initialize game state from navigation
    if (location.state) {
      setNickname(location.state.nickname || '');
      setIsHost(location.state.isHost || false);
    }

    // Generate shareable link (in real app, this would come from backend)
    const baseUrl = window.location.origin;
    const roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    setGameLink(`${baseUrl}/join/${roomId}`);

    // Add host as first player
    if (location.state?.isHost) {
      setPlayers([{
        id: 1,
        nickname: location.state.nickname,
        isHost: true,
        avatar: '🎵'
      }]);
    }

    // Select random theme
    const randomTheme = currentGame.themes[Math.floor(Math.random() * currentGame.themes.length)];
    setGameTheme(randomTheme);
  }, []);

  const copyGameLink = async () => {
    try {
      await navigator.clipboard.writeText(gameLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const shareGameLink = () => {
    if (navigator.share) {
      navigator.share({
        title: `Join my ${currentGame.title} game on Uptune!`,
        text: `Let's create a "${gameTheme}" playlist together!`,
        url: gameLink
      });
    } else {
      copyGameLink();
    }
  };

  const startGame = () => {
    setGameState('playing');
  };

  const simulateSpotifyExport = () => {
    // In real app, this would connect to Spotify API
    alert('🎉 Playlist exported to Spotify! (This is a demo - real Spotify integration coming soon)');
  };

  if (gameState === 'waiting') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        {/* Header */}
        <header className="px-6 py-4">
          <nav className="max-w-4xl mx-auto flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/games')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Games</span>
            </Button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
                <Music className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Uptune
              </span>
            </div>
            
            <div className="w-20"></div> {/* Spacer for centering */}
          </nav>
        </header>

        {/* Main Content */}
        <main className="px-6 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Game Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <div className={`w-20 h-20 bg-${currentGame.color}-100 rounded-full flex items-center justify-center mx-auto mb-6`}>
                <currentGame.icon className={`w-10 h-10 text-${currentGame.color}-600`} />
              </div>
              
              <h1 className="text-4xl font-bold mb-4">{currentGame.title}</h1>
              <p className="text-xl text-gray-600 mb-6">{currentGame.description}</p>
              
              <Badge className="gradient-bg text-white border-0 px-6 py-2 text-lg">
                <Sparkles className="w-4 h-4 mr-2" />
                Theme: "{gameTheme}"
              </Badge>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Share Game */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="game-card h-full">
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
                        value={gameLink}
                        readOnly
                        className="font-mono text-sm"
                      />
                      <Button
                        variant="outline"
                        onClick={copyGameLink}
                        className="flex-shrink-0"
                      >
                        {linkCopied ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    
                    <Button 
                      className="w-full gradient-bg text-white"
                      onClick={shareGameLink}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Game Link
                    </Button>
                    
                    <p className="text-sm text-gray-600 text-center">
                      Send via WhatsApp, iMessage, or any messaging app
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Players */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="game-card h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="w-5 h-5" />
                      <span>Players ({players.length})</span>
                    </CardTitle>
                    <CardDescription>
                      Waiting for friends to join...
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {players.map((player) => (
                        <div key={player.id} className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-lg">
                            {player.avatar}
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
                      
                      {/* Placeholder for more players */}
                      {[...Array(Math.max(0, 3 - players.length))].map((_, index) => (
                        <div key={`placeholder-${index}`} className="flex items-center space-x-3 p-3 border-2 border-dashed border-gray-200 rounded-lg">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-gray-400" />
                          </div>
                          <span className="text-gray-400">Waiting for player...</span>
                        </div>
                      ))}
                    </div>
                    
                    {isHost && players.length >= 1 && (
                      <Button 
                        className="w-full gradient-bg text-white"
                        onClick={startGame}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Start Game
                      </Button>
                    )}
                    
                    {!isHost && (
                      <p className="text-sm text-gray-600 text-center">
                        Waiting for host to start the game...
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Game Instructions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
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
                      <h3 className="font-semibold mb-2">Add Songs</h3>
                      <p className="text-sm text-gray-600">
                        Each player adds songs that fit the theme "{gameTheme}"
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
                        2
                      </div>
                      <h3 className="font-semibold mb-2">Share Stories</h3>
                      <p className="text-sm text-gray-600">
                        Explain why you chose each song and what it means to you
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
                        3
                      </div>
                      <h3 className="font-semibold mb-2">Export & Enjoy</h3>
                      <p className="text-sm text-gray-600">
                        Save the final playlist to Spotify and keep the memories
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
      </div>
    );
  }

  // Game Playing State (simplified for demo)
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <header className="px-6 py-4">
        <nav className="max-w-4xl mx-auto flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Uptune
            </span>
          </div>
        </nav>
      </header>

      <main className="px-6 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-24 h-24 gradient-bg rounded-full flex items-center justify-center mx-auto mb-8">
              <Music className="w-12 h-12 text-white" />
            </div>
            
            <h1 className="text-4xl font-bold mb-4">
              🎉 Game Complete!
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              You've created an amazing "{gameTheme}" playlist together!
            </p>
            
            <div className="space-y-4 max-w-md mx-auto">
              <Button 
                className="w-full gradient-bg text-white text-lg py-6"
                onClick={simulateSpotifyExport}
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Export to Spotify
              </Button>
              
              <Button 
                variant="outline"
                className="w-full"
                onClick={() => navigate('/games')}
              >
                Play Another Game
              </Button>
            </div>
            
            <p className="text-sm text-gray-500 mt-8">
              This is a demo - real Spotify integration and full game flow coming soon!
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default GameRoom;

