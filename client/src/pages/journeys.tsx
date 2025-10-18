import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Music, Calendar, MapPin, Users, Headphones, Star, BookOpen, Play, Eye } from "lucide-react";
import { motion } from "framer-motion";
import type { Journey } from "@shared/schema";

const movementColors = {
  'disco': 'from-purple-400 to-pink-500',
  'acid-house': 'from-yellow-400 to-pink-500',
  'berlin': 'from-gray-400 to-blue-500',
  'detroit': 'from-orange-400 to-red-500',
  'madchester': 'from-blue-400 to-cyan-500'
};

const getMovementColor = (slug: string) => {
  if (slug.includes('disco')) return movementColors.disco;
  if (slug.includes('acid')) return movementColors['acid-house'];
  if (slug.includes('berlin')) return movementColors.berlin;
  if (slug.includes('detroit')) return movementColors.detroit;
  if (slug.includes('madchester')) return movementColors.madchester;
  return 'from-purple-400 to-indigo-500';
};

export default function JourneysPage() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const { data: journeys = [], isLoading } = useQuery<Journey[]>({
    queryKey: ['/api/journeys'],
    queryFn: async () => {
      const response = await fetch('/api/journeys?published=true');
      if (!response.ok) throw new Error('Failed to fetch journeys');
      return response.json();
    },
  });

  const featuredJourney = journeys[0];
  const otherJourneys = journeys.slice(1);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-200 via-pink-200 to-cyan-200">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 border-6 border-black rounded-full mx-auto mb-6 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          />
          <p className="text-black text-2xl font-black" style={{ fontFamily: "'Arial Black', sans-serif" }}>LOADING...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-pink-200 to-cyan-200 relative overflow-hidden">
      {/* Memphis Pattern Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
        {/* Shapes */}
        <div className="absolute top-20 right-10 w-24 h-24 border-6 border-black rotate-45"></div>
        <div className="absolute top-1/3 left-20 w-32 h-32 rounded-full bg-pink-500"></div>
        <div className="absolute bottom-40 right-1/4 w-28 h-28 bg-cyan-400" style={{clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)'}}></div>
        <div className="absolute top-1/2 right-10 w-20 h-20 border-6 border-dashed border-black rounded-full"></div>
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-yellow-400 rotate-12"></div>

        {/* Squiggle lines */}
        <svg className="absolute top-40 left-1/4 w-48 h-24" viewBox="0 0 200 100">
          <path d="M 0 50 Q 25 0, 50 50 T 100 50 T 150 50" stroke="black" strokeWidth="5" fill="none" strokeLinecap="round"/>
        </svg>
        <svg className="absolute bottom-1/3 right-20 w-40 h-20" viewBox="0 0 200 100">
          <path d="M 0 50 Q 25 100, 50 50 T 100 50" stroke="black" strokeWidth="4" fill="none" strokeLinecap="round"/>
        </svg>

        {/* Dots */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-black rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <header className="px-6 md:px-8 py-12">
          <div className="max-w-7xl mx-auto">
            {/* Navigation */}
            <nav className="flex items-center justify-between mb-16">
              <Link href="/">
                <Button className="bg-cyan-400 hover:bg-cyan-500 text-black font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all -rotate-1" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                  ← BACK
                </Button>
              </Link>
              <div className="flex items-center gap-4">
                <Link href="/discover">
                  <Button className="bg-white hover:bg-gray-100 text-black font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all rotate-1" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                    DISCOVER
                  </Button>
                </Link>
                <Link href="/">
                  <Button className="bg-gradient-to-r from-purple-400 to-pink-500 text-white font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all -rotate-1" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                    CREATE GAME
                  </Button>
                </Link>
              </div>
            </nav>

            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-5xl mx-auto"
            >
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-20 h-20 bg-white border-4 border-black flex items-center justify-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-12">
                  <Music className="w-10 h-10 text-black -rotate-12" />
                </div>
              </div>

              <h1 className="text-6xl md:text-8xl font-black text-black leading-tight mb-6" style={{ fontFamily: "'Arial Black', sans-serif", textShadow: '6px 6px 0px #FF1493, 12px 12px 0px #00CED1' }}>
                MUSICAL JOURNEYS
              </h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-2xl font-bold text-black max-w-3xl mx-auto bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] -rotate-1 mb-8">
                  Deep dive into the movements that connected people and changed the world! 🎶
                </p>
                <p className="text-lg font-bold text-black max-w-2xl mx-auto">
                  From underground scenes to global cultural shifts, these are the stories
                  of music's power to unite and transform.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </header>

        {/* Featured Journey */}
        {featuredJourney && (
          <section className="px-6 md:px-8 pb-12">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-4xl font-black text-black flex items-center gap-4 bg-yellow-300 px-6 py-3 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rotate-1 inline-block mb-8" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                  <Star className="w-10 h-10 text-black" />
                  FEATURED JOURNEY
                </h2>

                <Link href={`/discover/journeys/${featuredJourney.slug}`}>
                  <Card className="group overflow-hidden bg-gradient-to-br from-pink-400 to-orange-400 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all cursor-pointer rotate-1 hover:rotate-0">
                    <div className="grid md:grid-cols-2 gap-0">
                      {/* Image */}
                      <div className="relative h-80 md:h-auto overflow-hidden border-r-0 md:border-r-4 border-b-4 md:border-b-0 border-black">
                        <motion.img
                          src={featuredJourney.headlineImageUrl || ""}
                          alt={featuredJourney.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        <Badge className="absolute bottom-4 left-4 bg-yellow-400 text-black border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black text-sm" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                          <BookOpen className="w-4 h-4 mr-1" />
                          JOURNEY
                        </Badge>
                      </div>

                      {/* Content */}
                      <div className="p-8 flex flex-col justify-center bg-white">
                        <h3 className="text-3xl md:text-5xl font-black text-black mb-4 leading-tight" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                          {featuredJourney.title}
                        </h3>
                        <p className="text-black/80 text-lg font-bold mb-6 leading-relaxed">
                          {featuredJourney.introduction}
                        </p>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                          <Button className="bg-gradient-to-r from-purple-400 to-pink-500 text-white font-black border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all text-lg px-8" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                            EXPLORE NOW
                            <ArrowRight className="w-5 h-5 ml-2" />
                          </Button>
                          <div className="flex items-center gap-2 text-black/70 font-bold">
                            <Eye className="w-5 h-5" />
                            <span>Deep dive story</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            </div>
          </section>
        )}

        {/* All Journeys Grid */}
        <section className="px-6 md:px-8 pb-16 pt-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl md:text-4xl font-black text-black flex items-center gap-4 bg-cyan-300 px-6 py-3 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] -rotate-1" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                  <BookOpen className="w-8 h-8 text-black" />
                  ALL JOURNEYS
                </h2>
                <div className="bg-white border-4 border-black px-4 py-2 font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                  {journeys.length} STORIES
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherJourneys.map((journey: Journey, index: number) => (
                  <motion.div
                    key={journey.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    onHoverStart={() => setHoveredId(journey.id)}
                    onHoverEnd={() => setHoveredId(null)}
                  >
                    <Link href={`/discover/journeys/${journey.slug}`}>
                      <Card className="group overflow-hidden bg-gradient-to-br from-blue-300 to-purple-300 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all h-full cursor-pointer rotate-1 hover:rotate-0">
                        <div className="relative h-56 overflow-hidden border-b-4 border-black">
                          <motion.img
                            src={journey.headlineImageUrl || ""}
                            alt={journey.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          <Badge className="absolute top-4 left-4 bg-yellow-400 text-black border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-black" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                            <BookOpen className="w-3 h-3 mr-1" />
                            JOURNEY
                          </Badge>
                        </div>

                        <CardHeader className="bg-white border-b-4 border-black">
                          <h3 className="text-xl font-black text-black leading-tight line-clamp-2 mb-2" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                            {journey.title}
                          </h3>
                          <p className="text-black/70 text-sm font-bold line-clamp-3 leading-relaxed">
                            {journey.introduction}
                          </p>
                        </CardHeader>

                        <CardContent className="bg-white p-4">
                          <div className="flex items-center justify-between">
                            <span className="text-black font-black text-sm" style={{ fontFamily: "'Arial Black', sans-serif" }}>READ STORY</span>
                            <ArrowRight className="w-5 h-5 text-black group-hover:translate-x-1 transition-transform" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {journeys.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-20 h-20 bg-white border-4 border-black flex items-center justify-center mx-auto mb-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rotate-12">
                    <Music className="w-10 h-10 text-black -rotate-12" />
                  </div>
                  <h3 className="text-2xl font-black text-black mb-3 bg-yellow-300 inline-block px-6 py-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" style={{ fontFamily: "'Arial Black', sans-serif" }}>NO JOURNEYS YET</h3>
                  <p className="text-black font-bold text-lg">Musical journeys are being crafted. Check back soon!</p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="px-6 md:px-8 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] -rotate-1 overflow-hidden">
              <CardContent className="p-8 md:p-12 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 border-4 border-black flex items-center justify-center mx-auto mb-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rotate-12">
                  <Play className="w-8 h-8 text-white -rotate-12" />
                </div>

                <h3 className="text-3xl md:text-4xl font-black text-black mb-4" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                  READY TO DISCOVER?
                </h3>
                <p className="text-black font-bold text-lg mb-6 max-w-2xl mx-auto">
                  Each journey reveals how underground movements became cultural earthquakes,
                  reshaping society through sound and community!
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href={featuredJourney ? `/discover/journeys/${featuredJourney.slug}` : '#'}>
                    <Button size="lg" className="bg-gradient-to-r from-purple-400 to-pink-500 text-white font-black border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all rotate-1" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                      <Music className="w-5 h-5 mr-2" />
                      START JOURNEY
                    </Button>
                  </Link>
                  <Link href="/discover">
                    <Button size="lg" className="bg-cyan-400 text-black font-black border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all -rotate-1" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                      <Users className="w-5 h-5 mr-2" />
                      EXPLORE ALL
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
