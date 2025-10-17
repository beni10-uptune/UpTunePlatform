import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Headphones, Radio, Heart, Play, Users, ArrowRight, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PlayMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onStartGame?: (gameType: string) => void;
}

export function PlayMegaMenu({ isOpen, onClose, onStartGame }: PlayMegaMenuProps) {
  const gameModes = [
    {
      id: "jam-sessions",
      title: "Jam Sessions",
      description: "Build a shared playlist together",
      icon: Headphones,
      color: "from-blue-400 to-purple-400",
      bgColor: "bg-gradient-to-br from-blue-300 to-purple-300",
      emoji: "🎧",
      details: "Pour your hearts into a collaborative playlist. Each song becomes part of your collective story.",
    },
    {
      id: "desert-island",
      title: "Desert Island Discs",
      description: "Share the songs that define you",
      icon: Radio,
      color: "from-pink-400 to-orange-400",
      bgColor: "bg-gradient-to-br from-pink-300 to-orange-300",
      emoji: "🏝️",
      details: "The songs that shaped you, the melodies that move you. Reveal your musical DNA.",
    },
    {
      id: "guess-who",
      title: "Guess Who",
      description: "Mystery tracks, surprising reveals",
      icon: Heart,
      color: "from-yellow-400 to-pink-400",
      bgColor: "bg-gradient-to-br from-yellow-300 to-pink-300",
      emoji: "❓",
      details: "Musical mysteries and surprising revelations. Let your songs speak while your identity hides.",
    },
  ];

  const handleGameClick = (gameType: string) => {
    onClose();
    if (onStartGame) {
      onStartGame(gameType);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          />

          {/* Mega Menu */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-20 left-0 right-0 z-50 max-w-7xl mx-auto px-6"
          >
            <Card className="bg-gradient-to-br from-yellow-100 to-pink-100 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
              <div className="p-8 bg-white">
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-4xl font-black text-black flex items-center gap-4 bg-cyan-400 px-6 py-3 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rotate-2" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                      <Play className="w-10 h-10 text-black" />
                      PLAY MUSIC GAMES
                    </h2>
                    <Link href="/">
                      <button
                        onClick={onClose}
                        className="bg-pink-400 hover:bg-pink-500 text-black font-black px-4 py-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center gap-2"
                        style={{ fontFamily: "'Arial Black', sans-serif" }}
                      >
                        HOME
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </Link>
                  </div>
                  <p className="text-black/70 font-bold text-lg">
                    Choose your game mode and start connecting through music! 🎮
                  </p>
                </div>

                {/* Game Modes Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {gameModes.map((mode) => {
                    const Icon = mode.icon;
                    return (
                      <motion.div
                        key={mode.id}
                        whileHover={{ scale: 1.02, rotate: 0 }}
                        className={`${mode.bgColor} border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all cursor-pointer rotate-1`}
                        onClick={() => handleGameClick(mode.id)}
                      >
                        <div className="bg-white border-4 border-black p-4 mb-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="w-12 h-12 bg-yellow-300 border-3 border-black flex items-center justify-center text-2xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                              {mode.emoji}
                            </div>
                            <Icon className="w-8 h-8 text-black" />
                          </div>
                          <h3 className="text-2xl font-black text-black mb-2" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                            {mode.title}
                          </h3>
                          <p className="text-sm font-bold text-black/70 mb-4">
                            {mode.description}
                          </p>
                          <p className="text-xs font-bold text-black/60">
                            {mode.details}
                          </p>
                        </div>
                        <Button
                          className="w-full bg-white hover:bg-gray-100 text-black font-black border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all"
                          style={{ fontFamily: "'Arial Black', sans-serif" }}
                        >
                          START NOW
                        </Button>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Quick Actions Footer */}
                <div className="mt-8 pt-6 border-t-4 border-black">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-gradient-to-r from-purple-300 to-pink-300 border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-1">
                      <div className="bg-white border-3 border-black p-4">
                        <h3 className="text-xl font-black text-black mb-2" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                          <Users className="inline w-6 h-6 mr-2" />
                          JOIN A GAME
                        </h3>
                        <p className="text-sm font-bold text-black/70 mb-3">
                          Got a game code? Jump right in!
                        </p>
                        <Link href="/">
                          <Button
                            onClick={onClose}
                            className="w-full bg-cyan-400 hover:bg-cyan-500 text-black font-black border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                            style={{ fontFamily: "'Arial Black', sans-serif" }}
                          >
                            ENTER CODE
                          </Button>
                        </Link>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-yellow-300 to-orange-300 border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-1">
                      <div className="bg-white border-3 border-black p-4">
                        <h3 className="text-xl font-black text-black mb-2" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                          <Sparkles className="inline w-6 h-6 mr-2" />
                          QUICK START
                        </h3>
                        <p className="text-sm font-bold text-black/70 mb-3">
                          Jump into a game instantly!
                        </p>
                        <Button
                          onClick={() => handleGameClick('jam-sessions')}
                          className="w-full bg-pink-400 hover:bg-pink-500 text-white font-black border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                          style={{ fontFamily: "'Arial Black', sans-serif" }}
                        >
                          START JAM
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
