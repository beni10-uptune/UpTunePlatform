import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Music,
  Trophy,
  TrendingUp,
  Search,
  ArrowRight,
  Users,
  Eye,
  Sparkles,
  Play,
  Vote,
  BookOpen,
} from "lucide-react";
import type { Journey } from "@shared/schema";

interface CommunityList {
  id: number;
  title: string;
  description: string;
  slug: string;
  emoji: string;
  isActive: boolean;
  createdAt: string;
}

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "journeys" | "lists">("all");

  const { data: journeys = [], isLoading: journeysLoading } = useQuery<Journey[]>({
    queryKey: ["/api/journeys"],
    queryFn: async () => {
      const response = await fetch("/api/journeys?published=true");
      if (!response.ok) throw new Error("Failed to fetch journeys");
      return response.json();
    },
  });

  const { data: lists = [], isLoading: listsLoading } = useQuery<CommunityList[]>({
    queryKey: ["/api/community-lists"],
    queryFn: async () => {
      const response = await fetch("/api/community-lists");
      if (!response.ok) throw new Error("Failed to fetch community lists");
      return response.json();
    },
  });

  const isLoading = journeysLoading || listsLoading;

  // Filter and search
  const filteredJourneys = journeys.filter((journey) =>
    journey.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredLists = lists.filter((list) =>
    list.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Color mapping for journeys
  const getJourneyColor = (slug: string) => {
    if (slug.includes("disco")) return "from-purple-600 to-pink-600";
    if (slug.includes("acid")) return "from-yellow-500 to-pink-600";
    if (slug.includes("berlin")) return "from-gray-600 to-blue-600";
    if (slug.includes("detroit")) return "from-orange-600 to-red-600";
    if (slug.includes("madchester")) return "from-blue-600 to-cyan-600";
    return "from-purple-600 to-indigo-600";
  };

  // Featured journey (first one)
  const featuredJourney = journeys[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-pink-200 to-cyan-200 relative overflow-hidden">
      {/* Memphis Pattern Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
        {/* Squiggles and shapes */}
        <div className="absolute top-20 right-10 w-24 h-24 border-6 border-black rotate-45"></div>
        <div className="absolute top-1/3 left-20 w-32 h-32 rounded-full bg-pink-500"></div>
        <div className="absolute bottom-40 right-1/4 w-28 h-28 bg-cyan-400" style={{clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)'}}></div>
        <div className="absolute top-1/2 right-10 w-20 h-20 border-6 border-dashed border-black rounded-full"></div>

        {/* Squiggle lines */}
        <svg className="absolute top-40 left-1/4 w-48 h-24" viewBox="0 0 200 100">
          <path d="M 0 50 Q 25 0, 50 50 T 100 50 T 150 50" stroke="black" strokeWidth="5" fill="none" strokeLinecap="round"/>
        </svg>

        {/* Dots */}
        {[...Array(15)].map((_, i) => (
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
        <header className="px-6 md:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            {/* Nav */}
            <nav className="flex items-center justify-between mb-12">
              <Link href="/">
                <Button className="bg-cyan-400 hover:bg-cyan-500 text-black font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all -rotate-1" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                  ← BACK
                </Button>
              </Link>
              <Link href="/">
                <Button className="bg-gradient-to-r from-purple-400 to-pink-500 text-white font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all rotate-1" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                  CREATE GAME
                </Button>
              </Link>
            </nav>

            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl mx-auto mb-12"
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-24 h-24 bg-white border-4 border-black flex items-center justify-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-12" style={{clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'}}>
                  <Sparkles className="w-12 h-12 text-black -rotate-12" />
                </div>
              </div>

              <h1 className="text-6xl md:text-8xl font-black text-black leading-tight mb-6" style={{ fontFamily: "'Arial Black', sans-serif", textShadow: '6px 6px 0px #FF1493, 12px 12px 0px #00CED1' }}>
                DISCOVER MUSIC
              </h1>
              <p className="text-2xl font-bold text-black max-w-2xl mx-auto bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] -rotate-1">
                Explore stories, vote for favorites, discover what the community loves! 🎶
              </p>

              {/* Search */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-black" />
                  <Input
                    type="text"
                    placeholder="Search journeys, lists, eras, genres..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-14 h-16 bg-white border-4 border-black text-black placeholder:text-black/60 text-lg font-bold shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] focus:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
                    style={{ fontFamily: "'Arial', sans-serif" }}
                  />
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <Button
                  onClick={() => setActiveFilter("all")}
                  className={`font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all ${
                    activeFilter === "all"
                      ? "bg-pink-400 text-white rotate-2"
                      : "bg-white text-black -rotate-1"
                  }`}
                  style={{ fontFamily: "'Arial Black', sans-serif" }}
                >
                  ALL
                </Button>
                <Button
                  onClick={() => setActiveFilter("journeys")}
                  className={`font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all ${
                    activeFilter === "journeys"
                      ? "bg-yellow-400 text-black rotate-2"
                      : "bg-white text-black -rotate-1"
                  }`}
                  style={{ fontFamily: "'Arial Black', sans-serif" }}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  JOURNEYS
                </Button>
                <Button
                  onClick={() => setActiveFilter("lists")}
                  className={`font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all ${
                    activeFilter === "lists"
                      ? "bg-cyan-400 text-black rotate-2"
                      : "bg-white text-black -rotate-1"
                  }`}
                  style={{ fontFamily: "'Arial Black', sans-serif" }}
                >
                  <Vote className="w-4 h-4 mr-2" />
                  PICKS
                </Button>
              </div>
            </motion.div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-6 md:px-8 pb-24">
          <div className="max-w-7xl mx-auto space-y-16">
            {/* Featured Journey */}
            {featuredJourney && (activeFilter === "all" || activeFilter === "journeys") && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-4xl font-black text-black flex items-center gap-4 bg-white px-6 py-3 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rotate-1" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                    <Music className="w-10 h-10 text-black" />
                    FEATURED JOURNEY
                  </h2>
                </div>

                <Link href={`/discover/journeys/${featuredJourney.slug}`}>
                  <Card className="group overflow-hidden bg-gradient-to-br from-pink-400 to-orange-400 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px]] transition-all cursor-pointer rotate-1 hover:rotate-0">
                    <div className="grid md:grid-cols-2 gap-0">
                      {/* Image */}
                      <div className="relative h-64 md:h-auto overflow-hidden border-r-4 md:border-r-4 border-b-4 md:border-b-0 border-black">
                        <motion.img
                          src={featuredJourney.headlineImageUrl || ""}
                          alt={featuredJourney.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        <Badge className="absolute bottom-4 left-4 bg-yellow-400 text-black border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                          <BookOpen className="w-4 h-4 mr-1" />
                          JOURNEY
                        </Badge>
                      </div>

                      {/* Content */}
                      <div className="p-8 flex flex-col justify-center bg-white">
                        <h3 className="text-3xl md:text-4xl font-black text-black mb-4" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                          {featuredJourney.title}
                        </h3>
                        <p className="text-black/80 text-lg font-bold mb-6 line-clamp-3">
                          {featuredJourney.introduction}
                        </p>
                        <div className="flex items-center gap-4">
                          <Button className="bg-gradient-to-r from-purple-400 to-pink-500 text-white font-black border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                            EXPLORE
                            <ArrowRight className="w-5 h-5 ml-2" />
                          </Button>
                          <div className="flex items-center gap-2 text-black/70 text-sm font-bold">
                            <Eye className="w-4 h-4" />
                            <span>Deep dive story</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.section>
            )}

            {/* Mixed Grid */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl md:text-4xl font-black text-black flex items-center gap-4 bg-cyan-300 px-6 py-3 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] -rotate-1" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                  <TrendingUp className="w-8 h-8 text-black" />
                  {activeFilter === "all" && "EXPLORE EVERYTHING"}
                  {activeFilter === "journeys" && "ALL JOURNEYS"}
                  {activeFilter === "lists" && "COMMUNITY PICKS"}
                </h2>
                <div className="bg-white border-4 border-black px-4 py-2 font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                  {activeFilter === "all" && `${filteredJourneys.length + filteredLists.length} ITEMS`}
                  {activeFilter === "journeys" && `${filteredJourneys.length} JOURNEYS`}
                  {activeFilter === "lists" && `${filteredLists.length} LISTS`}
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Journeys */}
                {(activeFilter === "all" || activeFilter === "journeys") &&
                  filteredJourneys.slice(activeFilter === "all" ? 1 : 0).map((journey, index) => (
                    <motion.div
                      key={journey.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <Link href={`/discover/journeys/${journey.slug}`}>
                        <Card className="group overflow-hidden bg-gradient-to-br from-blue-300 to-purple-300 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all h-full cursor-pointer rotate-1 hover:rotate-0">
                          <div className="relative h-48 overflow-hidden border-b-4 border-black">
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
                          <CardHeader className="bg-white">
                            <h3 className="text-xl font-black text-black line-clamp-2" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                              {journey.title}
                            </h3>
                            <p className="text-black/70 text-sm font-bold line-clamp-2 mt-2">
                              {journey.introduction}
                            </p>
                          </CardHeader>
                          <CardContent className="bg-white border-t-4 border-black">
                            <div className="flex items-center justify-between">
                              <span className="text-black font-black text-sm" style={{ fontFamily: "'Arial Black', sans-serif" }}>READ STORY</span>
                              <ArrowRight className="w-5 h-5 text-black" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}

                {/* Community Lists */}
                {(activeFilter === "all" || activeFilter === "lists") &&
                  filteredLists.map((list, index) => (
                    <motion.div
                      key={list.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <Link href={`/discover/lists/${list.slug}`}>
                        <Card className="group overflow-hidden bg-gradient-to-br from-pink-300 to-yellow-300 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all h-full cursor-pointer -rotate-1 hover:rotate-0">
                          <CardHeader className="bg-white border-b-4 border-black">
                            <div className="flex items-start justify-between mb-3">
                              <div className="w-14 h-14 bg-cyan-300 border-4 border-black flex items-center justify-center text-3xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                {list.emoji}
                              </div>
                              <Badge className="bg-gradient-to-r from-green-400 to-emerald-400 text-black border-3 border-black font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                                <Vote className="w-3 h-3 mr-1" />
                                VOTE
                              </Badge>
                            </div>
                            <h3 className="text-lg font-black text-black" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                              {list.title}
                            </h3>
                            <p className="text-black/70 text-sm font-bold line-clamp-2 mt-2">
                              {list.description}
                            </p>
                          </CardHeader>
                          <CardContent className="bg-white">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-black/70 text-sm font-bold">
                                <Users className="w-4 h-4" />
                                <span>Community</span>
                              </div>
                              <ArrowRight className="w-5 h-5 text-black" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
              </div>

              {/* Empty State */}
              {((activeFilter === "journeys" && filteredJourneys.length === 0) ||
                (activeFilter === "lists" && filteredLists.length === 0) ||
                (activeFilter === "all" && filteredJourneys.length === 0 && filteredLists.length === 0)) && (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-white border-4 border-black flex items-center justify-center mx-auto mb-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rotate-12">
                    <Search className="w-10 h-10 text-black -rotate-12" />
                  </div>
                  <h3 className="text-2xl font-black text-black mb-3 bg-yellow-300 inline-block px-6 py-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" style={{ fontFamily: "'Arial Black', sans-serif" }}>NO RESULTS FOUND</h3>
                  <p className="text-black font-bold text-lg">Try a different search term! 🔍</p>
                </div>
              )}
            </motion.section>
          </div>
        </main>
      </div>
    </div>
  );
}
