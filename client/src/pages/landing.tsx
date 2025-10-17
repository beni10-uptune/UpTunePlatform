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
import { SavedGames } from "@/components/saved-games";
import { useAuth } from "@/hooks/useAuth";

export default function LandingPage() {
  const [, navigate] = useLocation();
  const [joinCode, setJoinCode] = useState("");
  const [showJoinDialog, setShowJoinDialog] = useState(false);
  const [showThemeDialog, setShowThemeDialog] = useState(false);
  const [selectedGameType, setSelectedGameType] = useState('jam-sessions');
  const [selectedTheme, setSelectedTheme] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const { isAuthenticated } = useAuth();

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
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-pink-200 to-cyan-200 relative overflow-hidden">
      {/* Memphis Pattern Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Squiggles and shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 border-8 border-black rotate-12"></div>
        <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-pink-500"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-cyan-400 rounded-full"></div>
        <div className="absolute top-60 right-1/3 w-20 h-20 bg-yellow-400" style={{clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)'}}></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 border-8 border-dashed border-black rounded-full"></div>
        <div className="absolute top-1/3 left-1/2 w-16 h-16 bg-purple-400" style={{clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)'}}></div>

        {/* Squiggle lines */}
        <svg className="absolute top-10 left-1/3 w-64 h-32" viewBox="0 0 200 100">
          <path d="M 0 50 Q 25 0, 50 50 T 100 50 T 150 50 T 200 50" stroke="black" strokeWidth="6" fill="none" strokeLinecap="round"/>
        </svg>
        <svg className="absolute bottom-40 right-1/4 w-48 h-24" viewBox="0 0 200 100">
          <path d="M 0 50 Q 25 100, 50 50 T 100 50 T 150 50 T 200 50" stroke="black" strokeWidth="6" fill="none" strokeLinecap="round"/>
        </svg>
        <svg className="absolute top-1/2 left-10 w-40 h-20" viewBox="0 0 200 100">
          <path d="M 0 50 Q 25 0, 50 50 T 100 50" stroke="black" strokeWidth="5" fill="none" strokeLinecap="round"/>
        </svg>

        {/* Dots pattern */}
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-black rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          ></div>
        ))}
      </div>



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
              <Badge className="bg-white border-4 border-black text-black px-6 py-3 text-sm font-black tracking-wider shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-2">
                <Sparkles className="w-5 h-5 mr-2" />
                MADE WITH ♥ FOR MUSIC
              </Badge>

              <div className="relative inline-block">
                <h1
                  className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-none text-black"
                  style={{
                    fontFamily: "'Arial Black', sans-serif",
                    textTransform: 'uppercase'
                  }}
                >
                  <span className="block" style={{
                    textShadow: '6px 6px 0px #FF1493, 12px 12px 0px #00CED1'
                  }}>
                    WHERE
                  </span>
                  <span className="block bg-gradient-to-r from-pink-500 to-yellow-400 text-white px-8 py-2 -rotate-1 inline-block my-2" style={{
                    boxShadow: '8px 8px 0px rgba(0,0,0,1)'
                  }}>
                    MUSIC
                  </span>
                  <span className="block" style={{
                    textShadow: '6px 6px 0px #FFD700, 12px 12px 0px #FF69B4'
                  }}>
                    CONNECTS
                  </span>
                </h1>
              </div>

              <p className="text-xl sm:text-2xl font-bold text-black max-w-2xl mx-auto bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-1">
                Play together. Discover culture. Connect groups. 🎵
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
            >
              <Dialog open={showThemeDialog} onOpenChange={setShowThemeDialog}>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="bg-pink-500 text-white hover:bg-pink-600 font-black text-xl px-10 py-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all rotate-1 w-full sm:w-auto"
                    style={{ fontFamily: "'Arial Black', sans-serif" }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => {
                      setSelectedGameType('jam-sessions');
                      setShowThemeDialog(true);
                    }}
                  >
                    <Play className="w-6 h-6 mr-3" />
                    <span className="truncate">START PLAYING</span>
                  </Button>
                </DialogTrigger>
              </Dialog>

              <Dialog open={showJoinDialog} onOpenChange={setShowJoinDialog}>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="bg-cyan-400 text-black hover:bg-cyan-500 font-black text-xl px-10 py-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all -rotate-1 w-full sm:w-auto"
                    style={{ fontFamily: "'Arial Black', sans-serif" }}
                  >
                    <Users className="w-6 h-6 mr-3" />
                    <span className="truncate">JOIN GAME</span>
                  </Button>
                </DialogTrigger>
                
                <DialogContent className="max-w-md bg-gradient-to-br from-cyan-200 to-purple-200 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-3 text-3xl text-black font-black" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                      <div className="w-12 h-12 bg-purple-400 border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <Users className="w-7 h-7 text-white" />
                      </div>
                      JOIN GAME
                    </DialogTitle>
                    <DialogDescription className="text-black/80 font-bold text-lg">
                      Enter a game code to join your friends! 🎮
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4 mt-4">
                    <div>
                      <Input
                        placeholder="ABC123"
                        value={joinCode}
                        onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                        onKeyPress={(e) => e.key === 'Enter' && handleJoinGame()}
                        className="text-center text-2xl font-black tracking-widest bg-white border-4 border-black text-black placeholder:text-black/40 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        style={{ fontFamily: "'Arial Black', sans-serif" }}
                        maxLength={6}
                      />
                    </div>
                    <Button
                      onClick={handleJoinGame}
                      disabled={!joinCode.trim()}
                      className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white hover:from-purple-500 hover:to-pink-500 font-black text-xl py-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                      style={{ fontFamily: "'Arial Black', sans-serif" }}
                    >
                      LET'S GO!
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

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
                      {selectedGameType === 'jam-sessions'
                        ? "What's the vibe for your playlist? 🎵"
                        : selectedGameType === 'guess-who'
                        ? "Pick a theme for anonymous sharing 🎭"
                        : "Pick a theme that inspires your music! ✨"
                      }
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4 mt-4">
                    <div>
                      <label className="text-sm font-black text-black mb-3 block" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                        CREATE YOUR OWN
                      </label>
                      <Input
                        placeholder="e.g., 'Songs for a Road Trip to the Beach'"
                        value={selectedTheme}
                        onChange={(e) => setSelectedTheme(e.target.value)}
                        className="mb-4 bg-white border-4 border-black text-black placeholder:text-black/40 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                      />
                    </div>

                    <div>
                      <p className="text-sm font-black text-black mb-3" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                        OR PICK AN EXAMPLE:
                      </p>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {getThemeOptions(selectedGameType).map((theme) => (
                          <button
                            key={theme}
                            onClick={() => setSelectedTheme(theme)}
                            className="w-full text-left p-3 bg-white border-3 border-black hover:bg-cyan-200 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-3 text-black font-bold"
                          >
                            <div className="w-2 h-2 bg-black"></div>
                            {theme}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button
                        onClick={() => setShowThemeDialog(false)}
                        className="flex-1 bg-white hover:bg-gray-100 text-black border-4 border-black font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        style={{ fontFamily: "'Arial Black', sans-serif" }}
                      >
                        CANCEL
                      </Button>
                      <Button
                        onClick={handleCreateGame}
                        disabled={!selectedTheme.trim() || createGameMutation.isPending}
                        className="flex-1 bg-gradient-to-r from-purple-400 to-pink-400 text-white hover:from-purple-500 hover:to-pink-500 border-4 border-black font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                        style={{ fontFamily: "'Arial Black', sans-serif" }}
                      >
                        {createGameMutation.isPending ? 'CREATING...' : 'CREATE GAME'}
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
              <h2 className="text-4xl font-black text-black mb-4" style={{ fontFamily: "'Arial Black', sans-serif", textTransform: 'uppercase' }}>
                Choose Your Game Mode!
              </h2>
              <p className="text-2xl font-bold text-black">Pick a way to play and connect through music 🎶</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <motion.div
                className="bg-gradient-to-br from-blue-400 to-purple-400 border-4 border-black rounded-none p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rotate-2 hover:rotate-0 transition-transform cursor-pointer"
                onClick={() => handleGameModeClick('jam-sessions')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="bg-white w-16 h-16 border-4 border-black flex items-center justify-center mb-4 rounded-full">
                  <Headphones className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-3xl font-black text-white mb-3" style={{ fontFamily: "'Arial Black', sans-serif", textShadow: '3px 3px 0px rgba(0,0,0,0.5)' }}>
                  JAM SESSIONS
                </h3>
                <p className="text-white font-bold text-lg mb-6">
                  Build playlists together!
                </p>
                <Button
                  className="w-full bg-white text-black hover:bg-gray-100 font-black text-lg py-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  disabled={createGameMutation.isPending}
                  style={{ fontFamily: "'Arial Black', sans-serif" }}
                >
                  {createGameMutation.isPending ? 'CREATING...' : 'START NOW'}
                </Button>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-pink-400 to-orange-400 border-4 border-black rounded-none p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] -rotate-1 hover:rotate-0 transition-transform cursor-pointer"
                onClick={() => handleGameModeClick('desert-island')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="bg-white w-16 h-16 border-4 border-black flex items-center justify-center mb-4" style={{clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'}}>
                  <Radio className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-3xl font-black text-white mb-3" style={{ fontFamily: "'Arial Black', sans-serif", textShadow: '3px 3px 0px rgba(0,0,0,0.5)' }}>
                  DESERT ISLAND
                </h3>
                <p className="text-white font-bold text-lg mb-6">
                  Your soundtrack, revealed!
                </p>
                <Button
                  className="w-full bg-white text-black hover:bg-gray-100 font-black text-lg py-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  disabled={createGameMutation.isPending}
                  style={{ fontFamily: "'Arial Black', sans-serif" }}
                >
                  {createGameMutation.isPending ? 'CREATING...' : 'START NOW'}
                </Button>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-yellow-400 to-pink-400 border-4 border-black rounded-none p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rotate-1 hover:rotate-0 transition-transform cursor-pointer"
                onClick={() => handleGameModeClick('guess-who')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="bg-white w-16 h-16 border-4 border-black flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-3xl font-black text-white mb-3" style={{ fontFamily: "'Arial Black', sans-serif", textShadow: '3px 3px 0px rgba(0,0,0,0.5)' }}>
                  GUESS WHO
                </h3>
                <p className="text-white font-bold text-lg mb-6">
                  Musical mystery fun!
                </p>
                <Button
                  className="w-full bg-white text-black hover:bg-gray-100 font-black text-lg py-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  disabled={createGameMutation.isPending}
                  style={{ fontFamily: "'Arial Black', sans-serif" }}
                >
                  {createGameMutation.isPending ? 'CREATING...' : 'START NOW'}
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

          {/* Saved Games Section - Only for authenticated users */}
          {isAuthenticated && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="mt-8 max-w-6xl mx-auto"
            >
              <SavedGames />
            </motion.div>
          )}

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
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-purple-400 to-pink-400 border-4 border-black p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rotate-1">
              <div className="text-center space-y-6 bg-white p-8 border-4 border-black">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-purple-400 border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h2 className="text-4xl font-black text-black" style={{ fontFamily: "'Arial Black', sans-serif" }}>FOR GROUPS</h2>
                    <p className="text-lg font-bold text-black">Music that brings people together!</p>
                  </div>
                </div>

                <p className="text-black/80 font-bold leading-relaxed max-w-2xl mx-auto text-lg">
                  From workplace teams to weddings, celebrations to memorials—create unforgettable musical moments! 🎉
                </p>

                <div className="grid md:grid-cols-4 gap-3 text-sm">
                  <div className="flex items-center gap-2 justify-center bg-blue-200 border-3 border-black p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    <div className="w-3 h-3 bg-black"></div>
                    <span className="text-black font-bold">Workplace</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center bg-pink-200 border-3 border-black p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    <div className="w-3 h-3 bg-black"></div>
                    <span className="text-black font-bold">Celebrations</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center bg-purple-200 border-3 border-black p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    <div className="w-3 h-3 bg-black"></div>
                    <span className="text-black font-bold">Memorials</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center bg-orange-200 border-3 border-black p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    <div className="w-3 h-3 bg-black"></div>
                    <span className="text-black font-bold">Events</span>
                  </div>
                </div>

                <Link href="/groups">
                  <Button size="lg" className="bg-gradient-to-r from-purple-400 to-pink-500 text-white font-black border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all text-xl px-8 py-6" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                    <Users className="w-6 h-6 mr-3" />
                    EXPLORE FOR GROUPS
                    <ArrowRight className="w-6 h-6 ml-3" />
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