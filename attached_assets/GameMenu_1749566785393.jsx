import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { 
  Music, 
  Play, 
  Users, 
  Sparkles, 
  ArrowLeft,
  Headphones,
  Mic,
  Radio,
  Share2,
  Clock,
  Zap
} from 'lucide-react';

const GameMenu = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [showNicknameInput, setShowNicknameInput] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  const games = [
    {
      id: 'mixtape',
      title: 'The Mixtape',
      description: 'Create collaborative playlists with fun themes',
      icon: Music,
      color: 'purple',
      duration: '15-30 min',
      players: '2-10 players',
      examples: ['Guilty Pleasures', 'Road Trip Anthems', 'Songs from the 90s', 'Perfect Workout Mix'],
      difficulty: 'Easy'
    },
    {
      id: 'soundtrack',
      title: 'Soundtrack Session',
      description: 'Build playlists for real-life events and moods',
      icon: Headphones,
      color: 'pink',
      duration: '20-40 min',
      players: '2-8 players',
      examples: ['Dinner Party Vibes', 'Focus Session', 'Festival Campsite', 'After Dinner Chill'],
      difficulty: 'Medium'
    },
    {
      id: 'desert-island',
      title: 'Desert Island Discs',
      description: 'Share the songs that define you and your story',
      icon: Radio,
      color: 'indigo',
      duration: '30-60 min',
      players: '2-6 players',
      examples: ['Childhood Memories', 'Life-Changing Moments', 'Songs That Saved Me', 'Musical Journey'],
      difficulty: 'Deep'
    }
  ];

  const handleGameSelect = (game) => {
    setSelectedGame(game);
    setShowNicknameInput(true);
  };

  const handleStartGame = () => {
    if (nickname.trim()) {
      // In a real app, this would create a game room and generate a shareable link
      navigate(`/game/${selectedGame.id}`, { 
        state: { 
          nickname: nickname.trim(),
          gameType: selectedGame.id,
          isHost: true 
        } 
      });
    }
  };

  const handleJoinGame = () => {
    // This would show a modal to enter a game code
    alert('Join game feature coming soon! For now, start a new game and share the link.');
  };

  if (showNicknameInput && selectedGame) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="game-card p-8">
            <CardHeader className="text-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNicknameInput(false)}
                className="absolute top-4 left-4 p-2"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              
              <div className={`w-16 h-16 bg-${selectedGame.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <selectedGame.icon className={`w-8 h-8 text-${selectedGame.color}-600`} />
              </div>
              
              <CardTitle className="text-2xl">{selectedGame.title}</CardTitle>
              <CardDescription className="text-base">
                {selectedGame.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Choose your nickname
                </label>
                <Input
                  placeholder="Enter a fun nickname..."
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="text-center text-lg"
                  maxLength={20}
                  onKeyPress={(e) => e.key === 'Enter' && handleStartGame()}
                  autoFocus
                />
                <p className="text-xs text-gray-500 text-center">
                  This is how others will see you in the game
                </p>
              </div>
              
              <Button 
                className="w-full gradient-bg text-white text-lg py-6"
                onClick={handleStartGame}
                disabled={!nickname.trim()}
              >
                <Play className="w-5 h-5 mr-2" />
                Start {selectedGame.title}
              </Button>
              
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  You'll get a shareable link to invite friends
                </p>
                <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{selectedGame.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>{selectedGame.players}</span>
                  </div>
                </div>
              </div>
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
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Uptune
            </span>
          </div>
          
          <Button 
            variant="outline" 
            onClick={handleJoinGame}
            className="border-purple-200 text-purple-700 hover:bg-purple-50"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Join Game
          </Button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="gradient-bg text-white border-0 px-4 py-2 mb-6">
              <Zap className="w-4 h-4 mr-2" />
              No Signup Required
            </Badge>
            
            <h1 className="text-5xl font-bold mb-6">
              Choose Your{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Musical Adventure
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pick a game, choose a nickname, and get a shareable link to invite your friends. 
              It's that simple to start creating musical memories together.
            </p>
          </motion.div>

          {/* Games Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {games.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card 
                  className="card-hover game-card h-full cursor-pointer relative overflow-hidden"
                  onClick={() => handleGameSelect(game)}
                >
                  <div className="music-wave h-2 absolute top-0 left-0 right-0"></div>
                  
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 bg-${game.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <game.icon className={`w-8 h-8 text-${game.color}-600`} />
                    </div>
                    
                    <CardTitle className="text-2xl mb-2">{game.title}</CardTitle>
                    <CardDescription className="text-base">
                      {game.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Game Info */}
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{game.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{game.players}</span>
                      </div>
                    </div>
                    
                    <Badge 
                      variant="secondary" 
                      className={`w-full justify-center bg-${game.color}-50 text-${game.color}-700 border-${game.color}-200`}
                    >
                      {game.difficulty}
                    </Badge>
                    
                    {/* Examples */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Example themes:</p>
                      <div className="space-y-1">
                        {game.examples.slice(0, 2).map((example, idx) => (
                          <div key={idx} className="text-xs text-gray-600 bg-white/50 rounded px-2 py-1">
                            "{example}"
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full gradient-bg text-white mt-6"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleGameSelect(game);
                      }}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Game
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* How It Works */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-8">
              How It{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Works
              </span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  step: '1',
                  title: 'Pick & Start',
                  description: 'Choose a game and enter your nickname'
                },
                {
                  step: '2',
                  title: 'Share Link',
                  description: 'Send the game link to friends via WhatsApp, iMessage, etc.'
                },
                {
                  step: '3',
                  title: 'Create Together',
                  description: 'Build amazing playlists and export to Spotify'
                }
              ].map((step, index) => (
                <div key={step.step} className="text-center">
                  <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default GameMenu;

