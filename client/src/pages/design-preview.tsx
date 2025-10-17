import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Users, Sparkles, Headphones, Radio, Heart, Music } from "lucide-react";
import { motion } from "framer-motion";

export default function DesignPreview() {
  const [selectedDesign, setSelectedDesign] = useState<'synthwave' | 'memphis' | 'mtv'>('synthwave');

  return (
    <div className="min-h-screen bg-black p-8">
      {/* Design Selector */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-white mb-6 text-center">Choose Your Vibe ✨</h1>
        <div className="flex gap-4 justify-center mb-4">
          <Button
            onClick={() => setSelectedDesign('synthwave')}
            className={selectedDesign === 'synthwave' ? 'bg-cyan-500' : 'bg-gray-700'}
          >
            🌃 Neon Synthwave
          </Button>
          <Button
            onClick={() => setSelectedDesign('memphis')}
            className={selectedDesign === 'memphis' ? 'bg-pink-500' : 'bg-gray-700'}
          >
            🎨 Memphis Pop
          </Button>
          <Button
            onClick={() => setSelectedDesign('mtv')}
            className={selectedDesign === 'mtv' ? 'bg-orange-500' : 'bg-gray-700'}
          >
            📺 Retro MTV
          </Button>
        </div>
      </div>

      {/* Design Previews */}
      <div className="max-w-7xl mx-auto">
        {selectedDesign === 'synthwave' && <SynthwaveDesign />}
        {selectedDesign === 'memphis' && <MemphisDesign />}
        {selectedDesign === 'mtv' && <MTVDesign />}
      </div>
    </div>
  );
}

// Option 1: NEON SYNTHWAVE
function SynthwaveDesign() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Synthwave Grid Background */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(rgba(255, 0, 255, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px),
          linear-gradient(rgba(255, 0, 255, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
        backgroundPosition: '-1px -1px, -1px -1px, -1px -1px, -1px -1px',
      }}></div>

      {/* Neon Glow Elements */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-[120px] opacity-20"></div>
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-pink-500 rounded-full blur-[120px] opacity-20"></div>

      {/* Sun/Horizon Line */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-purple-900/30 via-pink-900/20 to-transparent"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8"
        >
          {/* Neon Badge */}
          <Badge className="bg-black border-2 border-cyan-400 text-cyan-400 px-6 py-2 text-sm font-bold tracking-wider shadow-[0_0_20px_rgba(0,255,255,0.5)]">
            <Sparkles className="w-4 h-4 mr-2" />
            MUSIC • CONNECTS • US
          </Badge>

          {/* Neon Title with multiple text shadows for glow */}
          <h1
            className="text-7xl font-black leading-tight text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 to-pink-500"
            style={{
              textShadow: `
                0 0 10px rgba(0,255,255,0.8),
                0 0 20px rgba(0,255,255,0.6),
                0 0 30px rgba(255,0,255,0.4),
                0 0 40px rgba(255,0,255,0.3)
              `,
              fontFamily: "'Arial Black', sans-serif",
              letterSpacing: '0.02em'
            }}
          >
            WHERE MUSIC<br />
            BRINGS US TOGETHER
          </h1>

          <p className="text-xl text-cyan-100 max-w-2xl mx-auto font-medium" style={{
            textShadow: '0 0 10px rgba(0,255,255,0.3)'
          }}>
            Share your musical soul through retro-futuristic playlists
          </p>

          {/* Neon Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button
              size="lg"
              className="bg-cyan-500 text-black hover:bg-cyan-400 font-black text-lg px-8 py-6 border-2 border-cyan-300 shadow-[0_0_30px_rgba(0,255,255,0.6)] hover:shadow-[0_0_40px_rgba(0,255,255,0.8)]"
              style={{ fontFamily: "'Arial Black', sans-serif" }}
            >
              <Play className="w-5 h-5 mr-2" />
              START PLAYING
            </Button>
            <Button
              size="lg"
              className="bg-transparent border-2 border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-black font-black text-lg px-8 py-6 shadow-[0_0_30px_rgba(255,0,255,0.4)] hover:shadow-[0_0_40px_rgba(255,0,255,0.6)]"
              style={{ fontFamily: "'Arial Black', sans-serif" }}
            >
              <Users className="w-5 h-5 mr-2" />
              JOIN GAME
            </Button>
          </div>

          {/* Game Mode Cards with Neon borders */}
          <div className="grid md:grid-cols-3 gap-6 pt-16">
            <div className="bg-black/80 border-2 border-cyan-500 rounded-lg p-6 shadow-[0_0_30px_rgba(0,255,255,0.3)] hover:shadow-[0_0_50px_rgba(0,255,255,0.5)] transition-all">
              <Headphones className="w-12 h-12 text-cyan-400 mb-4" style={{filter: 'drop-shadow(0 0 10px rgba(0,255,255,0.8))'}} />
              <h3 className="text-2xl font-black text-cyan-400 mb-2" style={{ fontFamily: "'Arial Black', sans-serif" }}>JAM SESSIONS</h3>
              <p className="text-cyan-100">Create collaborative playlists with your crew</p>
            </div>
            <div className="bg-black/80 border-2 border-pink-500 rounded-lg p-6 shadow-[0_0_30px_rgba(255,0,255,0.3)] hover:shadow-[0_0_50px_rgba(255,0,255,0.5)] transition-all">
              <Radio className="w-12 h-12 text-pink-400 mb-4" style={{filter: 'drop-shadow(0 0 10px rgba(255,0,255,0.8))'}} />
              <h3 className="text-2xl font-black text-pink-400 mb-2" style={{ fontFamily: "'Arial Black', sans-serif" }}>DESERT ISLAND</h3>
              <p className="text-pink-100">Share the songs that define you</p>
            </div>
            <div className="bg-black/80 border-2 border-purple-500 rounded-lg p-6 shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:shadow-[0_0_50px_rgba(168,85,247,0.5)] transition-all">
              <Heart className="w-12 h-12 text-purple-400 mb-4" style={{filter: 'drop-shadow(0 0 10px rgba(168,85,247,0.8))'}} />
              <h3 className="text-2xl font-black text-purple-400 mb-2" style={{ fontFamily: "'Arial Black', sans-serif" }}>GUESS WHO</h3>
              <p className="text-purple-100">Mystery tracks, surprising reveals</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Option 2: MEMPHIS POP
function MemphisDesign() {
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

        {/* Squiggle lines */}
        <svg className="absolute top-10 left-1/3 w-64 h-32" viewBox="0 0 200 100">
          <path d="M 0 50 Q 25 0, 50 50 T 100 50 T 150 50 T 200 50" stroke="black" strokeWidth="6" fill="none" strokeLinecap="round"/>
        </svg>
        <svg className="absolute bottom-40 right-1/4 w-48 h-24" viewBox="0 0 200 100">
          <path d="M 0 50 Q 25 100, 50 50 T 100 50 T 150 50 T 200 50" stroke="black" strokeWidth="6" fill="none" strokeLinecap="round"/>
        </svg>

        {/* Dots pattern */}
        {[...Array(20)].map((_, i) => (
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

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8"
        >
          {/* Fun Badge */}
          <Badge className="bg-white border-4 border-black text-black px-6 py-3 text-sm font-black tracking-wider shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-2">
            <Sparkles className="w-5 h-5 mr-2" />
            MADE WITH ♥ FOR MUSIC
          </Badge>

          {/* Pop Art Title */}
          <div className="relative inline-block">
            <h1
              className="text-8xl font-black leading-none text-black relative"
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

          <p className="text-2xl font-bold text-black max-w-2xl mx-auto bg-white border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            Share your musical soul. Create playlists that pop! 🎵
          </p>

          {/* Playful Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <Button
              size="lg"
              className="bg-pink-500 text-white hover:bg-pink-600 font-black text-xl px-10 py-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all rotate-1"
              style={{ fontFamily: "'Arial Black', sans-serif" }}
            >
              <Play className="w-6 h-6 mr-3" />
              START PLAYING
            </Button>
            <Button
              size="lg"
              className="bg-cyan-400 text-black hover:bg-cyan-500 font-black text-xl px-10 py-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all -rotate-1"
              style={{ fontFamily: "'Arial Black', sans-serif" }}
            >
              <Users className="w-6 h-6 mr-3" />
              JOIN GAME
            </Button>
          </div>

          {/* Game Mode Cards - Memphis Style */}
          <div className="grid md:grid-cols-3 gap-8 pt-16">
            <div className="bg-gradient-to-br from-blue-400 to-purple-400 border-4 border-black rounded-none p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rotate-2 hover:rotate-0 transition-transform">
              <div className="bg-white w-16 h-16 border-4 border-black flex items-center justify-center mb-4 rounded-full">
                <Headphones className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-3xl font-black text-white mb-3" style={{ fontFamily: "'Arial Black', sans-serif", textShadow: '3px 3px 0px rgba(0,0,0,0.5)' }}>JAM SESSIONS</h3>
              <p className="text-white font-bold text-lg">Build playlists together!</p>
            </div>
            <div className="bg-gradient-to-br from-pink-400 to-orange-400 border-4 border-black rounded-none p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] -rotate-1 hover:rotate-0 transition-transform">
              <div className="bg-white w-16 h-16 border-4 border-black flex items-center justify-center mb-4" style={{clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'}}>
                <Radio className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-3xl font-black text-white mb-3" style={{ fontFamily: "'Arial Black', sans-serif", textShadow: '3px 3px 0px rgba(0,0,0,0.5)' }}>DESERT ISLAND</h3>
              <p className="text-white font-bold text-lg">Your soundtrack, revealed!</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-400 to-pink-400 border-4 border-black rounded-none p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rotate-1 hover:rotate-0 transition-transform">
              <div className="bg-white w-16 h-16 border-4 border-black flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-3xl font-black text-white mb-3" style={{ fontFamily: "'Arial Black', sans-serif", textShadow: '3px 3px 0px rgba(0,0,0,0.5)' }}>GUESS WHO</h3>
              <p className="text-white font-bold text-lg">Musical mystery fun!</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Option 3: RETRO MTV
function MTVDesign() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* MTV-style color blocks background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-1/3 h-1/2 bg-orange-500 opacity-20"></div>
        <div className="absolute top-0 right-0 w-1/2 h-1/3 bg-pink-600 opacity-20"></div>
        <div className="absolute bottom-0 left-1/4 w-1/2 h-1/2 bg-purple-600 opacity-20"></div>
        <div className="absolute top-1/3 right-1/4 w-1/3 h-1/3 bg-cyan-500 opacity-20"></div>
      </div>

      {/* Diagonal stripes */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.1) 35px, rgba(255,255,255,0.1) 70px)'
      }}></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8"
        >
          {/* MTV Logo Style Badge */}
          <Badge className="bg-white text-black px-8 py-4 text-base font-black tracking-widest border-0 skew-x-[-5deg]">
            <Music className="w-6 h-6 mr-3" />
            MUSIC TELEVISION
          </Badge>

          {/* Bold MTV-style Title */}
          <div className="space-y-4">
            <h1
              className="text-9xl font-black leading-none relative inline-block"
              style={{
                fontFamily: "'Impact', 'Arial Black', sans-serif",
                letterSpacing: '-0.02em'
              }}
            >
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 skew-y-[-2deg]" style={{
                WebkitTextStroke: '3px white',
                paintOrder: 'stroke fill'
              }}>
                UPTUNE
              </span>
            </h1>
            <div className="flex items-center justify-center gap-4">
              <div className="h-2 w-32 bg-gradient-to-r from-orange-500 to-pink-500 skew-x-[-10deg]"></div>
              <p className="text-3xl font-black text-white tracking-wider" style={{
                fontFamily: "'Arial Black', sans-serif",
                textTransform: 'uppercase'
              }}>
                I WANT MY MUSIC
              </p>
              <div className="h-2 w-32 bg-gradient-to-r from-pink-500 to-purple-500 skew-x-[10deg]"></div>
            </div>
          </div>

          <p className="text-2xl font-bold text-white max-w-2xl mx-auto uppercase tracking-wide" style={{
            textShadow: '3px 3px 0px rgba(255,107,0,0.8)'
          }}>
            The Revolution Will Be Playlisted
          </p>

          {/* Bold CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-pink-600 text-white hover:from-orange-600 hover:to-pink-700 font-black text-2xl px-12 py-8 border-0 skew-x-[-5deg] hover:skew-x-0 transition-all"
              style={{ fontFamily: "'Impact', sans-serif" }}
            >
              <div className="skew-x-[5deg] flex items-center">
                <Play className="w-7 h-7 mr-3" />
                PLAY NOW
              </div>
            </Button>
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-200 font-black text-2xl px-12 py-8 border-4 border-black skew-x-[5deg] hover:skew-x-0 transition-all"
              style={{ fontFamily: "'Impact', sans-serif" }}
            >
              <div className="skew-x-[-5deg] flex items-center">
                <Users className="w-7 h-7 mr-3" />
                JOIN GAME
              </div>
            </Button>
          </div>

          {/* Game Mode Cards - MTV Blocks */}
          <div className="grid md:grid-cols-3 gap-6 pt-20">
            <div className="bg-gradient-to-br from-orange-600 to-orange-400 p-8 skew-y-[-2deg] hover:skew-y-0 transition-transform border-4 border-white">
              <div className="skew-y-[2deg]">
                <div className="bg-white text-orange-600 w-20 h-20 flex items-center justify-center mb-6 border-4 border-black">
                  <Headphones className="w-10 h-10" />
                </div>
                <h3 className="text-4xl font-black text-white mb-3 uppercase" style={{ fontFamily: "'Impact', sans-serif", textShadow: '4px 4px 0px rgba(0,0,0,0.3)' }}>JAM<br/>SESSIONS</h3>
                <p className="text-white font-bold text-lg">COLLABORATIVE PLAYLISTS</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-pink-600 to-purple-600 p-8 skew-y-[2deg] hover:skew-y-0 transition-transform border-4 border-white">
              <div className="skew-y-[-2deg]">
                <div className="bg-white text-pink-600 w-20 h-20 flex items-center justify-center mb-6 border-4 border-black rotate-45">
                  <Radio className="w-10 h-10 -rotate-45" />
                </div>
                <h3 className="text-4xl font-black text-white mb-3 uppercase" style={{ fontFamily: "'Impact', sans-serif", textShadow: '4px 4px 0px rgba(0,0,0,0.3)' }}>DESERT<br/>ISLAND</h3>
                <p className="text-white font-bold text-lg">YOUR MUSICAL DNA</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-600 to-cyan-600 p-8 skew-y-[-2deg] hover:skew-y-0 transition-transform border-4 border-white">
              <div className="skew-y-[2deg]">
                <div className="bg-white text-purple-600 w-20 h-20 flex items-center justify-center mb-6 border-4 border-black">
                  <Heart className="w-10 h-10" />
                </div>
                <h3 className="text-4xl font-black text-white mb-3 uppercase" style={{ fontFamily: "'Impact', sans-serif", textShadow: '4px 4px 0px rgba(0,0,0,0.3)' }}>GUESS<br/>WHO</h3>
                <p className="text-white font-bold text-lg">MYSTERY REVEALS</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
