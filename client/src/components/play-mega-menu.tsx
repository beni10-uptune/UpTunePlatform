import { Link, useLocation } from "wouter";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Headphones, Radio, Heart, X, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PlayMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onStartGame?: (gameType: string) => void;
}

export function PlayMegaMenu({ isOpen, onClose, onStartGame }: PlayMegaMenuProps) {
  const [, setLocation] = useLocation();
  const [gameCode, setGameCode] = useState("");

  const gameModes = [
    {
      id: "jam-sessions",
      title: "Jam Sessions",
      description: "Create playlists together for any vibe",
      icon: Headphones,
      bgColor: "bg-gradient-to-br from-cyan-300 to-purple-300",
      emoji: "🎧",
    },
    {
      id: "desert-island",
      title: "Desert Island Discs",
      description: "Share your 5 essential songs",
      icon: Radio,
      bgColor: "bg-gradient-to-br from-pink-300 to-yellow-300",
      emoji: "🏝️",
    },
    {
      id: "guess-who",
      title: "Guess Who",
      description: "Anonymous picks, fun reveals",
      icon: Heart,
      bgColor: "bg-gradient-to-br from-yellow-300 to-pink-300",
      emoji: "❓",
    },
  ];

  const handleGameClick = (gameType: string) => {
    onClose();
    if (onStartGame) {
      onStartGame(gameType);
    }
  };

  const handleJoinGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (gameCode.trim()) {
      onClose();
      setLocation(`/room/${gameCode.trim().toUpperCase()}`);
      setGameCode("");
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
            className="fixed top-20 left-0 right-0 z-50 max-w-5xl mx-auto px-6"
          >
            <Card className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <div className="p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-black text-black mb-2" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                      PICK A GAME
                    </h2>
                    <p className="text-black/70 font-bold">
                      Connect through music in minutes
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="bg-pink-400 hover:bg-pink-500 text-white font-black p-3 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Join Game Section - Prominent at top */}
                <div className="mb-8 bg-gradient-to-r from-purple-300 to-pink-300 border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] -rotate-1">
                  <h3 className="text-lg font-black text-black mb-3" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                    GOT A GAME CODE? JOIN NOW!
                  </h3>
                  <form onSubmit={handleJoinGame} className="flex gap-3">
                    <Input
                      type="text"
                      placeholder="Enter game code..."
                      value={gameCode}
                      onChange={(e) => setGameCode(e.target.value.toUpperCase())}
                      className="flex-1 bg-white border-4 border-black font-black text-lg uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                      style={{ fontFamily: "'Arial Black', sans-serif" }}
                      maxLength={6}
                    />
                    <Button
                      type="submit"
                      disabled={!gameCode.trim()}
                      className="bg-white hover:bg-gray-100 text-black font-black border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ fontFamily: "'Arial Black', sans-serif" }}
                    >
                      JOIN <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </form>
                </div>

                {/* Divider */}
                <div className="relative mb-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t-4 border-black"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-4 text-black/60 font-black text-sm" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                      OR START A NEW GAME
                    </span>
                  </div>
                </div>

                {/* Game Modes - Simplified */}
                <div className="grid md:grid-cols-3 gap-6">
                  {gameModes.map((mode, index) => {
                    const Icon = mode.icon;
                    return (
                      <motion.button
                        key={mode.id}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => handleGameClick(mode.id)}
                        className={`${mode.bgColor} border-4 border-black p-6 text-left shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}
                      >
                        {/* Icon & Emoji */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-4xl">{mode.emoji}</div>
                          <Icon className="w-8 h-8 text-black" />
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-black text-black mb-2" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                          {mode.title.toUpperCase()}
                        </h3>

                        {/* Description */}
                        <p className="text-black/80 font-bold text-sm mb-4">
                          {mode.description}
                        </p>

                        {/* CTA */}
                        <div className="inline-block bg-white border-3 border-black px-4 py-2 font-black text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                          START →
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Simple Explainer */}
                <div className="mt-8 pt-6 border-t-4 border-black">
                  <p className="text-center text-black/60 font-bold text-sm">
                    Pick a game → Share songs → Connect with friends
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
