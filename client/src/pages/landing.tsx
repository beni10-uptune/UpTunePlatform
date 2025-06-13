import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'wouter';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
import { CommunityListsPreview } from '@/components/community-lists-preview';

const LandingPage = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showJoinDialog, setShowJoinDialog] = useState(false);
  const [joinCode, setJoinCode] = useState('');
  const [showThemeDialog, setShowThemeDialog] = useState(false);
  const [selectedGameType, setSelectedGameType] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');
  const [, navigate] = useLocation();

  const handleJoinGame = () => {
    if (joinCode.trim()) {
      navigate(`/room/${joinCode.toUpperCase()}`);
    }
  };

  // Create game mutation
  const createGameMutation = useMutation({
    mutationFn: async ({ gameType, theme }: { gameType: string; theme: string }) => {
      const response = await apiRequest('POST', '/api/game-rooms', {
        gameType,
        theme,
        hostNickname: 'Host'
      });
      return await response.json();
    },
    onSuccess: (gameRoom) => {
      navigate(`/room/${gameRoom.code}`);
    }
  });

  const getThemeOptions = (gameType: string) => {
    switch (gameType) {
      case 'soundtrack':
        return [
          'Road Trip Vibes',
          'Epic Adventure',
          'Romantic Comedy',
          'Workout Power',
          'Thriller/Suspense',
          'Sci-Fi Journey',
          'Coming of Age',
          'Party Starters',
          'Chill & Relax',
          'Action Blockbuster',
          'Summer Anthems',
          'Late Night Emotions'
        ];
      case 'desert-island':
        return [
          'Musical Essentials',
          'Emotional Journey',
          'Life Soundtrack',
          'Desert Island Classics',
          'Personal Anthems'
        ];
      case 'guess-who':
        return [
          'Mystery Playlist',
          'Secret Favorites',
          'Hidden Gems',
          'Surprise Selections',
          'Anonymous Picks'
        ];
      default:
        return ['Musical Essentials'];
    }
  };

  const handleGameModeClick = (gameType: string) => {
    setSelectedGameType(gameType);
    setSelectedTheme('');
    setShowThemeDialog(true);
  };

  const handleCreateGame = () => {
    if (selectedTheme) {
      createGameMutation.mutate({ gameType: selectedGameType, theme: selectedTheme });
      setShowThemeDialog(false);
    }
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
            <Link href="/teams-waitlist">
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
                Your Musical{' '}
                <span className="gradient-text">
                  Playground
                </span>
              </h1>
              
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
                Start a game with friends, create hilarious playlists, and make memories. No sign-ups needed. Just pure fun.
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
                  <Play className={`w-4 h-4 sm:w-5 sm:h-5 mr-2 transition-transform ${isHovered ? 'scale-110' : ''}`} />
                  <span className="truncate">Start Playing</span>
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

              {/* Theme Selection Dialog */}
              <Dialog open={showThemeDialog} onOpenChange={setShowThemeDialog}>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                      <Sparkles className="w-5 h-5 text-purple-600" />
                      Choose Your Theme
                    </DialogTitle>
                    <DialogDescription>
                      Pick a theme that inspires your group's music choices
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4">
                    <div>
                      <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a theme..." />
                        </SelectTrigger>
                        <SelectContent>
                          {getThemeOptions(selectedGameType).map((theme) => (
                            <SelectItem key={theme} value={theme}>
                              {theme}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button 
                      onClick={handleCreateGame}
                      disabled={!selectedTheme || createGameMutation.isPending}
                      className="w-full gradient-bg text-white"
                    >
                      {createGameMutation.isPending ? 'Creating Game...' : 'Create Game'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          </div>

          {/* Example Games Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 space-y-8"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">A Game for Every Mood</h2>
              <p className="text-gray-600">Simple, fun ways to connect through music</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card 
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 border-2 hover:border-purple-300 relative overflow-hidden"
                onClick={() => handleGameModeClick('soundtrack')}
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                <CardHeader className="pb-3">
                  <div className="text-sm font-medium text-purple-600 mb-1">For Creative Collaboration</div>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Headphones className="w-6 h-6 text-purple-600" />
                    Soundtrack
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    "Build the perfect soundtrack together. Road trip, movie scene, or any vibe you can imagine."
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button 
                    className="w-full gradient-bg text-white hover:opacity-90"
                    disabled={createGameMutation.isPending}
                  >
                    {createGameMutation.isPending ? 'Creating...' : 'Start Soundtrack'}
                  </Button>
                </CardContent>
              </Card>

              <Card 
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 border-2 hover:border-emerald-300 relative overflow-hidden"
                onClick={() => handleGameModeClick('desert-island')}
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
                <CardHeader className="pb-3">
                  <div className="text-sm font-medium text-emerald-600 mb-1">For Deeper Connection</div>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Radio className="w-6 h-6 text-emerald-600" />
                    Desert Island Discs
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    "Share your essential songs that define you. Discover what makes your friends tick musically."
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button 
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:opacity-90"
                    disabled={createGameMutation.isPending}
                  >
                    {createGameMutation.isPending ? 'Creating...' : 'Start Desert Island'}
                  </Button>
                </CardContent>
              </Card>

              <Card 
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 border-2 hover:border-amber-300 relative overflow-hidden"
                onClick={() => handleGameModeClick('guess-who')}
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-500 to-orange-500"></div>
                <CardHeader className="pb-3">
                  <div className="text-sm font-medium text-amber-600 mb-1">For Hilarious Reveals</div>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Heart className="w-6 h-6 text-amber-600" />
                    Guess Who
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    "Everyone adds songs anonymously. Guess who picked what, then reveal for hilarious surprises."
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2 mb-4">
                    <div className="text-xs text-gray-600">Quick Start Options:</div>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs">Guilty Pleasures</Badge>
                      <Badge variant="outline" className="text-xs">Decade Mix</Badge>
                      <Badge variant="outline" className="text-xs">Custom</Badge>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:opacity-90"
                    disabled={createGameMutation.isPending}
                  >
                    {createGameMutation.isPending ? 'Creating...' : 'Start Guess Who'}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Live Feed - Social Proof Engine */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-16"
            >
              <Card className="max-w-4xl mx-auto bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="flex items-center justify-center gap-2 text-xl">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    See What's Playing
                  </CardTitle>
                  <CardDescription>
                    Join thousands creating musical memories every day
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-6">
                  <div className="space-y-3 max-h-48 overflow-hidden">
                    <motion.div
                      animate={{ y: [0, -200] }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="space-y-3"
                    >
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-700"><strong>Jones family</strong> desert island discs</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-700"><strong>Campsite</strong> festival classics</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-700"><strong>Saturday's</strong> BBQ playlist</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-700"><strong>Wedding</strong> dance floor hits</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-700"><strong>Office party</strong> guilty pleasures</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-700"><strong>Book club</strong> wind-down songs</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-700"><strong>Sunday brunch</strong> easy listening</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-700"><strong>Gym buddies</strong> workout pumps</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-700"><strong>Kitchen crew</strong> cooking soundtrack</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-700"><strong>Carpool gang</strong> morning drive</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-700"><strong>Study group</strong> focus tracks</span>
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Community Lists Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20"
          >
            <CommunityListsPreview />
          </motion.div>

          {/* Teams Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-20"
          >
            <Card className="max-w-4xl mx-auto bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                  <Users className="w-6 h-6 text-indigo-600" />
                  Ready for Your Team?
                </CardTitle>
                <CardDescription className="text-lg leading-relaxed">
                  Transform your workplace culture with music. Perfect for team building, onboarding, and breaking the ice.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2 justify-center">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span>Custom company playlists</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span>Team challenges & competitions</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span>Analytics & insights</span>
                  </div>
                </div>
                <Link href="/teams-waitlist">
                  <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white hover:opacity-90">
                    <Users className="w-5 h-5 mr-2" />
                    Get Early Access for Teams
                    <ArrowRight className="w-5 h-5 ml-2" />
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