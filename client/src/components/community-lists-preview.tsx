import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Vote, ArrowRight, Music, Crown } from "lucide-react";
import { motion } from "framer-motion";

interface CommunityList {
  id: number;
  title: string;
  description: string;
  slug: string;
  emoji: string;
  isActive: boolean;
  createdAt: string;
}

interface ListEntry {
  id: number;
  listId: number;
  spotifyTrackId: string;
  songTitle: string;
  artistName: string;
  albumName: string | null;
  imageUrl: string | null;
  contextReason: string;
  submitterName: string | null;
  voteScore: number;
  createdAt: string;
}

interface ListWithTopEntries extends CommunityList {
  topEntries: ListEntry[];
  totalEntries: number;
}

export function CommunityListsPreview() {
  const { data: lists, isLoading } = useQuery({
    queryKey: ["/api/community-lists"],
    queryFn: async () => {
      const response = await fetch("/api/community-lists");
      if (!response.ok) throw new Error("Failed to fetch community lists");
      return response.json() as Promise<CommunityList[]>;
    },
    refetchInterval: 30000, // Refresh every 30 seconds for live data
  });

  // Fetch top entries for each list
  const { data: listsWithEntries } = useQuery({
    queryKey: ["/api/community-lists", "with-entries"],
    queryFn: async () => {
      if (!lists) return [];
      
      const listsWithEntries = await Promise.all(
        lists.map(async (list) => {
          try {
            const response = await fetch(`/api/community-lists/${list.id}/entries`);
            if (!response.ok) return { ...list, topEntries: [], totalEntries: 0 };
            
            const entries = await response.json() as ListEntry[];
            return {
              ...list,
              topEntries: entries.slice(0, 3), // Top 3 entries
              totalEntries: entries.length,
            };
          } catch {
            return { ...list, topEntries: [], totalEntries: 0 };
          }
        })
      );
      
      return listsWithEntries;
    },
    enabled: !!lists,
    refetchInterval: 30000,
  });

  if (isLoading) {
    return (
      <Card className="max-w-6xl mx-auto bg-gradient-to-r from-cyan-300 to-purple-300 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-1">
        <CardContent className="p-8 bg-white">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-4 border-black"></div>
            <span className="ml-3 text-black font-bold">Loading community lists...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!listsWithEntries || listsWithEntries.length === 0) {
    return (
      <Card className="max-w-6xl mx-auto bg-gradient-to-br from-yellow-300 to-pink-300 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] -rotate-1">
        <CardHeader className="text-center bg-white border-b-4 border-black">
          <CardTitle className="flex items-center justify-center gap-3 text-3xl text-black font-black" style={{ fontFamily: "'Arial Black', sans-serif" }}>
            <div className="w-12 h-12 bg-purple-400 border-4 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-12">
              <Users className="w-6 h-6 text-white" />
            </div>
            COMING SOON
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center pb-8 bg-white pt-6">
          <p className="text-black/80 font-bold mb-6 text-lg">
            Be the first to create viral music lists and get the community voting! 🎵
          </p>
          <Link href="/discover/lists">
            <Button className="bg-gradient-to-r from-purple-400 to-pink-400 text-white hover:from-purple-500 hover:to-pink-500 font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-6 py-3" style={{ fontFamily: "'Arial Black', sans-serif" }}>
              CREATE FIRST LIST
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-7xl mx-auto bg-gradient-to-br from-pink-300 via-yellow-300 to-cyan-300 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rotate-1">
      <CardHeader className="text-center pb-8 bg-white border-b-4 border-black">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <CardTitle className="flex items-center justify-center gap-3 text-4xl md:text-5xl font-black text-black mb-4" style={{ fontFamily: "'Arial Black', sans-serif" }}>
            <div className="w-14 h-14 bg-pink-400 border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-12">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 px-6 py-2 -rotate-1 inline-block border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              HAVE YOUR SAY
            </span>
          </CardTitle>
          <p className="text-black/80 font-bold text-xl max-w-2xl mx-auto leading-relaxed">
            Vote for your favorite songs. Shape the playlists that define music moments. 🎵
          </p>
        </motion.div>
      </CardHeader>

      <CardContent className="space-y-8 pb-12 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {listsWithEntries.slice(0, 4).map((list, index) => (
            <motion.div
              key={list.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <Card className={`bg-gradient-to-br from-cyan-200 to-purple-200 hover:from-cyan-300 hover:to-purple-300 transition-all duration-300 h-full border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}>
                <CardHeader className="pb-4 bg-white border-b-4 border-black">
                  <div className="flex items-start justify-between mb-3 flex-wrap gap-3">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl p-2 bg-yellow-300 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-6">{list.emoji}</div>
                      <div>
                        <h3 className="font-black text-xl text-black mb-2" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                          {list.title.toUpperCase()}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-black/80 flex-wrap">
                          <span className="flex items-center gap-2 bg-cyan-300 px-3 py-1 border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <Music className="w-4 h-4" />
                            {list.totalEntries} songs
                          </span>
                          <span className="flex items-center gap-2 bg-pink-300 px-3 py-1 border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <Vote className="w-4 h-4" />
                            Live voting
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-green-400 text-white border-3 border-black text-sm px-3 py-1 font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                      ACTIVE
                    </Badge>
                  </div>
                </CardHeader>


                <CardContent className="space-y-4 bg-white">
                  {list.topEntries.length > 0 ? (
                    <>
                      <div className="space-y-3">
                        {list.topEntries.map((entry, entryIndex) => (
                          <motion.div
                            key={entry.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: entryIndex * 0.1 }}
                            className="flex items-center gap-4 p-3 bg-yellow-100 hover:bg-yellow-200 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
                          >
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                {entryIndex === 0 && <Crown className="w-5 h-5 text-yellow-600 flex-shrink-0" />}
                                <span className={`text-sm font-black flex-shrink-0 w-7 h-7 flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                                  entryIndex === 0 ? 'bg-yellow-400 text-black' :
                                  entryIndex === 1 ? 'bg-gray-300 text-black' :
                                  'bg-pink-400 text-white'
                                }`} style={{ fontFamily: "'Arial Black', sans-serif" }}>
                                  {entryIndex + 1}
                                </span>
                              </div>
                              {entry.imageUrl && (
                                <img
                                  src={entry.imageUrl}
                                  alt={entry.songTitle}
                                  className="w-10 h-10 object-cover flex-shrink-0 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                />
                              )}
                              <div className="min-w-0 flex-1">
                                <p className="font-black text-sm truncate text-black mb-1">{entry.songTitle}</p>
                                <p className="text-xs text-black/70 font-bold truncate">{entry.artistName}</p>
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <div className="font-black text-lg text-black" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                                {entry.voteScore > 0 ? `+${entry.voteScore}` : entry.voteScore}
                              </div>
                              <div className="text-xs text-black/60 font-bold">votes</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <Link href={`/discover/lists/${list.slug}`}>
                        <Button className="w-full mt-4 bg-gradient-to-r from-purple-400 to-pink-400 text-white hover:from-purple-500 hover:to-pink-500 transition-all duration-200 py-4 font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                          <Vote className="w-5 h-5 mr-2" />
                          VOTE & SUBMIT SONGS
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4 p-4 bg-yellow-300 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] inline-block">🎵</div>
                      <p className="text-base text-black/80 font-bold mb-6">No songs yet - be the first! 🎸</p>
                      <Link href={`/discover/lists/${list.slug}`}>
                        <Button className="bg-gradient-to-r from-purple-400 to-pink-400 text-white hover:from-purple-500 hover:to-pink-500 px-6 py-3 font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                          SUBMIT FIRST SONG
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>


        {/* Call to Action */}
        <div className="text-center pt-8 border-t-4 border-black">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <div className="text-center sm:text-left">
              <p className="text-black font-bold text-lg">
                <strong className="text-3xl font-black bg-gradient-to-r from-yellow-400 to-pink-400 px-4 py-1 inline-block border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-2" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                  {listsWithEntries.reduce((total, list) => total + list.totalEntries, 0)}
                </strong>
                <span className="ml-2">songs elevating the community 🚀</span>
              </p>
              <p className="text-black/70 font-bold text-sm mt-2">Join thousands creating the ultimate playlists</p>
            </div>
            <Link href="/discover/lists">
              <Button className="bg-gradient-to-r from-purple-400 to-pink-400 text-white hover:from-purple-500 hover:to-pink-500 px-8 py-4 text-lg font-black border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                <TrendingUp className="w-5 h-5 mr-3" />
                EXPLORE ALL PLAYLISTS
                <ArrowRight className="w-5 h-5 ml-3" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}