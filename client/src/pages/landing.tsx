import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Play, Users, Sparkles, Music, Headphones, Radio, Heart, Compass, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";
import { FeaturedMusicalJourney } from "@/components/featured-musical-journey";
import { CommunityListsPreview } from "@/components/community-lists-preview";
import { SocialProofEngine } from "@/components/social-proof-engine";
import { InteractiveDemo } from "@/components/interactive-demo";
import { QuickStartTemplates } from "@/components/quick-start-templates";
import { MusicalJourneysShowcase } from "@/components/musical-journeys-showcase";

export default function LandingPage() {
  const [, navigate] = useLocation();
  const [joinCode, setJoinCode] = useState("");
  const [showJoinDialog, setShowJoinDialog] = useState(false);
  const [showThemeDialog, setShowThemeDialog] = useState(false);
  const [selectedGameType, setSelectedGameType] = useState('jam-sessions');
  const [selectedTheme, setSelectedTheme] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleJoinGame = async () => {
    if (joinCode.trim()) {
      navigate(`/room/${joinCode.trim()}`);
    }
  };

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
      case 'jam-sessions':
        return ['Road trip', 'Festival campsite', '90s dance anthems', 'Guilty pleasures', 'Sunday morning chillers'];
      case 'desert-island':
        return ['Musical Essentials', 'Emotional Journey', 'Life Soundtrack', 'Desert Island Classics', 'Personal Anthems'];
      case 'guess-who':
        return ['Guilty Pleasures', 'Decade Mix', 'Hidden Gems', 'Musical Secrets', 'Custom Theme'];
      default:
        return ['Musical Essentials'];
    }
  };

  const handleGameModeClick = (gameType: string) => {
    if (gameType === 'desert-island') {
      navigate('/room/create');
      return;
    }
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-pink-600/10 to-purple-600/10 opacity-20 animate-spin" style={{ animationDuration: '20s' }}></div>
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
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">Uptune</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center space-x-4"
          >
            <Link href="/community-lists" className="text-white/80 hover:text-white transition-colors hidden md:block">Community</Link>
            <Link href="/journeys" className="text-white/80 hover:text-white transition-colors hidden md:block">Musical Journeys</Link>
            <Link href="/teams">
              <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-lg">
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
              <Badge className="bg-white/10 text-white border-white/20 px-4 py-2 backdrop-blur-lg">
                <Sparkles className="w-4 h-4 mr-2" />
                Made with Love for Music
              </Badge>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-white">
                Where Music{' '}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Brings Us Together
                </span>
              </h1>
              
              <p className="text-base sm:text-lg lg:text-xl text-white/80 leading-relaxed">
                Share your musical soul. Create playlists that tell stories, discover what moves your friends, and celebrate the soundtracks of your lives.
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
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-all text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto"
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
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-lg text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto"
                  >
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    <span className="truncate">Join Game</span>
                  </Button>
                </DialogTrigger>
                
                <DialogContent className="max-w-md bg-slate-900/95 backdrop-blur-lg border border-white/20">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl text-white">
                      <Users className="w-5 h-5 text-purple-400" />
                      Join Game
                    </DialogTitle>
                    <DialogDescription className="text-white/80">
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
                        className="text-center text-lg tracking-wider bg-white/10 border-white/20 text-white placeholder:text-white/60"
                        maxLength={6}
                      />
                    </div>
                    <Button 
                      onClick={handleJoinGame}
                      disabled={!joinCode.trim()}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
                    >
                      Join Game
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Theme Selection Dialog */}
              <Dialog open={showThemeDialog} onOpenChange={setShowThemeDialog}>
                <DialogContent className="max-w-md bg-slate-900/95 backdrop-blur-lg border border-white/20">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl text-white">
                      <Sparkles className="w-5 h-5 text-purple-400" />
                      Choose Your Theme
                    </DialogTitle>
                    <DialogDescription className="text-white/80">
                      {selectedGameType === 'jam-sessions' 
                        ? "Jam Sessions: What's the vibe for your playlist?"
                        : selectedGameType === 'guess-who'
                        ? "Guess Who: Pick a theme for anonymous sharing"
                        : "Pick a theme that inspires your group's music choices"
                      }
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-white/80 mb-3 block">
                        Create your own theme or pick from examples
                      </label>
                      <Input
                        placeholder="Enter your theme (e.g., 'Songs for a Road Trip to the Beach')"
                        value={selectedTheme}
                        onChange={(e) => setSelectedTheme(e.target.value)}
                        className="mb-4 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      />
                    </div>
                    
                    <div>
                      <p className="text-sm text-white/60 mb-2">Or choose from these examples:</p>
                      <div className="space-y-2">
                        {getThemeOptions(selectedGameType).map((theme) => (
                          <button
                            key={theme}
                            onClick={() => setSelectedTheme(theme)}
                            className="w-full text-left p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors flex items-center gap-2 text-white"
                          >
                            <ArrowRight className="w-4 h-4 text-purple-400" />
                            {theme}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <Button 
                        onClick={() => setShowThemeDialog(false)}
                        className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/20"
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleCreateGame}
                        disabled={!selectedTheme.trim() || createGameMutation.isPending}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
                      >
                        {createGameMutation.isPending ? 'Creating...' : 'Create Game'}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
            
            {/* Social Proof Engine */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-12 max-w-4xl mx-auto"
            >
              <SocialProofEngine />
            </motion.div>
          </div>

          {/* Game Modes Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 space-y-8"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Musical Adventures Await</h2>
              <p className="text-white/80">Every song has a story, every playlist a journey</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <motion.div 
                className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-lg rounded-2xl p-6 border border-blue-400/20 cursor-pointer group hover:scale-105 transition-all duration-300"
                onClick={() => handleGameModeClick('jam-sessions')}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <Headphones className="w-8 h-8 text-blue-400" />
                  <div>
                    <h3 className="text-xl font-bold text-white">Jam Sessions</h3>
                    <p className="text-blue-200">Creative Collaboration</p>
                  </div>
                </div>
                <p className="text-white/80 mb-6 leading-relaxed">
                  Pour your hearts into a shared playlist. Each song becomes part of your collective story.
                </p>
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700"
                  disabled={createGameMutation.isPending}
                >
                  {createGameMutation.isPending ? 'Creating...' : 'Start Jam Session'}
                </Button>
              </motion.div>

              <motion.div 
                className="bg-gradient-to-r from-emerald-600/20 to-teal-600/20 backdrop-blur-lg rounded-2xl p-6 border border-emerald-400/20 cursor-pointer group hover:scale-105 transition-all duration-300"
                onClick={() => handleGameModeClick('desert-island')}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <Radio className="w-8 h-8 text-emerald-400" />
                  <div>
                    <h3 className="text-xl font-bold text-white">Desert Island Discs</h3>
                    <p className="text-emerald-200">Deeper Connection</p>
                  </div>
                </div>
                <p className="text-white/80 mb-6 leading-relaxed">
                  The songs that shaped you, the melodies that move you. Reveal your musical DNA.
                </p>
                <Button 
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700"
                  disabled={createGameMutation.isPending}
                >
                  {createGameMutation.isPending ? 'Creating...' : 'Start Desert Island'}
                </Button>
              </motion.div>

              <motion.div 
                className="bg-gradient-to-r from-amber-600/20 to-orange-600/20 backdrop-blur-lg rounded-2xl p-6 border border-amber-400/20 cursor-pointer group hover:scale-105 transition-all duration-300"
                onClick={() => handleGameModeClick('guess-who')}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <Heart className="w-8 h-8 text-amber-400" />
                  <div>
                    <h3 className="text-xl font-bold text-white">Guess Who</h3>
                    <p className="text-amber-200">Hilarious Reveals</p>
                  </div>
                </div>
                <p className="text-white/80 mb-6 leading-relaxed">
                  Musical mysteries and surprising revelations. Let your songs speak while your identity hides.
                </p>
                <Button 
                  className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700"
                  disabled={createGameMutation.isPending}
                >
                  {createGameMutation.isPending ? 'Creating...' : 'Start Guess Who'}
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Quick Start Templates Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 max-w-6xl mx-auto"
          >
            <QuickStartTemplates />
          </motion.div>

          {/* Interactive Demo Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 max-w-5xl mx-auto"
          >
            <InteractiveDemo />
          </motion.div>

          {/* Musical Journeys Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16"
          >
            <MusicalJourneysShowcase />
          </motion.div>



          {/* Featured Musical Journey */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20"
          >
            <FeaturedMusicalJourney />
          </motion.div>

          {/* Community Lists */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
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
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-indigo-600/20 to-blue-600/20 backdrop-blur-lg rounded-2xl p-8 border border-indigo-400/20">
              <div className="text-center space-y-6">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <Users className="w-10 h-10 text-indigo-400" />
                  <div>
                    <h2 className="text-3xl font-bold text-white">Ready for Your Team?</h2>
                    <p className="text-indigo-200">Transform your workplace culture with music</p>
                  </div>
                </div>
                
                <p className="text-white/80 leading-relaxed max-w-2xl mx-auto text-lg">
                  Perfect for team building, onboarding, and breaking the ice.
                </p>
                
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2 justify-center">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                    <span className="text-white">Seamless Slack & Teams Integration</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                    <span className="text-white">Spark Authentic Connections</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                    <span className="text-white">Fun for Everyone</span>
                  </div>
                </div>
                
                <Link href="/teams">
                  <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700">
                    <Users className="w-5 h-5 mr-2" />
                    Get Early Access for Teams
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}