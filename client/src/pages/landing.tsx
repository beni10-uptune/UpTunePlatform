import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'wouter';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { apiRequest } from '@/lib/queryClient';
import { 
  Music, 
  Play, 
  Users, 
  Sparkles, 
  Plus,
  Radio,
  Headphones,
  Heart,
  ArrowRight,
  Trophy
} from 'lucide-react';

const LandingPage = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showJoinDialog, setShowJoinDialog] = useState(false);
  const [joinCode, setJoinCode] = useState('');
  const [, navigate] = useLocation();

  const handleJoinGame = () => {
    if (joinCode.trim()) {
      navigate(`/room/${joinCode.toUpperCase()}`);
    }
  };

  // Create game mutation
  const createGameMutation = useMutation({
    mutationFn: async (gameType: string) => {
      const response = await apiRequest('POST', '/api/game-rooms', {
        gameType,
        theme: getDefaultTheme(gameType),
        hostNickname: 'Host'
      });
      return await response.json();
    },
    onSuccess: (gameRoom) => {
      navigate(`/room/${gameRoom.code}`);
    }
  });

  const getDefaultTheme = (gameType: string) => {
    switch (gameType) {
      case 'mixtape':
        return 'Musical Essentials';
      case 'soundtrack':
        return 'Epic Adventure';
      case 'desert-island':
        return 'Musical Essentials';
      default:
        return 'Musical Essentials';
    }
  };

  const handleGameModeClick = (gameType: string) => {
    createGameMutation.mutate(gameType);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-purple-200 to-pink-200 opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-blue-200 to-purple-200 opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 opacity-20 animate-spin" style={{ animationDuration: '20s' }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-4">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">
              Uptune
            </span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/teams">
              <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                For Teams
              </Button>
            </Link>
          </motion.div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <Badge className="bg-purple-100 text-purple-700 border-purple-200 px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                100% Free Forever
              </Badge>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                Build collaborative playlists{' '}
                <span className="gradient-text">
                  with friends
                </span>
              </h1>
              
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
                Create music games where everyone adds songs and tells their stories. 
                Three game modes: collaborative mixtapes, movie soundtracks, and desert island picks.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
            >
              <Link href="/games" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="gradient-bg text-white hover:opacity-90 transition-opacity text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <Plus className={`w-4 h-4 sm:w-5 sm:h-5 mr-2 transition-transform ${isHovered ? 'scale-110' : ''}`} />
                  <span className="truncate">Create Game</span>
                </Button>
              </Link>
              
              <Dialog open={showJoinDialog} onOpenChange={setShowJoinDialog}>
                <DialogTrigger asChild>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-purple-200 text-purple-700 hover:bg-purple-50 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto"
                  >
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    <span className="truncate">Join Game</span>
                  </Button>
                </DialogTrigger>
                
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                      <Users className="w-5 h-5 text-purple-600" />
                      Join Game
                    </DialogTitle>
                    <DialogDescription>
                      Enter a game code to join your friends
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4">
                    <div>
                      <Input
                        placeholder="Enter game code (e.g. ABC123)"
                        value={joinCode}
                        onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                        onKeyPress={(e) => e.key === 'Enter' && handleJoinGame()}
                        className="text-center text-lg tracking-wider"
                        maxLength={6}
                      />
                    </div>
                    <Button 
                      onClick={handleJoinGame}
                      disabled={!joinCode.trim()}
                      className="w-full gradient-bg text-white"
                    >
                      Join Game
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          </div>

          {/* Game Modes Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            <Card 
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 border-2 hover:border-purple-300"
              onClick={() => handleGameModeClick('mixtape')}
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Headphones className="w-5 h-5 text-purple-600" />
                  Collaborative Mixtape
                </CardTitle>
                <CardDescription>
                  Everyone adds their favorite songs with personal stories
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button 
                  className="w-full gradient-bg text-white hover:opacity-90"
                  disabled={createGameMutation.isPending}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGameModeClick('mixtape');
                  }}
                >
                  {createGameMutation.isPending ? 'Creating...' : 'Start Mixtape Game'}
                </Button>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 border-2 hover:border-blue-300"
              onClick={() => handleGameModeClick('soundtrack')}
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Play className="w-5 h-5 text-blue-600" />
                  Movie Soundtrack
                </CardTitle>
                <CardDescription>
                  Create the perfect soundtrack for any movie theme
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button 
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:opacity-90"
                  disabled={createGameMutation.isPending}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGameModeClick('soundtrack');
                  }}
                >
                  {createGameMutation.isPending ? 'Creating...' : 'Start Soundtrack Game'}
                </Button>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 border-2 hover:border-green-300"
              onClick={() => handleGameModeClick('desert-island')}
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Radio className="w-5 h-5 text-green-600" />
                  Desert Island Discs
                </CardTitle>
                <CardDescription>
                  5 essential songs: head, heart, feet, guilty pleasure, current obsession
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button 
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white hover:opacity-90"
                  disabled={createGameMutation.isPending}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGameModeClick('desert-island');
                  }}
                >
                  {createGameMutation.isPending ? 'Creating...' : 'Start Desert Island Game'}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Weekly Challenge Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20"
          >
            <Card className="max-w-2xl mx-auto text-center p-8 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                  <Trophy className="w-6 h-6 text-yellow-500" />
                  Weekly Challenge
                </CardTitle>
                <CardDescription className="text-lg">
                  Join our community challenge and discover new music
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/weekly-challenge">
                  <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-100">
                    <Heart className="w-4 h-4 mr-2" />
                    View This Week's Challenge
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;