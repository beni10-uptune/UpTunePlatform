import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'wouter';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Music, Play, Headphones, Radio, ArrowLeft, Sparkles, ArrowRight, Bot, Heart } from 'lucide-react';

const GameMenu = () => {
  const [, setLocation] = useLocation();
  const [nickname, setNickname] = useState('');
  const [showThemeDialog, setShowThemeDialog] = useState(false);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [customTheme, setCustomTheme] = useState('');
  const { toast } = useToast();

  const games = [
    {
      id: 'mixtape',
      title: 'The Mixtape',
      description: 'Create a collaborative playlist with a fun theme',
      icon: Music,
      color: 'purple',
      exampleThemes: ['Guilty Pleasures', 'Road Trip Classics', '90s Nostalgia', 'Songs That Make You Dance', 'Rainy Day Vibes']
    },
    {
      id: 'soundtrack',
      title: 'Soundtrack Session',
      description: 'Build the perfect playlist for a real-life event',
      icon: Headphones,
      color: 'pink',
      exampleThemes: ['Dinner Party Elegance', 'Focus & Flow', 'High Energy Workout', 'Study Session', 'Weekend Chill']
    },
    {
      id: 'desert-island',
      title: 'Desert Island Discs',
      description: 'Share the 8 songs that tell your life story - inspired by the legendary BBC show',
      icon: Radio,
      color: 'indigo',
      exampleThemes: ['My Musical DNA', 'Songs That Shaped Me', 'Life Through Music', 'Musical Autobiography', 'Desert Island Journey']
    },
    {
      id: 'ai-host',
      title: 'Perfect Moment Playlist',
      description: 'Work together to create the ideal soundtrack for your shared experiences and memories',
      icon: Heart,
      color: 'rose',
      exampleThemes: ['Our First Date Songs', 'Road Trip Memories', 'Friendship Soundtrack', 'Party Vibes Together', 'Songs That Connect Us']
    }
  ];

  // Create game room mutation
  const createGameMutation = useMutation({
    mutationFn: async (gameData: { gameType: string; theme: string; hostNickname: string }) => {
      const response = await apiRequest('POST', '/api/game-rooms', gameData);
      return await response.json();
    },
    onSuccess: (gameRoom: any) => {
      setLocation(`/game/${gameRoom.code}`);
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to create game room. Please try again.',
        variant: 'destructive'
      });
    }
  });

  const handleStartGame = (gameId: string) => {
    if (gameId === 'desert-island') {
      // Desert Island Discs is a guided experience - no theme selection needed
      createGameMutation.mutate({
        gameType: gameId,
        theme: 'Musical Essentials',
        hostNickname: 'Host'
      });
    } else if (gameId === 'ai-host') {
      // Perfect moment playlist - no theme selection needed
      createGameMutation.mutate({
        gameType: gameId,
        theme: 'Perfect Moment Together',
        hostNickname: 'Host'
      });
    } else {
      setSelectedGame(gameId);
      setShowThemeDialog(true);
    }
  };

  const handleCreateGame = () => {
    if (!selectedGame || !customTheme.trim()) return;
    
    createGameMutation.mutate({
      gameType: selectedGame,
      theme: customTheme.trim(),
      hostNickname: 'Host' // We'll prompt for nickname in the room
    });
    
    setShowThemeDialog(false);
    setCustomTheme('');
    setSelectedGame(null);
  };

  const handleSelectExampleTheme = (theme: string) => {
    setCustomTheme(theme);
  };

  const handleQuickStart = () => {
    if (nickname.trim()) {
      const randomGame = games[Math.floor(Math.random() * games.length)];
      const randomTheme = randomGame.exampleThemes[Math.floor(Math.random() * randomGame.exampleThemes.length)];
      
      createGameMutation.mutate({
        gameType: randomGame.id,
        theme: randomTheme,
        hostNickname: nickname.trim()
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <header className="px-6 py-4">
        <nav className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/">
            <Button
              variant="ghost"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Button>
          </Link>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">
              Uptune
            </span>
          </div>
          
          <Link href="/teams">
            <Button 
              variant="outline" 
              className="border-purple-200 text-purple-700 hover:bg-purple-50"
            >
              Uptune for Teams
            </Button>
          </Link>
        </nav>
      </header>

      <div className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold mb-4">
              Choose Your <span className="gradient-text">Musical Adventure</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each game creates a unique way to connect through music. Pick one and start sharing your soundtrack.
            </p>
          </motion.div>

          {/* Game Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {games.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="game-card card-hover h-full text-center cursor-pointer relative overflow-hidden">
                  <div className="music-wave h-2 absolute top-0 left-0 right-0"></div>
                  
                  <CardHeader className="pb-6">
                    <div className={`w-20 h-20 bg-${game.color}-100 rounded-full flex items-center justify-center mx-auto mb-6`}>
                      <game.icon className={`w-10 h-10 text-${game.color}-600`} />
                    </div>
                    <CardTitle className="text-2xl">{game.title}</CardTitle>
                    <CardDescription className="text-base">
                      {game.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {game.exampleThemes.slice(0, 3).map((theme: string) => (
                        <Badge
                          key={theme}
                          variant="secondary"
                          className={`bg-${game.color}-100 text-${game.color}-700`}
                        >
                          {theme}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button 
                      onClick={() => handleStartGame(game.id)}
                      disabled={createGameMutation.isPending}
                      className="gradient-bg text-white hover:opacity-90 transition-opacity w-full"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {createGameMutation.isPending ? 'Creating...' : 'Start Game'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Quick Start */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card className="game-card p-8 text-center">
              <CardHeader>
                <CardTitle className="text-2xl">Quick Start</CardTitle>
                <CardDescription className="text-base">
                  Want to jump right in? Enter your nickname and we'll match you with the perfect game.
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="max-w-md mx-auto flex gap-3">
                  <Input
                    type="text"
                    placeholder="Enter your nickname..."
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleQuickStart()}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleQuickStart}
                    disabled={!nickname.trim()}
                    className="gradient-bg text-white hover:opacity-90 transition-opacity whitespace-nowrap"
                  >
                    Let's Go!
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Theme Selection Dialog */}
      <Dialog open={showThemeDialog} onOpenChange={setShowThemeDialog}>
        <DialogContent className="max-w-lg w-[95vw] max-h-[90vh] overflow-y-auto mx-4">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              Choose Your Theme
            </DialogTitle>
            <DialogDescription>
              {selectedGame && games.find(g => g.id === selectedGame)?.title}: What's the vibe for your playlist?
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Create your own theme or pick from examples
              </label>
              <Input
                placeholder="Enter your theme (e.g., 'Songs for a Road Trip to the Beach')"
                value={customTheme}
                onChange={(e) => setCustomTheme(e.target.value)}
                className="w-full"
              />
            </div>
            
            {selectedGame && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Or choose from these examples:
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {games.find(g => g.id === selectedGame)?.exampleThemes.map((theme: string) => (
                    <Button
                      key={theme}
                      variant="outline"
                      onClick={() => handleSelectExampleTheme(theme)}
                      className="justify-start text-left h-auto p-3 hover:bg-purple-50 hover:border-purple-200"
                    >
                      <div className="flex items-center gap-2">
                        <ArrowRight className="w-4 h-4 text-purple-500" />
                        <span>{theme}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setShowThemeDialog(false);
                  setCustomTheme('');
                  setSelectedGame(null);
                }}
                className="flex-1 sm:flex-none"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateGame}
                disabled={!customTheme.trim() || createGameMutation.isPending}
                className="flex-1 sm:flex-none gradient-bg text-white"
              >
                {createGameMutation.isPending ? 'Creating...' : 'Create Game'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GameMenu;
