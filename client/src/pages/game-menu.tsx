import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'wouter';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Music, Play, Headphones, Radio, ArrowLeft } from 'lucide-react';

const GameMenu = () => {
  const [, setLocation] = useLocation();
  const [nickname, setNickname] = useState('');
  const { toast } = useToast();

  const games = [
    {
      id: 'mixtape',
      title: 'The Mixtape',
      description: 'Create a collaborative playlist with a fun theme',
      icon: Music,
      color: 'purple',
      themes: ['Guilty Pleasures', 'Road Trip', '90s Hits']
    },
    {
      id: 'soundtrack',
      title: 'Soundtrack Session',
      description: 'Build the perfect playlist for a real-life event',
      icon: Headphones,
      color: 'pink',
      themes: ['Dinner Party', 'Focus Time', 'Workout']
    },
    {
      id: 'desert-island',
      title: 'Desert Island Discs',
      description: 'Share the songs that define your story',
      icon: Radio,
      color: 'indigo',
      themes: ['Life Stories', 'Memories', 'Identity']
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
    const game = games.find(g => g.id === gameId);
    if (!game) return;
    
    const randomTheme = game.themes[Math.floor(Math.random() * game.themes.length)];
    
    createGameMutation.mutate({
      gameType: gameId,
      theme: randomTheme,
      hostNickname: 'Host' // We'll prompt for nickname in the room
    });
  };

  const handleQuickStart = () => {
    if (nickname.trim()) {
      const randomGame = games[Math.floor(Math.random() * games.length)];
      const randomTheme = randomGame.themes[Math.floor(Math.random() * randomGame.themes.length)];
      
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
                      {game.themes.map((theme) => (
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
    </div>
  );
};

export default GameMenu;
