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
      id: 'jam-sessions',
      title: 'Jam Sessions',
      description: 'Build the perfect soundtrack for any movie, moment, or mood you can imagine',
      icon: Headphones,
      color: 'blue',
      exampleThemes: ['Road Trip Vibes', 'Epic Adventure', 'Romantic Comedy', 'Workout Power', 'Summer Anthems']
    },
    {
      id: 'desert-island',
      title: 'Desert Island Discs',
      description: 'Share your 5 essential songs: one for your head, heart, feet, guilty pleasure, and current obsession',
      icon: Radio,
      color: 'green',
      exampleThemes: ['Musical Essentials', 'Life Soundtrack', 'Songs That Define Me', 'Desert Island Classics', 'Personal Anthems']
    },
    {
      id: 'guess-who',
      title: 'Guess Who',
      description: 'Anonymous music sharing with reveals - guess who picked what, then reveal for hilarious surprises',
      icon: Heart,
      color: 'amber',
      exampleThemes: ['Guilty Pleasures', 'Decade Mix', 'Anonymous Mix', 'Musical Secrets', 'Custom Theme']
    }
  ];

  // Create game room mutation
  const createGameMutation = useMutation({
    mutationFn: async (gameData: { gameType: string; theme: string; hostNickname: string }) => {
      const response = await apiRequest('POST', '/api/game-rooms', gameData);
      return await response.json();
    },
    onSuccess: (gameRoom: any) => {
      setLocation(`/room/${gameRoom.code}`);
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-pink-200 to-cyan-200">
      {/* Header */}
      <header className="px-6 py-4 bg-gradient-to-r from-pink-400 via-yellow-300 to-cyan-400 border-b-4 border-black shadow-[0_4px_0px_0px_rgba(0,0,0,1)]">
        <nav className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/">
            <Button
              className="bg-white text-black hover:bg-gray-100 font-black border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              style={{ fontFamily: "'Arial Black', sans-serif" }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span>BACK</span>
            </Button>
          </Link>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-12">
              <Music className="w-6 h-6 text-black" />
            </div>
            <span className="text-3xl font-black text-black" style={{ fontFamily: "'Arial Black', sans-serif" }}>
              UPTUNE
            </span>
          </div>

          <Link href="/groups">
            <Button
              className="bg-purple-400 hover:bg-purple-500 text-white border-3 border-black font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              style={{ fontFamily: "'Arial Black', sans-serif" }}
            >
              FOR GROUPS
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
            <h1 className="text-5xl md:text-6xl font-black mb-6 text-black" style={{ fontFamily: "'Arial Black', sans-serif", textTransform: 'uppercase' }}>
              <span className="block" style={{ textShadow: '6px 6px 0px #FF1493' }}>
                PICK YOUR
              </span>
              <span className="block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-2 -rotate-2 inline-block my-2" style={{ boxShadow: '8px 8px 0px rgba(0,0,0,1)' }}>
                MUSIC GAME
              </span>
            </h1>
            <p className="text-2xl font-bold text-black max-w-2xl mx-auto bg-white border-4 border-black p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rotate-1">
              Turn music into memories! 🎵
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
                whileHover={{ scale: 1.02, rotate: 0 }}
              >
                <Card className={`bg-gradient-to-br from-${game.color}-300 to-${game.color}-400 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px]] transition-all h-full cursor-pointer ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}>

                  <CardHeader className="pb-6 bg-white border-b-4 border-black">
                    <div className={`w-20 h-20 bg-${game.color}-200 border-4 border-black flex items-center justify-center mx-auto mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-12`}>
                      <game.icon className="w-10 h-10 text-black" />
                    </div>
                    <CardTitle className="text-3xl font-black text-black" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                      {game.title.toUpperCase()}
                    </CardTitle>
                    <CardDescription className="text-black/80 font-bold text-base mt-2">
                      {game.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6 pt-6 bg-white">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {game.exampleThemes.slice(0, 3).map((theme: string) => (
                        <Badge
                          key={theme}
                          className={`bg-${game.color}-200 text-black border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}
                        >
                          {theme}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      onClick={() => handleStartGame(game.id)}
                      disabled={createGameMutation.isPending}
                      className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white hover:from-purple-500 hover:to-pink-500 font-black text-lg py-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                      style={{ fontFamily: "'Arial Black', sans-serif" }}
                    >
                      <Play className="w-5 h-5 mr-2" />
                      {createGameMutation.isPending ? 'CREATING...' : 'START NOW'}
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
        <DialogContent className="max-w-lg bg-gradient-to-br from-yellow-200 to-pink-200 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-3xl text-black font-black" style={{ fontFamily: "'Arial Black', sans-serif" }}>
              <div className="w-12 h-12 bg-yellow-400 border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Sparkles className="w-7 h-7 text-black" />
              </div>
              CHOOSE THEME
            </DialogTitle>
            <DialogDescription className="text-black/80 font-bold text-lg">
              {selectedGame && games.find(g => g.id === selectedGame)?.title}: What's the vibe? 🎵
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <label className="text-sm font-black text-black mb-3 block" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                CREATE YOUR OWN
              </label>
              <Input
                placeholder="e.g., 'Songs for a Road Trip to the Beach'"
                value={customTheme}
                onChange={(e) => setCustomTheme(e.target.value)}
                className="w-full bg-white border-4 border-black text-black placeholder:text-black/40 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              />
            </div>

            {selectedGame && (
              <div>
                <label className="text-sm font-black text-black mb-3 block" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                  OR PICK AN EXAMPLE:
                </label>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {games.find(g => g.id === selectedGame)?.exampleThemes.map((theme: string) => (
                    <button
                      key={theme}
                      onClick={() => handleSelectExampleTheme(theme)}
                      className="w-full text-left p-3 bg-white border-3 border-black hover:bg-cyan-200 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-3 text-black font-bold"
                    >
                      <div className="w-2 h-2 bg-black"></div>
                      {theme}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button
                onClick={() => {
                  setShowThemeDialog(false);
                  setCustomTheme('');
                  setSelectedGame(null);
                }}
                className="flex-1 bg-white hover:bg-gray-100 text-black border-4 border-black font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                style={{ fontFamily: "'Arial Black', sans-serif" }}
              >
                CANCEL
              </Button>
              <Button
                onClick={handleCreateGame}
                disabled={!customTheme.trim() || createGameMutation.isPending}
                className="flex-1 bg-gradient-to-r from-purple-400 to-pink-400 text-white hover:from-purple-500 hover:to-pink-500 border-4 border-black font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                style={{ fontFamily: "'Arial Black', sans-serif" }}
              >
                {createGameMutation.isPending ? 'CREATING...' : 'CREATE GAME'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GameMenu;
