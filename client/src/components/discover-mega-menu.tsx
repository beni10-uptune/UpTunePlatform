import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Trophy, Sparkles, TrendingUp, Calendar, Globe, Users, ArrowRight, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";

interface DiscoverMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DiscoverMegaMenu({ isOpen, onClose }: DiscoverMegaMenuProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const categories = [
    {
      id: "journeys",
      title: "Musical Journeys",
      description: "Deep dives into music history",
      icon: Music,
      color: "from-purple-600 to-pink-600",
      items: [
        { title: "Disco Revolution", slug: "disco-underground-revolution", emoji: "🕺" },
        { title: "Acid House", slug: "acid-house-second-summer-love", emoji: "🏠" },
        { title: "Berlin Techno", slug: "berlin-electronic-soundtrack-freedom", emoji: "🔊" },
        { title: "Detroit Techno", slug: "detroit-techno-post-industrial-resurrection", emoji: "🏭" },
        { title: "Madchester", slug: "madchester-factory-floor-dance-floor", emoji: "🎸" },
      ],
    },
    {
      id: "eras",
      title: "Decades",
      description: "Vote for era-defining tracks",
      icon: Calendar,
      color: "from-blue-600 to-cyan-600",
      items: [
        { title: "60s Classics", slug: "favourite-song-60s", emoji: "🎭" },
        { title: "70s Anthems", slug: "favourite-song-70s", emoji: "🕺" },
        { title: "80s Hits", slug: "favourite-song-80s", emoji: "🎹" },
        { title: "90s Favorites", slug: "favourite-song-90s", emoji: "📻" },
        { title: "2000s Bangers", slug: "favourite-song-2000s", emoji: "💿" },
        { title: "2010s Streaming Era", slug: "favourite-song-2010s", emoji: "📱" },
        { title: "2020s Now", slug: "favourite-song-2020s", emoji: "🎧" },
      ],
    },
    {
      id: "hall-of-fame",
      title: "Hall of Fame",
      description: "The greatest of all time",
      icon: Trophy,
      color: "from-yellow-600 to-orange-600",
      items: [
        { title: "Greatest Songs Ever", slug: "greatest-songs-all-time", emoji: "🌟" },
        { title: "Best Guitar Riffs", slug: "most-epic-guitar-riffs", emoji: "🎸" },
        { title: "Movie Soundtracks", slug: "best-movie-soundtrack-moments", emoji: "🎬" },
        { title: "Live Performances", slug: "best-live-performances", emoji: "🎤" },
        { title: "Favorite Albums", slug: "favourite-album-all-time", emoji: "💿" },
      ],
    },
    {
      id: "vibes",
      title: "Moods & Vibes",
      description: "Music for every moment",
      icon: Heart,
      color: "from-pink-600 to-rose-600",
      items: [
        { title: "Road Trip", slug: "road-trip-essentials", emoji: "🚗" },
        { title: "Workout Energy", slug: "workout-motivation", emoji: "💪" },
        { title: "Rainy Days", slug: "rainy-day-vibes", emoji: "🌧️" },
        { title: "Confidence Boost", slug: "confidence-boosters", emoji: "✨" },
        { title: "Nostalgia Hits", slug: "nostalgia-hits", emoji: "📼" },
        { title: "Love Songs", slug: "ultimate-love-songs", emoji: "❤️" },
      ],
    },
  ];

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
                    <h2 className="text-4xl font-black text-black flex items-center gap-4 bg-pink-400 px-6 py-3 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rotate-2" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                      <Sparkles className="w-10 h-10 text-black" />
                      DISCOVER MUSIC
                    </h2>
                    <Link href="/discover">
                      <button
                        onClick={onClose}
                        className="bg-cyan-400 hover:bg-cyan-500 text-black font-black px-4 py-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center gap-2"
                        style={{ fontFamily: "'Arial Black', sans-serif" }}
                      >
                        VIEW ALL
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </Link>
                  </div>
                  <p className="text-black/70 font-bold text-lg">
                    Explore stories, vote for favorites, discover what the community loves! 🎵
                  </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    const isHovered = hoveredCategory === category.id;

                    return (
                      <div
                        key={category.id}
                        onMouseEnter={() => setHoveredCategory(category.id)}
                        onMouseLeave={() => setHoveredCategory(null)}
                        className="group"
                      >
                        {/* Category Header */}
                        <div className="mb-4">
                          <div
                            className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${category.color} border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mb-3 rotate-1`}
                          >
                            <Icon className="w-5 h-5 text-white" />
                            <span className="text-white text-sm font-black" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                              {category.title}
                            </span>
                          </div>
                          <p className="text-black/60 text-xs font-bold">{category.description}</p>
                        </div>

                        {/* Items List */}
                        <div className="space-y-2">
                          {category.items.map((item) => (
                            <Link
                              key={item.slug}
                              href={
                                category.id === "journeys"
                                  ? `/discover/journeys/${item.slug}`
                                  : `/discover/lists/${item.slug}`
                              }
                            >
                              <motion.button
                                onClick={onClose}
                                whileHover={{ x: 4 }}
                                className="w-full text-left px-3 py-2 bg-white border-2 border-black hover:bg-yellow-100 hover:border-black hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-3 text-sm font-bold"
                              >
                                <span className="text-lg bg-cyan-200 border-2 border-black w-8 h-8 flex items-center justify-center">{item.emoji}</span>
                                <span className="text-black">{item.title}</span>
                              </motion.button>
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Quick Stats Footer */}
                <div className="mt-8 pt-6 border-t-4 border-black">
                  <div className="grid grid-cols-3 gap-6 text-center">
                    <div className="bg-purple-300 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-2">
                      <div className="text-3xl font-black text-black" style={{ fontFamily: "'Arial Black', sans-serif" }}>5</div>
                      <div className="text-black text-xs font-bold">Musical Journeys</div>
                    </div>
                    <div className="bg-blue-300 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-1">
                      <div className="text-3xl font-black text-black" style={{ fontFamily: "'Arial Black', sans-serif" }}>27</div>
                      <div className="text-black text-xs font-bold">Community Lists</div>
                    </div>
                    <div className="bg-pink-300 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-1">
                      <div className="text-3xl font-black text-black" style={{ fontFamily: "'Arial Black', sans-serif" }}>350+</div>
                      <div className="text-black text-xs font-bold">Songs Voted On</div>
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
